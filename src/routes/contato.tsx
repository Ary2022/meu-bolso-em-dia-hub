import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Mail, MessageCircle, Instagram, CheckCircle2, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Meu Bolso em Dia" },
      { name: "description", content: "Fale com a equipe Meu Bolso em Dia: dúvidas, parcerias e patrocínios." },
      { property: "og:title", content: "Contato — Meu Bolso em Dia" },
      { property: "og:description", content: "Tire dúvidas, envie sugestões ou converse sobre parcerias." },
      { property: "og:url", content: "/contato" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  subject: z.string().trim().min(2).max(140),
  message: z.string().trim().min(5).max(2000),
});

function ContactPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      subject: String(fd.get("subject") || ""),
      message: String(fd.get("message") || ""),
    });
    if (!parsed.success) { setStatus("error"); setErrorMsg(parsed.error.issues[0]?.message ?? "Erro"); return; }
    // Compose mailto fallback (no backend email needed)
    const body = `${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`;
    const url = `mailto:contato@meubolsoemdia.com.br?subject=${encodeURIComponent(parsed.data.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("contact.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("contact.subtitle")}</p>
      </header>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <form onSubmit={onSubmit} className="rounded-2xl border border-border bg-card p-6 shadow-soft" noValidate>
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="name" required maxLength={120} placeholder={t("contact.name")}
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
            <input name="email" type="email" required maxLength={254} placeholder={t("contact.email")}
              className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <input name="subject" required maxLength={140} placeholder={t("contact.subject")}
            className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          <textarea name="message" required maxLength={2000} placeholder={t("contact.message")}
            rows={6}
            className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring" />
          {status === "error" && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mt-0.5" /><span>{errorMsg}</span>
            </div>
          )}
          {status === "success" && (
            <div className="mt-3 flex items-start gap-2 rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-foreground">
              <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent" /><span>{t("contact.success")}</span>
            </div>
          )}
          <button type="submit" className="mt-4 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-soft">
            {t("contact.submit")}
          </button>
        </form>

        <aside className="space-y-3">
          <h2 className="font-display text-lg font-semibold text-foreground">{t("contact.channels")}</h2>
          <a href="mailto:contato@meubolsoemdia.com.br" className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-secondary">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary"><Mail className="h-5 w-5" /></span>
            <div>
              <div className="text-xs text-muted-foreground">{t("contact.emailContact")}</div>
              <div className="text-sm font-semibold">contato@meubolsoemdia.com.br</div>
            </div>
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-secondary">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-accent/15 text-accent"><MessageCircle className="h-5 w-5" /></span>
            <div>
              <div className="text-xs text-muted-foreground">{t("contact.whatsapp")}</div>
              <div className="text-sm font-semibold">{t("contactExtra.quickMessage")}</div>
            </div>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 hover:bg-secondary">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-warning/15 text-warning"><Instagram className="h-5 w-5" /></span>
            <div>
              <div className="text-xs text-muted-foreground">{t("contact.instagram")}</div>
              <div className="text-sm font-semibold">@meubolsoemdia</div>
            </div>
          </a>
        </aside>
      </div>
    </div>
  );
}
