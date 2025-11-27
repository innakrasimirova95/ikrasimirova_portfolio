import React from "react";
import { FaBuilding, FaCalendarAlt } from "react-icons/fa";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage, useDictionary } from "@/context/LanguageContext";

interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  description: string;
  techStack?: string; // Added techStack as an optional property
}

const ExperienceComponent = React.forwardRef<HTMLElement>((props, ref) => {
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const experienceData: ExperienceRole[] = dictionary.experience.roles;

  return (
    <section
      id="experience"
      ref={ref}
      className="scroll-mt-24 py-16 px-4 sm:px-0"
      aria-labelledby="experience-title"
    >
      <SectionTitle id="experience-title">
        {t("experience.title")}
      </SectionTitle>

      <div className="relative max-w-4xl mx-auto mt-10 pb-20">
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
          {experienceData.map((exp, index) => (
            <article
              key={index}
              aria-labelledby={`exp-${index}-title`}
              className="relative pl-6 sm:pl-16"
            >
              {/* Nodo del timeline */}
              <span
                className="
                  absolute left-4 sm:left-5 top-3
                  w-3 h-3 rounded-full
                  bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500
                  shadow-[0_0_18px_rgba(168,85,247,0.9)]
                "
                aria-hidden="true"
              />

              {/* Tarjeta de experiencia */}
              <div
                className="
                  group
                  rounded-2xl border border-gray-300 dark:border-border
                  bg-secondary shadow-sm
                  dark:bg-gradient-to-br dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-900/40
                  backdrop-blur-xl
                  px-5 py-4 sm:px-7 sm:py-5
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_18px_45px_rgba(15,23,42,0.9)]
                  hover:border-purple-500/60
                  relative overflow-hidden
                "
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

                {/* Cabecera: rol + periodo */}
                <header className="relative flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-3">
                  <h3
                    id={`exp-${index}-title`}
                    className="text-lg sm:text-xl font-semibold text-foreground tracking-tight"
                  >
                    {exp.role}
                  </h3>

                  <p className="inline-flex items-center gap-2 self-start rounded-full border border-border bg-background/50 px-3 py-1 text-xs sm:text-[13px] text-muted-foreground">
                    <FaCalendarAlt className="w-3 h-3" />
                    <time dateTime={exp.period}>{exp.period}</time>
                  </p>
                </header>

                {/* Empresa */}
                <p className="relative flex items-center gap-2 text-sm font-medium text-primary/90 italic mb-2">
                  <FaBuilding className="w-4 h-4" />
                  <span>{exp.company}</span>
                </p>

                {/* Contenido */}
                <div className="relative space-y-2">
                  <p className="text-sm sm:text-[15px] text-foreground/90 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Tech stack opcional si lo añades al diccionario */}
                  {exp.techStack && (
                    <p className="text-xs sm:text-[13px] text-muted-foreground">
                      <span className="font-semibold text-foreground">
                        Tech:
                      </span>{" "}
                      {exp.techStack}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

ExperienceComponent.displayName = "Experience";

export const Experience = ExperienceComponent;
