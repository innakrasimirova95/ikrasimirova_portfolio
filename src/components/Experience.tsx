import React, { useState } from "react";
import {
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
} from "react-icons/hi";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage, useDictionary } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export const Experience = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const experienceData = dictionary.experience.roles;

  const [activeIndex, setActiveIndex] = useState<number | null>(0); // Open the first item by default

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="experiencia"
      ref={ref}
      className="scroll-mt-24 py-16"
      aria-labelledby="experience-title"
    >
      <SectionTitle id="experience-title">{t("experience.title")}</SectionTitle>

      <div className="relative max-w-6xl mx-auto mt-10 pb-4">
        {/* Línea vertical del timeline */}
        <div
          className="
            hidden sm:block
            absolute left-6 top-0 bottom-0
            w-px
            bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-pink-500/60
          "
          aria-hidden="true"
        />

        <div className="space-y-10">
          {experienceData.map((job, i) => {
            const isActive = activeIndex === i;

            return (
              <article
                key={i}
                aria-labelledby={`job-${i}-role`}
                className="relative pl-10 sm:pl-16"
              >
                {/* Nodo del timeline */}
                <span
                  className={cn(
                    "absolute left-4 sm:left-5 top-3 z-10",
                    "w-3 h-3 rounded-full",
                    "bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500",
                    "shadow-[0_0_18px_rgba(168,85,247,0.9)]",
                    "transition-transform duration-300",
                    isActive && "scale-110"
                  )}
                  aria-hidden="true"
                />

                {/* Tarjeta de experiencia */}
                <div
                  className={cn(
                    "rounded-2xl border border-gray-300 dark:border-border",
                    "bg-secondary shadow-sm",
                    "dark:bg-gradient-to-br dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-900/40",
                    "backdrop-blur-xl",
                    "transition-shadow duration-300",
                    isActive && "shadow-md dark:shadow-[0_18px_45px_rgba(15,23,42,0.9)]"
                  )}
                >
                  <header
                    role="button"
                    tabIndex={0}
                    onClick={() => handleToggle(i)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      (e.preventDefault(), handleToggle(i))
                    }
                    className="group cursor-pointer px-5 py-4 sm:px-7 sm:py-5"
                  >
                    <h3
                      id={`job-${i}-role`}
                      className="text-lg sm:text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors"
                    >
                      {job.role}
                    </h3>
                    <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                      <p className="flex items-center gap-2">
                        <HiOutlineOfficeBuilding className="w-5 h-5" />
                        <span>{job.company}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <HiOutlineCalendar className="w-5 h-5" />
                        <time dateTime={job.period}>{job.period}</time>
                      </p>
                    </div>
                  </header>

                  {/* Descripción (colapsable) */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isActive ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="border-t border-border/80 px-5 py-4 sm:px-7 sm:py-5">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Experience.displayName = "Experience";