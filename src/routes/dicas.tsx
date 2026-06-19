import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useMemo, useState } from "react";
import { Clock, Filter } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { ARTICLES, CATEGORIES } from "@/lib/content";
import { SponsorInlineCard } from "@/components/site/Sponsors";

export const Route = createFileRoute("/dicas")({
  head: () => ({
    meta: [
      { title: "Dicas e artigos — Meu Bolso em Dia" },
      { name: "description", content: "Artigos curtos e práticos para poupar, controlar gastos, sair das dívidas e criar renda extra." },
      { property: "og:title", content: "Dicas e artigos de educação financeira" },
      { property: "og:description", content: "Conteúdo curto e prático para colocar seu bolso em dia." },
      { property: "og:url", content: "/dicas" },
    ],
    links: [{ rel: "canonical", href: "/dicas" }],
  }),
  component: TipsPage,
});

function TipsPage() {
  const { t, lang, dict } = useI18n();
  const [cat, setCat] = useState<string>("all");

  const categories = Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[];
  const filtered = useMemo(
    () => (cat === "all" ? ARTICLES : ARTICLES.filter(a => a.category === cat)),
    [cat]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("tips.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("tips.subtitle")}</p>
      </header>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground"><Filter className="h-3.5 w-3.5" /></span>
        <button
          onClick={() => setCat("all")}
          className={`rounded-full px-3 py-1.5 text-xs font-medium border ${cat === "all" ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-secondary"}`}
        >
          {lang === "en" ? "All" : lang === "es" ? "Todas" : "Todas"}
        </button>
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={`rounded-full px-3 py-1.5 text-xs font-medium border ${cat === c ? "bg-primary text-primary-foreground border-primary" : "bg-card text-foreground border-border hover:bg-secondary"}`}
          >
            {dict.tips.categories[c]}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a, idx) => (
          <Fragment key={a.slug}>
            <article className="flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-soft transition-transform hover:-translate-y-0.5">
              <div className="relative h-40 gradient-hero flex items-center justify-center text-5xl">
                <span aria-hidden>{a.emoji}</span>
                <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-primary">
                  {dict.tips.categories[a.category]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-lg font-semibold text-foreground">{a.title[lang]}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{a.summary[lang]}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {a.readMinutes} {t("tips.minutes")}</span>
                  <button className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground hover:bg-secondary/80">
                    {t("tips.readMore")} →
                  </button>
                </div>
              </div>
            </article>
            {idx === 2 && (
              <div className="sm:col-span-2 lg:col-span-3">
                <SponsorInlineCard placement="articles" />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
