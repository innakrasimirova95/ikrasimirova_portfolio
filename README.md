# Inna Krasimirova - Portfolio

Este es el portfolio personal de Inna Krasimirova, una Ingeniera de Software y Desarrolladora Full Stack. Este proyecto está diseñado para mostrar mis habilidades, experiencia y proyectos a través de una interfaz moderna, responsiva y multi-idioma.

## Características Principales

- **CV Interactivo**: Funciona como un currículum digital y dinámico.
- **Soporte Multi-idioma**: Contenido disponible en Español, Inglés y Búlgaro.
- **Sección "Sobre Mí"**: Una introducción personal y profesional.
- **Proyectos Destacados**: Una galería de proyectos con descripciones y enlaces.
- **Experiencia y Educación**: Timelines detallados de mi trayectoria profesional y académica.
- **Formulario de Contacto Funcional**: Permite a los visitantes enviar mensajes directamente a mi correo.
- **Alternador de Tema**: Cambia entre el modo claro y oscuro.
- **Diseño Responsivo**: Perfectamente adaptado a cualquier dispositivo.

## Tecnologías y Herramientas

Como escaparate de mis habilidades, este proyecto incorpora un stack de tecnologías moderno y robusto:

### Framework y Lenguajes
- **Next.js**: Framework de React para aplicaciones de alto rendimiento con Server-Side Rendering (SSR).
- **React**: Biblioteca líder para construir interfaces de usuario interactivas.
- **TypeScript**: Superset de JavaScript que añade tipado estático para un código más robusto y mantenible.

### UI y Estilos
- **Tailwind CSS**: Framework CSS utility-first para un diseño rápido y personalizado.
- **Shadcn UI**: Componentes de UI accesibles y componibles, construidos sobre Radix UI.
- **Framer Motion**: Para animaciones fluidas y atractivas.
- **next-themes**: Gestión de temas (claro/oscuro) de forma eficiente.
- **Lucide React & React Icons**: Amplia colección de iconos.
- **Geist Fonts**: Tipografía moderna y limpia para una legibilidad óptima.
- **Three.js**: Biblioteca de JavaScript para renderizado 3D, utilizada para el efecto visual de LiquidEther.

### Backend y Servicios
- **API Routes de Next.js**: Para la lógica de backend, como el envío de formularios.
- **Resend**: Servicio utilizado para el envío de correos electrónicos desde el formulario de contacto.
- **React Context**: Utilizado para gestionar el estado global del idioma en toda la aplicación.

## Funcionalidad de Contacto

El formulario de contacto está implementado utilizando una **API Route de Next.js**. Cuando un usuario envía un mensaje:
1. El frontend realiza una petición POST a un endpoint (`/api/contact`).
2. Este endpoint, ejecutándose en el servidor, valida los datos.
3. Utiliza el SDK de **Resend** para enviar un correo electrónico formateado en HTML directamente a mi bandeja de entrada.
4. Se proporciona una respuesta al usuario indicando si el mensaje se envió con éxito.

## Despliegue

El portfolio está desplegado en **Vercel**, la plataforma de los creadores de Next.js.


## Instalación y Uso Local

Sigue estos pasos para configurar y ejecutar el proyecto en tu máquina:

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/innakrasimirova95/ikrasimirova_portfolio
    cd ikrasimirova_portfolio
    ```

2.  **Instala las dependencias:**
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las claves necesarias:
    ```
    RESEND_API_KEY=tu_api_key_de_resend
    CONTACT_EMAIL=tu_email_de_contacto
    ```

4.  **Ejecuta el servidor de desarrollo:**
    ```bash
    npm run dev
    ```

    Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

## Contacto

- **LinkedIn**: [https://www.linkedin.com/in/innakrasimirova/](https://www.linkedin.com/in/innakrasimirova/)
- **GitHub**: [https://github.com/innakrasimirova95](https://github.com/innakrasimirova95)

---

© 2025 Inna Krasimirova. Todos los derechos reservados.
