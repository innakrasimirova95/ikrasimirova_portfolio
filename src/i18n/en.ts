export const en = {
  common: {
    fullName: "Inna Krasimirova",
    hideDetails: "Hide details",
    viewDetails: "View details",
  },
  nav: {
    projects: "<Projects/>",
    experience: "<Experience/>",
    education: "<Education/>",
    technologies: "<Technologies/>",
    contact: "<Contact/>",
    toggleTheme: "Toggle theme",
  },
  hero: {
    title: "Software Engineer | Full Stack Developer",
    description:
      "Passionate about designing clear, functional, and people-centered digital experiences. I am motivated by improving every day, taking on new challenges, and teamwork. Outside of technology, I enjoy traveling and learning about cultures that inspire me to see things from new perspectives.",
    ariaLinkedIn: "LinkedIn",
    ariaGitHub: "GitHub",
    ariaCV: "Download CV",
  },
  projects: {
    title: "<Projects/>",
    personalPortfolio: {
      title: "Personal Portfolio",
      year: "2025",
      description:
        "Portfolio developed with React, TypeScript, and TailwindCSS. It includes a modern architecture with reusable components, smooth animations, responsive design, and a professional presentation of my experience, education, and projects.",
    },
    viewProject: "View project",
    seeMore: "See more",
    seeLess: "See less",
  },
  experience: {
    title: "<Experience/>",
    roles: [
      {
        company: "AECOM",
        role: "Digital Solution Developer",
        period: "May 2025 - October 2025",
        technologies: [
          "React",
          "TypeScript",
          "Vite",
          "Material UI",
          "Three.js",
          "FastAPI",
          "Django",
          "Node.js",
          "Azure",
          "PostgreSQL",
        ],
        description: `During these months I developed a BIM viewer using the ThatOpenCompany library and Three.js, creating an interactive interface for IFC models within an application with React, TypeScript, Vite and Material UI. I converted this viewer into a reusable library, developed a FastAPI API connected to Autodesk ACC to download BIM models and deployed the projects on Azure, integrating them into the company's cloud environment.

In addition, I developed and integrated a complete BIM model management project whose frontend was made with React and the backend with Django, where I implemented authentication with Entra ID, the connection with the Autodesk ACC API to import BIM models and the loading of models from local. Also incorporate the BIM viewer within this system, allowing you to view the models directly on the platform.

Subsequently, I collaborated on both frontend and backend on a project oriented to IoT sensors, integrating the viewer and supporting dashboards with Recharts, navigation with React Router and real-time data visualization. I also collaborated on the backend with Node.js, PostgreSQL, WebSockets. The Azure services I have worked with are Blob Storage, Web App, Static Web App, Azure Database for PostgreSQL and Enta ID.

This experience allowed me to take my own BIM viewer from its conception to its integration into real platforms: a corporate BIM project manager and a cloud IoT data solution.`
      },
      {
        company: "IGNIS",
        role: "Full Stack Developer & Researcher",
        period: "July 2023 - April 2025",
        technologies: [
          "Python",
          "Pandas",
          "NumPy",
          "Django",
          "FastAPI",
          "Next.js",
          "TypeScript",
          "TailwindCSS",
          "shadcn/ui",
          "Keycloak",
        ],
        description: `In my first job as a developer I learned to work with good practices, clean and structured code, GitFlow and well-configured development environments. I also carried out small projects in Python using Pandas and NumPy to process data and create internal tools.

With this foundation I began to participate in IGNIS projects. I developed a complete web application with Django as a backend, Keycloak for authentication and a FastAPI API to serve and process data.
On the frontend, built with Next.js, TypeScript, TailwindCSS and shadcn/ui, I implemented routes, navigation, translations and reusable components, ensuring typed and consistent communication with the APIs.

One of my most advanced developments was a module to import, visualize and edit Excel files directly on the web. I used Glide Data Grid to handle large tables with high performance and, using excel.js and xlsx, I implemented file reading, modification and writing, allowing me to download an updated Excel or save the data in the database for later retrieval.`,
      },
      {
        company: "Deloitte",
        role: "Risk Advisory Cyber - Infrastructure Protection",
        period: "November 2022 - January 2023",
        technologies: ["Microsoft 365", "Teams", "OneDrive", "Security"],
        description: `I was responsible for reviewing and validating the correct configuration of corporate tools such as Teams, OneDrive, and other Microsoft 365 services, ensuring that permissions, access, and policies were well-defined. My objective was to prevent information leaks and ensure that only authorized personnel could access resources, contributing to strengthening clients' internal security.`,
      },
    ],
  },
  education: {
    title: "<Education/>",
    degrees: [
      {
        title: "Master's in Software Project Management and Direction",
        institution: "Polytechnic University of Madrid - ETSII",
        date: "October 2022 - July 2024",
      },
      {
        title: "Erasmus +",
        institution: "Tallinn University of Technology (TalTech) - Tallinn/Estonia",
        date: "January 2022 - June 2022",
      },
      {
        title:
          "Double Degree in Software Engineering and Information Society Technology",
        institution: "Polytechnic University of Madrid - ETSISI",
        date: "September 2017 - June 2023",
      },
      {
        title:
          "Higher Degree in Administration of Computer Systems and Networks",
        institution: "IES Europa, Rivas – Vaciamadrid",
        date: "September 2014 - June 2016",
      },
    ],
  },
  technologies: {
    title: "<Technologies/>",
    skills: "Skills",
    tools: "Tools",
  },
  contact: {
    title: "<Contact/>",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      subject: "Subject",
      subjectPlaceholder: "What do you want to talk about",
      message: "Message",
      messagePlaceholder: "Tell me a bit more...",
      submitButton: "Send message",
      submittingButton: "Sending...",
      clearButton: "Clear",
      success: "Thank you! I have received your message.",
      error: "An error occurred while sending the message.",
      sectionHint: "Get in touch",
      sectionDescription:
        "Tell me briefly what you need and I will get back to you as soon as possible.",
    },
    linkedinPrompt: "You can also write to me on",
  },
};