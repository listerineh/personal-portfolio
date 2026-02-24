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
      title: 'Sebastian Alvarez | Full-Stack Software Engineer & Web Developer',
      description: 'Full-stack software engineer specializing in React, Next.js, Python, and cloud technologies. View my portfolio, projects, and technical blog on modern web development.',
      keywords: [
        'full-stack engineer',
        'full-stack developer',
        'web developer',
        'software engineer',
        'React developer',
        'Next.js developer',
        'Python developer',
        'TypeScript developer',
        'cloud technologies',
        'AWS developer',
        'DevOps',
        'Quito developer',
        'Ecuador software engineer',
      ],
      image: '/images/website_screenshot.webp',
    },
    es: {
      title: 'Sebastian Alvarez | Ingeniero de Software Full-Stack & Desarrollador Web',
      description: 'Ingeniero de software full-stack especializado en React, Next.js, Python y tecnologías cloud. Ve mi portafolio, proyectos y blog técnico sobre desarrollo web moderno.',
      keywords: [
        'ingeniero full-stack',
        'desarrollador full-stack',
        'desarrollador web',
        'ingeniero de software',
        'desarrollador React',
        'desarrollador Next.js',
        'desarrollador Python',
        'desarrollador TypeScript',
        'tecnologías cloud',
        'desarrollador AWS',
        'DevOps',
        'desarrollador Quito',
        'ingeniero de software Ecuador',
      ],
      image: '/images/website_screenshot.webp',
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
      image: '/images/website_screenshot.webp',
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
      image: '/images/website_screenshot.webp',
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
