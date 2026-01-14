import type { BlogPost } from '@/types';

interface BlogStructuredDataProps {
  post: BlogPost;
}

export function BlogStructuredData({ post }: BlogStructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
  const postUrl = `${siteUrl}/blog/${post.slug}`;
  const imageUrl = post.imageUrl ? `${siteUrl}${post.imageUrl}` : `${siteUrl}/og-default.png`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: new Date(post.date).toISOString(),
    dateModified: new Date(post.date).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author,
      url: siteUrl,
    },
    publisher: {
      '@type': 'Person',
      name: 'Sebastian Alvarez',
      url: siteUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    keywords: post.tags.join(', '),
    articleSection: 'Technology',
    inLanguage: 'en-US',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
