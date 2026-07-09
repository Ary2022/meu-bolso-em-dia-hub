import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { generateText } from "ai";
import { z } from "zod";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

const MODEL = "google/gemini-2.5-flash";

async function fetchUserContext(supabase: ReturnType<typeof buildCtxShim>) {
  return null as never;
}
function buildCtxShim() { return null as never; }

export const generateAiInsight = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const { supabase } = context;
    const monthStart = new Date();
    monthStart.setDate(1);
    const iso = monthStart.toISOString().slice(0, 10);
    const { data: txns } = await supabase.from("transactions")
      .select("kind,amount,category,occurred_on").gte("occurred_on", iso).limit(200);
    const { data: profile } = await supabase.from("profiles").select("full_name,monthly_income,financial_goal").maybeSingle();

    if (!txns || txns.length === 0) {
      return { insight: "Adicione seus primeiros lançamentos para receber análises personalizadas com base nos seus gastos reais." };
    }

    const income = txns.filter((t) => t.kind === "income").reduce((s, t) => s + Number(t.amount), 0);
    const expense = txns.filter((t) => t.kind === "expense").reduce((s, t) => s + Number(t.amount), 0);
    const byCat: Record<string, number> = {};
    txns.filter((t) => t.kind === "expense").forEach((t) => {
      const k = t.category || "Outros";
      byCat[k] = (byCat[k] || 0) + Number(t.amount);
    });
    const top = Object.entries(byCat).sort((a, b) => b[1] - a[1]).slice(0, 3);

    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway(MODEL),
      system: "Você é um consultor financeiro brasileiro. Dê UM insight curto (máx. 2 frases), acionável e motivador. Sem recomendação direta de investimento. Use tom próximo, em português do Brasil.",
      prompt: `Dados do mês atual do usuário:
- Receita: R$ ${income.toFixed(2)}
- Despesas: R$ ${expense.toFixed(2)}
- Saldo: R$ ${(income - expense).toFixed(2)}
- Top categorias: ${top.map(([k, v]) => `${k} R$ ${v.toFixed(2)}`).join(", ") || "n/a"}
- Objetivo: ${profile?.financial_goal ?? "não informado"}

Dê UM insight único e prático baseado nesses dados.`,
    });
    return { insight: text.trim() };
  });

const ChatInput = z.object({
  messages: z.array(z.object({
    role: z.enum(["user", "assistant"]),
    content: z.string(),
  })).min(1).max(30),
});

export const chatWithAi = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => ChatInput.parse(input))
  .handler(async ({ data, context }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) throw new Error("Missing LOVABLE_API_KEY");
    const { supabase } = context;

    // Snapshot financeiro
    const monthStart = new Date(); monthStart.setDate(1);
    const iso = monthStart.toISOString().slice(0, 10);
    const [{ data: txns }, { data: profile }, { data: goals }, { data: debts }, { data: reserve }] = await Promise.all([
      supabase.from("transactions").select("kind,amount,category").gte("occurred_on", iso).limit(200),
      supabase.from("profiles").select("full_name,monthly_income,financial_goal,currency").maybeSingle(),
      supabase.from("goals").select("title,target_amount,current_amount"),
      supabase.from("debts").select("creditor,total_amount,paid_amount,status").eq("status", "active"),
      supabase.from("emergency_reserve").select("target_amount,current_amount").maybeSingle(),
    ]);
    const income = (txns ?? []).filter((t) => t.kind === "income").reduce((s, t) => s + Number(t.amount), 0);
    const expense = (txns ?? []).filter((t) => t.kind === "expense").reduce((s, t) => s + Number(t.amount), 0);

    const summary = `Contexto financeiro do usuário (mês atual):
- Nome: ${profile?.full_name ?? "n/a"}
- Renda mensal declarada: R$ ${profile?.monthly_income ?? "n/a"}
- Receitas do mês: R$ ${income.toFixed(2)}
- Despesas do mês: R$ ${expense.toFixed(2)}
- Objetivo: ${profile?.financial_goal ?? "n/a"}
- Metas: ${(goals ?? []).map((g) => `${g.title} (R$ ${g.current_amount}/${g.target_amount})`).join("; ") || "nenhuma"}
- Dívidas ativas: ${(debts ?? []).map((d) => `${d.creditor} (R$ ${Number(d.total_amount) - Number(d.paid_amount)} em aberto)`).join("; ") || "nenhuma"}
- Reserva: R$ ${reserve?.current_amount ?? 0} de R$ ${reserve?.target_amount ?? 0}`;

    const gateway = createLovableAiGatewayProvider(key);
    const { text } = await generateText({
      model: gateway(MODEL),
      system: `Você é um consultor financeiro brasileiro, próximo, claro e motivador. Ajude com orçamento, dívidas, metas e planejamento. NUNCA recomende investimentos específicos ou prometa lucro. Responda em português do Brasil, direto e prático. Máximo 5 frases quando possível.

${summary}`,
      messages: data.messages.map((m) => ({ role: m.role, content: m.content })),
    });

    return { reply: text.trim() };
  });
