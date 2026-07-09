import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader, AddButton } from "@/components/app/AppShell";
import { fmtMoney, fmtDate, toISODate } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Trash2, ArrowUpRight, ArrowDownRight, Search, Download } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/lancamentos")({
  head: () => ({ meta: [{ title: "Lançamentos — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

type Txn = { id: string; kind: "income" | "expense"; amount: number; category: string | null; description: string | null; occurred_on: string };

function Page() {
  const qc = useQueryClient();
  const [uid, setUid] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getUser().then(({ data }) => setUid(data.user?.id ?? null)); }, []);

  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    kind: "expense" as "income" | "expense",
    amount: "",
    category: "",
    description: "",
    occurred_on: toISODate(new Date()),
  });

  const { data: txns = [] } = useQuery({
    queryKey: ["txns", "all", uid],
    enabled: !!uid,
    queryFn: async () => {
      const { data } = await supabase.from("transactions").select("*").order("occurred_on", { ascending: false }).limit(500);
      return (data ?? []) as Txn[];
    },
  });
  const { data: categories = [] } = useQuery({
    queryKey: ["categories", uid], enabled: !!uid,
    queryFn: async () => (await supabase.from("categories").select("*").order("name")).data ?? [],
  });

  const filtered = txns.filter((t) => {
    if (filter !== "all" && t.kind !== filter) return false;
    if (q && !`${t.description ?? ""} ${t.category ?? ""}`.toLowerCase().includes(q.toLowerCase())) return false;
    return true;
  });

  async function save() {
    const amt = parseFloat(form.amount);
    if (!uid || !amt || amt <= 0) { toast.error("Informe um valor válido"); return; }
    const { error } = await supabase.from("transactions").insert({
      user_id: uid, kind: form.kind, amount: amt,
      category: form.category || null,
      description: form.description || null,
      occurred_on: form.occurred_on,
    });
    if (error) { toast.error(error.message); return; }
    toast.success("Lançamento criado");
    setOpen(false);
    setForm({ kind: "expense", amount: "", category: "", description: "", occurred_on: toISODate(new Date()) });
    qc.invalidateQueries({ queryKey: ["txns"] });
  }

  async function remove(id: string) {
    const { error } = await supabase.from("transactions").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Removido");
    qc.invalidateQueries({ queryKey: ["txns"] });
  }

  function exportCSV() {
    const rows = [["Data", "Tipo", "Categoria", "Descrição", "Valor"]];
    filtered.forEach((t) => rows.push([t.occurred_on, t.kind, t.category ?? "", t.description ?? "", String(t.amount)]));
    const csv = rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "lancamentos.csv"; a.click();
    URL.revokeObjectURL(url);
  }

  const kindCats = categories.filter((c) => c.kind === form.kind);

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <PageHeader title="Lançamentos" subtitle="Registre suas receitas e despesas"
        action={<AddButton onClick={() => setOpen(true)} label="Novo" />} />

      <Card className="mb-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input placeholder="Buscar..." value={q} onChange={(e) => setQ(e.target.value)}
              className="pl-9 bg-white/5 border-white/10 text-white" />
          </div>
          <Select value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
            <SelectTrigger className="w-40 bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="income">Receitas</SelectItem>
              <SelectItem value="expense">Despesas</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={exportCSV} variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" />CSV</Button>
        </div>
      </Card>

      {open && (
        <Card className="mb-4 border-[#63FF3B]/30">
          <div className="grid md:grid-cols-2 gap-3">
            <div>
              <Label>Tipo</Label>
              <Select value={form.kind} onValueChange={(v) => setForm({ ...form, kind: v as "income" | "expense", category: "" })}>
                <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="income">Receita</SelectItem>
                  <SelectItem value="expense">Despesa</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Valor (R$)</Label>
              <Input type="number" step="0.01" value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="bg-white/5 border-white/10" />
            </div>
            <div>
              <Label>Categoria</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger className="bg-white/5 border-white/10"><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {kindCats.map((c) => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Data</Label>
              <Input type="date" value={form.occurred_on}
                onChange={(e) => setForm({ ...form, occurred_on: e.target.value })}
                className="bg-white/5 border-white/10" />
            </div>
            <div className="md:col-span-2">
              <Label>Descrição</Label>
              <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="bg-white/5 border-white/10" />
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Cancelar</Button>
            <Button onClick={save} className="flex-1 bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">Salvar</Button>
          </div>
        </Card>
      )}

      <Card className="p-0 overflow-hidden">
        <div className="divide-y divide-white/5">
          {filtered.length === 0 && (
            <div className="p-8 text-center text-sm text-white/50">Nenhum lançamento ainda.</div>
          )}
          {filtered.map((t) => (
            <div key={t.id} className="flex items-center gap-3 p-4 hover:bg-white/[0.02]">
              <div className={`h-10 w-10 rounded-xl grid place-items-center ${
                t.kind === "income" ? "bg-[#63FF3B]/15 text-[#63FF3B]" : "bg-red-500/15 text-red-400"
              }`}>
                {t.kind === "income" ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{t.description || t.category || "Lançamento"}</p>
                <p className="text-xs text-white/50">{t.category} · {fmtDate(t.occurred_on)}</p>
              </div>
              <p className={`font-bold ${t.kind === "income" ? "text-[#63FF3B]" : "text-red-400"}`}>
                {t.kind === "income" ? "+" : "-"}{fmtMoney(Number(t.amount))}
              </p>
              <button onClick={() => remove(t.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-white/40 hover:text-red-400">
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
