import { Metadata } from 'next';
import { getBlogPosts } from '@/lib/data';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogListingClient } from '@/components/blog/blog-listing-client';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const blogUrl = `${siteUrl}/blog`;
  
  const title = locale === 'es' 
    ? 'Blog | Sebastian Alvarez - Desarrollo, IA y Tecnología'
    : 'Blog | Sebastian Alvarez - Development, AI & Technology';
  
  const description = locale === 'es'
    ? 'Artículos sobre desarrollo de software, inteligencia artificial, arquitectura de sistemas y las últimas tendencias en tecnología. Comparto experiencias, tutoriales y reflexiones sobre el mundo tech.'
    : 'Articles about software development, artificial intelligence, system architecture, and the latest technology trends. I share experiences, tutorials, and insights from the tech world.';
  
  const keywords = locale === 'es'
    ? ['blog tecnología', 'desarrollo software', 'inteligencia artificial', 'programación', 'arquitectura software', 'DevOps', 'cloud computing', 'tutoriales programación', 'Sebastian Alvarez']
    : ['tech blog', 'software development', 'artificial intelligence', 'programming', 'software architecture', 'DevOps', 'cloud computing', 'programming tutorials', 'Sebastian Alvarez'];

  return {
    title,
    description,
    keywords,
    authors: [{ name: 'Sebastian Alvarez', url: siteUrl }],
    creator: 'Sebastian Alvarez',
    publisher: 'Sebastian Alvarez',
    openGraph: {
      title,
      description,
      url: blogUrl,
      siteName: 'Sebastian Alvarez - Dev Blog',
      images: [
        {
          url: `${siteUrl}/website_screenshot.webp`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      alternateLocale: locale === 'es' ? 'en_US' : 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${siteUrl}/website_screenshot.webp`],
      creator: '@listerineh',
      site: '@listerineh',
    },
    alternates: {
      canonical: blogUrl,
      languages: {
        'en': `${siteUrl}/blog`,
        'es': `${siteUrl}/blog`,
      },
      types: {
        'application/rss+xml': `${siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export default async function BlogListingPage() {
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const blogPosts = getBlogPosts(locale);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${siteUrl}/blog`,
    'url': `${siteUrl}/blog`,
    'name': locale === 'es' ? 'Blog de Sebastian Alvarez' : 'Sebastian Alvarez Blog',
    'description': locale === 'es'
      ? 'Artículos sobre desarrollo de software, inteligencia artificial y tecnología'
      : 'Articles about software development, artificial intelligence, and technology',
    'author': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
      'sameAs': [
        'https://github.com/listerineh',
        'https://twitter.com/listerineh',
        'https://linkedin.com/in/listerineh',
      ],
    },
    'publisher': {
      '@type': 'Person',
      'name': 'Sebastian Alvarez',
      'url': siteUrl,
    },
    'blogPost': blogPosts.slice(0, 10).map(post => ({
      '@type': 'BlogPosting',
      '@id': `${siteUrl}/blog/${post.slug}`,
      'url': `${siteUrl}/blog/${post.slug}`,
      'headline': post.title,
      'description': post.excerpt,
      'datePublished': new Date(post.date).toISOString(),
      'dateModified': new Date(post.date).toISOString(),
      'author': {
        '@type': 'Person',
        'name': post.author,
      },
      'image': post.imageUrl ? `${siteUrl}${post.imageUrl}` : undefined,
      'keywords': post.tags.join(', '),
    })),
    'inLanguage': locale === 'es' ? 'es-ES' : 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Header />
      <main className="pt-20">
        <BlogListingClient posts={blogPosts} />
      </main>
      <Footer />
    </>
  );
}
