export type Lang = "en" | "tk" | "uz" | "kk" | "ky" | "tg";

export const SUPPORTED_LANGS: Lang[] = ["en", "tk", "uz", "kk", "ky", "tg"];

export const STORAGE_KEY = "hs_lang";

/** @deprecated legacy code stored as tm */
export const LEGACY_LANG_MAP: Record<string, Lang> = {
  tm: "tk",
  ru: "en",
  ms: "en",
};

export const languages: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "tk", label: "Türkmençe" },
  { code: "uz", label: "O‘zbekcha" },
  { code: "kk", label: "Қазақша" },
  { code: "ky", label: "Кыргызча" },
  { code: "tg", label: "Тоҷикӣ" },
];

export const pecsLanguages: { code: Lang; label: string }[] = languages;
