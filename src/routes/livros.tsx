import { createFileRoute } from "@tanstack/react-router";
import { ShoppingBag, Info } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { BOOKS } from "@/lib/content";

export const Route = createFileRoute("/livros")({
  head: () => ({
    meta: [
      { title: "Livros e e-books de educação financeira — Meu Bolso em Dia" },
      { name: "description", content: "Livros, e-books e cursos práticos para organizar seu dinheiro, poupar mais e criar renda extra." },
      { property: "og:title", content: "Livros e e-books de educação financeira" },
      { property: "og:description", content: "Materiais práticos para transformar sua vida financeira." },
      { property: "og:url", content: "https://meubolsoemdia.com/livros" },
    ],
    links: [{ rel: "canonical", href: "https://meubolsoemdia.com/livros" }],
  }),
  component: BooksPage,
});

const WHATSAPP_NUMBER = "5500000000000"; // placeholder

function priceBRLToString(v: number, lang: string) {
  const locale = lang === "en" ? "en-US" : lang === "es" ? "es-ES" : "pt-BR";
  const currency = lang === "en" ? "USD" : lang === "es" ? "EUR" : "BRL";
  // simple visual price keep BRL for PT; convert nominal for others
  const v2 = currency === "BRL" ? v : Math.round(v / 5 * 100) / 100;
  return new Intl.NumberFormat(locale, { style: "currency", currency }).format(v2);
}

function BooksPage() {
  const { t, lang, dict } = useI18n();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("books.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("books.subtitle")}</p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {BOOKS.map(book => {
          const title = book.title[lang];
          const desc = book.description[lang];
          const msg = dict.books.whatsappMsg.replace("{title}", title);
          const buyUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
          return (
            <article key={book.id} className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
              <div className="relative h-56 gradient-hero flex items-center justify-center text-7xl">
                <span aria-hidden>{book.emoji}</span>
                <span className="absolute left-3 top-3 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {dict.books.formats[book.format]}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
                <div className="mt-5 flex items-baseline justify-between">
                  <span className="text-2xl font-bold text-primary">{priceBRLToString(book.priceBRL, lang)}</span>
                  <span className="text-xs text-muted-foreground">{t("books.format")}: {dict.books.formats[book.format]}</span>
                </div>
                <div className="mt-5 flex gap-2">
                  <a
                    href={buyUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90 shadow-soft"
                  >
                    <ShoppingBag className="h-4 w-4" /> {t("books.buy")}
                  </a>
                  <a
                    href={buyUrl}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-full border border-border px-3 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary"
                  >
                    <Info className="h-4 w-4" /> {t("books.more")}
                  </a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
