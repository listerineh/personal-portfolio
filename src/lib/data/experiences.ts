import type { Experience } from '@/types';
import type { Locale } from '@/i18n/config';

export const experiencesData: Record<Locale, Experience[]> = {
  en: [
    {
      company: "SoFi Tech Solutions",
      logoUrl: "/images/sofi_tech_solutions_logo.webp",
      jobTitle: "Senior Software Engineer",
      employmentDates: "Dec 2025 - Present",
      location: "Remote",
      responsibilities: [
        "Core member of the API team at SoFi Tech Solutions (formerly Galileo Financial Technologies), building the backend systems behind the company's financial infrastructure.",
        "Led and contributed to the monolith-to-microservices migration, shipping 4 new services with independent automated deployments.",
        "Built service-level dashboards and monitors with Datadog and Coralogix, improving traceability and incident response.",
        "Migrated client documentation to ReadMe, cutting deployment time by 40% and speeding up onboarding.",
        "Practice agentic development daily under the company's security standards for AI-generated code in a banking environment.",
      ],
      stack: ["Python", "Docker", "Terraform", "GitLab CI", "Jenkins", "Datadog", "Coralogix", "Cloudflare"],
    },
    {
      company: "Google Developer Groups Quito",
      logoUrl: "/images/gdg_quito_logo.webp",
      jobTitle: "Organizer",
      employmentDates: "Apr 2023 - Present",
      location: "Quito, EC",
      responsibilities: [
        "Organize in-person and virtual tech events for a community of 5,700+ members.",
        "Delivered 20+ talks on emerging technologies, including AI and cloud.",
        "Moderate sessions and lead community growth.",
      ],
    },
    {
      company: "Uwigo/Informat",
      logoUrl: "/images/Informat_s_a_logo.webp",
      jobTitle: "Senior Platform Engineer",
      employmentDates: "Aug 2025 - Dec 2025",
      location: "Remote",
      responsibilities: [
        "Migrated the platform from DigitalOcean (18 droplets across 3 environments, databases, backups and a load balancer) to serverless Azure with zero user impact, cutting infrastructure costs by ~60%.",
        "Designed the unified authentication and authorization microservice used by every product, autoscaling to serve ~2,000 client companies.",
        "Set up log monitoring, custom alerting and real-time dashboards with New Relic.",
        "Built scalable frontend interfaces and a design system for the company's products.",
        "Standardized API response formats and documented process improvements across teams.",
      ],
      stack: ["Python", "FastAPI", "Azure", "Terraform", "PostgreSQL", "Docker", "Kubernetes", "New Relic"],
    },
    {
      company: "Blue Express",
      logoUrl: "/images/blue_express_s_a_logo.webp",
      jobTitle: "Senior FullStack Engineer",
      employmentDates: "Aug 2024 - Aug 2025",
      location: "Remote",
      responsibilities: [
        "Built and maintained the event-driven microservices architecture behind courier operations.",
        "Adapted and integrated a computer-vision model that validates courier photos (pickup, transit and delivery) before storage, filtering out invalid images at high volume.",
        "Reduced costs by ~30% once the project was completed.",
        "Worked across backend, frontend, mobile and infrastructure teams.",
      ],
      stack: ["Python", "FastAPI", "TypeScript", "React", "Redux", "MongoDB", "Firebase", "CloudFormation"],
    },
    {
      company: "ioet",
      logoUrl: "/images/ioet_logo.webp",
      jobTitle: "Software Engineer",
      employmentDates: "Sep 2022 - Jan 2025",
      location: "Remote",
      responsibilities: [],
      projects: [
        {
          name: "Symphonie.ai",
          role: "Fullstack Developer",
          summary: "Processed, stored and labeled data in vector stores to train the ML models behind a RAG system for user queries, and built the web app that serves it.",
        },
        {
          name: "Hewlett Packard Enterprise",
          role: "Backend Developer & Test Automation",
          summary: "Maintained and scaled microservices, wrote automation scripts, and led integration, load and stress testing.",
        },
        {
          name: "Pair Eyewear",
          role: "Frontend Engineer",
          summary: "Shipped new features and performance improvements for the customer-facing web app.",
        },
        {
          name: "ioet Payroll & Billing",
          role: "Fullstack Developer",
          summary: "Led development of the internal payroll and billing systems that automate the company's financial processes.",
        },
        {
          name: "ioet UI Standard",
          role: "Frontend Developer",
          summary: "Created the internal UI component library used across projects.",
        },
      ],
      stack: ["TypeScript", "Python", "Go", "Next.js", "FastAPI", "GraphQL", "AWS", "Terraform", "Kafka", "Kubernetes"],
    },
    {
      company: "ioet",
      logoUrl: "/images/ioet_logo.webp",
      jobTitle: "Information Technology Intern",
      employmentDates: "Apr 2022 - Sep 2022",
      location: "Remote",
      responsibilities: [
        "Learned by contributing to real client projects through pair programming and guided tasks.",
      ],
      stack: ["Python", "Angular", "PostgreSQL", "Azure", "Postman"],
    },
    {
      company: "Freelance",
      jobTitle: "Web Developer",
      employmentDates: "May 2022 - Oct 2022",
      location: "Quito, EC",
      responsibilities: [
        "Delivered a project-management platform for engineering students at Universidad de las Fuerzas Armadas ESPE.",
        "Still take on occasional freelance web projects alongside full-time roles, from design to deployment.",
      ],
      stack: ["TypeScript", "React", "Node.js", "Python", "Django", "MongoDB", "AWS", "Strapi"],
    },
    {
      company: "Prowess EC",
      jobTitle: "WordPress Development Team Lead",
      employmentDates: "Jan 2022 - Apr 2022",
      location: "Remote",
      responsibilities: [
        "Led a team of developers building a multi-vendor e-commerce site with WordPress, WooCommerce and Dokan.",
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    },
    {
      company: "Military Applications Research Center (CICTE – ESPE)",
      jobTitle: "AI Developer",
      employmentDates: "Jul 2020 - Dec 2021",
      location: "Sangolquí, EC",
      responsibilities: [
        "Developed real-time computer-vision algorithms in MATLAB and Python.",
        "Integrated them with Arduino microcontrollers and servo motors for hardware automation.",
      ],
      stack: ["MATLAB", "Python", "Arduino", "Computer Vision"],
    },
  ],
  es: [
    {
      company: "SoFi Tech Solutions",
      logoUrl: "/images/sofi_tech_solutions_logo.webp",
      jobTitle: "Ingeniero de Software Senior",
      employmentDates: "Dic 2025 - Presente",
      location: "Remoto",
      responsibilities: [
        "Miembro principal del equipo de API en SoFi Tech Solutions (antes Galileo Financial Technologies), construyendo los sistemas backend detrás de la infraestructura financiera de la empresa.",
        "Lideré y contribuí a la migración del monolito a microservicios, habilitando 4 nuevos servicios con despliegues automatizados independientes.",
        "Construí dashboards y monitores por servicio con Datadog y Coralogix, mejorando la trazabilidad y la respuesta a incidentes.",
        "Migré la documentación de clientes a ReadMe, reduciendo el tiempo de despliegue en un 40% y acelerando el onboarding.",
        "Practico desarrollo agéntico a diario bajo los estándares de seguridad de la empresa para código generado con IA en un entorno bancario.",
      ],
      stack: ["Python", "Docker", "Terraform", "GitLab CI", "Jenkins", "Datadog", "Coralogix", "Cloudflare"],
    },
    {
      company: "Google Developer Groups Quito",
      logoUrl: "/images/gdg_quito_logo.webp",
      jobTitle: "Organizador",
      employmentDates: "Abr 2023 - Presente",
      location: "Quito, EC",
      responsibilities: [
        "Organizo eventos tecnológicos presenciales y virtuales para una comunidad de más de 5.700 miembros.",
        "He dado más de 20 charlas sobre tecnologías emergentes, incluyendo IA y cloud.",
        "Modero sesiones y lidero el crecimiento de la comunidad.",
      ],
    },
    {
      company: "Uwigo/Informat",
      logoUrl: "/images/Informat_s_a_logo.webp",
      jobTitle: "Ingeniero de Plataforma Senior",
      employmentDates: "Ago 2025 - Dic 2025",
      location: "Remoto",
      responsibilities: [
        "Migré la plataforma de DigitalOcean (18 droplets en 3 ambientes, bases de datos, respaldos y un balanceador de carga) a Azure serverless sin impacto para los usuarios, reduciendo los costos de infraestructura en ~60%.",
        "Diseñé el microservicio unificado de autenticación y autorización que usan todos los productos, con autoescalado para atender a ~2.000 empresas cliente.",
        "Implementé monitoreo de logs, alertas personalizadas y dashboards en tiempo real con New Relic.",
        "Construí interfaces frontend escalables y un design system para los productos de la empresa.",
        "Estandaricé los formatos de respuesta de las API y documenté mejoras de procesos entre equipos.",
      ],
      stack: ["Python", "FastAPI", "Azure", "Terraform", "PostgreSQL", "Docker", "Kubernetes", "New Relic"],
    },
    {
      company: "Blue Express",
      logoUrl: "/images/blue_express_s_a_logo.webp",
      jobTitle: "Ingeniero FullStack Senior",
      employmentDates: "Ago 2024 - Ago 2025",
      location: "Remoto",
      responsibilities: [
        "Construí y mantuve la arquitectura de microservicios basada en eventos detrás de la operación de couriers.",
        "Adapté e integré un modelo de visión por computadora que valida las fotos de los couriers (recepción, movilización y entrega) antes de almacenarlas, filtrando imágenes inválidas a gran volumen.",
        "Reduje los costos en ~30% una vez terminado el proyecto.",
        "Trabajé con los equipos de backend, frontend, móvil e infraestructura.",
      ],
      stack: ["Python", "FastAPI", "TypeScript", "React", "Redux", "MongoDB", "Firebase", "CloudFormation"],
    },
    {
      company: "ioet",
      logoUrl: "/images/ioet_logo.webp",
      jobTitle: "Ingeniero de Software",
      employmentDates: "Sep 2022 - Ene 2025",
      location: "Remoto",
      responsibilities: [],
      projects: [
        {
          name: "Symphonie.ai",
          role: "Desarrollador Fullstack",
          summary: "Procesé, almacené y etiqueté datos en entornos vectorizados para entrenar los modelos de ML detrás de un sistema RAG de consultas de usuarios, y construí la aplicación web que lo sirve.",
        },
        {
          name: "Hewlett Packard Enterprise",
          role: "Desarrollador Backend y Automatización de Pruebas",
          summary: "Mantuve y escalé microservicios, escribí scripts de automatización y lideré las pruebas de integración, carga y estrés.",
        },
        {
          name: "Pair Eyewear",
          role: "Ingeniero Frontend",
          summary: "Entregué nuevas funcionalidades y mejoras de rendimiento para la aplicación web de cara al cliente.",
        },
        {
          name: "ioet Payroll & Billing",
          role: "Desarrollador Fullstack",
          summary: "Lideré el desarrollo de los sistemas internos de nómina y facturación que automatizan los procesos financieros de la empresa.",
        },
        {
          name: "ioet UI Standard",
          role: "Desarrollador Frontend",
          summary: "Creé la biblioteca interna de componentes UI usada en múltiples proyectos.",
        },
      ],
      stack: ["TypeScript", "Python", "Go", "Next.js", "FastAPI", "GraphQL", "AWS", "Terraform", "Kafka", "Kubernetes"],
    },
    {
      company: "ioet",
      logoUrl: "/images/ioet_logo.webp",
      jobTitle: "Pasante de Tecnologías de la Información",
      employmentDates: "Abr 2022 - Sep 2022",
      location: "Remoto",
      responsibilities: [
        "Aprendí contribuyendo a proyectos reales de clientes mediante pair programming y tareas guiadas.",
      ],
      stack: ["Python", "Angular", "PostgreSQL", "Azure", "Postman"],
    },
    {
      company: "Freelance",
      jobTitle: "Desarrollador Web",
      employmentDates: "May 2022 - Oct 2022",
      location: "Quito, EC",
      responsibilities: [
        "Entregué una plataforma de gestión de proyectos para estudiantes de ingeniería de la Universidad de las Fuerzas Armadas ESPE.",
        "Sigo tomando proyectos web freelance ocasionales en paralelo a mis roles de tiempo completo, del diseño al despliegue.",
      ],
      stack: ["TypeScript", "React", "Node.js", "Python", "Django", "MongoDB", "AWS", "Strapi"],
    },
    {
      company: "Prowess EC",
      jobTitle: "Líder del Equipo de Desarrollo WordPress",
      employmentDates: "Ene 2022 - Abr 2022",
      location: "Remoto",
      responsibilities: [
        "Lideré un equipo de desarrolladores en la construcción de un sitio de e-commerce multivendedor con WordPress, WooCommerce y Dokan.",
      ],
      stack: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    },
    {
      company: "Centro de Investigación de Aplicaciones Militares (CICTE – ESPE)",
      jobTitle: "Desarrollador de IA",
      employmentDates: "Jul 2020 - Dic 2021",
      location: "Sangolquí, EC",
      responsibilities: [
        "Desarrollé algoritmos de visión por computadora en tiempo real con MATLAB y Python.",
        "Los integré con microcontroladores Arduino y servomotores para automatización de hardware.",
      ],
      stack: ["MATLAB", "Python", "Arduino", "Computer Vision"],
    },
  ],
};

export const experiences = experiencesData.en;

export function getExperiences(locale: Locale = 'en'): Experience[] {
  return experiencesData[locale] || experiencesData.en;
}
