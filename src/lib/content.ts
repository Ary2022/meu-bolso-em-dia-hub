import type { Lang } from "./dictionaries";

export type LocalizedString = Record<Lang, string>;

export type Article = {
  slug: string;
  category: keyof typeof CATEGORIES;
  readMinutes: number;
  emoji: string;
  title: LocalizedString;
  summary: LocalizedString;
};

export const CATEGORIES = {
  poupar: true, controle: true, basica: true, renda: true,
  dividas: true, organizacao: true, livros: true, mente: true,
} as const;

export const ARTICLES: Article[] = [
  {
    slug: "como-comecar-a-poupar",
    category: "poupar",
    readMinutes: 5,
    emoji: "🐷",
    title: {
      "pt-BR": "Como começar a poupar mesmo ganhando pouco",
      en: "How to start saving even on a low income",
      es: "Cómo empezar a ahorrar aunque ganes poco",
    },
    summary: {
      "pt-BR": "Pequenas mudanças, grandes resultados: aprenda o método dos centavos que cabe em qualquer bolso.",
      en: "Small changes, big results: learn the spare-change method that fits any budget.",
      es: "Pequeños cambios, grandes resultados: aprende el método de los centavos para cualquier bolsillo.",
    },
  },
  {
    slug: "gastos-pequenos-que-destroem-orcamento",
    category: "controle",
    readMinutes: 6,
    emoji: "🔍",
    title: {
      "pt-BR": "7 gastos pequenos que acabam com seu dinheiro",
      en: "7 small expenses quietly killing your budget",
      es: "7 gastos pequeños que acaban con tu dinero",
    },
    summary: {
      "pt-BR": "Você não percebe, mas eles somam centenas de reais por mês. Descubra quais são e como cortar.",
      en: "You don't notice them, but they add up to hundreds a month. Find out which ones and how to cut.",
      es: "No los notas, pero suman cientos al mes. Descubre cuáles son y cómo cortarlos.",
    },
  },
  {
    slug: "organize-salario-em-4-partes",
    category: "organizacao",
    readMinutes: 4,
    emoji: "📊",
    title: {
      "pt-BR": "Como organizar seu salário em 4 partes",
      en: "How to split your paycheck into 4 parts",
      es: "Cómo organizar tu sueldo en 4 partes",
    },
    summary: {
      "pt-BR": "Um método simples e visual para nunca mais terminar o mês sem saber para onde foi o dinheiro.",
      en: "A simple visual method so you never end the month wondering where the money went.",
      es: "Un método visual simple para no terminar el mes sin saber a dónde fue el dinero.",
    },
  },
  {
    slug: "ideias-de-renda-extra",
    category: "renda",
    readMinutes: 7,
    emoji: "💡",
    title: {
      "pt-BR": "Ideias de renda extra para começar com pouco",
      en: "Side-income ideas you can start with little money",
      es: "Ideas de ingresos extra para empezar con poco",
    },
    summary: {
      "pt-BR": "10 ideias práticas, separadas por dificuldade, investimento e tempo necessário.",
      en: "10 practical ideas, sorted by difficulty, investment and time needed.",
      es: "10 ideas prácticas, ordenadas por dificultad, inversión y tiempo.",
    },
  },
  {
    slug: "sair-das-dividas-com-planejamento",
    category: "dividas",
    readMinutes: 8,
    emoji: "🧭",
    title: {
      "pt-BR": "Como sair das dívidas com planejamento",
      en: "How to get out of debt with a clear plan",
      es: "Cómo salir de las deudas con planificación",
    },
    summary: {
      "pt-BR": "O passo a passo realista: listar, negociar, priorizar e nunca mais voltar para o vermelho.",
      en: "A realistic step-by-step: list, negotiate, prioritize and never return to the red.",
      es: "Paso a paso realista: listar, negociar, priorizar y no volver a números rojos.",
    },
  },
  {
    slug: "livros-mudam-vida-financeira",
    category: "livros",
    readMinutes: 6,
    emoji: "📚",
    title: {
      "pt-BR": "Livros que ajudam a mudar sua vida financeira",
      en: "Books that can change your financial life",
      es: "Libros que pueden cambiar tu vida financiera",
    },
    summary: {
      "pt-BR": "Uma seleção honesta de clássicos e novidades, com o que esperar de cada um.",
      en: "An honest pick of classics and new releases, with what to expect from each.",
      es: "Una selección honesta de clásicos y novedades, con qué esperar de cada uno.",
    },
  },
];

export type Book = {
  id: string;
  slug: string;
  emoji: string;
  format: "fisico" | "pdf" | "ebook" | "curso";
  priceBRL: number;
  title: LocalizedString;
  description: LocalizedString;
};

