import { metadataFor } from '@/lib/metadata';
import { getBlogPosts } from '@/lib/data/blog';
import { cookies } from 'next/headers';
import { defaultLocale, locales, type Locale } from '@/i18n/config';
import { PageShell } from '@/components/layout';
import { BlogListingClient } from '@/components/blog/blog-listing-client';

export const dynamic = 'force-dynamic';

export const generateMetadata = metadataFor('blog');

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
      <PageShell>
        <BlogListingClient posts={blogPosts} />
      </PageShell>
    </>
  );
}
