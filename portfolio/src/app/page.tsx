"use client";

import { Experience } from "@/components/Experience";
import { useState, useEffect, useRef } from "react";

// app/page.tsx (o pages/index.tsx)
import { Header } from "@/components/Header";
import { EducationTimeline } from "@/components/EducationTimeline";
import { TechIcons } from "@/components/Tecnologias";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { Download } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Projects } from "@/components/Projects"; // Import the Projects component

export default function Home() {
  const [showNameInHeader, setShowNameInHeader] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [activeSection, setActiveSection] = useState('');
  const proyectosRef = useRef<HTMLElement>(null);
  const experienciaRef = useRef<HTMLElement>(null);
  const educacionRef = useRef<HTMLElement>(null);
  const tecnologiasRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNameInHeader(!entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (nameRef.current) {
      observer.observe(nameRef.current);
    }

    return () => {
      if (nameRef.current) {
        observer.unobserve(nameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sectionRefs = [
      { ref: proyectosRef, id: 'proyectos' },
      { ref: experienciaRef, id: 'experiencia' },
      { ref: educacionRef, id: 'educacion' },
      { ref: tecnologiasRef, id: 'tecnologias' },
    ];

    const observerOptions = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: 0.5, // 50% of the section must be visible
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionRefs.forEach(({ ref }) => {
      if (ref.current) {
        sectionObserver.observe(ref.current);
      }
    });

    return () => {
      sectionRefs.forEach(({ ref }) => {
        if (ref.current) {
          sectionObserver.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <>
      <Header showName={showNameInHeader} activeSection={activeSection} />


  {/* Hero Section */}
    <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-4 space-y-6">
      <h1 ref={nameRef} className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        Inna Krasimirova
      </h1>
    <div className="text-lg md:text-2xl text-muted-foreground">
      <TypingEffect
        text="Ingeniera de Software | Desarrolladora Full Stack"
        typingSpeed={240}
        deletingSpeed={120}
        pauseTime={1500}
        fontSize="clamp(1rem, 1vw, 2.5rem)"
      />

    </div>

      {/* Icon Links */}
      <div className="flex items-center gap-8 mt-6 text-muted-foreground">
        <a
          href="hhttps://www.linkedin.com/in/innakrasimirova/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-600 transition"
        >
          <FaLinkedin size={32} />
        </a>

        <a
          href="https://github.com/innakrasimirova95"
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
        <Projects ref={proyectosRef} />
        <Experience ref={experienciaRef} />
        <EducationTimeline ref={educacionRef} />
        <TechIcons ref={tecnologiasRef} />
      </main>
    </>
  );
}