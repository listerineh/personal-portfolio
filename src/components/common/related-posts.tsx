'use client';

import { useTranslations } from 'next-intl';
import type { BlogPostSummary } from '@/types';
import { BlogCard } from '@/components/ds';

interface RelatedPostsProps {
  posts: BlogPostSummary[];
}

/** More written works, as entries on the same ruled list. Posts arrive as summaries from the server. */
export function RelatedPosts({ posts }: RelatedPostsProps) {
  const t = useTranslations('blog');
  const minutesLabel = t('readingTime', { minutes: '' }).trim();

  if (posts.length === 0) return null;
  return (
    <section aria-labelledby="related-title" className="mt-20">
      <h2 id="related-title" className="text-subhead">
        {t('relatedArticles')}
      </h2>
      <ol className="mt-4 divide-y divide-border">
        {posts.map((post) => (
          <li key={post.slug}>
            <BlogCard
              layout="compact"
              coverImage={post.imageUrl}
              title={post.title}
              slug={post.slug}
              date={post.date}
              readingTime={post.readingTime}
              readingTimeLabel={minutesLabel}
              readMoreLabel={t('readMore')}
              newLabel={t('new')}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
