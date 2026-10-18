
import type { Metadata } from 'next';
import { DEFAULT_OG_IMAGE, requestLocale, shareMetadata } from '@/lib/metadata';
import { getBlogPosts, getBlogPost } from '@/lib/data/blog';
import { notFound } from 'next/navigation';
import { BlogPostClientPage, type BlogPostVersion } from '@/components/blog/blog-post-client-page';
import { BlogPostContent } from '@/components/blog/blog-post-content';
import { BlogStructuredData } from '@/components/blog/blog-structured-data';
import { ArticleSchema } from '@/components/blog/article-schema';
import { toBlogSummary } from '@/lib/data/blog/summaries';
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
  const locale = await requestLocale();
  const post = getBlogPost(slug, locale);
  if (!post) return { title: locale === 'es' ? 'Artículo no encontrado' : 'Article not found', robots: { index: false } };

  // The cover re-encoded for sharing (JPG, 1200×630, nothing cropped): see scripts/generate-og-images.js.
  const cover = post.imageUrl ? post.imageUrl.replace(/^\/blog\/(.+)\.\w+$/, '/og/blog/$1.jpg') : DEFAULT_OG_IMAGE;
  const published = new Date(post.date);

  return shareMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    path: `/blog/${post.slug}`,
    image: cover,
    imageAlt: post.title,
    locale,
    type: 'article',
    publishedTime: Number.isNaN(published.getTime()) ? undefined : published.toISOString(),
    tags: post.tags,
  });
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

  // Every language is rendered here, on the server; the client only switches between them.
  const versions: Partial<Record<Locale, BlogPostVersion>> = {};
  for (const loc of locales) {
    const localized = getBlogPost(slug, loc);
    if (!localized) continue;
    versions[loc] = {
      post: toBlogSummary(localized),
      body: <BlogPostContent content={localized.content} />,
      related: getBlogPosts(loc)
        .filter((candidate) => candidate.slug !== slug)
        .slice(0, 3)
        .map(toBlogSummary),
    };
  }

  return (
    <>
      <BlogStructuredData post={post} />
      <ArticleSchema post={post} />
      <BlogPostClientPage versions={versions} initialLocale={locale} />
    </>
  );
}
