"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Menu, X } from "lucide-react";

const navItems = [
  { href: "#proyectos", label: "<Proyectos/>" },
  { href: "#experience", label: "<Experiencia/>" },
  { href: "#educacion", label: "<Educación/>" },
  { href: "#tecnologias", label: "<Tecnologías/>" },
  { href: "#contacto", label: "<Contacto/>" },
];

export function Header({
  showName,
  activeSection,
}: {
  showName: boolean;
  activeSection: string;
}) {
  const [open, setOpen] = React.useState(false);

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

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <div className="w-40">
          {showName && (
            <Link href="/" className="text-lg font-normal tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                Inna Krasimirova
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
                  ? // estado ACTIVO (sección actual)
                    "text-foreground before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:w-10 before:h-[2px] before:bg-gradient-to-r before:from-blue-500 before:via-purple-600 before:to-pink-500"
                  : // estado INACTIVO (hover + active para desktop/móvil)
                    "text-foreground " +
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
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="w-40 flex justify-end items-center gap-2">
          <ModeToggle />

          {/* BOTÓN MENÚ MÓVIL */}
          <button
            className="lg:hidden p-2 rounded-md hover:bg-muted/30 active:bg-muted/30 transition-colors"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* MENÚ DESPLEGABLE MÓVIL */}
          {open && (
            <div
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
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
