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
import { useI18n } from "@/lib/i18n";

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

const LANDING_COPY = {
  "pt-BR": {
    hero: {
      logoAlt: "Meu Bolso em Dia — logotipo",
      brandTagline: "Seu dinheiro sob controle",
      badge: "Fintech Educacional Premium",
      titleBefore: "Seu dinheiro",
      titleHighlight: "merece",
      titleAfter: "um plano.",
      subtitle: "Educação financeira simples, moderna e prática para organizar sua vida, planejar objetivos e realizar seus sonhos.",
      primaryCta: "Começar gratuitamente",
      secondaryCta: "Conhecer conteúdos",
      motto: "Disciplina hoje · Liberdade amanhã",
    },
    authority: {
      labels: ["pessoas impactadas", "conteúdos educativos", "foco em educação financeira", "recomendação direta de investimento"],
      disclaimer: "Conteúdo educativo. Não é recomendação de investimento.",
    },
    about: {
      eyebrow: "Quem somos",
      titleBefore: "O que é o",
      titleHighlight: "Meu Bolso em Dia",
      body: "O Meu Bolso em Dia nasceu para ajudar pessoas comuns a entenderem melhor o próprio dinheiro, organizarem suas finanças e criarem disciplina para construir liberdade financeira.",
      items: [
        { title: "Planejamento", desc: "Trace o mapa da sua vida financeira." },
        { title: "Controle", desc: "Saiba exatamente para onde vai cada real." },
        { title: "Investimentos", desc: "Aprenda conceitos para tomar decisões com mais consciência." },
        { title: "Disciplina", desc: "Hábitos consistentes constroem patrimônio." },
        { title: "Liberdade Financeira", desc: "Decida o próximo passo sem depender do próximo salário." },
      ],
    },
    mascot: {
      logoAlt: "Guia Financeiro Meu Bolso em Dia",
      eyebrow: "Seu guia",
      titleBefore: "Conheça seu",
      titleHighlight: "Guia Financeiro",
      body: "O mascote representa foco, disciplina, conhecimento e crescimento. Ele acompanha você na jornada de organizar o bolso, aprender sobre dinheiro e construir um futuro melhor.",
      traits: [
        { title: "Focado", desc: "Objetivos claros, atenção no que importa." },
        { title: "Analítico", desc: "Decisões guiadas por dados, não por impulso." },
        { title: "Confiante", desc: "Sabe onde está e para onde vai." },
        { title: "Realizado", desc: "Colhe os frutos da disciplina financeira." },
      ],
    },
    tools: {
      eyebrow: "Ferramentas",
      titleBefore: "Ferramentas para colocar seu",
      titleHighlight: "bolso em dia",
      subtitle: "Simule, planeje e acompanhe. Sem enrolação.",
      budget: {
        title: "Calculadora financeira",
        income: "Renda mensal (R$)",
        fixed: "Gastos fixos (R$)",
        variable: "Gastos variáveis (R$)",
        invest: "Valor para investir (R$)",
        balance: "Saldo disponível",
        committed: "Comprometido",
        target: "Meta: < 70%",
        tips: {
          empty: "Preencha seus dados para receber uma sugestão educativa.",
          good: "Ótimo equilíbrio! Considere aumentar seus aportes mensais.",
          warning: "Atenção: seus gastos estão altos. Revise variáveis.",
          critical: "Alerta: comprometimento crítico. Priorize cortar gastos variáveis.",
        },
      },
      goal: {
        title: "Simulador de objetivos",
        target: "Meta financeira (R$)",
        current: "Valor atual (R$)",
        monthly: "Aporte mensal (R$)",
        missing: "Quanto falta",
        time: "Tempo estimado",
        months: "meses",
        years: "anos",
        success: "Consistência é o caminho. Você vai chegar lá.",
        empty: "Defina um aporte mensal para começar.",
      },
      checklist: {
        title: "Checklist financeiro",
        items: ["Reserva de emergência", "Controle de gastos", "Dívidas organizadas", "Aportes mensais", "Objetivos definidos"],
        progress: "Progresso",
      },
    },
    content: {
      eyebrow: "Conteúdos",
      titleBefore: "Aprenda a cuidar melhor do",
      titleHighlight: "seu dinheiro",
      read: "Ler conteúdo",
      posts: [
        { title: "Educação financeira básica", desc: "Os pilares para dominar seu dinheiro." },
        { title: "Como sair das dívidas", desc: "Plano prático para renegociar e quitar." },
        { title: "Como montar reserva de emergência", desc: "Segurança para dormir tranquilo." },
        { title: "Como começar a investir", desc: "Primeiros passos sem medo." },
        { title: "Como controlar gastos", desc: "Ferramentas e hábitos que funcionam." },
        { title: "Como pensar no longo prazo", desc: "Construa patrimônio de verdade." },
      ],
    },
    quote: {
      first: "Disciplina hoje.",
      second: "Liberdade amanhã.",
      body: "Pequenas decisões financeiras repetidas com consistência podem transformar completamente o seu futuro.",
      cta: "Quero começar minha jornada",
    },
    lead: {
      eyebrow: "Comece agora",
      titleBefore: "Receba conteúdos",
      titleHighlight: "gratuitos",
      body: "Cadastre-se e receba materiais educativos sobre planejamento, disciplina e liberdade financeira.",
      note: "Sem promessas milagrosas. Apenas educação, disciplina e estratégia.",
    },
    footer: {
      legalText: "As informações apresentadas possuem caráter exclusivamente educativo e não constituem recomendação de investimento, consultoria financeira, contábil, jurídica ou tributária.",
      contact: "Contato",
      legal: "Legal",
      privacy: "Política de Privacidade",
      terms: "Termos de Uso",
      notice: "Aviso Legal",
    },
  },
  en: {
    hero: {
      logoAlt: "Meu Bolso em Dia — logo",
      brandTagline: "Your money under control",
      badge: "Premium Financial Education",
      titleBefore: "Your money",
      titleHighlight: "deserves",
      titleAfter: "a plan.",
      subtitle: "Simple, modern and practical financial education to organize your life, plan goals and pursue your dreams.",
      primaryCta: "Start for free",
      secondaryCta: "Explore content",
      motto: "Discipline today · Freedom tomorrow",
    },
    authority: {
      labels: ["people reached", "educational contents", "focus on financial education", "direct investment recommendations"],
      disclaimer: "Educational content. Not investment advice.",
    },
    about: {
      eyebrow: "Who we are",
      titleBefore: "What",
      titleHighlight: "Meu Bolso em Dia is",
      body: "Meu Bolso em Dia was created to help everyday people understand their money, organize their finances and build discipline toward financial freedom.",
      items: [
        { title: "Planning", desc: "Map out your financial life." },
        { title: "Control", desc: "Know exactly where every unit of money goes." },
        { title: "Investments", desc: "Learn concepts to make more conscious decisions." },
        { title: "Discipline", desc: "Consistent habits build wealth over time." },
        { title: "Financial Freedom", desc: "Choose your next step without depending on the next paycheck." },
      ],
    },
    mascot: {
      logoAlt: "Meu Bolso em Dia Financial Guide",
      eyebrow: "Your guide",
      titleBefore: "Meet your",
      titleHighlight: "Financial Guide",
      body: "The mascot represents focus, discipline, knowledge and growth. It follows your journey to organize your wallet, learn about money and build a better future.",
      traits: [
        { title: "Focused", desc: "Clear goals and attention on what matters." },
        { title: "Analytical", desc: "Decisions guided by data, not impulse." },
        { title: "Confident", desc: "Knows where it is and where it is going." },
        { title: "Fulfilled", desc: "Reaps the results of financial discipline." },
      ],
    },
    tools: {
      eyebrow: "Tools",
      titleBefore: "Tools to get your",
      titleHighlight: "wallet on track",
      subtitle: "Simulate, plan and track. No complications.",
      budget: {
        title: "Financial calculator",
        income: "Monthly income (R$)",
        fixed: "Fixed expenses (R$)",
        variable: "Variable expenses (R$)",
        invest: "Amount to invest (R$)",
        balance: "Available balance",
        committed: "Committed",
        target: "Goal: < 70%",
        tips: {
          empty: "Fill in your data to receive an educational suggestion.",
          good: "Great balance! Consider increasing your monthly contributions.",
          warning: "Attention: your expenses are high. Review variable spending.",
          critical: "Alert: critical commitment level. Prioritize cutting variable expenses.",
        },
      },
      goal: {
        title: "Goal simulator",
        target: "Financial goal (R$)",
        current: "Current amount (R$)",
        monthly: "Monthly contribution (R$)",
        missing: "Amount missing",
        time: "Estimated time",
        months: "months",
        years: "years",
        success: "Consistency is the path. You will get there.",
        empty: "Set a monthly contribution to begin.",
      },
      checklist: {
        title: "Financial checklist",
        items: ["Emergency fund", "Expense control", "Organized debts", "Monthly contributions", "Defined goals"],
        progress: "Progress",
      },
    },
    content: {
      eyebrow: "Content",
      titleBefore: "Learn to take better care of",
      titleHighlight: "your money",
      read: "Read content",
      posts: [
        { title: "Personal finance basics", desc: "The pillars to master your money." },
        { title: "How to get out of debt", desc: "A practical plan to renegotiate and pay off debt." },
        { title: "How to build an emergency fund", desc: "Security so you can sleep better." },
        { title: "How to start investing", desc: "First steps with less fear." },
        { title: "How to control spending", desc: "Tools and habits that work." },
        { title: "How to think long term", desc: "Build real wealth over time." },
      ],
    },
    quote: {
      first: "Discipline today.",
      second: "Freedom tomorrow.",
      body: "Small financial decisions repeated consistently can completely transform your future.",
      cta: "I want to start my journey",
    },
    lead: {
      eyebrow: "Start now",
      titleBefore: "Receive free",
      titleHighlight: "content",
      body: "Sign up and receive educational materials about planning, discipline and financial freedom.",
      note: "No miracle promises. Just education, discipline and strategy.",
    },
    footer: {
      legalText: "The information presented is exclusively educational and does not constitute investment advice or financial, accounting, legal or tax consulting.",
      contact: "Contact",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      notice: "Legal Notice",
    },
  },
  es: {
    hero: {
      logoAlt: "Meu Bolso em Dia — logotipo",
      brandTagline: "Tu dinero bajo control",
      badge: "Educación Financiera Premium",
      titleBefore: "Tu dinero",
      titleHighlight: "merece",
      titleAfter: "un plan.",
      subtitle: "Educación financiera simple, moderna y práctica para organizar tu vida, planificar objetivos y perseguir tus sueños.",
      primaryCta: "Empezar gratis",
      secondaryCta: "Ver contenidos",
      motto: "Disciplina hoy · Libertad mañana",
    },
    authority: {
      labels: ["personas impactadas", "contenidos educativos", "enfoque en educación financiera", "recomendaciones directas de inversión"],
      disclaimer: "Contenido educativo. No es recomendación de inversión.",
    },
    about: {
      eyebrow: "Quiénes somos",
      titleBefore: "Qué es",
      titleHighlight: "Meu Bolso em Dia",
      body: "Meu Bolso em Dia nació para ayudar a personas comunes a entender mejor su dinero, organizar sus finanzas y crear disciplina para construir libertad financiera.",
      items: [
        { title: "Planificación", desc: "Traza el mapa de tu vida financiera." },
        { title: "Control", desc: "Sabe exactamente a dónde va cada peso." },
        { title: "Inversiones", desc: "Aprende conceptos para decidir con más conciencia." },
        { title: "Disciplina", desc: "Los hábitos constantes construyen patrimonio." },
        { title: "Libertad Financiera", desc: "Decide el próximo paso sin depender del próximo salario." },
      ],
    },
    mascot: {
      logoAlt: "Guía Financiero Meu Bolso em Dia",
      eyebrow: "Tu guía",
      titleBefore: "Conoce tu",
      titleHighlight: "Guía Financiero",
      body: "La mascota representa foco, disciplina, conocimiento y crecimiento. Te acompaña en el camino de organizar tu bolsillo, aprender sobre dinero y construir un futuro mejor.",
      traits: [
        { title: "Enfocado", desc: "Objetivos claros y atención en lo importante." },
        { title: "Analítico", desc: "Decisiones guiadas por datos, no por impulso." },
        { title: "Confiado", desc: "Sabe dónde está y hacia dónde va." },
        { title: "Realizado", desc: "Recoge los frutos de la disciplina financiera." },
      ],
    },
    tools: {
      eyebrow: "Herramientas",
      titleBefore: "Herramientas para poner tu",
      titleHighlight: "bolsillo al día",
      subtitle: "Simula, planifica y acompaña. Sin complicaciones.",
      budget: {
        title: "Calculadora financiera",
        income: "Ingreso mensual (R$)",
        fixed: "Gastos fijos (R$)",
        variable: "Gastos variables (R$)",
        invest: "Valor para invertir (R$)",
        balance: "Saldo disponible",
        committed: "Comprometido",
        target: "Meta: < 70%",
        tips: {
          empty: "Completa tus datos para recibir una sugerencia educativa.",
          good: "¡Gran equilibrio! Considera aumentar tus aportes mensuales.",
          warning: "Atención: tus gastos están altos. Revisa los variables.",
          critical: "Alerta: compromiso crítico. Prioriza recortar gastos variables.",
        },
      },
      goal: {
        title: "Simulador de objetivos",
        target: "Meta financiera (R$)",
        current: "Valor actual (R$)",
        monthly: "Aporte mensual (R$)",
        missing: "Cuánto falta",
        time: "Tiempo estimado",
        months: "meses",
        years: "años",
        success: "La constancia es el camino. Vas a llegar.",
        empty: "Define un aporte mensual para comenzar.",
      },
      checklist: {
        title: "Checklist financiero",
        items: ["Reserva de emergencia", "Control de gastos", "Deudas organizadas", "Aportes mensuales", "Objetivos definidos"],
        progress: "Progreso",
      },
    },
    content: {
      eyebrow: "Contenidos",
      titleBefore: "Aprende a cuidar mejor",
      titleHighlight: "tu dinero",
      read: "Leer contenido",
      posts: [
        { title: "Educación financiera básica", desc: "Los pilares para dominar tu dinero." },
        { title: "Cómo salir de deudas", desc: "Plan práctico para renegociar y pagar." },
        { title: "Cómo crear una reserva de emergencia", desc: "Seguridad para dormir tranquilo." },
        { title: "Cómo empezar a invertir", desc: "Primeros pasos con menos miedo." },
        { title: "Cómo controlar gastos", desc: "Herramientas y hábitos que funcionan." },
        { title: "Cómo pensar a largo plazo", desc: "Construye patrimonio de verdad." },
      ],
    },
    quote: {
      first: "Disciplina hoy.",
      second: "Libertad mañana.",
      body: "Pequeñas decisiones financieras repetidas con constancia pueden transformar completamente tu futuro.",
      cta: "Quiero empezar mi camino",
    },
    lead: {
      eyebrow: "Empieza ahora",
      titleBefore: "Recibe contenidos",
      titleHighlight: "gratuitos",
      body: "Suscríbete y recibe materiales educativos sobre planificación, disciplina y libertad financiera.",
      note: "Sin promesas milagrosas. Solo educación, disciplina y estrategia.",
    },
    footer: {
      legalText: "La información presentada tiene carácter exclusivamente educativo y no constituye recomendación de inversión ni consultoría financiera, contable, jurídica o tributaria.",
      contact: "Contacto",
      legal: "Legal",
      privacy: "Política de Privacidad",
      terms: "Términos de Uso",
      notice: "Aviso Legal",
    },
  },
} as const;

