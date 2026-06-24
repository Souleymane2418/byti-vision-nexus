import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Globe, Check } from "lucide-react";
import { SUPPORTED_LANGS, type LangCode } from "@/i18n";

interface Props {
  variant?: "navbar" | "mobile";
}

export function LanguageSwitcher({ variant = "navbar" }: Props) {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Sync from localStorage after mount (SSR-safe).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("byti.lang") as LangCode | null;
    if (saved && saved !== i18n.language) {
      void i18n.changeLanguage(saved);
    }
  }, [i18n]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const current =
    SUPPORTED_LANGS.find((l) => l.code === i18n.language) ?? SUPPORTED_LANGS[0];

  function pick(code: LangCode) {
    void i18n.changeLanguage(code);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("byti.lang", code);
      document.documentElement.lang = code;
    }
    setOpen(false);
  }

  if (variant === "mobile") {
    return (
      <div className="flex flex-wrap gap-2 pt-2">
        {SUPPORTED_LANGS.map((l) => {
          const active = l.code === current.code;
          return (
            <button
              key={l.code}
              onClick={() => pick(l.code)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                active
                  ? "bg-byti-yellow text-byti-blue-deep border-byti-yellow"
                  : "border-white/20 text-white/80 hover:border-byti-yellow hover:text-byti-yellow"
              }`}
            >
              <span className="mr-1">{l.flag}</span>
              {l.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold text-white/85 hover:text-byti-yellow border border-white/20 hover:border-byti-yellow transition-colors"
        aria-label="Change language"
      >
        <Globe size={14} />
        <span>{current.flag}</span>
        <span className="hidden lg:inline uppercase tracking-wider">
          {current.code}
        </span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 min-w-[160px] rounded-xl bg-byti-blue-deep border border-white/15 shadow-xl overflow-hidden z-50">
          {SUPPORTED_LANGS.map((l) => {
            const active = l.code === current.code;
            return (
              <button
                key={l.code}
                onClick={() => pick(l.code)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2 text-sm text-white/85 hover:bg-white/10 hover:text-byti-yellow transition-colors"
              >
                <span className="flex items-center gap-2">
                  <span>{l.flag}</span>
                  <span>{l.label}</span>
                </span>
                {active && <Check size={14} className="text-byti-yellow" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
