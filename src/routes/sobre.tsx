import { createFileRoute } from "@tanstack/react-router";
import { Compass, Target, Heart } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — Meu Bolso em Dia" },
      { name: "description", content: "Nossa missão é levar educação financeira simples, acessível e prática para pessoas que querem organizar a vida." },
      { property: "og:title", content: "Sobre o Meu Bolso em Dia" },
      { property: "og:description", content: "Missão, visão e valores do Meu Bolso em Dia." },
      { property: "og:url", content: "https://meubolsoemdia.com/sobre" },
    ],
    links: [{ rel: "canonical", href: "https://meubolsoemdia.com/sobre" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, dict } = useI18n();
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("about.title")}</h1>
      <p className="mt-5 text-lg text-muted-foreground">{t("about.intro")}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        <Card icon={Target} title={t("about.mission")} text={t("about.missionText")} />
        <Card icon={Compass} title={t("about.vision")} text={t("about.visionText")} />
      </div>

      <div className="mt-12 rounded-2xl border border-border gradient-card p-6 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent/15 text-accent"><Heart className="h-5 w-5" /></span>
          <h2 className="font-display text-xl font-bold text-foreground">{t("about.values")}</h2>
        </div>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {dict.about.valuesList.map(v => (
            <li key={v} className="rounded-lg bg-background/70 px-3 py-2 text-sm font-medium text-foreground">• {v}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Card({ icon: Icon, title, text }: { icon: React.ComponentType<{ className?: string }>; title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-soft">
      <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><Icon className="h-5 w-5" /></div>
      <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
    </div>
  );
}
