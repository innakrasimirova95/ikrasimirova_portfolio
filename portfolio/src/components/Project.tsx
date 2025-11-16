import React from "react";
import { HiOutlineCalendar, HiOutlineExternalLink } from "react-icons/hi";

const projectsData = [
  {
    title: "Portfolio Personal",
    year: "2025",
    description:
      "Portfolio desarrollado con React, TypeScript y TailwindCSS. Incluye una arquitectura moderna con componentes reutilizables, animaciones suaves, diseño responsive y una presentación profesional de mi experiencia, educación y proyectos.",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
    image: "/images/portfolio-preview.png", // 🔹 coloca aquí la imagen de tu portfolio
    link: "https://github.com/innakrasimirova95/ikrasimirova_portfolio",
  },
  // 🔹 Puedes añadir más proyectos aquí en el mismo formato
];

export const Projects = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      id="proyectos"
      ref={ref}
      className="scroll-mt-24 py-16 px-4 md:px-8"
    >
      {/* Título */}
      <h2 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">
        &lt;Proyectos/&gt;
      </h2>

      <p className="text-muted-foreground mb-12 max-w-3xl">
        Aquí puedes ver algunos de mis proyectos destacados como desarrolladora
        Full Stack.
      </p>

      {/* Grid de proyectos */}
      <div className="grid gap-8 sm:grid-cols-2">
        {projectsData.map((project, index) => (
          <a
            key={index}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative rounded-2xl overflow-hidden bg-card/50 border border-border/60 hover:border-border/80 hover:shadow-[0_0_25px_rgba(147,51,234,0.25)] transition-all duration-500 hover:scale-[1.02]"
          >
            {/* Imagen */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-90"></div>
            </div>

            {/* Contenido */}
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                <span className="flex items-center text-sm text-muted-foreground gap-1">
                  <HiOutlineCalendar className="w-4 h-4" />
                  {project.year}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {project.description}
              </p>

              {/* Tecnologías */}
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-gradient-to-r from-blue-500/20 to-pink-500/20 text-blue-300 border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Botón enlace */}
              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-primary group-hover:text-foreground transition-colors">
                <HiOutlineExternalLink className="w-4 h-4" />
                Ver proyecto
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
});

Projects.displayName = "Projects";