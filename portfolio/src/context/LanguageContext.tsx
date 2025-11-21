"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { es } from "@/i18n/es";
import { en } from "@/i18n/en";
import { bg } from "@/i18n/bg";

type Language = "es" | "en" | "bg";

type Dictionary = typeof es; // asumimos misma forma para es/en/bg

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const dictionaries: Record<Language, Dictionary> = { es, en, bg };

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// helper para resolver una clave tipo "nav.projects"
const resolveKey = (dict: Dictionary, keys: string[]): unknown => {
  return keys.reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object" && k in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, dict);
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<Language>("es");

  // sincronizar <html lang="">
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // leer de localStorage al montar
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language | null;
    if (storedLang === "es" || storedLang === "en" || storedLang === "bg") {
      setLang(storedLang);
    }
  }, []);

  const handleSetLang = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  }, []);

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".");

      // 1) idioma actual
      let value = resolveKey(dictionaries[lang], keys);

      // 2) fallback ES y luego EN
      if (value === undefined) {
        console.warn(
          `Translation key "${key}" not found for language "${lang}", trying fallbacks.`
        );

        value =
          resolveKey(dictionaries.es, keys) ??
          resolveKey(dictionaries.en, keys);

        if (value === undefined) {
          return key;
        }
      }

      if (typeof value === "string" || typeof value === "number") {
        return String(value);
      }

      console.warn(
        `Translation key "${key}" for lang "${lang}" is not a string/number.`
      );
      return key;
    },
    [lang]
  );

  const contextValue = useMemo(
    () => ({
      lang,
      setLang: handleSetLang,
      t,
    }),
    [lang, handleSetLang, t]
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const useDictionary = () => {
  const { lang } = useLanguage();
  return dictionaries[lang];
};
