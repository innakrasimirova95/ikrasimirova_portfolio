"use client";

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { es } from "@/i18n/es";
import { en } from "@/i18n/en";

type Language = "es" | "en";

// Define a type for the dictionary keys. This provides basic autocomplete.
type DictionaryKeys = keyof typeof es | keyof typeof en;

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState<Language>("es");
  const dictionaries = useMemo(() => ({ es, en }), []);

  // Effect to sync lang with documentElement for accessibility and SEO
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const storedLang = localStorage.getItem("lang") as Language;
    if (storedLang && (storedLang === "es" || storedLang === "en")) {
      setLang(storedLang);
    }
  }, []);

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("lang", newLang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let result: any = dictionaries[lang];

    for (const k of keys) {
      result = result?.[k];
      if (result === undefined) {
        // Fallback for missing keys
        console.warn(
          `Translation key "${key}" not found for language "${lang}".`
        );
        // Try to find it in the default language (es) as a fallback
        let fallbackResult: any = dictionaries.es;
        for (const fk of keys) {
          fallbackResult = fallbackResult?.[fk];
          if (fallbackResult === undefined) {
            return key; // Return the key itself if not found anywhere
          }
        }
        return fallbackResult;
      }
    }

    if (typeof result !== "string" && typeof result !== "number") {
      // If the result is an object/array (e.g., 'experience.roles'), stringify it for debugging
      // Or return a specific error message
      console.warn(
        `Translation key "${key}" for lang "${lang}" is not a string.`
      );
      return JSON.stringify(result);
    }

    return result;
  };

  const contextValue = useMemo(
    () => ({
      lang,
      setLang: handleSetLang,
      t,
    }),
    [lang] // 't' is also dependent on 'lang'
  );

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// A hook that specifically returns the dictionary object for the current language
// This is useful for iterating over arrays of data, like jobs or education history
export const useDictionary = () => {
  const { lang } = useLanguage();
  const dictionaries = { es, en };
  return dictionaries[lang];
};
