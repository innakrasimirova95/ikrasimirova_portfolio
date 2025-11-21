"use client";

import React, { useState, useEffect } from "react";
import {
  FaPython,
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaLinux,
  FaGithub,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiDjango,
  SiFastapi,
  SiMysql,
  SiSqlite,
  SiKeycloak,
  SiShadcnui,
  SiSqlalchemy,
  SiGit,
  SiNodedotjs,
  SiVite,
  SiVercel,
  SiJupyter,
  SiKaggle,
  SiNpm,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { VscAzure } from "react-icons/vsc";
import { SectionTitle } from "./ui/SectionTitle";
import { useLanguage } from "@/context/LanguageContext";

const skillsStack = [
  { name: "Python", icon: FaPython, hoverColor: "#3776AB" },
  { name: "JavaScript", icon: FaJs, hoverColor: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, hoverColor: "#3178C6" },
  { name: "React", icon: FaReact, hoverColor: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, hoverColor: "#ffffff" },
  { name: "shadcn/ui", icon: SiShadcnui, hoverColor: "#ffffff" },
  { name: "TailwindCSS", icon: SiTailwindcss, hoverColor: "#06B6D4" },
  { name: "CSS Modules", icon: FaCss3Alt, hoverColor: "#264de4" },
  { name: "HTML", icon: FaHtml5, hoverColor: "#E34F26" },
  { name: "Django", icon: SiDjango, hoverColor: "#092E20" },
  { name: "FastAPI", icon: SiFastapi, hoverColor: "#009688" },
  { name: "SQLAlchemy", icon: SiSqlalchemy, hoverColor: "#00758F" },
  { name: "MySQL", icon: SiMysql, hoverColor: "#4479A1" },
  { name: "SQLite", icon: SiSqlite, hoverColor: "#003B57" },
  { name: "Keycloak", icon: SiKeycloak, hoverColor: "#3C4E8C" },
  { name: "Docker", icon: FaDocker, hoverColor: "#2496ED" },
  { name: "Azure", icon: VscAzure, hoverColor: "#0078D4" },
  { name: "Git", icon: SiGit, hoverColor: "#F05032" },
];

const toolsStack = [
  { name: "Linux", icon: FaLinux, hoverColor: "#ffffff" },
  { name: "VS Code", icon: DiVisualstudio, hoverColor: "#007ACC" },
  { name: "Node.js", icon: SiNodedotjs, hoverColor: "#339933" },
  { name: "Vite", icon: SiVite, hoverColor: "#646CFF" },
  { name: "Vercel", icon: SiVercel, hoverColor: "#ffffff" },
  { name: "GitHub", icon: FaGithub, hoverColor: "#ffffff" },
  { name: "npm", icon: SiNpm, hoverColor: "#CB3837" },
  { name: "Jupyter", icon: SiJupyter, hoverColor: "#F37626" },
  { name: "Kaggle", icon: SiKaggle, hoverColor: "#20BEFF" },
];

export const TechIcons = React.forwardRef<HTMLElement>((props, ref) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"skills" | "tools">("skills");
  const { t } = useLanguage();

  useEffect(() => {
    setHovered(null);
  }, [activeTab]);

  const currentStack = activeTab === "skills" ? skillsStack : toolsStack;

  return (
    <section id="tecnologias" ref={ref} className="scroll-mt-24">
      <SectionTitle className="mb-4">{t("technologies.title")}</SectionTitle>

      {/* Toggle menú */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex items-center rounded-full border border-border/70 bg-background/80 backdrop-blur px-1 py-1 shadow-lg">
          <button
            onClick={() => setActiveTab("skills")}
            className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-150 ${
              activeTab === "skills"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Skills
          </button>

          <button
            onClick={() => setActiveTab("tools")}
            className={`px-4 py-1.5 text-xs sm:text-sm rounded-full transition-all duration-150 ${
              activeTab === "tools"
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-black"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tools
          </button>
        </div>
      </div>

      {/* Cuadrícula de iconos */}
      <div className="max-w-5xl mx-auto grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-3 sm:gap-4 md:gap-5">
        {currentStack.map(({ icon: Icon, hoverColor, name }, i) => {
          const isHovered = hovered === i;

          return (
            <button
              key={name}
              type="button"
              className="
                relative flex items-center justify-center
                rounded-xl border border-border/40 bg-background/30
                transition-all duration-75 transform hover:scale-105
                aspect-square
                p-5
                min-w-[90px] min-h-[90px]
              "
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              title={name}
              style={{
                boxShadow: isHovered
                  ? `inset 0 0 22px ${hoverColor}55`
                  : "inset 0 0 0 transparent",
              }}
            >
              <Icon
                className="text-3xl sm:text-3xl md:text-5xl"
                style={{
                  color: isHovered ? hoverColor : "#6b7280",
                  transform: isHovered ? "scale(1.14)" : "scale(1)",
                  transition: "transform 0.08s ease-out, color 0.08s ease-out",
                }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
});

TechIcons.displayName = "TechIcons";
