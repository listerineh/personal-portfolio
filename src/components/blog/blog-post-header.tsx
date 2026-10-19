'use client';

import { useTranslations } from 'next-intl';
import type { BlogPostSummary } from '@/types';
import { Mark, Pill } from '@/components/ds';
import { BlogViews } from './blog-views';
import { formatReadingTime } from '@/lib/reading-time';

interface BlogPostMetaProps {
  post: BlogPostSummary;
  locale: string;
  formatDate: (dateString: string) => string;
}

/** The article's byline (author, date, reading time, views) and its tags. Sharing lives at the end of the article. */
export function BlogPostHeader({ post, locale, formatDate }: BlogPostMetaProps) {
  const t = useTranslations('blog');

  return (
    <div className="grid gap-6">
      {/* Byline: the mark as avatar, then date, reading time and live view count. */}
      <div className="flex items-center gap-3">
        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05]">
          <Mark className="h-8 w-8" />
        </span>
        <div className="min-w-0">
          <p className="text-[0.9375rem] font-semibold">{post.author}</p>
          <div className="text-meta flex flex-wrap items-center gap-x-2 gap-y-1 text-muted-foreground">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{formatReadingTime(post.readingTime, locale)}</span>
            <span aria-hidden="true">·</span>
            <BlogViews slug={post.slug} />
          </div>
        </div>
      </div>
      {post.tags && post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label={t('tags')}>
          {post.tags.map((tag) => (
            <li key={tag}>
              <Pill>{tag}</Pill>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
