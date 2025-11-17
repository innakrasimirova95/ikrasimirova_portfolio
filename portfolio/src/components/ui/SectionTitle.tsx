import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  return (
    <h2
      className={cn(
        "text-4xl font-small mb-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent ml-[-1.5rem]",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};
