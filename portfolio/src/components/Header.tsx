"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export function Header({
  showName,
  activeSection,
}: {
  showName: boolean;
  activeSection: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const { lang, setLang, t } = useLanguage();

  const langMenuRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const mobileBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        langMenuRef.current &&
        !langMenuRef.current.contains(event.target as Node) &&
        langBtnRef.current &&
        !langBtnRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
      if (
        mobileNavRef.current &&
        !mobileNavRef.current.contains(event.target as Node) &&
        mobileBtnRef.current &&
        !mobileBtnRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: "#proyectos", key: "nav.projects" },
    { href: "#experience", key: "nav.experience" },
    { href: "#educacion", key: "nav.education" },
    { href: "#tecnologias", key: "nav.technologies" },
    { href: "#contacto", key: "nav.contact" },
  ];

  const languages = ["es", "en", "bg"] as const;
  const languageLabels: Record<(typeof languages)[number], string> = {
    es: "ES",
    en: "EN",
    bg: "BG",
  };
  const languageNames: Record<(typeof languages)[number], string> = {
    es: "Español",
    en: "English",
    bg: "Български",
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const targetId = e.currentTarget.href.split("#")[1];
    const target = document.getElementById(targetId);
    const offset = document.querySelector("header")?.offsetHeight || 0;

    if (target) {
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }

    setOpen(false);
  };

  const toggleLangMenu = () => {
    setOpen(false);
    setLangMenuOpen((prev) => !prev);
  };

  const toggleMobileMenu = () => {
    setLangMenuOpen(false);
    setOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <div className="w-40">
          {showName && (
            <Link href="/" className="text-lg font-normal tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                {t("common.fullName")}
              </span>
            </Link>
          )}
        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden lg:flex items-center gap-8 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "text-sm font-medium relative px-2 py-1 transition-colors",
                activeSection === item.href.substring(1)
                  ? "text-foreground before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-10 before:h-[2px] before:bg-gradient-to-r before:from-blue-500 before:via-purple-600 before:to-pink-500"
                  : "text-foreground " +
                      "hover:text-foreground active:text-foreground " +
                      "hover:before:absolute active:before:absolute " +
                      "hover:before:-bottom-1 active:before:-bottom-1 " +
                      "hover:before:left-1/2 active:before:left-1/2 " +
                      "hover:before:-translate-x-1/2 active:before:-translate-x-1/2 " +
                      "hover:before:w-10 active:before:w-10 " +
                      "hover:before:h-[2px] active:before:h-[2px] " +
                      "hover:before:bg-gradient-to-r active:before:bg-gradient-to-r " +
                      "hover:before:from-blue-500 active:before:from-blue-500 " +
                      "hover:before:via-purple-600 active:before:via-purple-600 " +
                      "hover:before:to-pink-500 active:before:to-pink-500"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* CLUSTER IDIOMA + TEMA + MENÚ */}
        <div
          className="
            relative
            flex items-center gap-0.5
            rounded-full border border-border/60 bg-background/90 backdrop-blur-md
            w-auto pr-1
          "
        >
          {/* Botón idioma → abre dropdown */}
          <button
            ref={langBtnRef}
            onClick={toggleLangMenu}
            className="
              h-9 px-3 rounded-full
              flex items-center justify-center gap-1
              text-sm font-medium transition-colors
              hover:bg-muted/30 active:bg-muted/30
            "
            aria-haspopup="listbox"
            aria-expanded={langMenuOpen}
            aria-label="Cambiar idioma"
          >
            <Globe size={16} />
            {languageLabels[lang as (typeof languages)[number]]}
          </button>

          {/* Dropdown de idiomas */}
          {langMenuOpen && (
            <div
              ref={langMenuRef}
              className="
                absolute right-[72px] top-11
                w-40 rounded-2xl border border-border/70
                bg-background/95 backdrop-blur-xl
                shadow-[0_18px_45px_rgba(0,0,0,0.55)]
                py-2 z-50
              "
              role="listbox"
            >
              {languages.map((code) => {
                const isActive = code === lang;
                return (
                  <button
                    key={code}
                    type="button"
                    onClick={() => {
                      setLang(code);
                      setLangMenuOpen(false);
                    }}
                    className={cn(
                      "w-full px-3 py-1.5 text-left text-xs flex items-center justify-between gap-2",
                      "hover:bg-muted/20 active:bg-muted/20",
                      isActive && "font-semibold text-foreground"
                    )}
                    role="option"
                    aria-selected={isActive}
                  >
                    <span>
                      {languageLabels[code]} · {languageNames[code]}
                    </span>
                    {isActive && (
                      <span className="h-2 w-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          <ModeToggle />

          {/* BOTÓN MENÚ MÓVIL */}
          <button
            ref={mobileBtnRef}
            className="
              h-9 w-9 rounded-full lg:hidden
              flex items-center justify-center
              transition-colors
              hover:bg-muted/30 active:bg-muted/30
            "
            onClick={toggleMobileMenu}
            aria-label="Abrir menú"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MENÚ DESPLEGABLE MÓVIL */}
        {open && (
          <div
            ref={mobileNavRef}
            className="
              absolute right-6 top-[60px]
              w-56 py-3
              rounded-2xl
              bg-background/90
              backdrop-blur-xl
              border border-border/60
              shadow-[0_18px_45px_rgba(0,0,0,0.55)]
              flex flex-col gap-1
            "
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={cn(
                    "relative flex items-center gap-2 px-4 py-2 text-sm text-left rounded-xl transition-all",
                    "hover:bg-muted/20 active:bg-muted/20",
                    "text-foreground"
                  )}
                >
                  {isActive && (
                    <span className="h-6 w-[2px] rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500" />
                  )}
                  <span
                    className={cn(
                      "flex-1",
                      isActive &&
                        "font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                    )}
                  >
                    {t(item.key)}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
