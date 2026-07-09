import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader, AddButton } from "@/components/app/AppShell";
import { fmtMoney, firstDayOfMonth, toISODate } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Trash2, PieChart } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/orcamentos")({
  head: () => ({ meta: [{ title: "Orçamentos — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null)); }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ category: "", amount: "" });

  const { data: budgets = [] } = useQuery({
    queryKey: ["budgets", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("budgets").select("*").eq("period", "monthly")).data ?? [],
  });
  const { data: txns = [] } = useQuery({
    queryKey: ["txns", "month-budgets", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("transactions").select("*")
      .eq("kind", "expense").gte("occurred_on", toISODate(firstDayOfMonth()))).data ?? [],
  });

  const spentByCat: Record<string, number> = {};
  txns.forEach((t) => { const k = t.category || "Outros"; spentByCat[k] = (spentByCat[k] || 0) + Number(t.amount); });

  async function save() {
    if (!uid || !form.category || !form.amount) return toast.error("Preencha todos os campos");
    const { error } = await supabase.from("budgets").upsert({
      user_id: uid, category: form.category, amount: parseFloat(form.amount), period: "monthly",
    }, { onConflict: "user_id,category,period" });
    if (error) return toast.error(error.message);
    toast.success("Orçamento salvo");
    setOpen(false); setForm({ category: "", amount: "" });
    qc.invalidateQueries({ queryKey: ["budgets"] });
  }

  async function remove(id: string) {
    await supabase.from("budgets").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["budgets"] });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <PageHeader title="Orçamentos" subtitle="Defina limites por categoria"
        action={<AddButton onClick={() => setOpen(true)} label="Novo" />} />

      {open && (
        <Card className="mb-4 border-[#63FF3B]/30">
          <div className="grid md:grid-cols-2 gap-3">
            <div><Label>Categoria</Label>
              <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                placeholder="Ex: Alimentação" className="bg-white/5 border-white/10" /></div>
            <div><Label>Limite mensal (R$)</Label>
              <Input type="number" step="0.01" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancelar</Button>
            <Button onClick={save} className="flex-1 bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">Salvar</Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {budgets.length === 0 && !open && (
          <Card className="md:col-span-2 text-center py-10">
            <PieChart className="h-8 w-8 mx-auto text-[#63FF3B] mb-2" />
            <p className="text-white/60">Nenhum orçamento definido.</p>
          </Card>
        )}
        {budgets.map((b) => {
          const spent = spentByCat[b.category] || 0;
          const limit = Number(b.amount);
          const pct = limit > 0 ? Math.min(100, (spent / limit) * 100) : 0;
          const over = spent > limit;
          return (
            <Card key={b.id}>
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold">{b.category}</h3>
                <button onClick={() => remove(b.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className={`text-2xl font-bold ${over ? "text-red-400" : "text-white"}`}>{fmtMoney(spent)}</p>
              <p className="text-xs text-white/60 mb-2">de {fmtMoney(limit)}</p>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className={`h-full ${over ? "bg-red-400" : "bg-[#63FF3B]"}`} style={{ width: `${pct}%` }} />
              </div>
              <p className={`text-xs mt-2 ${over ? "text-red-400" : "text-white/60"}`}>
                {over ? "Acima do limite!" : `${pct.toFixed(0)}% usado`}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
