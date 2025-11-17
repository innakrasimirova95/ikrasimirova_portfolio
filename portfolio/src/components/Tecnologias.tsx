"use client";

import React, { useState } from "react";
import {
  FaPython,
  FaJs,
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
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
} from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { SectionTitle } from "./ui/SectionTitle";

const techStack = [
  { name: "Python", icon: FaPython, baseColor: "#6b7280", hoverColor: "#3776AB" },
  { name: "JavaScript", icon: FaJs, baseColor: "#6b7280", hoverColor: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, baseColor: "#6b7280", hoverColor: "#3178C6" },
  { name: "React", icon: FaReact, baseColor: "#6b7280", hoverColor: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, baseColor: "#6b7280", hoverColor: "#000000" },
  { name: "shadcn/ui", icon: SiShadcnui, baseColor: "#6b7280", hoverColor: "#000000" },
  { name: "TailwindCSS", icon: SiTailwindcss, baseColor: "#6b7280", hoverColor: "#06B6D4" },
  { name: "CSS Modules", icon: FaCss3Alt, baseColor: "#6b7280", hoverColor: "#264de4" },
  { name: "HTML", icon: FaHtml5, baseColor: "#6b7280", hoverColor: "#E34F26" },
  { name: "Django", icon: SiDjango, baseColor: "#6b7280", hoverColor: "#092E20" },
  { name: "FastAPI", icon: SiFastapi, baseColor: "#6b7280", hoverColor: "#009688" },
  { name: "SQLAlchemy", icon: SiSqlalchemy, baseColor: "#6b7280", hoverColor: "#00758F" },
  { name: "MySQL", icon: SiMysql, baseColor: "#6b7280", hoverColor: "#4479A1" },
  { name: "SQLite", icon: SiSqlite, baseColor: "#6b7280", hoverColor: "#003B57" },
  { name: "Keycloak", icon: SiKeycloak, baseColor: "#6b7280", hoverColor: "#3C4E8C" },
  { name: "Docker", icon: FaDocker, baseColor: "#6b7280", hoverColor: "#2496ED" },
  { name: "Azure", icon: VscAzure, baseColor: "#6b7280", hoverColor: "#0078D4" },
  { name: "Git", icon: SiGit, baseColor: "#6b7280", hoverColor: "#F05032" }, // Añadido Git

];

export const TechIcons = React.forwardRef<HTMLElement>((props, ref) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="tecnologias" ref={ref}>
      <SectionTitle>&lt;Tecnologías/&gt;</SectionTitle>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8">
        {techStack.map(({ icon: Icon, baseColor, hoverColor, name }, i) => {
          const isHovered = hovered === i;
          return (
            <div
              key={i}
              className="cursor-pointer transition-transform transition-colors duration-300"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              title={name}
              style={{
                color: isHovered ? hoverColor : baseColor,
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
            >
              <Icon className="text-6xl" />
            </div>
          );
        })}
      </div>
    </section>
  );
});

TechIcons.displayName = "TechIcons";
