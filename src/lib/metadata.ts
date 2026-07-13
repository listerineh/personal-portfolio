import { Metadata } from 'next';
import type { Locale } from '@/i18n/config';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const metadata: Record<string, Record<Locale, PageMetadata>> = {
  home: {
    en: {
      title: 'Sebastian Alvarez | Senior Fullstack & Platform Engineer',
      description: 'Senior fullstack & platform engineer building scalable systems with React, Next.js, Python and AWS. GDG Quito organizer, open source contributor & technical blogger based in Ecuador.',
      keywords: [
        'Sebastian Alvarez',
        'listerineh',
        'senior fullstack engineer',
        'platform engineer',
        'full-stack developer',
        'software engineer',
        'React developer',
        'Next.js developer',
        'Python engineer',
        'TypeScript developer',
        'AWS',
        'Kubernetes',
        'AI agents',
        'cloud-native',
        'DevOps',
        'tech lead',
        'GDG Quito',
        'GDG Ecuador',
        'Google Developer Groups',
        'open source',
        'Ecuador software engineer',
        'Quito developer',
      ],
      image: '/images/home-og.webp',
    },
    es: {
      title: 'Sebastian Alvarez | Ingeniero Fullstack Senior & Platform Engineer',
      description: 'Ingeniero fullstack senior construyendo sistemas escalables con React, Next.js, Python y AWS. Organizador de GDG Quito, contribuidor open source y blogger técnico desde Ecuador.',
      keywords: [
        'Sebastian Alvarez',
        'listerineh',
        'ingeniero fullstack senior',
        'platform engineer',
        'desarrollador full-stack',
        'ingeniero de software',
        'desarrollador React',
        'desarrollador Next.js',
        'ingeniero Python',
        'desarrollador TypeScript',
        'AWS',
        'Kubernetes',
        'agentes IA',
        'cloud-native',
        'DevOps',
        'tech lead',
        'GDG Quito',
        'GDG Ecuador',
        'Google Developer Groups',
        'open source',
        'ingeniero de software Ecuador',
        'desarrollador Quito',
      ],
      image: '/images/home-og.webp',
    },
  },
  blog: {
    en: {
      title: 'Technical Blog | Sebastian Alvarez',
      description: 'Technical articles about web development, software engineering, cloud technologies, and best practices. Learn from real-world experience.',
      keywords: [
        'technical blog',
        'web development blog',
        'software engineering',
        'React tutorials',
        'Next.js guides',
        'Python articles',
        'cloud computing',
        'DevOps practices',
      ],
      image: '/images/blog-og.webp',
    },
    es: {
      title: 'Blog Técnico | Sebastian Alvarez',
      description: 'Artículos técnicos sobre desarrollo web, ingeniería de software, tecnologías cloud y mejores prácticas. Aprende de experiencia real.',
      keywords: [
        'blog técnico',
        'blog de desarrollo web',
        'ingeniería de software',
        'tutoriales React',
        'guías Next.js',
        'artículos Python',
        'computación en la nube',
        'prácticas DevOps',
      ],
      image: '/images/blog-og.webp',
    },
  },
  why: {
    en: {
      title: 'Why Listerineh? | Lo-Fi Hip-Hop Artist & Software Engineer',
      description: 'Discover Listerineh - a musician and software engineer exploring Lo-Fi Hip-Hop, electronic, and ambient soundscapes. Listen to original tracks on Spotify.',
      keywords: [
        'Listerineh',
        'Lo-Fi Hip-Hop',
        'electronic music',
        'ambient music',
        'music producer',
        'software engineer',
        'Spotify artist',
      ],
      image: '/images/sebastian_alvarez_photo.webp',
    },
    es: {
      title: '¿Por qué Listerineh? | Artista Lo-Fi Hip-Hop e Ingeniero de Software',
      description: 'Descubre Listerineh - un músico e ingeniero de software explorando paisajes sonoros Lo-Fi Hip-Hop, electrónicos y ambientales. Escucha tracks originales en Spotify.',
      keywords: [
        'Listerineh',
        'Lo-Fi Hip-Hop',
        'música electrónica',
        'música ambiental',
        'productor musical',
        'ingeniero de software',
        'artista Spotify',
      ],
      image: '/images/sebastian_alvarez_photo.webp',
    },
  },
  about: {
    en: {
      title: 'About Me | Sebastian Alvarez — Senior Fullstack & Platform Engineer',
      description: 'Learn about Sebastian Alvarez — from tinkering with hardware as a kid to leading engineering teams at US companies. Senior fullstack engineer, tech lead, GDG Ecuador speaker, and musician.',
      keywords: [
        'Sebastian Alvarez',
        'about me',
        'senior software engineer',
        'tech lead',
        'fullstack engineer',
        'GDG Ecuador',
        'Google Developer Groups',
        'Ecuador developer',
        'software engineer biography',
      ],
      image: '/images/about-og.webp',
    },
    es: {
      title: 'Sobre mí | Sebastian Alvarez — Senior Fullstack & Platform Engineer',
      description: 'Conoce a Sebastian Alvarez — desde curiosear con hardware de niño hasta liderar equipos de ingeniería en empresas de EEUU. Ingeniero fullstack senior, tech lead, speaker en GDG Ecuador y músico.',
      keywords: [
        'Sebastian Alvarez',
        'sobre mí',
        'ingeniero de software senior',
        'tech lead',
        'ingeniero fullstack',
        'GDG Ecuador',
        'Google Developer Groups',
        'desarrollador Ecuador',
        'biografía ingeniero de software',
      ],
      image: '/images/about-og.webp',
    },
  },
  privacy: {
    en: {
      title: 'Privacy Policy | Sebastian Alvarez',
      description: 'Privacy policy for listerineh.dev - Learn how we collect, use, and protect your personal information.',
      image: '/images/website_screenshot.webp',
    },
    es: {
      title: 'Política de Privacidad | Sebastian Alvarez',
      description: 'Política de privacidad para listerineh.dev - Aprende cómo recopilamos, usamos y protegemos tu información personal.',
      image: '/images/website_screenshot.webp',
    },
  },
  terms: {
    en: {
      title: 'Terms of Service | Sebastian Alvarez',
      description: 'Terms of service for listerineh.dev - Read our terms and conditions for using this website.',
      image: '/images/website_screenshot.webp',
    },
    es: {
      title: 'Términos de Servicio | Sebastian Alvarez',
      description: 'Términos de servicio para listerineh.dev - Lee nuestros términos y condiciones para usar este sitio web.',
      image: '/images/website_screenshot.webp',
    },
  },
};

export function generatePageMetadata(
  page: keyof typeof metadata,
  locale: Locale,
  customUrl?: string
): Metadata {
  const pageData = metadata[page][locale];
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? 'en_US' : 'es_ES';
  const pageUrl = customUrl || `${siteUrl}${page === 'home' ? '' : `/${page}`}`;
  const imageUrl = pageData.image ? `${siteUrl}${pageData.image}` : `${siteUrl}/og-default.png`;

  return {
    title: pageData.title,
    description: pageData.description,
    keywords: pageData.keywords,
    openGraph: {
      title: pageData.title,
      description: pageData.description,
      url: pageUrl,
      siteName: 'Sebastian Alvarez',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageData.title,
        },
      ],
      locale: ogLocale,
      alternateLocale: alternateLocale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageData.title,
      description: pageData.description,
      images: [imageUrl],
      creator: '@listerineh',
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en': pageUrl,
        'es': pageUrl,
      },
    },
  };
}
