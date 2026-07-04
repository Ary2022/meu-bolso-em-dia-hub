import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "Perguntas Frequentes — Meu Bolso em Dia" },
      { name: "description", content: "Respostas para as principais dúvidas sobre o Meu Bolso em Dia." },
      { property: "og:title", content: "Perguntas Frequentes" },
      { property: "og:url", content: "https://meubolsoemdia.com/faq" },
    ],
    links: [{ rel: "canonical", href: "https://meubolsoemdia.com/faq" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [],
        }),
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { dict, t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("faq.title")}</h1>
      <div className="mt-8 space-y-2">
        {dict.faq.items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={i} className="rounded-xl border border-border bg-card shadow-soft">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-foreground">{item.q}</span>
                <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
              {isOpen && <div className="px-5 pb-5 text-sm text-muted-foreground">{item.a}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
