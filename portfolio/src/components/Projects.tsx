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
      technologies: ["React", "TypeScript", "Tailwind CSS"], // Technologies might be fixed, or translated if in dictionary
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
    <section id="proyectos" ref={ref} className="scroll-mt-24 py-16">
      <SectionTitle className="mb-8">{t("projects.title")}</SectionTitle>

      {/* grid centrada y con ancho máximo */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto justify-items-center">
        {projectsData.map((project, index) => {
          const isExpanded = expandedIndex === index;

          return (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group relative rounded-2xl overflow-hidden bg-card
                border border-border/60
                hover:border-border/80 active:border-border/80
                hover:shadow-[0_0_25px_rgba(147,51,234,0.25)]
                active:shadow-[0_0_25px_rgba(147,51,234,0.25)]
                transition-all duration-500
                hover:scale-[1.02] active:scale-[1.02]
                max-w-xl w-full
              "
            >
              {/* Imagen más baja */}
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

                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent dark:from-background/90 dark:via-transparent dark:to-transparent" />
              </div>

              {/* Contenido */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-base sm:text-xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <span className="flex items-center text-xs sm:text-sm text-foreground gap-1">
                    <HiOutlineCalendar className="w-4 h-4" />
                    {project.year}
                  </span>
                </div>

                {/* Descripción oculta en móvil */}
                <div className="sm:mb-4 mb-2">
                  <p
                    className={cn(
                      "text-xs sm:text-sm text-foreground leading-relaxed transition-all duration-300",
                      !isExpanded &&
                        "max-h-0 opacity-0 overflow-hidden sm:max-h-none sm:opacity-100"
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
                    {isExpanded ? t("projects.seeLess") : t("projects.seeMore")}
                    <HiOutlineChevronDown
                      className={cn(
                        "w-3 h-3 transition-transform",
                        isExpanded && "rotate-180"
                      )}
                    />
                  </button>
                </div>

                {/* Tecnologías */}
                <div className="flex flex-wrap gap-2 mb-2 sm:mb-0">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="
                        text-xs font-medium px-3 py-1 rounded-full
                        bg-primary/15 text-primary
                        dark:bg-white/10 dark:text-white
                      "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Botón enlace */}
                <div
                  className="
                    mt-5 flex items-center gap-2 text-sm font-medium text-primary
                    group-hover:text-foreground group-active:text-foreground
                    transition-colors
                  "
                >
                  <HiOutlineExternalLink className="w-4 h-4" />
                  {t("projects.viewProject")}
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
});

Projects.displayName = "Projects";
