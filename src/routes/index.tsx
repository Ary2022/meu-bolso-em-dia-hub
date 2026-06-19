import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Sparkles, Smartphone, TrendingUp, PiggyBank, Target, Wallet, Receipt, GraduationCap } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LeadForm } from "@/components/site/LeadForm";
import { SponsorBanner } from "@/components/site/Sponsors";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meu Bolso em Dia — Educação Financeira, Renda Extra e Dicas para Poupar" },
      { name: "description", content: "Organize seu dinheiro, poupe mais e crie renda extra com dicas simples e práticas em português, inglês e espanhol." },
      { property: "og:title", content: "Meu Bolso em Dia — Educação Financeira" },
      { property: "og:description", content: "Dicas, livros e ferramentas para colocar seu bolso em dia." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  const { t, dict } = useI18n();
  const benefitItems = [
    { key: "spend", icon: Receipt },
    { key: "save", icon: PiggyBank },
    { key: "debt", icon: Wallet },
    { key: "extra", icon: TrendingUp },
    { key: "goals", icon: Target },
    { key: "books", icon: BookOpen },
  ] as const;

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 gradient-hero opacity-[0.08]" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
              <Sparkles className="h-3.5 w-3.5" /> {t("hero.badge")}
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">{t("hero.subtitle")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#lead" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-accent-foreground shadow-glow hover:opacity-95">
                {t("hero.ctaPrimary")} <ArrowRight className="h-4 w-4" />
              </a>
              <Link to="/livros" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft hover:opacity-90">
                {t("hero.ctaSecondary")}
              </Link>
              <a href="https://app.meubolsoemdia.com.br" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary">
                <Smartphone className="h-4 w-4" /> {t("hero.ctaApp")}
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="gradient-card relative rounded-3xl border border-border p-6 shadow-soft">
              <div className="grid gap-3 sm:grid-cols-2">
                <Stat icon={PiggyBank} label="Poupança" value="+R$ 4.820" tint="accent" />
                <Stat icon={TrendingUp} label="Renda extra" value="+R$ 1.250" tint="primary" />
                <Stat icon={Receipt} label="Gastos" value="-12%" tint="warning" />
                <Stat icon={Target} label="Meta" value="83%" tint="accent" />
              </div>
              <div className="mt-5 rounded-2xl border border-border bg-background/60 p-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Orçamento mensal</span>
                  <span>R$ 5.400 / R$ 6.500</span>
                </div>
                <div className="mt-2 h-2 w-full rounded-full bg-secondary">
                  <div className="h-2 rounded-full gradient-hero" style={{ width: "83%" }} />
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px]">
                  {["Casa", "Lazer", "Educação"].map(l => (
                    <div key={l} className="rounded-lg bg-muted px-2 py-2">
                      <div className="font-semibold text-foreground">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="pointer-events-none absolute -bottom-6 -right-6 -z-10 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -top-6 -left-6 -z-10 h-40 w-40 rounded-full bg-primary/30 blur-3xl" />
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">{t("benefits.title")}</h2>
          <p className="mt-3 text-muted-foreground">{t("benefits.subtitle")}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefitItems.map(({ key, icon: Icon }) => {
            const item = dict.benefits.items[key];
            return (
              <article key={key} className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition-transform hover:-translate-y-0.5">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Sponsor banner (home) */}
      <SponsorBanner placement="home" />

      {/* Lead capture */}
      <section id="lead" className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-8 rounded-3xl border border-border gradient-card p-6 sm:p-10 lg:grid-cols-[1.2fr_1fr] shadow-soft">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <GraduationCap className="h-3.5 w-3.5" /> Newsletter
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold text-foreground sm:text-4xl text-balance">{t("lead.title")}</h2>
            <p className="mt-3 text-muted-foreground">{t("lead.subtitle")}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
              <li>✅ Conteúdos curtos e práticos</li>
              <li>✅ 0 spam — você cancela quando quiser</li>
              <li>✅ Dicas em 3 idiomas</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <LeadForm source="home" />
          </div>
        </div>
      </section>

      {/* App callout */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 rounded-3xl gradient-hero p-8 text-white sm:p-12 lg:grid-cols-[1.5fr_1fr] items-center shadow-glow">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              <Smartphone className="h-3.5 w-3.5" /> PWA
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl text-balance">{t("app.title")}</h2>
            <p className="mt-3 max-w-xl text-white/85">{t("app.desc")}</p>
            <p className="mt-2 text-xs text-white/70">{t("app.note")}</p>
            <a
              href="https://app.meubolsoemdia.com.br"
              target="_blank" rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-primary hover:bg-white/95"
            >
              {t("app.cta")} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="mx-auto h-56 w-32 rounded-[2rem] border-4 border-white/30 bg-white/10 p-2 backdrop-blur">
              <div className="flex h-full w-full flex-col gap-2 rounded-[1.5rem] bg-white/90 p-3 text-primary">
                <div className="h-3 w-2/3 rounded bg-primary/20" />
                <div className="h-16 rounded-xl bg-accent/30" />
                <div className="h-3 w-1/2 rounded bg-primary/20" />
                <div className="h-3 w-3/4 rounded bg-primary/20" />
                <div className="mt-auto h-8 rounded-lg bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function Stat({ icon: Icon, label, value, tint }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; tint: "accent" | "primary" | "warning" }) {
  const tints: Record<string, string> = {
    accent: "bg-accent/15 text-accent",
    primary: "bg-primary/10 text-primary",
    warning: "bg-warning/15 text-warning",
  };
  return (
    <div className="rounded-2xl border border-border bg-background/60 p-4">
      <div className={`grid h-9 w-9 place-items-center rounded-lg ${tints[tint]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="mt-3 text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-bold text-foreground">{value}</div>
    </div>
  );
}
