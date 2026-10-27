
import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { shareMetadata } from '@/lib/metadata';
import { blogShareImage } from '@/lib/og/blog-image';
import { getBlogPost, getBlogPosts } from '@/lib/data/blog';
import { notFound } from 'next/navigation';
import { BlogPostClientPage, type BlogPostVersion } from '@/components/blog/blog-post-client-page';
import { BlogPostContent } from '@/components/blog/blog-post-content';
import { BlogStructuredData } from '@/components/blog/blog-structured-data';
import { ArticleSchema } from '@/components/blog/article-schema';
import { toBlogSummary } from '@/lib/data/blog/summaries';
import { adjacentSlugs, relatedSlugs } from '@/lib/data/blog/related';
import { locales, type Locale } from '@/i18n/config';

interface BlogPostPageProps {
  params: Promise<{
    locale: Locale;
    slug: string;
  }>;
}

/** Every post, prerendered in both languages (the [locale] layout supplies the languages). Any
 * other slug is a 404 straight away: content ships with the code, so there is nothing to render on demand. */
export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts('en').map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getBlogPost(slug, locale);
  if (!post) return { title: locale === 'es' ? 'Artículo no encontrado' : 'Article not found', robots: { index: false } };

  const published = new Date(post.date);

  return shareMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    path: `/blog/${post.slug}`,
    // A Lumen card with the title, byline and cover, drawn on demand (src/app/og/blog/[file]/route.tsx).
    image: blogShareImage(post, locale),
    imageAlt: post.title,
    locale,
    type: 'article',
    publishedTime: Number.isNaN(published.getTime()) ? undefined : published.toISOString(),
    tags: post.tags,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const post = getBlogPost(slug, locale);

  if (!post) {
    notFound();
  }

  // Every language is rendered here, on the server; the client only switches between them.
  // Related posts (shared tags + similar text) and the neighbours by date are the same in every language.
  const related = relatedSlugs(slug);
  const { previous, next } = adjacentSlugs(slug);
  const versions: Partial<Record<Locale, BlogPostVersion>> = {};
  for (const loc of locales) {
    const localized = getBlogPost(slug, loc);
    if (!localized) continue;
    const link = (target?: string) => {
      const neighbour = target ? getBlogPost(target, loc) : undefined;
      return neighbour ? { href: `/blog/${neighbour.slug}`, title: neighbour.title } : undefined;
    };
    versions[loc] = {
      post: toBlogSummary(localized),
      body: <BlogPostContent content={localized.content} />,
      related: related.flatMap((target) => {
        const post = getBlogPost(target, loc);
        return post ? [toBlogSummary(post)] : [];
      }),
      previous: link(previous),
      next: link(next),
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
