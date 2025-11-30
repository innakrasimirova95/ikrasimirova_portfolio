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
import { useLanguage } from "@/context/LanguageContext";
import LiquidEther from "@/components/ui/LiquidEther";

export default function Home() {
  const [showNameInHeader, setShowNameInHeader] = useState(false);
  const nameRef = useRef<HTMLHeadingElement>(null);

  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef(activeSection);
  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  const heroRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);
  const experienceRef = useRef<HTMLElement>(null);
  const educationRef = useRef<HTMLElement>(null);
  const technologiesRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const { lang, t } = useLanguage();

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

  // Scroll listener para el botón Home
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setActiveSection("home");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Observer para sección activa
  useEffect(() => {
    const sectionRefs = [
      { ref: heroRef, id: "home" },
      { ref: projectsRef, id: "projects" },
      { ref: experienceRef, id: "experience" },
      { ref: educationRef, id: "education" },
      { ref: technologiesRef, id: "technologies" },
      { ref: contactRef, id: "contact" },
    ];

    const observerOptions = {
      root: null,
      rootMargin: `-${(document.querySelector("header")?.offsetHeight ?? 64) * 2}px 0px 0px 0px`,
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          if (sectionId !== activeSectionRef.current) {
            setActiveSection(sectionId);
          }
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

      {/* Hero Section con LiquidEther de fondo */}
      <motion.section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center items-center px-4 text-center overflow-hidden bg-background"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.15 }}
      >
        {/* Fondo LiquidEther (detrás de todo) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <LiquidEther
              colors={["#8063a1ff", "#FF9FFC", "#B19EEF"]}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
      autoRampDuration={0.6}
            />
          </div>
        </div>

        {/* Contenido del hero POR ENCIMA del efecto */}
        <div className="relative z-10 flex flex-col items-center max-w-full">
          {/* Nombre */}
          <motion.h1
            ref={nameRef}
            variants={heroItem}
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold font-science-gothic dark:text-white text-black font-thin"
          >
            {t("common.fullName")}
          </motion.h1>

          {/* Subtítulo con typing */}
          <motion.div
            variants={heroItem}
            className="
              mt-3
              text-lg sm:text-xl md:text-2xl
              text-foreground
              px-6 sm:px-10 lg:px-0
              tracking-wide
              overflow-hidden
            "
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

          {/* Iconos LinkedIn / GitHub / CV */}
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
        </div>
      </motion.section>

      <main className="container mx-auto px-6 py-12 space-y-32">
        <Projects ref={projectsRef} />
        <Experience ref={experienceRef} />
        <EducationTimeline ref={educationRef} />
        <TechIcons ref={technologiesRef} />
        <ContactForm ref={contactRef} />
      </main>
    </>
  );
}