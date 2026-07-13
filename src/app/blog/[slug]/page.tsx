
import { Metadata } from 'next';
import { getBlogPosts, getBlogPost } from '@/lib/data';
import { notFound } from 'next/navigation';
import { BlogPostClientPage } from '@/components/blog/blog-post-client-page';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const post = getBlogPost(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.imageUrl ? `${siteUrl}${post.imageUrl}` : `${siteUrl}/og-default.png`;
  
  const ogLocale = locale === 'es' ? 'es_ES' : 'en_US';
  const alternateLocale = locale === 'es' ? 'en' : 'es';

  return {
    title: `${post.title} | Sebastian Alvarez`,
    description: post.excerpt,
    authors: [{ name: post.author, url: siteUrl }],
    creator: 'Sebastian Alvarez',
    publisher: 'Sebastian Alvarez',
    keywords: post.tags,
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: postUrl,
      siteName: 'listerineh.dev',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: ogLocale,
      alternateLocale: alternateLocale === 'es' ? 'es_ES' : 'en_US',
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.date).toISOString(),
      authors: [post.author],
      tags: post.tags,
      section: post.tags[0] ?? 'Engineering',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: '@listerineh',
      site: '@listerineh',
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const savedLocale = cookieStore.get('NEXT_LOCALE')?.value;
  const locale = (savedLocale && locales.includes(savedLocale as Locale) ? savedLocale : defaultLocale) as Locale;
  const post = getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  return <BlogPostClientPage post={post} />;
}
