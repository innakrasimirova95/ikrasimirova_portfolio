import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "sticky top-0 z-10 bg-background py-4 text-2xl sm:text-4xl font-normal mb-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent md:ml-[-1.5rem]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
