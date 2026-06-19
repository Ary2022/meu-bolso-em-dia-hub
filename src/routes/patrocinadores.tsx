import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { SponsorGrid } from "@/components/site/Sponsors";
import type { Tables } from "@/integrations/supabase/types";

export const Route = createFileRoute("/patrocinadores")({
  head: () => ({
    meta: [
      { title: "Parceiros e Patrocinadores — Meu Bolso em Dia" },
      { name: "description", content: "Conheça os parceiros e patrocinadores que apoiam a educação financeira no Meu Bolso em Dia." },
      { property: "og:title", content: "Parceiros e Patrocinadores" },
      { property: "og:description", content: "Marcas que apoiam educação financeira simples e prática." },
      { property: "og:url", content: "/patrocinadores" },
    ],
    links: [{ rel: "canonical", href: "/patrocinadores" }],
  }),
  component: SponsorsPage,
});

function SponsorsPage() {
  const { t, lang } = useI18n();
  const [items, setItems] = useState<Tables<"sponsors">[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("sponsors").select("*")
        .in("language", [lang, "all"])
        .order("sort_order", { ascending: true });
      if (!cancelled && data) setItems(data);
    })();
    return () => { cancelled = true; };
  }, [lang]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <header className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold text-foreground sm:text-4xl">{t("sponsors.title")}</h1>
        <p className="mt-3 text-muted-foreground">{t("sponsors.subtitle")}</p>
      </header>

      <div className="mt-10">
        <SponsorGrid items={items} />
      </div>

      <div className="mt-12 rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center">
        <p className="text-sm text-muted-foreground">{t("sponsors.becomePartner")}</p>
        <Link to="/contato" className="mt-3 inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90">
          {t("nav.contact")}
        </Link>
      </div>
    </div>
  );
}
