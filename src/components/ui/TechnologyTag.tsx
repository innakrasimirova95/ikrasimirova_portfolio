"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type TechnologyTagProps = {
  name: string;
  className?: string;
};

export const TechnologyTag = ({ name, className }: TechnologyTagProps) => {
  const { theme } = useTheme();

  return (
    <span
      className={cn(
        "font-medium px-3 py-1 rounded-full text-[11px]",
        theme === "dark"
          ? "text-white border border-white/20 shadow-[0_0_6px_rgba(180,76,255,0.20)]"
          : "text-black border border-gray-300 shadow-[0_0_6px_rgba(0,0,0,0.1)]",
        className
      )}
    >
      {name}
    </span>
  );
};
