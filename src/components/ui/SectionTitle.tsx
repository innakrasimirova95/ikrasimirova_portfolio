import React from "react";
import { cn } from "@/lib/utils";

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const SectionTitle = ({
  children,
  className,
  ...props
}: SectionTitleProps) => {
  return (
    <div className="w-full mb-10 flex flex-col items-center">
      {/* Estilos y animaciones inline */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient-shift {
            background-size: 200% 100%;
            animation: gradientShift 4s ease-in-out infinite;
          }
        `}
      </style>

      <h2
        className={cn(
          "text-center text-[1.6rem] sm:text-[2.3rem]",
          "font-extralight tracking-[0.45em]",
          "uppercase",
          "bg-gradient-to-r from-blue-300 via-purple-400 to-pink-400",
          "bg-clip-text text-transparent",
          "animate-gradient-shift",
          "drop-shadow-[0_0_12px_rgba(150,140,255,0.25)]",
          className
        )}
        {...props}
      >
        {children}
      </h2>

      {/* Línea animada */}
      <div className="relative mt-0 h-[1.5px] w-24 md:w-32 lg:w-40 overflow-hidden rounded-full">
        <div
          className="
            h-full w-full
            bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500
            animate-gradient-shift
            opacity-80
          "
        />
      </div>
    </div>
  );
};
