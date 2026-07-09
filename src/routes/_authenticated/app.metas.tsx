import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader, AddButton } from "@/components/app/AppShell";
import { fmtMoney } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Target, Trash2, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/metas")({
  head: () => ({ meta: [{ title: "Metas — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null)); }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", target_amount: "", target_date: "" });

  const { data: goals = [] } = useQuery({
    queryKey: ["goals", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("goals").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  async function save() {
    if (!uid) return;
    const target = parseFloat(form.target_amount);
    if (!form.title || !target || target <= 0) return toast.error("Preencha título e valor alvo");
    const { error } = await supabase.from("goals").insert({
      user_id: uid, title: form.title, target_amount: target,
      target_date: form.target_date || null,
    });
    if (error) return toast.error(error.message);
    toast.success("Meta criada");
    setOpen(false); setForm({ title: "", target_amount: "", target_date: "" });
    qc.invalidateQueries({ queryKey: ["goals"] });
  }

  async function contribute(id: string, current: number, delta: number) {
    const next = Math.max(0, current + delta);
    const { error } = await supabase.from("goals").update({ current_amount: next }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["goals"] });
  }

  async function remove(id: string) {
    if (!confirm("Excluir esta meta?")) return;
    await supabase.from("goals").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["goals"] });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <PageHeader title="Metas financeiras" subtitle="Planeje e conquiste seus sonhos"
        action={<AddButton onClick={() => setOpen(true)} label="Nova meta" />} />

      {open && (
        <Card className="mb-4 border-[#63FF3B]/30">
          <div className="grid md:grid-cols-3 gap-3">
            <div className="md:col-span-2"><Label>Título</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex: Viagem, Carro..." className="bg-white/5 border-white/10" /></div>
            <div><Label>Valor alvo (R$)</Label>
              <Input type="number" step="0.01" value={form.target_amount}
                onChange={(e) => setForm({ ...form, target_amount: e.target.value })}
                className="bg-white/5 border-white/10" /></div>
            <div><Label>Data alvo (opcional)</Label>
              <Input type="date" value={form.target_date}
                onChange={(e) => setForm({ ...form, target_date: e.target.value })}
                className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancelar</Button>
            <Button onClick={save} className="flex-1 bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">Criar</Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {goals.length === 0 && !open && (
          <Card className="md:col-span-2 text-center py-10">
            <Target className="h-8 w-8 mx-auto text-[#63FF3B] mb-2" />
            <p className="text-white/60">Nenhuma meta ainda. Crie a primeira!</p>
          </Card>
        )}
        {goals.map((g) => {
          const cur = Number(g.current_amount); const tgt = Number(g.target_amount);
          const pct = tgt > 0 ? Math.min(100, (cur / tgt) * 100) : 0;
          return (
            <Card key={g.id}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold">{g.title}</h3>
                  {g.target_date && <p className="text-xs text-white/50">até {new Date(g.target_date).toLocaleDateString("pt-BR")}</p>}
                </div>
                <button onClick={() => remove(g.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-2xl font-bold text-[#63FF3B]">{fmtMoney(cur)}</p>
              <p className="text-xs text-white/60 mb-2">de {fmtMoney(tgt)}</p>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                <div className="h-full bg-gradient-to-r from-[#63FF3B] to-[#22C55E]" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-white/60 mb-3">{pct.toFixed(0)}% concluído</p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => contribute(g.id, cur, 50)}
                  className="flex-1 gap-1"><Plus className="h-3 w-3" />R$ 50</Button>
                <Button size="sm" variant="outline" onClick={() => contribute(g.id, cur, 100)}
                  className="flex-1 gap-1"><Plus className="h-3 w-3" />R$ 100</Button>
                <Button size="sm" variant="outline" onClick={() => {
                  const v = prompt("Valor (use negativo para retirar):"); if (!v) return;
                  const d = parseFloat(v); if (!isNaN(d)) contribute(g.id, cur, d);
                }} className="gap-1"><Minus className="h-3 w-3" />Custom</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
