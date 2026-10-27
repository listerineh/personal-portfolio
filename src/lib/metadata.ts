import type { Metadata } from "next";
import { type Locale } from "@/i18n/config";

/**
 * One place for every page's metadata. Titles are short; the root layout's template adds " · Sebastian Alvarez".
 * Share images are PNG/JPG (WebP is not reliably shown by LinkedIn, Facebook, iMessage or Slack) and are generated
 * by scripts/generate-og-images.js into /public/og.
 */

import { SITE_NAME, SITE_URL } from "./site";

export { SITE_NAME, SITE_URL };
export const AUTHOR_NAME = "Sebastian Alvarez";
export const TWITTER_HANDLE = "@listerineh";
export const TITLE_TEMPLATE = `%s · ${AUTHOR_NAME}`;
export const DEFAULT_OG_IMAGE = "/og/home.png";
/** The talks listing's card, also used by a deck that has no public card of its own (a draft). */
export const SLIDES_OG_IMAGE = "/og/slides.png";

const OG_SIZE = { width: 1200, height: 630 };
const ogLocale = (locale: Locale) => (locale === "es" ? "es_ES" : "en_US");

export type PageKey =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "blog"
  | "slides"
  | "contact"
  | "why"
  | "privacy"
  | "terms";

interface PageCopy {
  title: string;
  description: string;
  keywords: string[];
}

const PAGES: Record<
  PageKey,
  { path: string; image: string; copy: Record<Locale, PageCopy> }
