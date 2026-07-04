import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos de Uso — Meu Bolso em Dia" },
      { name: "description", content: "Termos de uso do portal Meu Bolso em Dia." },
      { property: "og:title", content: "Termos de Uso" },
      { property: "og:url", content: "https://meubolsoemdia.com/termos" },
    ],
    links: [{ rel: "canonical", href: "https://meubolsoemdia.com/termos" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  const { dict, t } = useI18n();
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("terms.title")}</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
        {dict.terms.body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
    </article>
  );
}
