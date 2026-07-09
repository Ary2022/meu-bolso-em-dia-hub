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
import { Trash2, CreditCard, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/dividas")({
  head: () => ({ meta: [{ title: "Dívidas — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null)); }, []);

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ creditor: "", total_amount: "", paid_amount: "", interest_rate: "", due_date: "" });

  const { data: debts = [] } = useQuery({
    queryKey: ["debts-all", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("debts").select("*").order("created_at", { ascending: false })).data ?? [],
  });

  async function save() {
    if (!uid) return;
    const total = parseFloat(form.total_amount);
    if (!form.creditor || !total || total <= 0) return toast.error("Preencha credor e valor total");
    const { error } = await supabase.from("debts").insert({
      user_id: uid, creditor: form.creditor, total_amount: total,
      paid_amount: parseFloat(form.paid_amount) || 0,
      interest_rate: form.interest_rate ? parseFloat(form.interest_rate) : null,
      due_date: form.due_date || null,
    });
    if (error) return toast.error(error.message);
    toast.success("Dívida cadastrada");
    setOpen(false); setForm({ creditor: "", total_amount: "", paid_amount: "", interest_rate: "", due_date: "" });
    qc.invalidateQueries({ queryKey: ["debts-all"] });
  }

  async function pay(id: string, current: number, total: number) {
    const v = prompt("Valor pago (R$):"); if (!v) return;
    const p = parseFloat(v); if (isNaN(p) || p <= 0) return;
    const next = current + p;
    const status = next >= total ? "paid" : "active";
    await supabase.from("debts").update({ paid_amount: next, status }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["debts-all"] });
  }

  async function remove(id: string) {
    if (!confirm("Excluir?")) return;
    await supabase.from("debts").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["debts-all"] });
  }

  const totalOwed = debts.filter((d) => d.status === "active").reduce((s, d) => s + (Number(d.total_amount) - Number(d.paid_amount)), 0);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      <PageHeader title="Dívidas" subtitle={`Total em aberto: ${fmtMoney(totalOwed)}`}
        action={<AddButton onClick={() => setOpen(true)} label="Nova" />} />

      {open && (
        <Card className="mb-4 border-[#63FF3B]/30">
          <div className="grid md:grid-cols-2 gap-3">
            <div><Label>Credor</Label><Input value={form.creditor}
              onChange={(e) => setForm({ ...form, creditor: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div><Label>Total (R$)</Label><Input type="number" step="0.01" value={form.total_amount}
              onChange={(e) => setForm({ ...form, total_amount: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div><Label>Já pago (R$)</Label><Input type="number" step="0.01" value={form.paid_amount}
              onChange={(e) => setForm({ ...form, paid_amount: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div><Label>Juros (% a.m.)</Label><Input type="number" step="0.01" value={form.interest_rate}
              onChange={(e) => setForm({ ...form, interest_rate: e.target.value })} className="bg-white/5 border-white/10" /></div>
            <div className="md:col-span-2"><Label>Vencimento</Label><Input type="date" value={form.due_date}
              onChange={(e) => setForm({ ...form, due_date: e.target.value })} className="bg-white/5 border-white/10" /></div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancelar</Button>
            <Button onClick={save} className="flex-1 bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">Salvar</Button>
          </div>
        </Card>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {debts.length === 0 && !open && (
          <Card className="md:col-span-2 text-center py-10">
            <CreditCard className="h-8 w-8 mx-auto text-[#63FF3B] mb-2" />
            <p className="text-white/60">Nenhuma dívida cadastrada. Ótimo!</p>
          </Card>
        )}
        {debts.map((d) => {
          const paid = Number(d.paid_amount); const total = Number(d.total_amount);
          const pct = total > 0 ? (paid / total) * 100 : 0;
          const done = d.status === "paid";
          return (
            <Card key={d.id} className={done ? "opacity-60" : ""}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold flex items-center gap-2">
                    {d.creditor} {done && <CheckCircle2 className="h-4 w-4 text-[#63FF3B]" />}
                  </h3>
                  {d.due_date && <p className="text-xs text-white/50">vence {new Date(d.due_date).toLocaleDateString("pt-BR")}</p>}
                </div>
                <button onClick={() => remove(d.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <p className="text-2xl font-bold text-white">{fmtMoney(total - paid)}</p>
              <p className="text-xs text-white/60 mb-2">pago {fmtMoney(paid)} de {fmtMoney(total)}
                {d.interest_rate ? ` · ${d.interest_rate}% a.m.` : ""}</p>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-3">
                <div className="h-full bg-[#63FF3B]" style={{ width: `${pct}%` }} />
              </div>
              {!done && (
                <Button size="sm" onClick={() => pay(d.id, paid, total)}
                  className="w-full bg-[#63FF3B]/15 text-[#63FF3B] hover:bg-[#63FF3B]/25">Registrar pagamento</Button>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
