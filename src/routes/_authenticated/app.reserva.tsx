import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/app/AppShell";
import { fmtMoney } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShieldCheck, Plus, Minus } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/reserva")({
  head: () => ({ meta: [{ title: "Reserva — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const qc = useQueryClient();
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null)); }, []);

  const [target, setTarget] = useState("");
  const [monthly, setMonthly] = useState("");

  const { data: reserve } = useQuery({
    queryKey: ["reserve", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("emergency_reserve").select("*").maybeSingle()).data,
  });

  useEffect(() => {
    if (reserve) {
      setTarget(String(reserve.target_amount));
      setMonthly(String(reserve.monthly_contribution ?? 0));
    }
  }, [reserve]);

  async function saveTarget() {
    if (!uid) return;
    await supabase.from("emergency_reserve").upsert({
      user_id: uid,
      target_amount: parseFloat(target) || 0,
      current_amount: Number(reserve?.current_amount ?? 0),
      monthly_contribution: parseFloat(monthly) || 0,
    });
    toast.success("Configuração salva");
    qc.invalidateQueries({ queryKey: ["reserve"] });
  }

  async function contribute(delta: number) {
    if (!uid) return;
    const current = Number(reserve?.current_amount ?? 0);
    const next = Math.max(0, current + delta);
    await supabase.from("emergency_reserve").upsert({
      user_id: uid,
      target_amount: Number(reserve?.target_amount ?? 0),
      current_amount: next,
      monthly_contribution: Number(reserve?.monthly_contribution ?? 0),
    });
    qc.invalidateQueries({ queryKey: ["reserve"] });
  }

  const cur = Number(reserve?.current_amount ?? 0);
  const tgt = Number(reserve?.target_amount ?? 0);
  const pct = tgt > 0 ? Math.min(100, (cur / tgt) * 100) : 0;
  const monthsToGoal = monthly && parseFloat(monthly) > 0 ? Math.ceil((tgt - cur) / parseFloat(monthly)) : null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto">
      <PageHeader title="Reserva de emergência" subtitle="Segurança financeira para o inesperado" />

      <Card className="mb-4 text-center">
        <ShieldCheck className="h-10 w-10 mx-auto text-[#63FF3B] mb-3" />
        <p className="text-4xl font-bold text-[#63FF3B]">{fmtMoney(cur)}</p>
        <p className="text-sm text-white/60 mt-1">de {fmtMoney(tgt)}</p>
        <div className="h-3 rounded-full bg-white/10 overflow-hidden mt-4 max-w-md mx-auto">
          <div className="h-full bg-gradient-to-r from-[#63FF3B] to-[#22C55E]" style={{ width: `${pct}%` }} />
        </div>
        <p className="text-xs text-white/60 mt-2">{pct.toFixed(0)}% concluído
          {monthsToGoal !== null && monthsToGoal > 0 ? ` · ~${monthsToGoal} meses no ritmo atual` : ""}
        </p>

        <div className="grid grid-cols-3 gap-2 mt-6 max-w-sm mx-auto">
          <Button onClick={() => contribute(100)} variant="outline" className="gap-1"><Plus className="h-3 w-3" />100</Button>
          <Button onClick={() => contribute(500)} variant="outline" className="gap-1"><Plus className="h-3 w-3" />500</Button>
          <Button onClick={() => {
            const v = prompt("Valor:"); if (!v) return;
            const p = parseFloat(v); if (!isNaN(p)) contribute(p);
          }} variant="outline" className="gap-1"><Minus className="h-3 w-3" />Custom</Button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold mb-3">Configurar reserva</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div><Label>Meta (R$)</Label>
            <Input type="number" step="0.01" value={target} onChange={(e) => setTarget(e.target.value)}
              className="bg-white/5 border-white/10" /></div>
          <div><Label>Contribuição mensal (R$)</Label>
            <Input type="number" step="0.01" value={monthly} onChange={(e) => setMonthly(e.target.value)}
              className="bg-white/5 border-white/10" /></div>
        </div>
        <Button onClick={saveTarget} className="mt-4 w-full bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">Salvar</Button>
      </Card>
    </div>
  );
}
