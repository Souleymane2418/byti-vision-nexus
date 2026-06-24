import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import fr from "./locales/fr.json";
import en from "./locales/en.json";
import zh from "./locales/zh.json";

export const SUPPORTED_LANGS = [
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
] as const;

export type LangCode = (typeof SUPPORTED_LANGS)[number]["code"];

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      zh: { translation: zh },
    },
    // SSR-safe: always start in fr; client switches after mount.
    lng: "fr",
    fallbackLng: "fr",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export default i18n;
