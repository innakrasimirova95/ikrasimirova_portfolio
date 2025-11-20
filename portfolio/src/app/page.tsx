"use client";

import { Experience } from "@/components/Experience";
import { useState, useEffect, useRef } from "react";

import { Header } from "@/components/Header";
import { EducationTimeline } from "@/components/EducationTimeline";
import { TechIcons } from "@/components/Tecnologias";
import { TypingEffect } from "@/components/ui/TypingEffect";
import { Download } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Projects } from "@/components/Projects";
import { ContactForm } from "@/components/ContactForm";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext"; // Import useLanguage

export default function Home() {
  const [showNameInHeader, setShowNameInHeader] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [activeSection, setActiveSection] = useState("");
  const proyectosRef = useRef<HTMLElement>(null);
  const experienciaRef = useRef<HTMLElement>(null);
  const educacionRef = useRef<HTMLElement>(null);
  const tecnologiasRef = useRef<HTMLElement>(null);
  const contactoRef = useRef<HTMLElement>(null);

  const { lang, t } = useLanguage(); // Initialize useLanguage

  const cvPaths: Record<string, string> = {
    es: "/CV_ES Inna Krasimirova.pdf",
    en: "/CV_EN Inna Krasimirova.pdf",
    bg: "/CV_BG Inna Krasimirova.pdf",
  };

  const cvPath = cvPaths[lang] || cvPaths.es;

  // Observer para mostrar/ocultar el nombre en el header
  useEffect(() => {
    const element = nameRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNameInHeader(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, []);

  // Observer para sección activa
  useEffect(() => {
    const sectionRefs = [
      { ref: proyectosRef, id: "proyectos" },
      { ref: experienciaRef, id: "experiencia" },
      { ref: educacionRef, id: "educacion" },
      { ref: tecnologiasRef, id: "tecnologias" },
      { ref: contactoRef, id: "contacto" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
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
        const currentRef = ref.current;
        if (currentRef) {
          sectionObserver.unobserve(currentRef);
        }
      });
      sectionObserver.disconnect();
    };
  }, []);

  // Variantes elegantes para el hero
  const heroItem = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <>
      <Header showName={showNameInHeader} activeSection={activeSection} />

      {/* Hero Section */}
      <motion.section
        className="min-h-screen flex flex-col justify-center items-center px-6 text-center"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Nombre */}
        <motion.h1
          ref={nameRef}
          variants={heroItem}
          className="text-4xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          {t('common.fullName')}
        </motion.h1>

        {/* Subtítulo con typing */}
        <motion.div
          variants={heroItem}
          className="mt-3 text-lg md:text-2xl text-foreground"
        >
          <TypingEffect
            text={t("hero.title")}
            typingSpeed={240}
            deletingSpeed={120}
            pauseTime={1500}
            fontSize="clamp(1rem, 1vw, 2.5rem)"
          />
        </motion.div>

        {/* Descripción breve */}
        <motion.p
          variants={heroItem}
          className="mt-12 max-w-3xl text-center text-xs md:text-sm text-foreground leading-relaxed"
        >
          {t("hero.description")}
        </motion.p>

        {/* Línea decorativa */}
        <motion.div
          variants={heroItem}
          className="mt-4 h-px w-24 bg-gradient-to-r from-blue-500/60 via-purple-500/60 to-pink-500/60 rounded-full"
        />

        {/* Icon Links */}
        <motion.div
          variants={heroItem}
          className="mt-6 flex items-center gap-6 md:gap-8 text-foreground"
        >
          <motion.a
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="https://www.linkedin.com/in/innakrasimirova/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("hero.ariaLinkedIn")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/20 hover:bg-muted/40 active:bg-muted/40 transition-colors"
          >
            <FaLinkedin size={24} />
          </motion.a>

          <motion.a
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href="https://github.com/innakrasimirova95"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t("hero.ariaGitHub")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/20 hover:bg-muted/40 active:bg-muted/40 transition-colors"
          >
            <FaGithub size={24} />
          </motion.a>

          <motion.a
            whileHover={{ y: -2, scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            href={cvPath}
            download
            aria-label={t("hero.ariaCV")}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-muted/20 hover:bg-muted/40 active:bg-muted/40 transition-colors"
          >
            <Download size={24} />
          </motion.a>
        </motion.div>
      </motion.section>

      <main className="container mx-auto px-6 py-12 space-y-32">
        <Projects ref={proyectosRef} />
        <Experience ref={experienciaRef} />
        <EducationTimeline ref={educacionRef} />
        <TechIcons ref={tecnologiasRef} />
        <ContactForm ref={contactoRef} />
      </main>
    </>
  );
}
