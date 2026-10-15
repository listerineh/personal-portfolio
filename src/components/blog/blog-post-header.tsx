'use client';

import { useTranslations } from 'next-intl';
import type { BlogPostSummary } from '@/types';
import { Pill } from '@/components/ds';
import { ShareButtons } from './share-buttons';
import { BlogViews } from './blog-views';
import { formatReadingTime } from '@/lib/reading-time';

interface BlogPostMetaProps {
  post: BlogPostSummary;
  locale: string;
  formatDate: (dateString: string) => string;
  url: string;
}

/** The label of a written work: date, author, reading time, views, tags, and how to share it. */
export function BlogPostHeader({ post, locale, formatDate, url }: BlogPostMetaProps) {
  const t = useTranslations('blog');

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-catalog text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {' · '}
          {t('by')} {post.author}
          {' · '}
          {formatReadingTime(post.readingTime, locale)}
        </p>
        <BlogViews slug={post.slug} />
      </div>
      {post.tags && post.tags.length > 0 && (
        <ul className="flex flex-wrap gap-2" aria-label={t('tags')}>
          {post.tags.map((tag) => (
            <li key={tag}>
              <Pill variant="outline">{tag}</Pill>
            </li>
          ))}
        </ul>
      )}
      <ShareButtons title={post.title} url={url} />
    </div>
  );
}
