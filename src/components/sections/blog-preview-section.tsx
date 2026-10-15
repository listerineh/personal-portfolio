'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { getBlogPosts } from '@/lib/data';
import { useLocale } from '@/context/locale-context';
import { BlogCard, Button, Room } from '@/components/ds';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';

/** Room 02 · Writing. Written works as a ruled list, not a card grid. */
export function BlogPreviewSection() {
  const t = useTranslations('blog');
  const tSala = useTranslations('sala');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const posts = getBlogPosts(locale).slice(0, 3);
  const minutesLabel = t('readingTime', { minutes: '' }).trim();

  return (
    <Room
      id="writing"
      number="02"
      name={tSala('writing')}
      title={t('title')}
      tone="paint"
      aside={
        <Button variant="ghost" href="/blog">
          {t('viewAllPosts')}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Button>
      }
    >
      {posts.length === 0 ? (
        <p className="text-lead text-muted-foreground">{t('noArticles')}</p>
      ) : (
        <ol className="divide-y divide-foreground/20 border-y border-foreground/20 lg:ml-[calc(100%/12*3)]">
          {posts.map((post) => (
            <li key={post.slug} className="py-8 md:py-10">
              <BlogCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                date={post.date}
                tags={post.tags}
                coverImage={post.imageUrl}
                readingTime={post.readingTime}
                readingTimeLabel={minutesLabel}
                readMoreLabel={tCommon('readMore')}
                newLabel={t('new')}
                isRecommended={RECOMMENDED_SLUGS.includes(post.slug)}
                recommendedLabel={t('sortRecommended')}
              />
            </li>
          ))}
        </ol>
      )}
    </Room>
  );
}