export const BOOKS: Book[] = [
  {
    id: "meu-bolso-em-dia",
    slug: "meu-bolso-em-dia",
    emoji: "💼",
    format: "ebook",
    priceBRL: 29.9,
    title: { "pt-BR": "Meu Bolso em Dia", en: "My Wallet on Track", es: "Mi Bolsillo al Día" },
    description: {
      "pt-BR": "Guia prático para organizar sua vida financeira, controlar gastos e começar a poupar.",
      en: "A practical guide to organize your finances, control spending and start saving.",
      es: "Guía práctica para organizar tu vida financiera, controlar gastos y empezar a ahorrar.",
    },
  },
  {
    id: "poupe-mais-todo-mes",
    slug: "poupe-mais-todo-mes",
    emoji: "🪙",
    format: "pdf",
    priceBRL: 19.9,
    title: { "pt-BR": "Poupe Mais Todo Mês", en: "Save More Every Month", es: "Ahorra Más Cada Mes" },
    description: {
      "pt-BR": "Estratégias simples para economizar no dia a dia e criar disciplina financeira.",
      en: "Simple day-to-day strategies to save money and build financial discipline.",
      es: "Estrategias simples para ahorrar día a día y crear disciplina financiera.",
    },
  },
  {
    id: "renda-extra-inteligente",
    slug: "renda-extra-inteligente",
    emoji: "🚀",
    format: "curso",
    priceBRL: 24.9,
    title: { "pt-BR": "Renda Extra Inteligente", en: "Smart Side Income", es: "Ingresos Extra Inteligentes" },
    description: {
      "pt-BR": "Ideias práticas para criar fontes de renda extra com pouco investimento inicial.",
      en: "Practical ideas to build side-income sources with little upfront investment.",
      es: "Ideas prácticas para crear fuentes de ingresos extra con poca inversión inicial.",
    },
  },
];

export type IncomeIdea = {
  id: string;
  emoji: string;
  category: LocalizedString;
  investment: LocalizedString;
  difficulty: "baixa" | "media" | "alta";
  time: LocalizedString;
  title: LocalizedString;
  description: LocalizedString;
  firstSteps: LocalizedString;
  care: LocalizedString;
};

