import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SectionTitle = ({ children, className, ...props }: SectionTitleProps) => {
  return (
    <div className="sticky top-0 z-10 bg-background py-4 mb-8">
      <h2
        className={cn(
          "text-2xl sm:text-4xl font-normal bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent md:ml-[-1.5rem] text-center md:text-left",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    </div>
  );
};
