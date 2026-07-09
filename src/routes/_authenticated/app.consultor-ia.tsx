import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { chatWithAi } from "@/lib/ai.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/app/consultor-ia")({
  head: () => ({ meta: [{ title: "Consultor IA — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

type Msg = { role: "user" | "assistant"; content: string };

function Page() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Olá! Sou seu consultor financeiro. Posso te ajudar com dúvidas sobre orçamento, dívidas, metas e planejamento. O que quer conversar hoje?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  async function send() {
    const q = input.trim(); if (!q || loading) return;
    setInput(""); setLoading(true);
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    try {
      const res = await chatWithAi({ data: { messages: next } });
      setMessages([...next, { role: "assistant", content: res.reply }]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Erro ao consultar IA";
      toast.error(msg);
    } finally { setLoading(false); }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-3xl mx-auto flex flex-col h-[calc(100vh-3.5rem)] lg:h-screen">
      <PageHeader title="Consultor IA" subtitle="Tire dúvidas e receba orientação personalizada" />

      <Card className="flex-1 flex flex-col overflow-hidden p-0">
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m, i) => (
            <div key={i} className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}>
              {m.role === "assistant" && (
                <div className="h-8 w-8 rounded-xl bg-[#63FF3B]/15 border border-[#63FF3B]/40 grid place-items-center shrink-0">
                  <Sparkles className="h-4 w-4 text-[#63FF3B]" />
                </div>
              )}
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                m.role === "user" ? "bg-[#63FF3B] text-black" : "bg-white/5 text-white border border-white/10"
              }`}>{m.content}</div>
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="h-8 w-8 rounded-xl bg-[#63FF3B]/15 border border-[#63FF3B]/40 grid place-items-center">
                <Loader2 className="h-4 w-4 animate-spin text-[#63FF3B]" />
              </div>
              <div className="text-sm text-white/60 self-center">Analisando...</div>
            </div>
          )}
          <div ref={endRef} />
        </div>
        <form onSubmit={(e) => { e.preventDefault(); send(); }} className="border-t border-white/10 p-3 flex gap-2">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Pergunte algo..."
            className="bg-white/5 border-white/10 text-white" disabled={loading} />
          <Button type="submit" disabled={loading} className="bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </Card>
    </div>
  );
}
