import React, { useState, useRef, useEffect } from "react";
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
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function IconNav({
  navItems,
  activeSection,
  handleNavClick,
  t,
  className,
  isDragging,
  setIsDragging,
}: {
  navItems: { href: string; key: string }[];
  activeSection: string;
  handleNavClick: (href: string, behavior?: ScrollBehavior) => void;
  t: (key: string) => string;
  className?: string;
  isDragging: boolean;
  setIsDragging: (value: boolean) => void;
}) {
  const iconMap: { [key: string]: React.ReactNode } = {
    "#home": <Home size={20} />,
    "#projects": <LayoutTemplate size={20} />,
    "#experience": <BriefcaseBusiness size={20} />,
    "#education": <GraduationCap size={20} />,
    "#technologies": <Code2 size={20} />,
    "#contact": <Mail size={20} />,
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handlePointerDown = () => {
    setIsDragging(true);
    const initialIndex = navItems.findIndex(
      (item) => item.href.substring(1) === activeSection
    );
    if (initialIndex !== -1) {
      setDraggedIndex(initialIndex);
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    if (draggedIndex !== null) {
      handleNavClick(navItems[draggedIndex].href);
    }
    setDraggedIndex(null);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;

    const container = containerRef.current;
    if (!container) return;

    const { clientX, clientY } = e;
    const rect = container.getBoundingClientRect();

    const marginY = 60;
    if (clientY < rect.top - marginY || clientY > rect.bottom + marginY) return;

    let bestIndex = -1;
    let minDist = Infinity;

    buttonsRef.current.forEach((btn, index) => {
      if (!btn) return;
      const bRect = btn.getBoundingClientRect();
      const centerX = bRect.left + bRect.width / 2;
      const dist = Math.abs(centerX - clientX);
      if (dist < minDist) {
        minDist = dist;
        bestIndex = index;
      }
    });

    if (bestIndex !== -1) {
      setDraggedIndex(bestIndex);
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex items-center gap-2 rounded-full px-2 select-none touch-none",
        "bg-muted/70 dark:bg-background/80 backdrop-blur-xl",
        "border border-border/60 shadow-[0_18px_45px_rgba(0,0,0,0.35)]",
        "overflow-visible",
        className
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
    >
      {navItems.map((item, index) => {
        const isActive = isDragging
          ? index === draggedIndex
          : activeSection === item.href.substring(1);

        return (
          <button
            key={item.href}
            type="button"
            ref={(el) => {
              buttonsRef.current[index] = el;
            }}
            onClick={() => handleNavClick(item.href)}
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
                    "bg-gradient-to-tr from-blue-400/80 via-purple-400/80 to-pink-400/80",
                    "text-white",
                    "scale-150",
                    "-my-4",
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { href: "#home", key: "nav.home" },
    { href: "#projects", key: "nav.projects" },
    { href: "#experience", key: "nav.experience" },
    { href: "#education", key: "nav.education" },
    { href: "#technologies", key: "nav.technologies" },
    { href: "#contact", key: "nav.contact" },
  ];

  const languages: { code: "es" | "en" | "bg"; label: string; name: string }[] =
    [
      { code: "es", label: "ES", name: "Español" },
      { code: "en", label: "EN", name: "English" },
      { code: "bg", label: "BG", name: "Български" },
    ];

  const currentLang =
    languages.find((l) => l.code === lang) || languages[0];

  const handleChangeLang = (code: "es" | "en" | "bg") => {
    setLang(code);
    setIsLangOpen(false);
  };

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

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
          <div className="w-40">
            {showName && (
              <Link href="/" className="text-lg font-normal tracking-tight">
                <span  className={cn(
                      "font-science-gothic whitespace-nowrap font-bold",
                      "text-transparent bg-clip-text",
                      "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500",
                      "tracking-[0.12em] text-lg sm:text-m"
                    )}>
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
              isDragging={isDragging}
              setIsDragging={setIsDragging}
              t={t}
            />
          </nav>

          {/* IDIOMA + TEMA */}
          <div className="flex items-center gap-2">
            {/* Selector de idioma (pill) */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen((open) => !open)}
                className={cn(
                  "h-9 px-3 rounded-full flex items-center justify-center gap-2",
                  "text-sm font-medium",
                  "border border-border/60 bg-background/90 backdrop-blur-md",
                  "text-foreground",
                  "hover:bg-foreground/5 dark:hover:bg-white/5",
                  "transition-colors"
                )}
                aria-label="Cambiar idioma"
              >
                <Globe size={16} />
                <span>{currentLang.label}</span>
                <ChevronDown
                  size={14}
                  className={cn(
                    "transition-transform",
                    isLangOpen ? "rotate-180" : "rotate-0"
                  )}
                />
              </button>

              {isLangOpen && (
                <div
                  className={cn(
                    "absolute right-0 mt-2 w-48 rounded-2xl overflow-hidden z-50 shadow-xl border",
                    "bg-zinc-100/95 text-zinc-900 border-zinc-300",
                    "dark:bg-background/95 dark:text-foreground dark:border-white/10",
                    "backdrop-blur-xl"
                  )}
                >
                  {languages.map((l) => {
                    const active = l.code === lang;

                    return (
                      <button
                        key={l.code}
                        onClick={() => handleChangeLang(l.code)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors",
                          active
                            ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white"
                            : "text-zinc-800 dark:text-muted-foreground hover:bg-zinc-200/90 dark:hover:bg-white/10"
                        )}
                      >
                        <span>{l.name}</span>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            active
                              ? "text-white"
                              : "text-zinc-700 dark:text-muted-foreground"
                          )}
                        >
                          {l.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Botón de tema con el mismo estilo pill */}
            <div className="h-9 w-9 rounded-full border border-border/60 bg-background/90 backdrop-blur-md flex items-center justify-center">
              <ModeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* NAV MOBILE */}
      <nav className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <IconNav
          navItems={navItems}
          activeSection={activeSection}
          handleNavClick={handleNavClick}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          t={t}
        />
      </nav>
    </>
  );
}
