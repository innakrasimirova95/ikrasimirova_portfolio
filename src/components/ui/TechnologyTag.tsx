"use client";

import { cn } from "@/lib/utils";

type TechnologyTagProps = {
  name: string;
  className?: string;
};

export const TechnologyTag = ({ name, className }: TechnologyTagProps) => {
  return (
    <span
      className={cn(
        "font-medium px-3 py-1 rounded-full text-[11px] transition-colors duration-300",
        // Texto: Negro en claro, Blanco en oscuro
        "text-black dark:text-white",
        // Borde: Gris en claro, Transparente/Blanco en oscuro
        "border border-gray-300 dark:border-white/20",
        // Sombra suave adaptativa
        "shadow-[0_0_6px_rgba(0,0,0,0.05)] dark:shadow-[0_0_8px_rgba(168,85,247,0.15)]",
        className
      )}
    >
      {name}
    </span>
  );
};
