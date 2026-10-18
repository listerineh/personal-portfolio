'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { BlogCard, Button, Reveal, Section } from '@/components/ds';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';
import type { BlogPostSummary } from '@/types';

/** Writing: the three latest posts as cards, cover first. */
export function BlogPreviewSection({ posts }: { posts: BlogPostSummary[] }) {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const minutesLabel = t('readingTime', { minutes: '' }).trim();

  return (
    <Section
      id="writing"
      title={t('title')}
      aside={
        <Button variant="ghost" accent="amber" href="/blog">
          {t('viewAllPosts')}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      {posts.length === 0 ? (
        <p className="text-lead text-muted-foreground">{t('noArticles')}</p>
      ) : (
        <ul className="grid gap-5 md:grid-cols-3 md:gap-6">
          {posts.map((post) => (
            <Reveal as="li" key={post.slug}>
              <BlogCard
                layout="stack"
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                date={post.date}
                coverImage={post.imageUrl}
                readingTime={post.readingTime}
                readingTimeLabel={minutesLabel}
                readMoreLabel={tCommon('readMore')}
                newLabel={t('new')}
                isRecommended={RECOMMENDED_SLUGS.includes(post.slug)}
                recommendedLabel={t('sortRecommended')}
              />
            </Reveal>
          ))}
        </ul>
      )}
    </Section>
  );
}
