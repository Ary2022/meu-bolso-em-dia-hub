import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/app/AppShell";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useTheme } from "@/lib/theme";
import { useI18n } from "@/lib/i18n";
import { LogOut } from "lucide-react";

export const Route = createFileRoute("/_authenticated/app/configuracoes")({
  head: () => ({ meta: [{ title: "Configurações — Meu Bolso em Dia IA" }, { name: "robots", content: "noindex" }] }),
  component: Page,
});

function Page() {
  const nav = useNavigate();
  const { theme, setTheme } = useTheme();
  const { lang, setLang } = useI18n();
  const [uid, setUid] = useState<string | null>(null);
  const [currency, setCurrency] = useState("BRL");

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) return;
      setUid(data.user.id);
      const { data: p } = await supabase.from("profiles").select("currency").eq("id", data.user.id).maybeSingle();
      if (p?.currency) setCurrency(p.currency);
    })();
  }, []);

  async function saveCurrency(v: string) {
    setCurrency(v);
    if (uid) await supabase.from("profiles").update({ currency: v }).eq("id", uid);
    toast.success("Moeda atualizada");
  }

  async function signOut() {
    await supabase.auth.signOut();
    nav({ to: "/login", replace: true });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto space-y-4">
      <PageHeader title="Configurações" subtitle="Ajuste seu app" />
      <Card>
        <h3 className="font-semibold mb-3">Aparência</h3>
        <Label>Tema</Label>
        <Select value={theme} onValueChange={(v) => setTheme(v as "light" | "dark")}>
          <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Escuro</SelectItem>
            <SelectItem value="light">Claro</SelectItem>
          </SelectContent>
        </Select>
      </Card>
      <Card>
        <h3 className="font-semibold mb-3">Idioma</h3>
        <Select value={lang} onValueChange={(v) => setLang(v as "pt-BR" | "en" | "es")}>
          <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pt-BR">Português</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="es">Español</SelectItem>
          </SelectContent>
        </Select>
      </Card>
      <Card>
        <h3 className="font-semibold mb-3">Moeda</h3>
        <Select value={currency} onValueChange={saveCurrency}>
          <SelectTrigger className="bg-white/5 border-white/10"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="BRL">Real (R$)</SelectItem>
            <SelectItem value="USD">Dólar (US$)</SelectItem>
            <SelectItem value="EUR">Euro (€)</SelectItem>
          </SelectContent>
        </Select>
      </Card>
      <Card>
        <h3 className="font-semibold mb-3">Conta</h3>
        <Button onClick={signOut} variant="outline" className="w-full gap-2">
          <LogOut className="h-4 w-4" /> Sair da conta
        </Button>
      </Card>
    </div>
  );
}
