"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  HiOutlineCalendar,
  HiOutlineExternalLink,
  HiOutlineChevronDown,
} from "react-icons/hi";
import { SectionTitle } from "./ui/SectionTitle";
import { cn } from "@/lib/utils";
import { useLanguage, useDictionary } from "@/context/LanguageContext";

export const Projects = React.forwardRef<HTMLElement>((props, ref) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { t } = useLanguage();
  const dictionary = useDictionary();

  const projectsData = [
    {
      title: dictionary.projects.personalPortfolio.title,
      year: dictionary.projects.personalPortfolio.year,
      description: dictionary.projects.personalPortfolio.description,
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Three.js", "i18n"],
      image: "/images/portfolio-preview.png",
      link: "https://github.com/innakrasimirova95/ikrasimirova_portfolio",
    },
  ];

  const handleToggle = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="projects"
      ref={ref}
      className="scroll-mt-24 py-16"
      aria-labelledby="projects-title"
    >
      <SectionTitle id="projects-title">
        {t("projects.title")}
      </SectionTitle>

      {/* grid centrada y con ancho máximo */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-center">
        {projectsData.map((project, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <article
              key={index}
              className="w-full max-w-xl"
              aria-labelledby={`project-${index}-title`}
            >
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group block h-full relative rounded-2xl overflow-hidden",
                  "bg-secondary border border-gray-300 shadow-sm", // Light mode styles
                  "dark:bg-gradient-to-br dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-900/70", // Dark mode gradient
                  "dark:border-white/10 dark:shadow-[0_18px_45px_rgba(0,0,0,0.55)]", // Dark mode border and shadow
                  "backdrop-blur-xl",
                  "transition-all duration-500 ease-out",
                  "hover:-translate-y-1 hover:shadow-md dark:hover:shadow-[0_26px_60px_rgba(15,23,42,0.9)]",
                  "hover:border-purple-500/60",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70"
                )}
              >
                {/* Imagen */}
                <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="
                      object-cover transition-transform duration-500
                      group-hover:scale-105 group-active:scale-105
                    "
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />

                  {/* degradado superior e inferior para dar profundidad */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10 dark:from-background/95 dark:via-transparent dark:to-transparent" />
                </div>

                {/* Contenido */}
                <div className="p-6 space-y-3">
                  <div className="flex justify-between items-start gap-3">
                    <div className="space-y-1">
                      <h3
                        id={`project-${index}-title`}
                        className="text-base sm:text-xl font-semibold text-foreground tracking-tight"
                      >
                        {project.title}
                      </h3>
                    </div>

                    <span className="flex items-center text-xs sm:text-sm text-muted-foreground gap-1 rounded-full border border-white/10 bg-black/30 px-2.5 py-1">
                      <HiOutlineCalendar className="w-4 h-4" />
                      {project.year}
                    </span>
                  </div>

                  {/* Descripción: expandible en móvil, siempre visible en sm+ */}
                  <div className="sm:mb-1 mb-2">
                    <p
                      className={cn(
                        "text-xs sm:text-sm text-foreground/90 leading-relaxed transition-all duration-300",
                        !isExpanded &&
                          "max-h-0 opacity-0 overflow-hidden sm:max-h-40 sm:opacity-100"
                      )}
                    >
                      {project.description}
                    </p>

                    {/* Botón expandir (solo móvil) */}
                    <button
                      type="button"
                      onClick={(e) => handleToggle(e, index)}
                      className="mt-1 sm:hidden inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground active:text-foreground transition-colors"
                    >
                      {isExpanded
                        ? t("projects.seeLess")
                        : t("projects.seeMore")}
                      <HiOutlineChevronDown
                        className={cn(
                          "w-3 h-3 transition-transform",
                          isExpanded && "rotate-180"
                        )}
                      />
                    </button>
                  </div>

                  {/* Tecnologías */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
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
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className="
                      pt-3 flex items-center gap-2 text-sm font-medium
                      text-primary/90 group-hover:text-foreground group-active:text-foreground
                      transition-colors
                    "
                  >
                    <HiOutlineExternalLink className="w-4 h-4" />
                    {t("projects.viewProject")}
                  </div>
                </div>
              </a>
            </article>
          );
        })}
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
