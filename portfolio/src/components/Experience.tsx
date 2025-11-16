import React from 'react';

const experienceData = [
  {
    company: 'AECOM',
    role: 'Digital Solution Developer',
    period: 'Mayo 2025 - Actualmente',
    description: 'Desarrollo de soluciones digitales full stack para proyectos de ingeniería, incluyendo análisis, diseño, desarrollo, pruebas y despliegue. Tecnologías: React, Typescript, Python, Django, Azure.',
  },
  {
    company: 'IGNIS',
    role: 'Investigadora Desarrolladora Full Stack',
    period: 'Julio 2023 - Abril 2025',
    description: 'Investigación, identificación de necesidades y selección de tecnologías para el desarrollo de aplicaciones, APIs y webs. Tecnologías: Next.js, React, TypeScript, TailwindCSS, shadcn/ui, CSS Modules, Django, Python, FastAPI y SQLAlchemy.',
  },
  {
    company: 'Deloitte',
    role: 'Risk Advisory Cyber - Infrastructure Protection',
    period: 'Noviembre 2022 - Enero 2023',
    description: 'Evaluación de riesgos y mejora de prácticas de seguridad para detectar amenazas y brechas.',
  },
];

export const Experience = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section id="experiencia" ref={ref}>
      <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent ml-[-1.5rem]">&lt;Experiencia/&gt;</h2>
      <div className="space-y-4">
        {experienceData.map((exp, index) => (
          <div key={index} className="group relative transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg p-6">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-white group-hover:bg-gradient-to-b from-blue-500 via-purple-600 to-pink-500 transition-all duration-300"></div>
            <div className="pl-6">
              <h3 className="text-xl font-semibold">{exp.role}</h3>
              <p className="text-md font-medium text-muted-foreground">{exp.company}</p>
              <p className="text-sm text-muted-foreground mb-2">{exp.period}</p>
              <p className="text-base">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});