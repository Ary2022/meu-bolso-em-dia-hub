import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { dictionaries, type Lang, type Dict } from "./dictionaries";

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
  dict: Dict;
};

const Ctx = createContext<I18nCtx | null>(null);
const STORAGE_KEY = "mbed.lang";

function detectInitial(): Lang {
  if (typeof window === "undefined") return "pt-BR";
  const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (saved && ["pt-BR", "en", "es"].includes(saved)) return saved;
  const nav = window.navigator.language?.toLowerCase() ?? "pt-br";
  if (nav.startsWith("en")) return "en";
  if (nav.startsWith("es")) return "es";
  return "pt-BR";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("pt-BR");

  useEffect(() => {
    setLangState(detectInitial());
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try { window.localStorage.setItem(STORAGE_KEY, l); } catch {}
  };

  const dict = dictionaries[lang];

  const t = (path: string): string => {
    const parts = path.split(".");
    let cur: unknown = dict;
    for (const p of parts) {
      if (cur && typeof cur === "object" && p in (cur as Record<string, unknown>)) {
        cur = (cur as Record<string, unknown>)[p];
      } else {
        return path;
      }
    }
    return typeof cur === "string" ? cur : path;
  };

  return <Ctx.Provider value={{ lang, setLang, t, dict }}>{children}</Ctx.Provider>;
}

export function useI18n() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useI18n must be used inside I18nProvider");
  return v;
}
