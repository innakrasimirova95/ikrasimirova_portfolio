import { Experience } from "@/components/Experience";

// app/page.tsx (o pages/index.tsx)
import { Header } from "@/components/Header";
import { EducationTimeline } from "@/components/EducationTimeline";
import { TechIcons } from "@/components/Tecnologias";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { Download } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <>
      <Header />


  {/* Hero Section */}
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 space-y-6">
      <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Inna Krasimirova
      </h1>
      <p className="text-lg md:text-2xl text-muted-foreground">
        <TypingEffect
          text="Ingeniera de Software | Desarrolladora Full Stack"
          typingSpeed={240}
          deletingSpeed={120}
          pauseTime={1500}
          fontSize="clamp(1rem, 1vw, 2.5rem)"
        />

      </p>

      {/* Icon Links */}
      <div className="flex items-center gap-8 mt-6 text-muted-foreground">
        <a
          href="https://www.linkedin.com/in/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-600 transition"
        >
          <FaLinkedin size={32} />
        </a>

        <a
          href="https://github.com/tuusuario"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-800 dark:hover:text-white transition"
        >
          <FaGithub size={32} />
        </a>

        <a
          href="/cv_inna_krasimirova.pdf"
          download
          aria-label="Descargar CV"
          className="hover:text-green-600 transition"
        >
          <Download size={32} />
        </a>
      </div>
    </section>

      <main className="container mx-auto px-6 py-12 space-y-32">
        <section id="proyectos">
          <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">&lt;Proyectos/&gt;</h2>
          <p className="text-muted-foreground mb-6">
            Aquí puedes mostrar algunos de tus proyectos destacados como desarrolladora Full Stack.
          </p>
          {/* Puedes agregar tarjetas de proyectos aquí */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-xl border p-4 shadow-sm">Proyecto 1</div>
            <div className="rounded-xl border p-4 shadow-sm">Proyecto 2</div>
          </div>
        </section>

        <Experience />

        <section id="educacion">
          <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">&lt;Educación/&gt;</h2>
          <EducationTimeline></EducationTimeline>
        </section>

        <section id="tecnologias">
          <h2 className="text-4xl font-extrabold mb-12 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 bg-clip-text text-transparent">&lt;Tecnologías/&gt;</h2>
          <TechIcons/>
        </section>
      </main>
    </>
  );
}
