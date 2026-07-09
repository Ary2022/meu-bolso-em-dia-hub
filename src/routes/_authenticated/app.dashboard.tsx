import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/app/AppShell";
import { fmtMoney, firstDayOfMonth, toISODate } from "@/lib/currency";
import {
  ArrowDownRight, ArrowUpRight, PiggyBank, ShieldCheck, CreditCard, Sparkles, Loader2, TrendingUp,
} from "lucide-react";
import { generateAiInsight } from "@/lib/ai.functions";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

export const Route = createFileRoute("/_authenticated/app/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Dashboard,
});

function useUserId() {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setId(data.user?.id ?? null)); }, []);
  return id;
}

function Dashboard() {
  const uid = useUserId();
  const monthStart = toISODate(firstDayOfMonth());

  const { data: txns = [] } = useQuery({
    queryKey: ["txns", "month", uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data, error } = await supabase.from("transactions")
        .select("*").gte("occurred_on", monthStart).order("occurred_on", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: reserve } = useQuery({
    queryKey: ["reserve", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("emergency_reserve").select("*").maybeSingle()).data,
  });

  const { data: debts = [] } = useQuery({
    queryKey: ["debts", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("debts").select("*").eq("status", "active")).data ?? [],
  });

  const income = txns.filter((t) => t.kind === "income").reduce((s, t) => s + Number(t.amount), 0);
  const expense = txns.filter((t) => t.kind === "expense").reduce((s, t) => s + Number(t.amount), 0);
  const balance = income - expense;
  const savingRate = income > 0 ? Math.max(0, Math.min(100, ((income - expense) / income) * 100)) : 0;
  const reservePct = reserve && Number(reserve.target_amount) > 0
    ? Math.min(100, (Number(reserve.current_amount) / Number(reserve.target_amount)) * 100) : 0;
  const debtsOpen = debts.reduce((s, d) => s + (Number(d.total_amount) - Number(d.paid_amount)), 0);

  const byCategory: Record<string, number> = {};
  txns.filter((t) => t.kind === "expense").forEach((t) => {
    const k = t.category || "Outros";
    byCategory[k] = (byCategory[k] || 0) + Number(t.amount);
  });
  const pieData = Object.entries(byCategory).map(([name, value]) => ({ name, value }));
  const COLORS = ["#63FF3B", "#22C55E", "#3B82F6", "#8B5CF6", "#F97316", "#EC4899", "#EAB308", "#94A3B8"];

  const days: Record<string, { income: number; expense: number }> = {};
  txns.forEach((t) => {
    days[t.occurred_on] = days[t.occurred_on] || { income: 0, expense: 0 };
    days[t.occurred_on][t.kind as "income" | "expense"] += Number(t.amount);
  });
  const barData = Object.entries(days).sort().slice(-14).map(([d, v]) => ({ d: d.slice(5), ...v }));

  const [insight, setInsight] = useState<string>("");
  const [loadingInsight, setLoadingInsight] = useState(false);

  async function fetchInsight() {
    setLoadingInsight(true);
    try {
      const res = await generateAiInsight({ data: {} });
      setInsight(res.insight);
    } catch {
      setInsight("Não foi possível gerar o insight agora. Tente novamente em instantes.");
    } finally {
      setLoadingInsight(false);
    }
  }

  useEffect(() => { if (uid && txns.length >= 0) fetchInsight(); /* eslint-disable-next-line */ }, [uid]);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <PageHeader title="Dashboard" subtitle="Visão geral do seu mês" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">Saldo do mês</span>
            <TrendingUp className="h-4 w-4 text-[#63FF3B]" />
          </div>
          <p className={`text-2xl font-bold ${balance >= 0 ? "text-[#63FF3B]" : "text-red-400"}`}>{fmtMoney(balance)}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">Receitas</span>
            <ArrowUpRight className="h-4 w-4 text-[#63FF3B]" />
          </div>
          <p className="text-2xl font-bold text-white">{fmtMoney(income)}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">Despesas</span>
            <ArrowDownRight className="h-4 w-4 text-red-400" />
          </div>
          <p className="text-2xl font-bold text-white">{fmtMoney(expense)}</p>
        </Card>
        <Card>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-white/60">Taxa de economia</span>
            <PiggyBank className="h-4 w-4 text-[#63FF3B]" />
          </div>
          <p className="text-2xl font-bold text-white">{savingRate.toFixed(0)}%</p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mt-4">
        <Card className="lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Fluxo diário (últimos 14 dias)</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="d" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Bar dataKey="income" fill="#63FF3B" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#EF4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold mb-2">Gastos por categoria</h3>
          <div className="h-64">
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2}>
                    {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{ background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.1)" }} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full grid place-items-center text-sm text-white/50">Sem despesas ainda</div>
            )}
          </div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="h-4 w-4 text-[#63FF3B]" /><h3 className="font-semibold">Reserva de emergência</h3>
          </div>
          <p className="text-sm text-white/60 mb-2">
            {fmtMoney(reserve?.current_amount ?? 0)} de {fmtMoney(reserve?.target_amount ?? 0)}
          </p>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#63FF3B]" style={{ width: `${reservePct}%` }} />
          </div>
          <p className="text-xs text-white/60 mt-2">{reservePct.toFixed(0)}% concluído</p>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <CreditCard className="h-4 w-4 text-red-400" /><h3 className="font-semibold">Dívidas em aberto</h3>
          </div>
          <p className="text-2xl font-bold text-red-400">{fmtMoney(debtsOpen)}</p>
          <p className="text-xs text-white/60 mt-2">{debts.length} dívida(s) ativa(s)</p>
        </Card>
      </div>

      <Card className="mt-4 border-[#63FF3B]/30">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl grid place-items-center bg-[#63FF3B]/15 border border-[#63FF3B]/40 shrink-0">
            <Sparkles className="h-5 w-5 text-[#63FF3B]" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold mb-1">Insight da IA</h3>
            {loadingInsight ? (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Loader2 className="h-4 w-4 animate-spin" /> Analisando seus lançamentos...
              </div>
            ) : (
              <p className="text-sm text-white/80 leading-relaxed">{insight || "Adicione lançamentos para receber insights personalizados."}</p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
