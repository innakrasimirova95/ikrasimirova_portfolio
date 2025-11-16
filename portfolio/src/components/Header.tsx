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
    const targetId = e.currentTarget.href.split('#')[1];
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const headerOffset = document.querySelector('header')?.offsetHeight || 0;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-md backdrop-blur-sm">
      <div className={cn(
        "container mx-auto flex items-center justify-between px-6 py-4",
        showName ? "justify-between" : "justify-center"
      )}>
        {/* Logo */}
        {showName && (
          <Link href="/" className="text-lg font-semibold tracking-tight text-primary hover:opacity-90 transition mr-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              Inna Krasimirova
            </span>
          </Link>
        )}

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={handleNavClick}
              className={cn(
                "text-sm font-medium transition-colors relative px-2 py-1",
                activeSection === item.href.substring(1)
                  ? "text-foreground before:absolute before:-bottom-1 before:left-0 before:w-full before:h-[2px] before:bg-foreground"
                  : "text-muted-foreground hover:text-foreground hover:before:absolute hover:before:-bottom-1 hover:before:left-0 hover:before:w-full hover:before:h-[2px] hover:before:bg-foreground before:opacity-0 hover:before:opacity-100"
              )}
            >
              {item.label}
            </Link>
          ))}
          <ModeToggle />
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center gap-2">
          <ModeToggle />
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 sm:w-72 p-6 bg-background/95 backdrop-blur-md shadow-xl rounded-l-xl transition-transform duration-300 ease-in-out"
            >
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <nav className="mt-12 flex flex-col gap-4 text-center">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      "block text-lg font-medium py-3 rounded-lg transition-all duration-200 hover:bg-muted-foreground/10",
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
    </header>
  );
}
