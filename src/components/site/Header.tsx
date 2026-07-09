import { useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { LangSwitcher } from "./LangSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import logoAsset from "@/assets/logo-meubolsoemdia.jpg.asset.json";

const NAV = [
  { to: "/", key: "nav.home" },
  { to: "/dicas", key: "nav.tips" },
  { to: "/livros", key: "nav.books" },
  { to: "/renda-extra", key: "nav.income" },
  { to: "/patrocinadores", key: "nav.sponsors" },
  { to: "/sobre", key: "nav.about" },
  { to: "/contato", key: "nav.contact" },
] as const;

export function Header() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <img src={logoAsset.url} alt={t("brand")} className="h-10 w-auto rounded-md" />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="font-display text-base font-bold text-foreground">{t("brand")}</span>
            <span className="text-[11px] text-muted-foreground">{t("tagline")}</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map(n => {
            const active = location.pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active ? "text-primary bg-secondary" : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"
                }`}
              >
                {t(n.key)}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2">
            <Link to="/app"
              
              className="hidden sm:inline-flex items-center rounded-full border border-border px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {t("nav.openApp")}
            </Link>
            <Link
              to="/contato"
              className="inline-flex items-center rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-soft"
            >
              {t("nav.start")}
            </Link>
          </div>
          <ThemeToggle />
          <LangSwitcher />
          <button
            type="button"
            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border"
            aria-label="Menu"
            onClick={() => setOpen(v => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {NAV.map(n => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-2 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t(n.key)}
              </Link>
            ))}
            <Link to="/app"
              
              className="px-2 py-2 rounded-md text-sm font-medium text-foreground hover:bg-secondary"
            >
              {t("nav.openApp")}
            </Link>
            <Link
              to="/contato"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              {t("nav.start")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