function useLandingCopy() {
  const { lang } = useI18n();
  const locale = lang === "pt-BR" ? "pt-BR" : lang === "en" ? "en-US" : "es-ES";
  return { copy: LANDING_COPY[lang], locale };
}

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
    <div className="relative bg-background text-foreground">
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
  const { copy } = useLandingCopy();
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
      <div className="absolute inset-0 -z-10 bg-background/55" />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: `radial-gradient(60% 50% at 50% 30%, ${NEON}22 0%, transparent 70%)` }}
      />

      <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 lg:py-32">
        {/* Glass brand card with Imagem 2 */}
        <div className="mx-auto max-w-2xl">
          <div
            className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04] backdrop-blur-xl p-5 sm:p-6 animate-[fadeUp_0.9s_ease-out]"
            style={{ boxShadow: `0 20px 80px -20px ${NEON}55, inset 0 1px 0 #ffffff10` }}
          >
            <div className="pointer-events-none absolute -inset-24 -z-10" style={{ background: `radial-gradient(closest-side, ${NEON}22, transparent)` }} />
            <img
              src={logoAsset.url}
              alt={copy.hero.logoAlt}
              width={1600} height={800}
              className="w-full h-auto rounded-2xl"
            />
            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.25em] text-foreground/70">
              <span className="h-px w-8" style={{ background: GOLD }} />
              {copy.hero.brandTagline}
              <span className="h-px w-8" style={{ background: GOLD }} />
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium text-foreground/80 backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" style={{ color: NEON }} />
            {copy.hero.badge}
          </span>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {copy.hero.titleBefore} <span style={{ color: NEON, textShadow: `0 0 40px ${NEON}66` }}>{copy.hero.titleHighlight}</span> {copy.hero.titleAfter}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/75 sm:text-lg">
            {copy.hero.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#lead"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-all hover:-translate-y-0.5"
              style={{ background: `linear-gradient(135deg, ${NEON}, ${NEON_SOFT})`, boxShadow: `0 10px 40px -10px ${NEON}` }}
            >
              {copy.hero.primaryCta} <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#conteudos"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur hover:bg-foreground/10"
            >
              {copy.hero.secondaryCta}
            </a>
          </div>
          <p className="mt-6 text-xs uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            {copy.hero.motto}
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
  const { locale } = useLandingCopy();
  const n = useCountUp(v, 1400 + delay, start);
  return (
    <div className="text-center">
      <div className="font-display text-4xl font-extrabold sm:text-5xl" style={{ color: NEON, textShadow: `0 0 30px ${NEON}55` }}>
        {n.toLocaleString(locale)}{suffix}
      </div>
      <div className="mt-2 text-xs uppercase tracking-wider text-foreground/60 sm:text-sm">{label}</div>
    </div>
  );
}