> = {
  home: {
    path: "/",
    image: "/og/home.png",
    copy: {
      en: {
        title: "Sebastian Alvarez — Full-Stack Engineer & Applied AI",
        description:
          "Full-stack engineer building AI agents, cloud platforms and web products. Six years shipping backends, infrastructure and Next.js interfaces for remote teams.",
        keywords: [
          "Sebastian Alvarez",
          "listerineh",
          "full-stack engineer",
          "applied AI",
          "AI agents",
          "Next.js",
          "React",
          "Python",
          "TypeScript",
          "cloud",
          "AWS",
          "remote software engineer",
          "Ecuador",
          "Quito",
          "GDG Quito",
        ],
      },
      es: {
        title: "Sebastian Alvarez — Ingeniero Full-Stack e IA aplicada",
        description:
          "Ingeniero full-stack que construye agentes de IA, plataformas cloud y productos web. Seis años entregando backends, infraestructura e interfaces Next.js en remoto.",
        keywords: [
          "Sebastian Alvarez",
          "listerineh",
          "ingeniero full-stack",
          "IA aplicada",
          "agentes de IA",
          "Next.js",
          "React",
          "Python",
          "TypeScript",
          "cloud",
          "AWS",
          "ingeniero de software remoto",
          "Ecuador",
          "Quito",
          "GDG Quito",
        ],
      },
    },
  },
  about: {
    path: "/about",
    image: "/og/about.png",
    copy: {
      en: {
        title: "About",
        description:
          "From fixing computers as a kid to leading engineering teams for US companies: the story, the specialties, the GDG Quito community and the music behind the code.",
        keywords: [
          "about Sebastian Alvarez",
          "software engineer story",
          "tech lead",
          "GDG Quito organizer",
          "Ecuador developer",
          "musician engineer",
        ],
      },
      es: {
        title: "Sobre mí",
        description:
          "De reparar computadoras de niño a liderar equipos de ingeniería para empresas de EE. UU.: la historia, las especialidades, la comunidad GDG Quito y la música detrás del código.",
        keywords: [
          "sobre Sebastian Alvarez",
          "historia ingeniero de software",
          "tech lead",
          "organizador GDG Quito",
          "desarrollador Ecuador",
          "ingeniero músico",
        ],
      },
    },
  },
  projects: {
    path: "/projects",
    image: "/og/projects.png",
    copy: {
      en: {
        title: "Projects",
        description:
          "Open-source tools, AI products and side projects: in-browser video processing, AI-first boilerplates, realtime boards and more, with the stack behind each one.",
        keywords: [
          "software projects",
          "open source",
          "AI tools",
          "Next.js projects",
          "full-stack portfolio",
          "Sebastian Alvarez projects",
        ],
      },
      es: {
        title: "Proyectos",
        description:
          "Herramientas open source, productos de IA y proyectos personales: video en el navegador, boilerplates AI-first, tableros en tiempo real y más, con el stack de cada uno.",
        keywords: [
          "proyectos de software",
          "open source",
          "herramientas de IA",
          "proyectos Next.js",
          "portafolio full-stack",
          "proyectos Sebastian Alvarez",
        ],
      },
    },
  },
  skills: {
    path: "/skills",
    image: "/og/skills.png",
    copy: {
      en: {
        title: "Skills",
        description:
          "The languages, frameworks and cloud tools I use day to day, grouped by area, and how working with AI lets me pick up the ones that aren't on the list yet.",
        keywords: [
          "tech stack",
          "TypeScript",
          "React",
          "Next.js",
          "Python",
          "FastAPI",
          "Go",
          "AWS",
          "Docker",
          "Terraform",
          "AI engineering",
        ],
      },
      es: {
        title: "Habilidades",
        description:
          "Los lenguajes, frameworks y herramientas cloud que uso a diario, agrupados por área, y cómo trabajar con IA me permite adoptar los que aún no están en la lista.",
        keywords: [
          "stack tecnológico",
          "TypeScript",
          "React",
          "Next.js",
          "Python",
          "FastAPI",
          "Go",
          "AWS",
          "Docker",
          "Terraform",
          "ingeniería de IA",
        ],
      },
    },
  },
  blog: {
    path: "/blog",
    image: "/og/blog.png",
    copy: {
      en: {
        title: "Blog",
        description:
          "Articles on software engineering, cloud infrastructure and applied AI, written from real projects: architecture, tooling, career and the craft of shipping.",
        keywords: [
          "software engineering blog",
          "applied AI",
          "cloud infrastructure",
          "Next.js",
          "Terraform",
          "career in tech",
          "Sebastian Alvarez blog",
        ],
      },
      es: {
        title: "Blog",
        description:
          "Artículos sobre ingeniería de software, infraestructura cloud e IA aplicada, escritos desde proyectos reales: arquitectura, herramientas, carrera y el oficio de entregar.",
        keywords: [
          "blog de ingeniería de software",
          "IA aplicada",
          "infraestructura cloud",
          "Next.js",
          "Terraform",
          "carrera en tecnología",
          "blog Sebastian Alvarez",
        ],
      },
    },
  },
  slides: {
    path: "/slides",
    image: SLIDES_OG_IMAGE,
    copy: {
      en: {
        title: "Talks",
        description:
          "Slides from the talks I've given at GDG Quito and other events, on Git, Python, Firebase, AI and building products. Flip through them, present them or download the PDF.",
        keywords: [
          "Sebastian Alvarez talks",
          "tech talks",
          "slides",
          "presentations",
          "GDG Quito",
          "speaker",
          "Python",
          "Firebase",
          "Git",
          "AI",
        ],
      },
      es: {
        title: "Charlas",
        description:
          "Las diapositivas de mis charlas en GDG Quito y otros eventos, sobre Git, Python, Firebase, IA y cómo construir productos. Recórrelas, preséntalas o descarga el PDF.",
        keywords: [
          "charlas Sebastian Alvarez",
          "charlas de tecnología",
          "diapositivas",
          "presentaciones",
          "GDG Quito",
          "speaker",
          "Python",
          "Firebase",
          "Git",
          "IA",
        ],
      },
    },
  },
  contact: {
    path: "/contact",
    image: "/og/contact.png",
    copy: {
      en: {
        title: "Contact",
        description:
          "Have a project, a role or a question? Send a message or write directly. I work remotely from Quito, Ecuador, and usually reply within a day.",
        keywords: [
          "contact Sebastian Alvarez",
          "hire full-stack engineer",
          "freelance developer",
          "remote engineer Ecuador",
          "technical consulting",
        ],
      },
      es: {
        title: "Contacto",
        description:
          "¿Tienes un proyecto, un rol o una pregunta? Envía un mensaje o escribe directo. Trabajo en remoto desde Quito, Ecuador, y suelo responder en menos de un día.",
        keywords: [
          "contactar Sebastian Alvarez",
          "contratar ingeniero full-stack",
          "desarrollador freelance",
          "ingeniero remoto Ecuador",
          "consultoría técnica",
        ],
      },
    },
  },
  why: {
    path: "/why",
    image: "/og/why.png",
    copy: {
      en: {
        title: "Why Listerineh?",
        description:
          "Listerineh is a musical identity before it's a username: an indie funk band, an experimental album and a lo-fi solo project behind the engineer.",
        keywords: [
          "Listerineh",
          "Margarita Nugget",
          "Sofones Solares",
          "lo-fi",
          "indie funk",
          "musician software engineer",
          "Ecuador music",
        ],
      },
      es: {
        title: "¿Por qué Listerineh?",
        description:
          "Listerineh es una identidad musical antes que un usuario: una banda de indie funk, un álbum experimental y un proyecto lo-fi solista detrás del ingeniero.",
        keywords: [
          "Listerineh",
          "Margarita Nugget",
          "Sofones Solares",
          "lo-fi",
          "indie funk",
          "ingeniero de software músico",
          "música Ecuador",
        ],
      },
    },
  },
  privacy: {
    path: "/privacy",
    image: "/og/privacy.png",
    copy: {
      en: {
        title: "Privacy Policy",
        description:
          "How listerineh.dev collects, uses and protects information, which cookies it sets, and the choices you have.",
        keywords: [
          "privacy policy",
          "cookies",
          "data protection",
          "listerineh.dev",
        ],
      },
      es: {
        title: "Política de privacidad",
        description:
          "Cómo listerineh.dev recopila, usa y protege la información, qué cookies usa y qué opciones tienes.",
        keywords: [
          "política de privacidad",
          "cookies",
          "protección de datos",
          "listerineh.dev",
        ],
      },
    },
  },
  terms: {
    path: "/terms",
    image: "/og/terms.png",
    copy: {
      en: {
        title: "Terms of Use",
        description:
          "The terms for using listerineh.dev, its content and its code examples.",
        keywords: ["terms of use", "terms and conditions", "listerineh.dev"],
      },
      es: {
        title: "Términos de uso",
        description:
          "Los términos de uso de listerineh.dev, su contenido y sus ejemplos de código.",
        keywords: [
          "términos de uso",
          "términos y condiciones",
          "listerineh.dev",
        ],
      },
    },
  },
};

