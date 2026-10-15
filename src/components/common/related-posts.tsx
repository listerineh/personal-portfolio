'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import { getBlogPosts } from '@/lib/data/blog';
import { BlogCard } from '@/components/ds';

interface RelatedPostsProps {
  currentSlug: string;
  limit?: number;
}

/** More written works, as entries on the same ruled list. */
export function RelatedPosts({ currentSlug, limit = 3 }: RelatedPostsProps) {
  const t = useTranslations('blog');
  const { locale } = useLocale();
  const minutesLabel = t('readingTime', { minutes: '' }).trim();
  const relatedPosts = getBlogPosts(locale)
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);

  if (relatedPosts.length === 0) return null;

  return (
    <section aria-labelledby="related-title" className="mt-20">
      <h2 id="related-title" className="text-subhead">
        {t('relatedArticles')}
      </h2>
      <ol className="mt-6 divide-y divide-foreground/20 border-y border-foreground/20">
        {relatedPosts.map((post) => (
          <li key={post.slug} className="py-6">
            <BlogCard
              title={post.title}
              slug={post.slug}
              excerpt={post.excerpt}
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
