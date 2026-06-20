import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Instagram } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import logoAsset from "@/assets/logo-meubolsoemdia.jpg.asset.json";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logoAsset.url} alt={t("brand")} className="h-10 w-auto rounded-md" />
              <span className="font-display text-lg font-bold">{t("brand")}</span>
            </div>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">{t("footer.description")}</p>
            <div className="mt-4 flex items-center gap-2">
              <a href="mailto:contato@meubolsoemdia.com" aria-label="Email" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary">
                <Mail className="h-4 w-4" />
              </a>
              <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary">
                <MessageCircle className="h-4 w-4" />
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border hover:bg-secondary">
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("nav.home")}</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/dicas" className="text-muted-foreground hover:text-foreground">{t("nav.tips")}</Link></li>
              <li><Link to="/livros" className="text-muted-foreground hover:text-foreground">{t("nav.books")}</Link></li>
              <li><Link to="/renda-extra" className="text-muted-foreground hover:text-foreground">{t("nav.income")}</Link></li>
              <li><Link to="/patrocinadores" className="text-muted-foreground hover:text-foreground">{t("nav.sponsors")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground">{t("common.info")}</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><Link to="/sobre" className="text-muted-foreground hover:text-foreground">{t("nav.about")}</Link></li>
              <li><Link to="/contato" className="text-muted-foreground hover:text-foreground">{t("nav.contact")}</Link></li>
              <li><Link to="/faq" className="text-muted-foreground hover:text-foreground">{t("footer.faq")}</Link></li>
              <li><Link to="/privacidade" className="text-muted-foreground hover:text-foreground">{t("footer.privacy")}</Link></li>
              <li><Link to="/termos" className="text-muted-foreground hover:text-foreground">{t("footer.terms")}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {year} {t("brand")} · meubolsoemdia.com · {t("footer.rights")}</p>
          <p>{t("common.madeWith")}</p>
        </div>
      </div>
    </footer>
  );
}
