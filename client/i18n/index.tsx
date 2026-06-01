import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  Lang,
  SUPPORTED_LANGS,
  STORAGE_KEY,
  LEGACY_LANG_MAP,
  languages,
  pecsLanguages,
} from "./languages";
import { translations } from "./translations";

export type { Lang };
export { languages, pecsLanguages, SUPPORTED_LANGS, STORAGE_KEY };

function get(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((o, k) => {
    if (o && typeof o === "object" && k in (o as Record<string, unknown>)) {
      return (o as Record<string, unknown>)[k];
    }
    return undefined;
  }, obj);
}

function resolveStoredLang(raw: string | null): Lang {
  if (!raw) return "en";
  if (SUPPORTED_LANGS.includes(raw as Lang)) return raw as Lang;
  if (raw in LEGACY_LANG_MAP) return LEGACY_LANG_MAP[raw];
  return "en";
}

export interface I18nContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: (key: string) => any;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    return resolveStoredLang(localStorage.getItem(STORAGE_KEY));
  });

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
  };

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(
    () => (key: string) => {
      const tree = translations[lang] as Record<string, unknown>;
      const enTree = translations.en as Record<string, unknown>;
      return get(tree, key) ?? get(enTree, key) ?? key;
    },
    [lang],
  );

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
