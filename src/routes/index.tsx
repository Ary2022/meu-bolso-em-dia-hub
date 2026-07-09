import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Sparkles, Target, Wallet, TrendingUp, ShieldCheck, Compass,
  BookOpen, LineChart, PiggyBank, CheckCircle2, Focus, Brain, Trophy, Zap,
  Calculator, ListChecks, Rocket, Instagram, Youtube, Mail,
} from "lucide-react";
import { LeadForm } from "@/components/site/LeadForm";
import heroBg from "@/assets/hero-bg.jpg.asset.json";
import logoAsset from "@/assets/logo-meubolsoemdia.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meu Bolso em Dia | Educação Financeira para Realizar seus Sonhos" },
      { name: "description", content: "Aprenda a organizar sua vida financeira, controlar gastos, planejar objetivos e construir liberdade financeira com educação simples e prática." },
      { name: "keywords", content: "educação financeira, finanças pessoais, controle financeiro, planejamento financeiro, liberdade financeira, meu bolso em dia" },
      { property: "og:title", content: "Meu Bolso em Dia | Educação Financeira Premium" },
      { property: "og:description", content: "Disciplina hoje. Liberdade amanhã. Organize seu bolso e realize seus sonhos." },
      { property: "og:url", content: "https://meubolsoemdia.com/" },
      { property: "og:image", content: `https://meubolsoemdia.com${heroBg.url}` },
    ],
    links: [{ rel: "canonical", href: "https://meubolsoemdia.com/" }],
  }),
  component: LandingPremium,
});

/* Neon/gold palette scoped to this page */
const NEON = "#22c55e";
const NEON_SOFT = "#10b981";
const GOLD = "#d4af37";
const GRAPHITE = "#0a0f0d";