/** The visitor's language: their choice (cookie), else their browser's, else English. See src/i18n/locale.ts. */
import { requestLocale } from "@/i18n/locale";
import { isLocale } from "@/i18n/negotiate";
export { requestLocale };

interface ShareOptions {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt?: string;
  locale: Locale;
  keywords?: string[];
  /** Absolute title (skips the template), for the home page. */
  absoluteTitle?: boolean;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}

/** Builds title, description, canonical, Open Graph and Twitter in one consistent shape. */
export function shareMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  locale,
  keywords,
  absoluteTitle = false,
  type = "website",
  publishedTime,
  modifiedTime,
  tags,
}: ShareOptions): Metadata {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const shareTitle = absoluteTitle ? title : `${title} · ${AUTHOR_NAME}`;
  const images = [{ url: image, ...OG_SIZE, alt: imageAlt ?? shareTitle }];

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title: shareTitle,
      description,
      url,
      siteName: SITE_NAME,
      locale: ogLocale(locale),
      alternateLocale: ogLocale(locale === "es" ? "en" : "es"),
      images,
      ...(type === "article"
        ? {
            type: "article",
            publishedTime,
            modifiedTime,
            authors: [AUTHOR_NAME],
            tags,
          }
        : type === "profile"
          ? {
              type: "profile",
              firstName: "Sebastian",
              lastName: "Alvarez",
              username: "listerineh",
            }
          : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [{ url: image, alt: imageAlt ?? shareTitle }],
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
    },
  };
}

/** Metadata for one of the site's fixed pages, in the visitor's language. */
export function pageMetadata(page: PageKey, locale: Locale): Metadata {
  const { path, image, copy } = PAGES[page];
  const { title, description, keywords } = copy[locale];
  return shareMetadata({
    title,
    description,
    keywords,
    path,
    image,
    locale,
    absoluteTitle: page === "home",
    type: page === "about" ? "profile" : "website",
  });
}

/** Convenience for route files: `export const generateMetadata = metadataFor('about')`. The language comes from the
 * [locale] segment, so a static page stays static. */
export function metadataFor(page: PageKey) {
  return async ({ params }: { params: Promise<{ locale?: string }> }): Promise<Metadata> => {
    const { locale } = await params;
    return pageMetadata(page, isLocale(locale) ? locale : await requestLocale());
  };
}
