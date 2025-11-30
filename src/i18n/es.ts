export const es = {
  common: {
    fullName: "Inna Krasimirova",
    hideDetails: "Ocultar detalles",
    viewDetails: "Ver detalles",
  },
  nav: {
    projects: "<Proyectos/>",
    experience: "<Experiencia/>",
    education: "<Educación/>",
    technologies: "<Tecnologías/>",
    contact: "<Contacto/>",
    toggleTheme: "Cambiar tema",
  },
  hero: {
    title: "Ingeniera de Software | Desarrolladora Full Stack",
    description:
      "Apasionada por diseñar experiencias digitales claras, funcionales y centradas en las personas. Me motiva mejorar cada día, asumir nuevos desafíos y trabajar en equipo. Fuera del ámbito tecnológico, disfruto viajar y conocer culturas que me inspiran a ver las cosas desde nuevas perspectivas.",
    ariaLinkedIn: "LinkedIn",
    ariaGitHub: "GitHub",
    ariaCV: "Descargar CV",
  },
  projects: {
    title: "<Proyectos/>",
    personalPortfolio: {
      title: "Portfolio Personal",
      year: "2025",
      description:
        "Portfolio desarrollado con React, TypeScript y TailwindCSS. Incluye una arquitectura moderna con componentes reutilizables, animaciones suaves, diseño responsive y una presentación profesional de mi experiencia, educación y proyectos.",
    },
    viewProject: "Ver proyecto",
    seeMore: "Ver más",
    seeLess: "Ver menos",
  },
  experience: {
    title: "<Experiencia/>",
    roles: [
      {
        company: "AECOM",
        role: "Digital Solution Developer",
        period: "Mayo 2025 - Octubre 2025",
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
        description: `Durante estos meses desarrollé un visor BIM utilizando la libreria de ThatOpenCompany y Three.js, creando una interfaz interactiva para modelos IFC dentro de una aplicación con React, TypeScript, Vite y Material UI. Convertí este visor en una librería reusable, desarrollé una API con FastAPI conectada a Autodesk ACC para descargar modelos BIM y desplegué los proyectos en Azure, integrándolos en el entorno cloud de la empresa.

Además, desarrollé e integré un proyecto completo de gestión de modelos BIM cuyo frontend estaba hecho con React y el backend con Django, donde implementé la autenticación con Entra ID, la conexión con la API de Autodesk ACC para importar modelos BIM y la carga de modelos desde local. También incorporar el visor BIM dentro de este sistema, permitiendo visualizar los modelos directamente en la plataforma.

Posteriormente, colaboré tanto en frontend como en backend en un proyecto orientado a sensores IoT, integrando el visor y apoyando en dashboards con Recharts, navegación con React Router y visualización de datos en tiempo real. También colaboré en el backend con Node.js, PostgreSQL, WebSockets. Los servicios de Azure con los que he trabajado son Blob Storage, Web App, Static Web App, Azure Database for PostgreSQL y Enta ID.

Esta experiencia me permitió llevar un visor BIM propio desde su concepción hasta su integración en plataformas reales: un gestor de proyectos BIM empresarial y una solución cloud de datos IoT.`
      },
      {
        company: "IGNIS",
        role: "Investigadora Desarrolladora Full Stack",
        period: "Julio 2023 - Abril 2025",
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
        description: `En mi primer trabajo como desarrolladora aprendí a trabajar con buenas prácticas, código limpio y estructurado, GitFlow y entornos de desarrollo bien configurados. También realicé pequeños proyectos en Python utilizando Pandas y NumPy para procesar datos y crear herramientas internas.

Con esta base empecé a participar en los proyectos de IGNIS. Desarrollé una aplicación web completa con Django como backend, Keycloak para la autenticación y una API en FastAPI para servir y procesar datos.
En el frontend, construido con Next.js, TypeScript, TailwindCSS y shadcn/ui, implementé rutas, navegación, traducciones y componentes reutilizables, asegurando una comunicación tipada y consistente con las APIs.

Uno de mis desarrollos más avanzados fue un módulo para importar, visualizar y editar archivos Excel directamente en la web. Utilicé Glide Data Grid para manejar tablas grandes con alto rendimiento y, mediante excel.js y xlsx, implementé la lectura, modificación y escritura del archivo, permitiendo descargar un Excel actualizado o guardar los datos en la base de datos para recuperarlos posteriormente.`,
      },
      {
        company: "Deloitte",
        role: "Risk Advisory Cyber - Infrastructure Protection",
        period: "Noviembre 2022 - Enero 2023",
        technologies: ["Microsoft 365", "Teams", "OneDrive", "Seguridad"],
        description: `Me encargaba de revisar y validar la correcta configuración de herramientas corporativas como Teams, OneDrive y otros servicios de Microsoft 365, asegurando que los permisos, accesos y políticas estuvieran bien definidos. Mi objetivo era evitar fugas de información y garantizar que solo las personas autorizadas pudieran acceder a los recursos, contribuyendo a fortalecer la seguridad interna de los clientes.`,
      },
    ],
  },
  education: {
    title: "<Educación/>",
    degrees: [
      {
        title: "Máster en dirección y gestión de proyectos software",
        institution: "Universidad Politécnica de Madrid - ETSII",
        date: "Octubre 2022 - Julio 2024",
      },
      {
        title: "Erasmus +",
        institution: "Tallina Tehnikaülikool (TalTech) - Tallin/Estonia",
        date: "Enero 2022 - Junio 2022",
      },
      {
        title:
          "Doble grado en ingeniería de software y tecnología para la sociedad de la información",
        institution: "Universidad Politécnica de Madrid - ETSISI",
        date: "Septiembre 2017 - Junio 2023",
      },
      {
        title:
          "Grado superior de administración de sistemas informáticos y redes",
        institution: "IES Europa, Rivas – Vaciamadrid",
        date: "Septiembre 2014 - Junio 2016",
      },
    ],
  },
  technologies: {
    title: "<Tecnologías/>",
    skills: "Habilidades",
    tools: "Herramientas",
  },
  contact: {
    title: "<Contacto/>",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tucorreo@email.com",
      subject: "Asunto",
      subjectPlaceholder: "Sobre qué quieres hablar",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame un poco más...",
      submitButton: "Enviar mensaje",
      submittingButton: "Enviando...",
      clearButton: "Limpiar",
      success: "¡Gracias! He recibido tu mensaje.",
      error: "Ha ocurrido un error al enviar el mensaje.",
      sectionHint: "Ponte en contacto",
      sectionDescription:
        "Cuéntame brevemente qué necesitas y te responderé lo antes posible.",
    },
    linkedinPrompt: "También puedes escribirme por",
  },
};
