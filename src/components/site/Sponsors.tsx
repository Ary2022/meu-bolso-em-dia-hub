import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/lib/i18n";
import { ExternalLink, Tag } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Sponsor = Tables<"sponsors">;
type Placement = "home" | "articles" | "partners" | "footer";

function isSafeUrl(u: string) {
  try {
    const url = new URL(u);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch { return false; }
}

function trackClick(id: string) {
  // fire-and-forget
  supabase.rpc("increment_sponsor_metric", { _id: id, _metric: "click" }).then(() => {}, () => {});
}

export function useSponsors(placement: Placement) {
  const { lang } = useI18n();
  const [items, setItems] = useState<Sponsor[]>([]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase
        .from("sponsors")
        .select("*")
        .eq("placement", placement)
        .in("language", [lang, "all"])
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      if (!error && data) setItems(data);
    })();
    return () => { cancelled = true; };
  }, [placement, lang]);

  useEffect(() => {
    items.forEach(s => {
      supabase.rpc("increment_sponsor_metric", { _id: s.id, _metric: "impression" }).then(() => {}, () => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map(i => i.id).join(",")]);

  return items;
}

export function SponsorBanner({ placement }: { placement: "home" }) {
  const { t } = useI18n();
  const items = useSponsors(placement);
  if (!items.length) return null;
  const s = items[0];
  if (!isSafeUrl(s.link_url)) return null;
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl border border-border gradient-card p-6 sm:p-8 shadow-soft">
        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-warning">
          <Tag className="h-3 w-3" /> {t("sponsors.label")}
        </span>
        <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary">{s.sponsor_name}</p>
            <h3 className="mt-1 text-xl font-bold text-foreground sm:text-2xl">{s.title}</h3>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{s.description}</p>
          </div>
          <a
            href={s.link_url}
            target="_blank" rel="noopener noreferrer"
            onClick={() => trackClick(s.id)}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 shadow-soft self-start"
          >
            {s.button_text} <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export function SponsorInlineCard({ placement }: { placement: "articles" }) {
  const { t } = useI18n();
  const items = useSponsors(placement);
  if (!items.length) return null;
  const s = items[0];
  if (!isSafeUrl(s.link_url)) return null;
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-dashed border-border bg-muted/40 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-warning">{t("sponsors.label")}</span>
        <p className="mt-0.5 text-sm font-semibold text-foreground">{s.sponsor_name} — {s.title}</p>
        {s.coupon_code && (
          <p className="text-xs text-muted-foreground">{t("sponsors.coupon")}: <span className="font-mono font-semibold text-foreground">{s.coupon_code}</span></p>
        )}
      </div>
      <a
        href={s.link_url}
        target="_blank" rel="noopener noreferrer"
        onClick={() => trackClick(s.id)}
        className="shrink-0 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary hover:bg-primary/15"
      >
        {s.button_text} <ExternalLink className="h-4 w-4" />
      </a>
    </div>
  );
}

export function SponsorGrid({ items }: { items: Sponsor[] }) {
  const { t } = useI18n();
  if (!items.length) {
    return <p className="text-sm text-muted-foreground">{t("sponsors.empty")}</p>;
  }
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(s => {
        const safe = isSafeUrl(s.link_url);
        return (
          <article key={s.id} className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-wide text-warning">{t("sponsors.label")}</span>
              {s.category && <span className="text-[11px] text-muted-foreground">{s.category}</span>}
            </div>
            <div>
              <h3 className="font-display text-lg font-bold text-foreground">{s.sponsor_name}</h3>
              <p className="text-sm font-medium text-primary">{s.title}</p>
            </div>
            <p className="text-sm text-muted-foreground">{s.description}</p>
            {s.coupon_code && (
              <p className="text-xs">{t("sponsors.coupon")}: <span className="font-mono font-semibold text-foreground">{s.coupon_code}</span></p>
            )}
            {safe ? (
              <a
                href={s.link_url}
                target="_blank" rel="noopener noreferrer"
                onClick={() => trackClick(s.id)}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                {s.button_text} <ExternalLink className="h-4 w-4" />
              </a>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
