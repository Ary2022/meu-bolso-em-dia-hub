import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/app/AppShell";
import { fmtMoney } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Download, FileJson, FileText, Printer } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/_authenticated/app/relatorios")({
  head: () => ({ meta: [{ title: "Relatórios — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null)); }, []);

  const { data: txns = [] } = useQuery({
    queryKey: ["txns-all", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("transactions").select("*").order("occurred_on", { ascending: true })).data ?? [],
  });

  const byMonth: Record<string, { m: string; income: number; expense: number }> = {};
  txns.forEach((t) => {
    const m = t.occurred_on.slice(0, 7);
    byMonth[m] = byMonth[m] || { m, income: 0, expense: 0 };
    byMonth[m][t.kind as "income" | "expense"] += Number(t.amount);
  });
  const monthly = Object.values(byMonth);

  const totalIn = txns.filter((t) => t.kind === "income").reduce((s, t) => s + Number(t.amount), 0);
  const totalOut = txns.filter((t) => t.kind === "expense").reduce((s, t) => s + Number(t.amount), 0);

  function exportJSON() {
    const blob = new Blob([JSON.stringify(txns, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "meubolso-lancamentos.json"; a.click();
  }
  function exportCSV() {
    const rows = [["Data", "Tipo", "Categoria", "Descrição", "Valor"]];
    txns.forEach((t) => rows.push([t.occurred_on, t.kind, t.category ?? "", t.description ?? "", String(t.amount)]));
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = "meubolso-lancamentos.csv"; a.click();
  }
  function printPDF() { window.print(); }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <PageHeader title="Relatórios" subtitle="Análise completa do seu histórico" />

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <Button onClick={exportCSV} variant="outline" className="gap-2"><FileText className="h-4 w-4" />Exportar CSV</Button>
        <Button onClick={exportJSON} variant="outline" className="gap-2"><FileJson className="h-4 w-4" />Exportar JSON</Button>
        <Button onClick={printPDF} variant="outline" className="gap-2"><Printer className="h-4 w-4" />Gerar PDF</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <Card><p className="text-xs text-white/60">Total de receitas</p><p className="text-2xl font-bold text-[#63FF3B]">{fmtMoney(totalIn)}</p></Card>
        <Card><p className="text-xs text-white/60">Total de despesas</p><p className="text-2xl font-bold text-red-400">{fmtMoney(totalOut)}</p></Card>
        <Card><p className="text-xs text-white/60">Saldo acumulado</p>
          <p className={`text-2xl font-bold ${totalIn - totalOut >= 0 ? "text-[#63FF3B]" : "text-red-400"}`}>{fmtMoney(totalIn - totalOut)}</p></Card>
      </div>

      <Card>
        <h3 className="font-semibold mb-3">Evolução mensal</h3>
        <div className="h-80">
          {monthly.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={11} />
                <Tooltip contentStyle={{ background: "#0B0B0B", border: "1px solid rgba(255,255,255,0.1)" }} />
                <Legend />
                <Line type="monotone" dataKey="income" stroke="#63FF3B" strokeWidth={2} />
                <Line type="monotone" dataKey="expense" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full grid place-items-center text-sm text-white/50">Sem dados ainda.</div>
          )}
        </div>
      </Card>
    </div>
  );
}
