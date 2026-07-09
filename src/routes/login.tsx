import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Wallet, ArrowLeft } from "lucide-react";

type Search = { redirect?: string };

export const Route = createFileRoute("/login")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    redirect: typeof s.redirect === "string" ? s.redirect : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Entrar — Meu Bolso em Dia IA" },
      { name: "description", content: "Acesse sua conta do app Meu Bolso em Dia IA." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const { redirect } = Route.useSearch();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const dest = redirect && redirect.startsWith("/") ? redirect : "/app";

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) nav({ to: dest, replace: true });
    });
  }, [dest, nav]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/app`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast({ title: "Conta criada!", description: "Bem-vindo(a) ao Meu Bolso em Dia IA." });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      nav({ to: dest, replace: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro ao autenticar";
      toast({ title: "Ops", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#0B0B0B] via-[#0f1a12] to-[#0B0B0B]">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Voltar ao site
        </Link>
        <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-11 w-11 rounded-2xl grid place-items-center bg-[#63FF3B]/15 border border-[#63FF3B]/40">
              <Wallet className="h-5 w-5 text-[#63FF3B]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">Meu Bolso em Dia IA</h1>
              <p className="text-xs text-white/60">
                {mode === "signin" ? "Entre para acessar seu app" : "Crie sua conta grátis"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <Label htmlFor="name" className="text-white/80">Nome</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Seu nome"
                  className="bg-white/5 border-white/15 text-white" required />
              </div>
            )}
            <div>
              <Label htmlFor="email" className="text-white/80">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/15 text-white" required autoComplete="email" />
            </div>
            <div>
              <Label htmlFor="pw" className="text-white/80">Senha</Label>
              <Input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                minLength={6} className="bg-white/5 border-white/15 text-white" required
                autoComplete={mode === "signup" ? "new-password" : "current-password"} />
            </div>
            <Button type="submit" disabled={loading}
              className="w-full bg-[#63FF3B] text-black hover:bg-[#63FF3B]/90 font-bold">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> :
                mode === "signin" ? "Entrar" : "Criar conta"}
            </Button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-6 w-full text-sm text-white/70 hover:text-white"
          >
            {mode === "signin" ? "Não tem conta? Cadastre-se" : "Já tem conta? Entrar"}
          </button>
        </div>
      </div>
    </div>
  );
}
