"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/ui/toggle-theme";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const navItems = [
  { href: "#proyectos", label: "<Proyectos/>" },
  { href: "#experience", label: "<Experiencia/>" },
  { href: "#educacion", label: "<Educación/>" },
  { href: "#tecnologias", label: "<Tecnologías/>" },
];

export function Header({ showName, activeSection }: { showName: boolean; activeSection: string }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetId = e.currentTarget.href.split("#")[1];
    const target = document.getElementById(targetId);
    const offset = document.querySelector("header")?.offsetHeight || 0;

    if (target) {
      const pos = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: pos, behavior: "smooth" });
    }

    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md backdrop-blur-sm">
      <div className="w-full max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT - logo (invisible placeholder when hidden) */}
        <div className="w-40 flex justify-start">
          {showName && (
            <Link href="/" className="text-lg font-semibold tracking-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
                Inna Krasimirova
              </span>
            </Link>
          )}
        </div>

        {/* CENTER - NAV ALWAYS CENTERED */}
        <nav className="hidden md:flex items-center gap-8 mx-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "text-sm font-medium relative px-2 py-1 transition-colors",
                activeSection === item.href.substring(1)
                  ? "text-foreground before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] before:bg-foreground"
                  : "text-muted-foreground hover:text-foreground hover:before:absolute hover:before:-bottom-1 hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bg-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* RIGHT - DARK MODE TOGGLE + MOBILE MENU */}
        <div className="w-40 flex justify-end items-center gap-2 md:gap-3">
          <ModeToggle />

          {/* MOBILE MENU */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="right" className="w-64 sm:w-72 p-6 bg-background/95">
                <SheetTitle className="sr-only">Navigation</SheetTitle>

                <nav className="mt-12 flex flex-col gap-4 text-center">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className={cn(
                        "block text-lg py-3 rounded-lg transition-all duration-200 hover:bg-muted-foreground/10",
                        activeSection === item.href.substring(1)
                          ? "text-foreground font-semibold"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </header>
  );
}
