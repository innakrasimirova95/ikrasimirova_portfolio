"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/toggle-theme";
import {
  Globe,
  Briefcase,
  GraduationCap,
  FolderKanban,
  Cpu,
  Mail,
  Home,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function IconNav({
  navItems,
  activeSection,
  handleNavClick,
  t,
  className,
}: {
  navItems: { href: string; key: string }[];
  activeSection: string;
  handleNavClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  t: (key: string) => string;
  className?: string;
}) {
  const iconMap: { [key: string]: React.ReactNode } = {
    "#": <Home size={20} />,
    "#proyectos": <FolderKanban size={20} />,
    "#experience": <Briefcase size={20} />,
    "#educacion": <GraduationCap size={20} />,
    "#tecnologias": <Cpu size={20} />,
    "#contacto": <Mail size={20} />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-3 py-2",
        "bg-muted/70 dark:bg-background/80",
        "backdrop-blur-xl border border-border/60",
        "shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
        className
      )}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.href.substring(1) ||
          (item.href === "#" && activeSection === "");

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleNavClick}
            title={t(item.key)}
            className={cn(
              "relative flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full",
              "transition-all duration-250 ease-out",
              "text-muted-foreground/90",
              !isActive && "hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/5",
              isActive &&
                "bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 text-white shadow-[0_0_18px_rgba(168,85,247,0.7)] scale-[1.06]"
            )}
          >
            {iconMap[item.href]}
          </Link>
        );
      })}
    </div>
  );
}

export function Header({
  showName,
  activeSection,
}: {
  showName: boolean;
  activeSection: string;
}) {
  const [langMenuOpen, setLangMenuOpen] = React.useState(false);
  const { lang, setLang, t } = useLanguage();

  const langMenuRef = useRef<HTMLDivElement>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);

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
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { href: "#", key: "nav.home" },
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
    const href = e.currentTarget.href;

    if (href.endsWith("#")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetId = href.split("#")[1];
    const target = document.getElementById(targetId);
    const offset = document.querySelector("header")?.offsetHeight || 0;

    if (target) {
      const top =
        target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const toggleLangMenu = () => {
    setLangMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/90 shadow-md backdrop-blur-sm">
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
          <nav className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <IconNav
              navItems={navItems}
              activeSection={activeSection}
              handleNavClick={handleNavClick}
              t={t}
            />
          </nav>

          {/* CLUSTER IDIOMA + TEMA */}
          <div
            className="
              relative
              flex items-center gap-1
              rounded-full border border-border/60 bg-background/90
              backdrop-blur-md px-1
            "
          >
            {/* Botón idioma → abre dropdown */}
            <button
              ref={langBtnRef}
              onClick={toggleLangMenu}
              className="
                h-9 px-3 rounded-full
                flex items-center justify-center gap-1
                text-sm font-medium
                text-muted-foreground hover:text-foreground
                transition-colors hover:bg-foreground/5 dark:hover:bg-white/5
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
                  absolute right-0 top-11
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
          </div>
        </div>
      </header>

      {/* NAV MOBILE */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <IconNav
          navItems={navItems}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          t={t}
        />
      </nav>
    </>
  );
}
