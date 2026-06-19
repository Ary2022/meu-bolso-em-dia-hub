import { useState } from "react";
import { Languages, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/dictionaries";

const OPTIONS: { code: Lang; label: string; flag: string }[] = [
  { code: "pt-BR", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function LangSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const current = OPTIONS.find(o => o.code === lang)!;

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        aria-label={t("common.selectLanguage")}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
      >
        <Languages className="h-4 w-4" />
        <span>{current.flag}</span>
        <span className="hidden sm:inline">{current.label}</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-lg border border-border bg-popover py-1 shadow-soft z-50">
          {OPTIONS.map(o => (
            <button
              key={o.code}
              type="button"
              onMouseDown={() => { setLang(o.code); setOpen(false); }}
              className="flex w-full items-center justify-between px-3 py-2 text-sm hover:bg-secondary"
            >
              <span className="flex items-center gap-2"><span>{o.flag}</span>{o.label}</span>
              {o.code === lang && <Check className="h-4 w-4 text-accent" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
