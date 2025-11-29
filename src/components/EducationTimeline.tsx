import React, { useState } from "react";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage, useDictionary } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export const EducationTimeline = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const educationData = dictionary.education.degrees;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="educacion"
      ref={ref}
      className="scroll-mt-24 py-16"
      aria-labelledby="education-title"
    >
      <SectionTitle id="education-title">
        {t("education.title")}
      </SectionTitle>

      <div className="relative max-w-6xl mx-auto mt-10 pb-16">
        {/* Línea vertical del timeline (solo en pantallas medianas+) */}
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
          {educationData.map((item, i) => {
            const isActive = activeIndex === i;

            return (
              <article
                key={i}
                aria-labelledby={`edu-${i}-title`}
                className="relative pl-10 sm:pl-16"
              >
                {/* Nodo del timeline visible en móvil */}
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

                {/* Tarjeta de educación */}
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleToggle(i)}
                  onKeyDown={(e) =>
                    (e.key === "Enter" || e.key === " ") &&
                    (e.preventDefault(), handleToggle(i))
                  }
                  className={cn(
                    "group cursor-pointer",
                    "rounded-2xl border border-gray-300 dark:border-border",
                    "bg-secondary shadow-sm",
                    "dark:bg-gradient-to-br dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-900/40",
                    "backdrop-blur-xl",
                    "px-5 py-4 sm:px-7 sm:py-5",
                    "transition-all duration-300 ease-out",
                    "hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)] hover:border-purple-500/60",
                    isActive &&
                      "-translate-y-1 shadow-md dark:shadow-[0_18px_45px_rgba(15,23,42,0.9)] border-purple-500/60"
                  )}
                >
                  {/* Glow de fondo */}
                  <div
                    className="
                      pointer-events-none
                      absolute -right-10 -top-10 h-32 w-32
                      rounded-full bg-gradient-to-br
                      from-blue-500/10 via-purple-500/15 to-pink-500/5
                      blur-3xl
                    "
                    aria-hidden="true"
                  />

                  <header className="relative mb-2">
                    <h3
                      id={`edu-${i}-title`}
                      className="text-lg sm:text-xl font-semibold text-foreground tracking-tight"
                    >
                      {item.title}
                    </h3>
                  </header>

                  {/* Institución */}
                  <p className="relative flex items-center gap-2 text-sm font-medium text-primary/90 italic mb-2">
                    <HiOutlineLocationMarker className="w-5 h-5" />
                    <span>{item.institution}</span>
                  </p>

                  {/* Fecha */}
                  <p className="relative inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs sm:text-[13px] text-muted-foreground">
                    <HiOutlineCalendar className="w-4 h-4" />
                    <time dateTime={item.date}>{item.date}</time>
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
});

EducationTimeline.displayName = "EducationTimeline";
