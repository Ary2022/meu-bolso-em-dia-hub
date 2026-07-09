import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/perfil")({
  head: () => ({ meta: [{ title: "Perfil — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const [uid, setUid] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [income, setIncome] = useState("");
  const [goal, setGoal] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      setUid(data.user.id); setEmail(data.user.email ?? "");
      const { data: p } = await supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
      if (p) {
        setFullName(p.full_name ?? "");
        setIncome(p.monthly_income ? String(p.monthly_income) : "");
        setGoal(p.financial_goal ?? "");
      }
      setLoading(false);
    })();
  }, []);

  async function save() {
    if (!uid) return;
    const { error } = await supabase.from("profiles").update({
      full_name: fullName || null,
      monthly_income: income ? parseFloat(income) : null,
      financial_goal: goal || null,
    }).eq("id", uid);
    if (error) return toast.error(error.message);
    toast.success("Perfil atualizado");
  }

  if (loading) return <div className="p-10 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-[#63FF3B]" /></div>;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
      <PageHeader title="Perfil" subtitle="Seus dados pessoais" />
      <Card>
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-2xl bg-[#63FF3B]/15 border border-[#63FF3B]/40 grid place-items-center">
            <User className="h-7 w-7 text-[#63FF3B]" />
          </div>
          <div>
            <p className="font-bold">{fullName || "Usuário"}</p>
            <p className="text-sm text-white/60">{email}</p>
          </div>
        </div>
        <div className="space-y-3">
          <div><Label>Nome</Label><Input value={fullName} onChange={(e) => setFullName(e.target.value)}
            className="bg-white/5 border-white/10" /></div>
          <div><Label>Renda mensal (R$)</Label><Input type="number" step="0.01" value={income}
            onChange={(e) => setIncome(e.target.value)} className="bg-white/5 border-white/10" /></div>
          <div><Label>Objetivo financeiro</Label><Input value={goal} onChange={(e) => setGoal(e.target.value)}
            className="bg-white/5 border-white/10" /></div>
        </div>
        <Button onClick={save} className="mt-4 w-full bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">Salvar</Button>
      </Card>
    </div>
  );
}
