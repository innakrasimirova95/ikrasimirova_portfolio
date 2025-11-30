import React, { useState } from "react";
import {
  HiOutlineOfficeBuilding,
  HiOutlineCalendar,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage, useDictionary } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export const Experience = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const experienceData = dictionary.experience.roles;

  const [activeIndex, setActiveIndex] = useState<number | null>(null); // All items collapsed by default

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-24 py-16"
      aria-labelledby="experience-title"
    >
      <SectionTitle id="experience-title">{t("experience.title")}</SectionTitle>

      <div className="relative max-w-6xl mx-auto mt-10 pb-4 px-4 sm:px-0">
        {/* Línea vertical del timeline (solo desktop) */}
        <div
          className="
            hidden sm:block
            absolute left-6 top-0 bottom-0
            w-px
            bg-gradient-to-b from-blue-500/60 via-purple-500/40 to-pink-500/60
          "
          aria-hidden="true"
        />

        <div className="space-y-8 sm:space-y-10">
          {experienceData.map((job, i) => {
            const isActive = activeIndex === i;

            return (
              <article
                key={i}
                aria-labelledby={`job-${i}-role`}
                className="relative pl-8 pr-1 sm:pl-16 sm:pr-0"
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
                    "group rounded-2xl border border-gray-300 dark:border-border",
                    "bg-secondary shadow-sm",
                    "dark:bg-gradient-to-br dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-900/40",
                    "backdrop-blur-xl",
                    "transition-all duration-300",
                    "hover:-translate-y-[2px] hover:shadow-md dark:hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)]",
                    isActive && "shadow-md dark:shadow-[0_18px_45px_rgba(15,23,42,0.9)]"
                  )}
                >
                  <header
                    role="button"
                    tabIndex={0}
                    aria-expanded={isActive}
                    onClick={() => handleToggle(i)}
                    onKeyDown={(e) =>
                      (e.key === "Enter" || e.key === " ") &&
                      (e.preventDefault(), handleToggle(i))
                    }
                    className={cn(
                      "cursor-pointer px-4 py-3 sm:px-7 sm:py-5",
                      "transition-colors",
                      "group-hover:bg-slate-50/70 dark:group-hover:bg-white/5"
                    )}
                  >
                    <div className="flex flex-col gap-3 sm:gap-2">
                      {/* Título + flecha alineada a la derecha */}
                      <div className="flex items-center justify-between gap-2">
                        <h3
                          id={`job-${i}-role`}
                          className="text-base sm:text-xl font-semibold text-foreground tracking-tight group-hover:text-primary transition-colors"
                        >
                          {job.role}
                        </h3>

                        {/* Indicador de acción: solo flecha, a la derecha */}
                        <button
                          type="button"
                          aria-label={
                            isActive
                              ? t("common.hideDetails")
                              : t("common.viewDetails")
                          }
                          className={cn(
                            "flex items-center justify-center",
                            "text-muted-foreground",
                            "hover:text-primary",
                            "transition-colors duration-200",
                            "cursor-pointer select-none"
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggle(i);
                          }}
                        >
                          <HiOutlineChevronDown
                            className={cn(
                              "w-5 h-5 transition-transform duration-300",
                              isActive && "rotate-180"
                            )}
                            aria-hidden="true"
                          />
                        </button>
                      </div>

                      {/* Empresa + periodo */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <HiOutlineOfficeBuilding className="w-4 h-4 sm:w-5 sm:h-5" />
                          <span>{job.company}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <HiOutlineCalendar className="w-4 h-4 sm:w-5 sm:h-5" />
                          <time dateTime={job.period}>{job.period}</time>
                        </p>
                      </div>
                    </div>
                  </header>

                  {/* Contenido colapsable */}
                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      isActive
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-[100px] opacity-100"
                    )}
                  >
                    <div className="border-t border-border/80 px-4 py-3 sm:px-7 sm:py-5">
                      {isActive ? (
                        <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap text-left">
                          {job.description}
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {(job.technologies ?? []).map(
                            (tech: string, i: number) => (
                              <span
                                key={i}
                                className="
                                  text-[11px] font-medium px-3 py-1 rounded-full
                                  bg-gradient-to-r from-blue-500/15 via-purple-500/20 to-pink-500/15
                                  text-primary dark:text-white
                                  border border-white/10
                                "
                              >
                                {tech}
                              </span>
                            )
                          )}
                        </div>
                      )}
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