function useCountUp(target: number, duration = 1600, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0; const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setInView(true), { threshold: 0.2 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return { ref, inView };
}

function LandingPremium() {
  return (
    <div className="relative bg-[#0a0f0d] text-white" style={{ colorScheme: "dark" }}>
      <Hero />
      <Authority />
      <About />
      <Mascot />
      <Tools />
      <Content />
      <Quote />
      <LeadCapture />
      <FooterPremium />
    </div>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  const [y, setY] = useState(0);
  useEffect(() => {
    const onScroll = () => setY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative isolate overflow-hidden min-h-[100svh] flex items-center">
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center will-change-transform"
        style={{
          backgroundImage: `url(${heroBg.url})`,
          transform: `translate3d(0, ${y * 0.25}px, 0) scale(1.08)`,
        }}
      />
      <div className="absolute inset-0 -z-10 bg-black/55" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: `radial-gradient(60% 50% at 50% 30%, ${NEON}22 0%, transparent 70%)` }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        {/* Glass brand card with Imagem 2 */}
        <div className="mx-auto max-w-2xl">
          <div
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 sm:p-6 animate-[fadeUp_0.9s_ease-out]"
            style={{ boxShadow: `0 20px 80px -20px ${NEON}55, inset 0 1px 0 #ffffff10` }}
          >
            <div className="pointer-events-none absolute -inset-24 -z-10" style={{ background: `radial-gradient(closest-side, ${NEON}22, transparent)` }} />
            <img
              src={logoAsset.url}
              alt="Meu Bolso em Dia — logotipo"
              width={1600} height={800}
              className="w-full h-auto rounded-2xl"
            />
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-white/70">
              <span className="h-px w-8" style={{ background: GOLD }} />
              Seu dinheiro sob controle
              <span className="h-px w-8" style={{ background: GOLD }} />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" style={{ color: NEON }} />
            Fintech Educacional Premium
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Seu dinheiro <span style={{ color: NEON, textShadow: `0 0 40px ${NEON}66` }}>merece</span> um plano.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
            Educação financeira simples, moderna e prática para organizar sua vida, multiplicar seu patrimônio e realizar seus sonhos.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#lead"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${NEON}, ${NEON_SOFT})`, boxShadow: `0 10px 40px -10px ${NEON}` }}
            >
              Começar gratuitamente <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#conteudos"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Conhecer conteúdos
            </a>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            Disciplina hoje · Liberdade amanhã
          </p>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform: translateY(24px);} to { opacity:1; transform:none;} }
      `}</style>
    </section>
  );
}

/* ---------------- AUTHORITY ---------------- */
function StatItem({ v, suffix, label, delay, start }: { v: number; suffix: string; label: string; delay: number; start: boolean }) {
  const n = useCountUp(v, 1400 + delay, start);
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-extrabold sm:text-5xl" style={{ color: NEON, textShadow: `0 0 30px ${NEON}55` }}>
        {n.toLocaleString("pt-BR")}{suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-wider text-white/60 sm:text-sm">{label}</div>
    </div>
  );
}

function Authority() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stats = [
    { v: 5000, suffix: "+", label: "pessoas impactadas" },
    { v: 500, suffix: "+", label: "conteúdos educativos" },
    { v: 100, suffix: "%", label: "foco em educação financeira" },
    { v: 0, suffix: "", label: "recomendação direta de investimento" },
  ];
  return (
    <section ref={ref} className="relative border-y border-white/5 bg-black/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatItem key={s.label} v={s.v} suffix={s.suffix} label={s.label} delay={i * 150} start={inView} />
        ))}
      </div>
      <p className="pb-8 text-center text-xs text-white/50">
        Conteúdo educativo. Não é recomendação de investimento.
      </p>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const items = [
    { icon: Compass, title: "Planejamento", desc: "Trace o mapa da sua vida financeira." },
    { icon: Wallet, title: "Controle", desc: "Saiba exatamente para onde vai cada real." },
    { icon: LineChart, title: "Investimentos", desc: "Aprenda a fazer o dinheiro trabalhar por você." },
    { icon: ShieldCheck, title: "Disciplina", desc: "Hábitos consistentes constroem patrimônio." },
    { icon: Rocket, title: "Liberdade Financeira", desc: "Decida o próximo passo sem depender do próximo salário." },
  ];
  return (
    <section id="sobre" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(80% 50% at 50% 0%, ${NEON}12, transparent 60%)` }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>Quem somos</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            O que é o <span style={{ color: NEON }}>Meu Bolso em Dia</span>
          </h2>
          <p className="mt-5 text-base text-white/70 sm:text-lg">
            O Meu Bolso em Dia nasceu para ajudar pessoas comuns a entenderem melhor o próprio dinheiro,
            organizarem suas finanças e criarem disciplina para construir liberdade financeira.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[color:var(--neon)]"
              style={{ ["--neon" as any]: NEON }}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-xl transition-shadow"
                style={{ background: `linear-gradient(135deg, ${NEON}30, ${NEON}10)`, boxShadow: `inset 0 0 20px ${NEON}22` }}
              >
                <Icon className="h-6 w-6" style={{ color: NEON }} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-white/60">{desc}</p>
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: `0 20px 60px -20px ${NEON}66` }}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MASCOT ---------------- */
function Mascot() {
  const traits = [
    { icon: Focus, title: "Focado", desc: "Objetivos claros, atenção no que importa." },
    { icon: Brain, title: "Analítico", desc: "Decisões guiadas por dados, não por impulso." },
    { icon: Zap, title: "Confiante", desc: "Sabe onde está e para onde vai." },
    { icon: Trophy, title: "Realizado", desc: "Colhe os frutos da disciplina financeira." },
  ];
  return (
    <section className="relative overflow-hidden border-t border-white/5 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
            style={{ boxShadow: `0 30px 80px -30px ${NEON}77` }}
          >
            <img src={logoAsset.url} alt="Guia Financeiro Meu Bolso em Dia" width={1600} height={800} loading="lazy" className="w-full h-auto rounded-2xl" />
          </div>
          <div className="pointer-events-none absolute -inset-10 -z-10" style={{ background: `radial-gradient(closest-side, ${NEON}33, transparent)` }} />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>Seu guia</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Conheça seu <span style={{ color: NEON }}>Guia Financeiro</span>
          </h2>
          <p className="mt-4 text-white/70">
            O mascote representa foco, disciplina, conhecimento e crescimento. Ele acompanha você na jornada
            de organizar o bolso, aprender sobre dinheiro e construir um futuro melhor.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {traits.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: `${NEON}22`, color: NEON }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-xs text-white/60">{desc}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TOOLS ---------------- */
function Tools() {
  return (
    <section id="ferramentas" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>Ferramentas</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Ferramentas para colocar seu <span style={{ color: NEON }}>bolso em dia</span>
          </h2>
          <p className="mt-4 text-white/70">Simule, planeje e acompanhe. Sem enrolação.</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <BudgetCalculator />
          <GoalSimulator />
          <FinancialChecklist />
        </div>
      </div>
    </section>
  );
}

function GlassCard({ children, icon: Icon, title }: { children: React.ReactNode; icon: any; title: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-transform hover:-translate-y-1"
      style={{ boxShadow: `0 20px 60px -30px ${NEON}55` }}
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-xl" style={{ background: `${NEON}22`, color: NEON }}>
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="font-display text-lg font-bold">{title}</h3>
      </div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function Field({ label, ...rest }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs uppercase tracking-wider text-white/60">{label}</span>
      <input
        {...rest}
        className="w-full rounded-lg border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-[color:var(--neon)] focus:ring-2 focus:ring-[color:var(--neon)]/40"
        style={{ ["--neon" as any]: NEON }}
      />
    </label>
  );
}

function BudgetCalculator() {
  const [renda, setRenda] = useState<number>(0);
  const [fixos, setFixos] = useState<number>(0);
  const [variaveis, setVariaveis] = useState<number>(0);
  const [invest, setInvest] = useState<number>(0);
  const gastos = fixos + variaveis + invest;
  const saldo = renda - gastos;
  const pct = renda > 0 ? Math.min(100, Math.round((gastos / renda) * 100)) : 0;
  const dica = renda === 0
    ? "Preencha seus dados para receber uma sugestão educativa."
    : pct < 70 ? "Ótimo equilíbrio! Considere aumentar seus aportes mensais."
    : pct < 90 ? "Atenção: seus gastos estão altos. Revise variáveis."
    : "Alerta: comprometimento crítico. Priorize cortar gastos variáveis.";

  return (
    <GlassCard icon={Calculator} title="Calculadora financeira">
      <div className="grid gap-3">
        <Field label="Renda mensal (R$)" type="number" min={0} onChange={(e) => setRenda(+e.target.value || 0)} />
        <Field label="Gastos fixos (R$)" type="number" min={0} onChange={(e) => setFixos(+e.target.value || 0)} />
        <Field label="Gastos variáveis (R$)" type="number" min={0} onChange={(e) => setVariaveis(+e.target.value || 0)} />
        <Field label="Valor para investir (R$)" type="number" min={0} onChange={(e) => setInvest(+e.target.value || 0)} />
      </div>
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-wider text-white/60">Saldo disponível</span>
          <span className="font-display text-2xl font-extrabold" style={{ color: saldo >= 0 ? NEON : "#ef4444" }}>
            R$ {saldo.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${NEON}, ${GOLD})` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-white/60">
          <span>Comprometido: {pct}%</span>
          <span>Meta: &lt; 70%</span>
        </div>
        <p className="mt-3 text-sm text-white/80">💡 {dica}</p>
      </div>
    </GlassCard>
  );
}

function GoalSimulator() {
  const [meta, setMeta] = useState(10000);
  const [atual, setAtual] = useState(0);
  const [aporte, setAporte] = useState(500);
  const falta = Math.max(0, meta - atual);
  const meses = aporte > 0 ? Math.ceil(falta / aporte) : 0;
  const anos = (meses / 12).toFixed(1);
  return (
    <GlassCard icon={Target} title="Simulador de objetivos">
      <div className="grid gap-3">
        <Field label="Meta financeira (R$)" type="number" defaultValue={10000} onChange={(e) => setMeta(+e.target.value || 0)} />
        <Field label="Valor atual (R$)" type="number" defaultValue={0} onChange={(e) => setAtual(+e.target.value || 0)} />
        <Field label="Aporte mensal (R$)" type="number" defaultValue={500} onChange={(e) => setAporte(+e.target.value || 0)} />
      </div>
      <div className="mt-5 space-y-3 rounded-2xl border border-white/10 bg-black/30 p-4">
        <Row k="Quanto falta" v={`R$ ${falta.toLocaleString("pt-BR")}`} />
        <Row k="Tempo estimado" v={meses > 0 ? `${meses} meses (${anos} anos)` : "—"} />
        <p className="text-sm" style={{ color: NEON }}>
          🚀 {meses > 0 ? "Consistência é o caminho. Você vai chegar lá." : "Defina um aporte mensal para começar."}
        </p>
      </div>
    </GlassCard>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-xs uppercase tracking-wider text-white/60">{k}</span>
      <span className="font-display text-lg font-bold text-white">{v}</span>
    </div>
  );
}

function FinancialChecklist() {
  const items = [
    "Reserva de emergência",
    "Controle de gastos",
    "Dívidas organizadas",
    "Aportes mensais",
    "Objetivos definidos",
  ];
  const [done, setDone] = useState<Record<string, boolean>>({});
  const total = items.length;
  const count = Object.values(done).filter(Boolean).length;
  return (
    <GlassCard icon={ListChecks} title="Checklist financeiro">
      <ul className="space-y-2">
        {items.map((it) => {
          const active = !!done[it];
          return (
            <li key={it}>
              <button
                type="button"
                onClick={() => setDone((s) => ({ ...s, [it]: !s[it] }))}
                className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-black/30 px-3 py-3 text-left text-sm transition-all hover:border-[color:var(--neon)]"
                style={{ ["--neon" as any]: NEON }}
              >
                <span
                  className="grid h-6 w-6 place-items-center rounded-md border transition-all"
                  style={{
                    borderColor: active ? NEON : "rgba(255,255,255,.2)",
                    background: active ? NEON : "transparent",
                  }}
                >
                  {active && <CheckCircle2 className="h-4 w-4 text-black" />}
                </span>
                <span className={active ? "text-white" : "text-white/80"}>{it}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>Progresso</span><span>{count}/{total}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full transition-all" style={{ width: `${(count / total) * 100}%`, background: `linear-gradient(90deg, ${NEON}, ${GOLD})` }} />
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------------- CONTENT ---------------- */
function Content() {
  const posts = [
    { icon: BookOpen, title: "Educação financeira básica", desc: "Os pilares para dominar seu dinheiro." },
    { icon: Wallet, title: "Como sair das dívidas", desc: "Plano prático para renegociar e quitar." },
    { icon: PiggyBank, title: "Como montar reserva de emergência", desc: "Segurança para dormir tranquilo." },
    { icon: TrendingUp, title: "Como começar a investir", desc: "Primeiros passos sem medo." },
    { icon: LineChart, title: "Como controlar gastos", desc: "Ferramentas e hábitos que funcionam." },
    { icon: Rocket, title: "Como pensar no longo prazo", desc: "Construa patrimônio de verdade." },
  ];
  return (
    <section id="conteudos" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>Conteúdos</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Aprenda a cuidar melhor do <span style={{ color: NEON }}>seu dinheiro</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all hover:-translate-y-1"
              style={{ boxShadow: `0 20px 60px -30px ${NEON}55` }}
            >
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${NEON}22`, color: NEON }}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-white/70">{desc}</p>
              </div>
              <Link
                to="/dicas"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white hover:border-[color:var(--neon)]"
                style={{ ["--neon" as any]: NEON }}
              >
                Ler conteúdo <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUOTE ---------------- */
function Quote() {
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-white/10 px-6 py-20 text-center sm:px-16"
        style={{
          background: `linear-gradient(135deg, #052e1a 0%, #064e3b 50%, #022c22 100%)`,
          boxShadow: `0 40px 120px -40px ${NEON}66, inset 0 1px 0 #ffffff10`,
        }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(50% 60% at 50% 20%, ${NEON}22, transparent 60%)` }} />
        <h2 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">
          <span style={{ color: NEON, textShadow: `0 0 40px ${NEON}66` }}>Disciplina hoje.</span><br />
          Liberdade amanhã.
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/75 sm:text-lg">
          Pequenas decisões financeiras repetidas com consistência podem transformar completamente o seu futuro.
        </p>
        <a
          href="#lead"
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${NEON}, ${GOLD})`, boxShadow: `0 15px 50px -10px ${NEON}` }}
        >
          Quero começar minha jornada <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- LEAD ---------------- */
function LeadCapture() {
  return (
    <section id="lead" className="relative py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>Comece agora</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            Receba conteúdos <span style={{ color: NEON }}>gratuitos</span>
          </h2>
          <p className="mt-4 text-white/70">
            Cadastre-se e receba materiais educativos sobre planejamento, disciplina e liberdade financeira.
          </p>
          <p className="mt-6 text-sm italic text-white/60">
            Sem promessas milagrosas. Apenas educação, disciplina e estratégia.
          </p>
        </div>
        <div
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl"
          style={{ boxShadow: `0 30px 80px -30px ${NEON}66` }}
        >
          <LeadForm source="landing-premium" />
        </div>
      </div>
    </section>
  );
}

/* ---------------- FOOTER (premium extra, complements site Footer) ---------------- */
function FooterPremium() {
  return (
    <section className="border-t border-white/10 bg-black/60 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Meu Bolso em Dia" width={64} height={64} loading="lazy" className="h-10 w-auto rounded-md" />
            <span className="font-display text-lg font-bold">Meu Bolso em Dia</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-white/60">
            As informações apresentadas possuem caráter exclusivamente educativo e não constituem
            recomendação de investimento, consultoria financeira, contábil, jurídica ou tributária.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Contato</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: NEON }} /> contato@meubolsoemdia.com</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" style={{ color: NEON }} /> <a href="https://instagram.com/meubolsemdia" target="_blank" rel="noopener noreferrer" className="hover:text-white">/meubolsemdia</a></li>
            <li className="flex items-center gap-2"><Youtube className="h-4 w-4" style={{ color: NEON }} /> <a href="https://youtube.com/@meubolsemdia" target="_blank" rel="noopener noreferrer" className="hover:text-white">/meubolsemdia</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-white">Legal</h4>
          <ul className="mt-3 space-y-2 text-sm text-white/70">
            <li><Link to="/privacidade" className="hover:text-white">Política de Privacidade</Link></li>
            <li><Link to="/termos" className="hover:text-white">Termos de Uso</Link></li>
            <li><Link to="/faq" className="hover:text-white">Aviso Legal</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
