'use client';

import { Fragment, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { BlogSearch } from '@/components/blog/blog-search';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';
import { BlogCard, EndOfList, EntrySkeleton, PageHeader, Reveal } from '@/components/ds';
import type { BlogPost } from '@/types';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';

interface BlogListingClientProps {
  posts: BlogPost[];
}

/** Every post at once: the newest leads across the row, the rest follow as cards, a newsletter row after the first full row. */
export function BlogListingClient({ posts }: BlogListingClientProps) {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const minutesLabel = t('readingTime', { minutes: '' }).trim();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [isGridLoading, setIsGridLoading] = useState(false);

  const handleFilteredPostsChange = useCallback((newPosts: BlogPost[]) => {
    setFilteredPosts(newPosts);
  }, []);

  const [lead, ...rest] = filteredPosts;

  const cardProps = (post: BlogPost) => ({
    headingLevel: 'h2' as const,
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    date: post.date,
    tags: post.tags,
    coverImage: post.imageUrl,
    readingTime: post.readingTime,
    readingTimeLabel: minutesLabel,
    readMoreLabel: tCommon('readMore'),
    newLabel: t('new'),
    isRecommended: RECOMMENDED_SLUGS.includes(post.slug),
    recommendedLabel: t('sortRecommended'),
  });

  return (
    <>
      <PageHeader ambient title={t('pageTitle')} intro={t('pageDescription')}>
        <BlogSearch posts={posts} onFilteredPostsChange={handleFilteredPostsChange} onLoadingChange={setIsGridLoading} />
      </PageHeader>

      <section className="px-gutter pb-24 pt-2 md:pb-32 md:pt-4" aria-busy={isGridLoading || undefined}>
        <div className="mx-auto max-w-[1200px]">
          {isGridLoading ? (
            <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {Array.from({ length: 6 }, (_, i) => (
                <li key={i}>
                  <EntrySkeleton />
                </li>
              ))}
            </ul>
          ) : !lead ? (
            <div className="panel max-w-xl p-6 md:p-8">
              <p className="text-headline">{t('noArticles')}</p>
              <p className="mt-2 text-muted-foreground">{t('tryAdjusting')}</p>
            </div>
          ) : (
            <>
              <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                <Reveal as="li" className="sm:col-span-2 lg:col-span-3">
                  <BlogCard layout="wide" {...cardProps(lead)} />
                </Reveal>
                {rest.map((post, index) => (
                  <Fragment key={post.slug}>
                    <Reveal as="li">
                      <BlogCard layout="stack" {...cardProps(post)} />
                    </Reveal>
                    {index === 2 && rest.length > 3 && (
                      <li className="sm:col-span-2 lg:col-span-3">
                        <NewsletterSubscribe variant="default" />
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
              <EndOfList>{tCommon('endOfList')}</EndOfList>
            </>
          )}
        </div>
      </section>
    </>
  );
}