function Authority() {
  const { copy } = useLandingCopy();
  const { ref, inView } = useInView<HTMLDivElement>();
  const stats = [
    { v: 5000, suffix: "+", label: copy.authority.labels[0] },
    { v: 500, suffix: "+", label: copy.authority.labels[1] },
    { v: 100, suffix: "%", label: copy.authority.labels[2] },
    { v: 0, suffix: "", label: copy.authority.labels[3] },
  ];
  return (
    <section ref={ref} className="relative border-y border-foreground/5 bg-background/60">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-14 sm:px-6 lg:grid-cols-4">
        {stats.map((s, i) => (
          <StatItem key={s.label} v={s.v} suffix={s.suffix} label={s.label} delay={i * 150} start={inView} />
        ))}
      </div>
      <p className="pb-8 text-center text-xs text-foreground/50">
        {copy.authority.disclaimer}
      </p>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
function About() {
  const { copy } = useLandingCopy();
  const icons = [Compass, Wallet, LineChart, ShieldCheck, Rocket];
  return (
    <section id="sobre" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 -z-10" style={{ background: `radial-gradient(80% 50% at 50% 0%, ${NEON}12, transparent 60%)` }} />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>{copy.about.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {copy.about.titleBefore} <span style={{ color: NEON }}>{copy.about.titleHighlight}</span>
          </h2>
          <p className="mt-5 text-base text-foreground/70 sm:text-lg">
            {copy.about.body}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {copy.about.items.map(({ title, desc }, index) => {
            const Icon = icons[index] ?? Compass;
            return (
            <article
              key={title}
              className="group relative rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-6 backdrop-blur transition-all hover:-translate-y-1 hover:border-[color:var(--neon)]"
              style={{ ["--neon" as any]: NEON }}
            >
              <div
                className="grid h-12 w-12 place-items-center rounded-xl transition-shadow"
                style={{ background: `linear-gradient(135deg, ${NEON}30, ${NEON}10)`, boxShadow: `inset 0 0 20px ${NEON}22` }}
              >
                <Icon className="h-6 w-6" style={{ color: NEON }} />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-sm text-foreground/60">{desc}</p>
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{ boxShadow: `0 20px 60px -20px ${NEON}66` }}
              />
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MASCOT ---------------- */
function Mascot() {
  const { copy } = useLandingCopy();
  const icons = [Focus, Brain, Zap, Trophy];
  return (
    <section className="relative overflow-hidden border-t border-foreground/5 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative">
          <div
            className="relative overflow-hidden rounded-[2rem] border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-xl"
            style={{ boxShadow: `0 30px 80px -30px ${NEON}77` }}
          >
            <img src={logoAsset.url} alt={copy.mascot.logoAlt} width={1600} height={800} loading="lazy" className="w-full h-auto rounded-2xl" />
          </div>
          <div className="pointer-events-none absolute -inset-10 -z-10" style={{ background: `radial-gradient(closest-side, ${NEON}33, transparent)` }} />
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>{copy.mascot.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {copy.mascot.titleBefore} <span style={{ color: NEON }}>{copy.mascot.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-foreground/70">
            {copy.mascot.body}
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {copy.mascot.traits.map(({ title, desc }, index) => {
              const Icon = icons[index] ?? Focus;
              return (
              <div key={title} className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-4 backdrop-blur">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg" style={{ background: `${NEON}22`, color: NEON }}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{title}</div>
                    <div className="text-xs text-foreground/60">{desc}</div>
                  </div>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TOOLS ---------------- */
function Tools() {
  const { copy } = useLandingCopy();
  return (
    <section id="ferramentas" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>{copy.tools.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {copy.tools.titleBefore} <span style={{ color: NEON }}>{copy.tools.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-foreground/70">{copy.tools.subtitle}</p>
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
      className="relative overflow-hidden rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-xl transition-transform hover:-translate-y-1"
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
      <span className="mb-1 block text-xs uppercase tracking-wider text-foreground/60">{label}</span>
      <input
        {...rest}
        className="w-full rounded-lg border border-foreground/10 bg-background/30 px-3 py-2.5 text-sm text-foreground outline-none placeholder:text-foreground/30 focus:border-[color:var(--neon)] focus:ring-2 focus:ring-[color:var(--neon)]/40"
        style={{ ["--neon" as any]: NEON }}
      />
    </label>
  );
}

function BudgetCalculator() {
  const { copy, locale } = useLandingCopy();
  const [renda, setRenda] = useState<number>(0);
  const [fixos, setFixos] = useState<number>(0);
  const [variaveis, setVariaveis] = useState<number>(0);
  const [invest, setInvest] = useState<number>(0);
  const gastos = fixos + variaveis + invest;
  const saldo = renda - gastos;
  const pct = renda > 0 ? Math.min(100, Math.round((gastos / renda) * 100)) : 0;
  const tips = copy.tools.budget.tips;
  const dica = renda === 0
    ? tips.empty
    : pct < 70 ? tips.good
    : pct < 90 ? tips.warning
    : tips.critical;

  return (
    <GlassCard icon={Calculator} title={copy.tools.budget.title}>
      <div className="grid gap-3">
        <Field label={copy.tools.budget.income} type="number" min={0} onChange={(e) => setRenda(+e.target.value || 0)} />
        <Field label={copy.tools.budget.fixed} type="number" min={0} onChange={(e) => setFixos(+e.target.value || 0)} />
        <Field label={copy.tools.budget.variable} type="number" min={0} onChange={(e) => setVariaveis(+e.target.value || 0)} />
        <Field label={copy.tools.budget.invest} type="number" min={0} onChange={(e) => setInvest(+e.target.value || 0)} />
      </div>
      <div className="mt-5 rounded-2xl border border-foreground/10 bg-background/30 p-4">
        <div className="flex items-baseline justify-between">
          <span className="text-xs uppercase tracking-wider text-foreground/60">{copy.tools.budget.balance}</span>
          <span className="font-display text-2xl font-extrabold" style={{ color: saldo >= 0 ? NEON : "#ef4444" }}>
            R$ {saldo.toLocaleString(locale)}
          </span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full transition-all" style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${NEON}, ${GOLD})` }} />
        </div>
        <div className="mt-2 flex justify-between text-xs text-foreground/60">
          <span>{copy.tools.budget.committed}: {pct}%</span>
          <span>{copy.tools.budget.target}</span>
        </div>
        <p className="mt-3 text-sm text-foreground/80">💡 {dica}</p>
      </div>
    </GlassCard>
  );
}

function GoalSimulator() {
  const { copy, locale } = useLandingCopy();
  const [meta, setMeta] = useState(10000);
  const [atual, setAtual] = useState(0);
  const [aporte, setAporte] = useState(500);
  const falta = Math.max(0, meta - atual);
  const meses = aporte > 0 ? Math.ceil(falta / aporte) : 0;
  const anos = (meses / 12).toFixed(1);
  return (
    <GlassCard icon={Target} title={copy.tools.goal.title}>
      <div className="grid gap-3">
        <Field label={copy.tools.goal.target} type="number" defaultValue={10000} onChange={(e) => setMeta(+e.target.value || 0)} />
        <Field label={copy.tools.goal.current} type="number" defaultValue={0} onChange={(e) => setAtual(+e.target.value || 0)} />
        <Field label={copy.tools.goal.monthly} type="number" defaultValue={500} onChange={(e) => setAporte(+e.target.value || 0)} />
      </div>
      <div className="mt-5 space-y-3 rounded-2xl border border-foreground/10 bg-background/30 p-4">
        <Row k={copy.tools.goal.missing} v={`R$ ${falta.toLocaleString(locale)}`} />
        <Row k={copy.tools.goal.time} v={meses > 0 ? `${meses.toLocaleString(locale)} ${copy.tools.goal.months} (${anos} ${copy.tools.goal.years})` : "—"} />
        <p className="text-sm" style={{ color: NEON }}>
          🚀 {meses > 0 ? copy.tools.goal.success : copy.tools.goal.empty}
        </p>
      </div>
    </GlassCard>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <span className="text-xs uppercase tracking-wider text-foreground/60">{k}</span>
      <span className="font-display text-lg font-bold text-foreground">{v}</span>
    </div>
  );
}

function FinancialChecklist() {
  const { copy } = useLandingCopy();
  const items = copy.tools.checklist.items;
  const [done, setDone] = useState<Record<string, boolean>>({});
  const total = items.length;
  const count = Object.values(done).filter(Boolean).length;
  return (
    <GlassCard icon={ListChecks} title={copy.tools.checklist.title}>
      <ul className="space-y-2">
        {items.map((it) => {
          const active = !!done[it];
          return (
            <li key={it}>
              <button
                type="button"
                onClick={() => setDone((s) => ({ ...s, [it]: !s[it] }))}
                className="flex w-full items-center gap-3 rounded-xl border border-foreground/10 bg-background/30 px-3 py-3 text-left text-sm transition-all hover:border-[color:var(--neon)]"
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
                <span className={active ? "text-foreground" : "text-foreground/80"}>{it}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 rounded-2xl border border-foreground/10 bg-background/30 p-4">
        <div className="flex items-center justify-between text-xs text-foreground/60">
          <span>{copy.tools.checklist.progress}</span><span>{count}/{total}</span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-foreground/10">
          <div className="h-full transition-all" style={{ width: `${(count / total) * 100}%`, background: `linear-gradient(90deg, ${NEON}, ${GOLD})` }} />
        </div>
      </div>
    </GlassCard>
  );
}

/* ---------------- CONTENT ---------------- */
function Content() {
  const { copy } = useLandingCopy();
  const icons = [BookOpen, Wallet, PiggyBank, TrendingUp, LineChart, Rocket];
  return (
    <section id="conteudos" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>{copy.content.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {copy.content.titleBefore} <span style={{ color: NEON }}>{copy.content.titleHighlight}</span>
          </h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {copy.content.posts.map(({ title, desc }, index) => {
            const Icon = icons[index] ?? BookOpen;
            return (
            <article
              key={title}
              className="group flex flex-col justify-between rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur transition-all hover:-translate-y-1"
              style={{ boxShadow: `0 20px 60px -30px ${NEON}55` }}
            >
              <div>
                <div className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: `${NEON}22`, color: NEON }}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">{title}</h3>
                <p className="mt-2 text-sm text-foreground/70">{desc}</p>
              </div>
              <Link
                to="/dicas"
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:border-[color:var(--neon)]"
                style={{ ["--neon" as any]: NEON }}
              >
                {copy.content.read} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- QUOTE ---------------- */
function Quote() {
  const { copy } = useLandingCopy();
  return (
    <section className="relative overflow-hidden py-24">
      <div
        className="mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] border border-foreground/10 px-6 py-20 text-center sm:px-16"
        style={{
          background: `linear-gradient(135deg, #052e1a 0%, #064e3b 50%, #022c22 100%)`,
          boxShadow: `0 40px 120px -40px ${NEON}66, inset 0 1px 0 #ffffff10`,
        }}
      >
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(50% 60% at 50% 20%, ${NEON}22, transparent 60%)` }} />
        <h2 className="font-display text-5xl font-extrabold leading-[1.05] sm:text-7xl">
          <span style={{ color: NEON, textShadow: `0 0 40px ${NEON}66` }}>{copy.quote.first}</span><br />
          {copy.quote.second}
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-base text-foreground/75 sm:text-lg">
          {copy.quote.body}
        </p>
        <a
          href="#lead"
          className="mt-10 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition-transform hover:-translate-y-0.5"
          style={{ background: `linear-gradient(135deg, ${NEON}, ${GOLD})`, boxShadow: `0 15px 50px -10px ${NEON}` }}
        >
          {copy.quote.cta} <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

/* ---------------- LEAD ---------------- */
function LeadCapture() {
  const { copy } = useLandingCopy();
  return (
    <section id="lead" className="relative py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div>
          <span className="text-xs uppercase tracking-[0.4em]" style={{ color: GOLD }}>{copy.lead.eyebrow}</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-5xl">
            {copy.lead.titleBefore} <span style={{ color: NEON }}>{copy.lead.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-foreground/70">
            {copy.lead.body}
          </p>
          <p className="mt-6 text-sm italic text-foreground/60">
            {copy.lead.note}
          </p>
        </div>
        <div
          className="rounded-3xl border border-foreground/10 bg-foreground/[0.04] p-6 backdrop-blur-xl"
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
  const { copy } = useLandingCopy();
  return (
    <section className="border-t border-foreground/10 bg-background/60 py-14">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Meu Bolso em Dia" width={64} height={64} loading="lazy" className="h-10 w-auto rounded-md" />
            <span className="font-display text-lg font-bold">Meu Bolso em Dia</span>
          </div>
          <p className="mt-4 max-w-md text-sm text-foreground/60">
            {copy.footer.legalText}
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">{copy.footer.contact}</h4>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" style={{ color: NEON }} /> contato@meubolsoemdia.com</li>
            <li className="flex items-center gap-2"><Instagram className="h-4 w-4" style={{ color: NEON }} /> <a href="https://instagram.com/meubolsemdia" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">/meubolsemdia</a></li>
            <li className="flex items-center gap-2"><Youtube className="h-4 w-4" style={{ color: NEON }} /> <a href="https://youtube.com/@meubolsemdia" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">/meubolsemdia</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">{copy.footer.legal}</h4>
          <ul className="mt-3 space-y-2 text-sm text-foreground/70">
            <li><Link to="/privacidade" className="hover:text-foreground">{copy.footer.privacy}</Link></li>
            <li><Link to="/termos" className="hover:text-foreground">{copy.footer.terms}</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">{copy.footer.notice}</Link></li>
          </ul>
        </div>
      </div>
    </section>
  );
}
