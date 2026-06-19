import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de Privacidade — Meu Bolso em Dia" },
      { name: "description", content: "Como o Meu Bolso em Dia coleta, usa e protege seus dados." },
      { property: "og:title", content: "Política de Privacidade" },
      { property: "og:url", content: "/privacidade" },
    ],
    links: [{ rel: "canonical", href: "/privacidade" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const { dict, t } = useI18n();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("privacy.title")}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        {dict.privacy.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}