export const INCOME_IDEAS: IncomeIdea[] = [
  {
    id: "vendas-online",
    emoji: "🛒",
    difficulty: "media",
    category: { "pt-BR": "Vendas online", en: "Online sales", es: "Ventas online" },
    investment: { "pt-BR": "Baixo (R$ 100-500)", en: "Low ($30-150)", es: "Bajo ($30-150)" },
    time: { "pt-BR": "5-10h/semana", en: "5-10h/week", es: "5-10h/semana" },
    title: { "pt-BR": "Venda produtos online", en: "Sell products online", es: "Vende productos online" },
    description: {
      "pt-BR": "Use marketplaces e redes sociais para vender o que você já tem ou produtos de revenda.",
      en: "Use marketplaces and social networks to sell what you already have or resale items.",
      es: "Usa marketplaces y redes sociales para vender lo que ya tienes o productos de reventa.",
    },
    firstSteps: {
      "pt-BR": "Escolha um nicho, fotografe bem, anuncie em 2 plataformas e responda rápido.",
      en: "Pick a niche, photograph well, list on 2 platforms and reply quickly.",
      es: "Elige un nicho, fotografía bien, publica en 2 plataformas y responde rápido.",
    },
    care: {
      "pt-BR": "Cuide do estoque, prazos de envio e do atendimento ao cliente.",
      en: "Manage inventory, shipping deadlines and customer support carefully.",
      es: "Cuida el inventario, los plazos de envío y la atención al cliente.",
    },
  },
  {
    id: "afiliados",
    emoji: "🔗",
    difficulty: "media",
    category: { "pt-BR": "Afiliados", en: "Affiliates", es: "Afiliados" },
    investment: { "pt-BR": "Quase zero", en: "Almost zero", es: "Casi cero" },
    time: { "pt-BR": "10h/semana", en: "10h/week", es: "10h/semana" },
    title: { "pt-BR": "Marketing de afiliados", en: "Affiliate marketing", es: "Marketing de afiliados" },
    description: {
      "pt-BR": "Indique produtos digitais ou físicos e ganhe comissão por cada venda feita pelo seu link.",
      en: "Recommend digital or physical products and earn commission per sale through your link.",
      es: "Recomienda productos y gana comisión por cada venta hecha con tu enlace.",
    },
    firstSteps: {
      "pt-BR": "Crie conteúdo em uma rede social, escolha 1 produto e divulgue de forma honesta.",
      en: "Create content on one social channel, pick 1 product and promote it honestly.",
      es: "Crea contenido en una red social, elige 1 producto y promociónalo con honestidad.",
    },
    care: {
      "pt-BR": "Indique apenas o que você confia. Promessas exageradas destroem reputação.",
      en: "Only recommend what you trust. Hype destroys reputation.",
      es: "Recomienda solo lo que confíes. Las promesas exageradas arruinan la reputación.",
    },
  },
  {
    id: "servicos-locais",
    emoji: "🛠️",
    difficulty: "baixa",
    category: { "pt-BR": "Serviços locais", en: "Local services", es: "Servicios locales" },
    investment: { "pt-BR": "Baixo", en: "Low", es: "Bajo" },
    time: { "pt-BR": "Flexível", en: "Flexible", es: "Flexible" },
    title: { "pt-BR": "Ofereça serviços no bairro", en: "Offer services in your neighborhood", es: "Ofrece servicios en tu barrio" },
    description: {
      "pt-BR": "Pequenos consertos, jardinagem, faxina, montagem de móveis — alta demanda local.",
      en: "Small repairs, gardening, cleaning, furniture assembly — strong local demand.",
      es: "Pequeños arreglos, jardinería, limpieza, montaje de muebles — alta demanda local.",
    },
    firstSteps: {
      "pt-BR": "Defina 1 serviço, faça cartões simples e divulgue em grupos do bairro.",
      en: "Pick 1 service, print simple cards and post on neighborhood groups.",
      es: "Elige 1 servicio, haz tarjetas simples y publica en grupos del barrio.",
    },
    care: {
      "pt-BR": "Combine preço por escrito e cuide da sua segurança em casas desconhecidas.",
      en: "Agree pricing in writing and take care of your safety in unknown homes.",
      es: "Acuerda precios por escrito y cuida tu seguridad en casas desconocidas.",
    },
  },
  {
    id: "aulas-particulares",
    emoji: "🎓",
    difficulty: "baixa",
    category: { "pt-BR": "Aulas particulares", en: "Tutoring", es: "Clases particulares" },
    investment: { "pt-BR": "Quase zero", en: "Almost zero", es: "Casi cero" },
    time: { "pt-BR": "4-8h/semana", en: "4-8h/week", es: "4-8h/semana" },
    title: { "pt-BR": "Dê aulas particulares", en: "Give private classes", es: "Da clases particulares" },
    description: {
      "pt-BR": "Ensine o que você sabe: idiomas, reforço escolar, música, esportes, tecnologia.",
      en: "Teach what you know: languages, school subjects, music, sports, tech.",
      es: "Enseña lo que sabes: idiomas, refuerzo escolar, música, deportes, tecnología.",
    },
    firstSteps: {
      "pt-BR": "Defina o tema, prepare um plano básico e ofereça uma aula experimental.",
      en: "Pick a topic, prepare a basic plan and offer a trial class.",
      es: "Elige un tema, prepara un plan básico y ofrece una clase de prueba.",
    },
    care: {
      "pt-BR": "Tenha um espaço adequado e proteja seus horários de descanso.",
      en: "Have a proper space and protect your downtime.",
      es: "Ten un espacio adecuado y protege tus horarios de descanso.",
    },
  },
  {
    id: "artesanato",
    emoji: "🧵",
    difficulty: "media",
    category: { "pt-BR": "Artesanato", en: "Crafts", es: "Artesanía" },
    investment: { "pt-BR": "Médio", en: "Medium", es: "Medio" },
    time: { "pt-BR": "Variável", en: "Variable", es: "Variable" },
    title: { "pt-BR": "Crie e venda artesanato", en: "Create and sell crafts", es: "Crea y vende artesanía" },
    description: {
      "pt-BR": "Transforme hobby em renda com produtos personalizados e edições limitadas.",
      en: "Turn your hobby into income with personalized products and limited drops.",
      es: "Convierte tu hobby en ingresos con productos personalizados y ediciones limitadas.",
    },
    firstSteps: {
      "pt-BR": "Calcule custo + margem, fotografe com luz natural e abra um perfil dedicado.",
      en: "Calculate cost + margin, photograph in natural light and open a dedicated profile.",
      es: "Calcula costo + margen, fotografía con luz natural y abre un perfil dedicado.",
    },
    care: {
      "pt-BR": "Não venda abaixo do custo. Tempo também é dinheiro.",
      en: "Don't sell below cost. Your time is money too.",
      es: "No vendas por debajo del costo. Tu tiempo también vale.",
    },
  },
  {
    id: "criacao-conteudo",
    emoji: "🎥",
    difficulty: "alta",
    category: { "pt-BR": "Criação de conteúdo", en: "Content creation", es: "Creación de contenido" },
    investment: { "pt-BR": "Baixo", en: "Low", es: "Bajo" },
    time: { "pt-BR": "Alto (constância)", en: "High (consistency)", es: "Alto (constancia)" },
    title: { "pt-BR": "Crie conteúdo digital", en: "Create digital content", es: "Crea contenido digital" },
    description: {
      "pt-BR": "Construa audiência em uma plataforma e monetize com patrocínios, afiliados e produtos próprios.",
      en: "Build an audience on one platform and monetize via sponsorships, affiliates and your own products.",
      es: "Construye audiencia en una plataforma y monetiza con patrocinios, afiliados y productos propios.",
    },
    firstSteps: {
      "pt-BR": "Escolha 1 nicho, 1 formato e poste com constância por 90 dias antes de avaliar.",
      en: "Pick 1 niche, 1 format and post consistently for 90 days before judging.",
      es: "Elige 1 nicho, 1 formato y publica constante 90 días antes de evaluar.",
    },
    care: {
      "pt-BR": "Cuide da saúde mental e não compare seu começo com o meio de outras pessoas.",
      en: "Care for your mental health and don't compare your start to others' middle.",
      es: "Cuida tu salud mental y no compares tu inicio con la mitad de otros.",
    },
  },
];
