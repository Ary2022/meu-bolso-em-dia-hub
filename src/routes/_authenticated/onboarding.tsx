import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Sparkles } from "lucide-react";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({ meta: [{ title: "Configuração inicial" }, { name: "robots", content: "noindex" }] }),
  component: Onboarding,
});

function Onboarding() {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [income, setIncome] = useState<string>("");
  const [goal, setGoal] = useState("");
  const [reserveTarget, setReserveTarget] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setUserId(data.user.id);
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).maybeSingle();
      if (profile?.onboarding_completed) {
        nav({ to: "/app/dashboard", replace: true });
      } else if (profile?.full_name) {
        setName(profile.full_name);
      }
    });
  }, [nav]);

  async function finish() {
    if (!userId) return;
    setLoading(true);
    try {
      const incomeN = income ? parseFloat(income) : null;
      const reserveN = reserveTarget ? parseFloat(reserveTarget) : 0;
      const { error: e1 } = await supabase.from("profiles").update({
        full_name: name || null,
        monthly_income: incomeN,
        financial_goal: goal || null,
        onboarding_completed: true,
      }).eq("id", userId);
      if (e1) throw e1;
      if (reserveN > 0) {
        await supabase.from("emergency_reserve").upsert({
          user_id: userId,
          target_amount: reserveN,
          current_amount: 0,
        });
      }
      // Seed default categories
      const defaults = [
        { name: "Salário", kind: "income" as const, color: "#63FF3B" },
        { name: "Renda extra", kind: "income" as const, color: "#22C55E" },
        { name: "Alimentação", kind: "expense" as const, color: "#F97316" },
        { name: "Moradia", kind: "expense" as const, color: "#3B82F6" },
        { name: "Transporte", kind: "expense" as const, color: "#8B5CF6" },
        { name: "Lazer", kind: "expense" as const, color: "#EC4899" },
        { name: "Saúde", kind: "expense" as const, color: "#EF4444" },
        { name: "Outros", kind: "expense" as const, color: "#94A3B8" },
      ];
      await supabase.from("categories").insert(defaults.map((c) => ({ ...c, user_id: userId })));

      toast({ title: "Tudo pronto!", description: "Bem-vindo(a) ao seu app." });
      nav({ to: "/app/dashboard", replace: true });
    } catch (err) {
      toast({ title: "Erro", description: err instanceof Error ? err.message : "Tente novamente", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0B0B0B] via-[#0f1a12] to-[#0B0B0B]">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-2xl grid place-items-center bg-[#63FF3B]/15 border border-[#63FF3B]/40">
            <Sparkles className="h-5 w-5 text-[#63FF3B]" />
          </div>
          <div>
            <p className="text-xs text-white/60">Passo {step} de 3</p>
            <h1 className="text-lg font-bold text-white">Vamos personalizar seu app</h1>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Como podemos te chamar?</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome"
                className="bg-white/5 border-white/15 text-white" />
            </div>
            <Button onClick={() => setStep(2)} className="w-full bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90">Continuar</Button>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Qual sua renda mensal aproximada? (R$)</Label>
              <Input type="number" step="0.01" value={income} onChange={(e) => setIncome(e.target.value)}
                placeholder="Ex: 3500" className="bg-white/5 border-white/15 text-white" />
            </div>
            <div>
              <Label className="text-white/80">Qual seu principal objetivo financeiro?</Label>
              <Input value={goal} onChange={(e) => setGoal(e.target.value)}
                placeholder="Ex: Sair das dívidas, comprar um carro..." className="bg-white/5 border-white/15 text-white" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Voltar</Button>
              <Button onClick={() => setStep(3)} className="flex-1 bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90">Continuar</Button>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div>
              <Label className="text-white/80">Meta de reserva de emergência (R$)</Label>
              <Input type="number" step="0.01" value={reserveTarget} onChange={(e) => setReserveTarget(e.target.value)}
                placeholder="Sugestão: 6× despesas mensais" className="bg-white/5 border-white/15 text-white" />
              <p className="text-xs text-white/50 mt-1">Você pode ajustar depois nas configurações.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Voltar</Button>
              <Button onClick={finish} disabled={loading}
                className="flex-1 bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Concluir"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
