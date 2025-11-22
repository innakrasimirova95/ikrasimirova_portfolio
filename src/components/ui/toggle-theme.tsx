"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

export function ModeToggle() {
  const { theme, setTheme } = useTheme(); // Get current theme

  const { t } = useLanguage(); // Initialize useLanguage for translations

  const handleThemeToggle = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button
      onClick={handleThemeToggle} // Direct toggle on click
      className="
        relative
        flex items-center justify-center
        w-10 h-10
        rounded-full
        border border-border/50
        bg-background/40
        backdrop-blur-sm
        hover:bg-background/60
        active:bg-background/70
        transition-all
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
      "
      aria-label={t("nav.toggleTheme")} // Translate aria-label
      title={t("nav.toggleTheme")} // Translate title
    >
      {/* ICONOS */}
      <Sun
        className="
          h-5 w-5 rotate-0 scale-100 transition-all
          dark:-rotate-90 dark:scale-0
        "
      />
      <Moon
        className="
          absolute h-5 w-5 rotate-90 scale-0 transition-all
          dark:rotate-0 dark:scale-100
        "
      />
    </button>
  );
}
