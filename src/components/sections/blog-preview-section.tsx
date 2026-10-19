'use client';

import { useTranslations } from 'next-intl';
import { ChevronRight } from 'lucide-react';
import { BlogCard, Button, Reveal, Section } from '@/components/ds';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';
import type { BlogPostSummary } from '@/types';

/** Writing, laid out like a front page: the latest article as the lead story, the next ones as a tight list beside it. */
export function BlogPreviewSection({ posts }: { posts: BlogPostSummary[] }) {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const minutesLabel = t('readingTime', { minutes: '' }).trim();
  const [lead, ...rest] = posts;

  const shared = (post: BlogPostSummary) => ({
    title: post.title,
    slug: post.slug,
    date: post.date,
    coverImage: post.imageUrl,
    readingTime: post.readingTime,
    readingTimeLabel: minutesLabel,
    readMoreLabel: tCommon('readMore'),
    newLabel: t('new'),
    isRecommended: RECOMMENDED_SLUGS.includes(post.slug),
    recommendedLabel: t('sortRecommended'),
  });

  return (
    <Section
      id="writing"
      title={t('title')}
      intro={t('sectionIntro')}
      aside={
        <Button variant="ghost" accent="amber" href="/blog">
          {t('viewAllPosts')}
          <ChevronRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      {!lead ? (
        <p className="text-lead text-muted-foreground">{t('noArticles')}</p>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <BlogCard layout="feature" {...shared(lead)} excerpt={lead.excerpt} tags={lead.tags} />
          </Reveal>
          {rest.length > 0 && (
            <Reveal as="ul" className="divide-y divide-border self-center lg:col-span-5">
              {rest.map((post) => (
                <li key={post.slug}>
                  <BlogCard layout="compact" {...shared(post)} />
                </li>
              ))}
            </Reveal>
          )}
        </div>
      )}
    </Section>
  );
}
