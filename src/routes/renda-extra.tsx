import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Clock, Coins, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { INCOME_IDEAS } from "@/lib/content";

export const Route = createFileRoute("/renda-extra")({
  head: () => ({
    meta: [
      { title: "Ideias de Renda Extra — Meu Bolso em Dia" },
      { name: "description", content: "Ideias práticas de renda extra com investimento inicial, dificuldade, tempo necessário e primeiros passos." },
      { property: "og:title", content: "Ideias de Renda Extra" },
      { property: "og:description", content: "Inspirações para começar a ganhar mais com pouco investimento." },
      { property: "og:url", content: "/renda-extra" },
    ],
    links: [{ rel: "canonical", href: "/renda-extra" }],
  }),
  component: IncomePage,
});

function IncomePage() {
  const { t, lang, dict } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("income.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("income.subtitle")}</p>
      </header>

      <div className="mt-6 flex items-start gap-3 rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-foreground">
        <AlertTriangle className="h-5 w-5 shrink-0 text-warning" />
        <p>{t("income.disclaimer")}</p>
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {INCOME_IDEAS.map(idea => (
          <article key={idea.id} className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-4xl" aria-hidden>{idea.emoji}</span>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-semibold text-primary">
                {idea.category[lang]}
              </span>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-foreground">{idea.title[lang]}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{idea.description[lang]}</p>
            </div>
            <div className="grid gap-2 rounded-xl bg-muted/60 p-3 text-xs">
              <Row icon={Coins} label={t("income.investment")} value={idea.investment[lang]} />
              <Row icon={BarChart3} label={t("income.difficulty")} value={dict.income.levels[idea.difficulty]} />
              <Row icon={Clock} label={t("income.time")} value={idea.time[lang]} />
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">{t("income.firstSteps")}</p>
              <p className="mt-1 text-muted-foreground">{idea.firstSteps[lang]}</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold text-foreground">{t("income.care")}</p>
              <p className="mt-1 text-muted-foreground">{idea.care[lang]}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="inline-flex items-center gap-1.5 text-muted-foreground"><Icon className="h-3.5 w-3.5" /> {label}</span>
      <span className="font-semibold text-foreground">{value}</span>
    </div>
  );
}
