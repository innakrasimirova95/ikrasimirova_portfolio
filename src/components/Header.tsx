"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/toggle-theme";
import {
  Globe,
  BriefcaseBusiness,
  GraduationCap,
  LayoutTemplate,
  Code2,
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
  onDragNavigate,
  isDragging,
}: {
  navItems: { href: string; key: string }[];
  activeSection: string;
  handleNavClick: (href: string, behavior?: ScrollBehavior) => void;
  t: (key: string) => string;
  className?: string;
  onDragNavigate: (href: string, behavior?: ScrollBehavior) => void;
  isDragging: boolean;
}) {
  const iconMap: { [key: string]: React.ReactNode } = {
    "#home": <Home size={20} />,
    "#proyectos": <LayoutTemplate size={20} />,
    "#experience": <BriefcaseBusiness size={20} />,
    "#educacion": <GraduationCap size={20} />,
    "#tecnologias": <Code2 size={20} />,
    "#contacto": <Mail size={20} />,
  };

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full px-2 select-none", 
        "bg-muted/70 dark:bg-background/80 backdrop-blur-xl",
        "border border-border/60 shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
        "overflow-visible", // permite sobresalir
        className
      )}
    >
      {navItems.map((item) => {
        const isActive = activeSection === item.href.substring(1);

        return (
          <button
            key={item.href}
            type="button"
            onClick={() => handleNavClick(item.href)}
            onMouseEnter={() => {
              if (isDragging) onDragNavigate(item.href, "auto");
            }}
            title={`${t(item.key)} · ${
              t("nav.dragHint") ?? "Click o arrastra para navegar"
            }`}
            className={cn(
              "relative flex items-center justify-center rounded-full",
              "h-10 w-10 sm:h-11 sm:w-11",
              "transition-all duration-150 text-muted-foreground/90",
              "cursor-pointer",
              isActive
                ? [
                    "bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500",
                    "text-white",
                    "scale-150", // más grande
                    "-my-4", // sobresale fuerte y pasa el borde del menú
                    "z-10",
                  ].join(" ")
                : "hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/5"
            )}
            style={{
              cursor: isDragging ? "grabbing" : "pointer",
            }}
          >
            {iconMap[item.href]}
          </button>
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
  const [isDragging, setIsDragging] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { href: "#home", key: "nav.home" },
    { href: "#proyectos", key: "nav.projects" },
    { href: "#experience", key: "nav.experience" },
    { href: "#educacion", key: "#educacion" },
    { href: "#tecnologias", key: "nav.technologies" },
    { href: "#contacto", key: "nav.contact" },
  ];

  useEffect(() => {
    const handleDown = () => setIsDragging(true);
    const handleUp = () => setIsDragging(false);

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
    };
  }, []);

  const handleNavClick = (
    href: string,
    behavior: ScrollBehavior = "smooth"
  ) => {
    if (href === "#home") {
      window.scrollTo({ top: 0, behavior });
      return;
    }

    const id = href.replace("#", "");
    const el = document.getElementById(id);
    const offset = document.querySelector("header")?.offsetHeight || 0;

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior });
    }
  };

  const cycleLang = () => {
    if (lang === "es") setLang("en");
    else if (lang === "en") setLang("bg");
    else setLang("es");
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-background/90 shadow-md backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
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
              onDragNavigate={handleNavClick}
              isDragging={isDragging}
              t={t}
            />
          </nav>

          {/* IDIOMA + TEMA */}
          <div
            className="
              relative flex items-center gap-1 rounded-full
              border border-border/60 bg-background/90 backdrop-blur-md px-1
            "
          >
            <button
              onClick={cycleLang}
              className="
                h-9 px-3 rounded-full flex items-center justify-center gap-1
                text-sm font-medium text-muted-foreground
                hover:text-foreground hover:bg-foreground/5 dark:hover:bg-white/5
                transition-colors
              "
              aria-label="Cambiar idioma"
              title={t("nav.changeLanguageHint") ?? "Cambiar idioma"}
            >
              <Globe size={16} />
              {lang.toUpperCase()}
            </button>

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
          onDragNavigate={handleNavClick}
          isDragging={isDragging}
          t={t}
        />
      </nav>
    </>
  );
}
