'use client';

import { Fragment, useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { BlogSearch } from '@/components/blog/blog-search';
import { NewsletterSubscribe } from '@/components/blog/newsletter-subscribe';
import { BlogCard, EndOfList, EntrySkeleton, PageHeader } from '@/components/ds';
import type { BlogPost } from '@/types';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';

const INITIAL_COUNT = 6;
const PAGE_SIZE = 6;
const SKELETON_DELAY = 400;

interface BlogListingClientProps {
  posts: BlogPost[];
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const tSala = useTranslations('sala');
  const minutesLabel = t('readingTime', { minutes: '' }).trim();
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);


  const displayedPosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );

  const hasMore = filteredPosts.length > visibleCount;
  const skeletonCount = Math.min(filteredPosts.length - visibleCount, PAGE_SIZE);

  const handleFilteredPostsChange = useCallback((newPosts: BlogPost[]) => {
    setFilteredPosts(newPosts);
    setVisibleCount(INITIAL_COUNT);
    setIsLoadingMore(false);
  }, []);

  // IntersectionObserver: trigger load when sentinel enters viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isGridLoading) {
          setIsLoadingMore(true);
          timer = setTimeout(() => {
            setVisibleCount(prev => prev + PAGE_SIZE);
            setIsLoadingMore(false);
          }, SKELETON_DELAY);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, [hasMore, isLoadingMore, isGridLoading]);

  return (
    <>
      <PageHeader number="02" name={tSala('writing')} title={t('pageTitle')} intro={t('pageDescription')}>
        <div className="max-w-3xl">
          <BlogSearch posts={posts} onFilteredPostsChange={handleFilteredPostsChange} onLoadingChange={setIsGridLoading} />
        </div>
      </PageHeader>

      <section className="px-gutter py-12 md:py-20" aria-busy={isGridLoading || isLoadingMore || undefined}>
        <div className="mx-auto max-w-[1296px] lg:pl-[calc(100%/12*2)]">
          {isGridLoading ? (
            <div className="divide-y divide-foreground/20 border-y border-foreground/20">
              {Array.from({ length: 4 }, (_, i) => (
                <EntrySkeleton key={i} />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="plaque max-w-xl p-6 md:p-8">
              <p className="text-headline">{t('noArticles')}</p>
              <p className="mt-2 text-muted-foreground">{t('tryAdjusting')}</p>
            </div>
          ) : (
            <>
              <ol className="divide-y divide-foreground/20 border-y border-foreground/20">
                {displayedPosts.map((post, index) => (
                  <Fragment key={post.slug}>
                    <li className="py-8 md:py-10">
                      <BlogCard
                        headingLevel="h2"
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
                    {(index + 1) % 5 === 0 && (
                      <li className="py-8">
                        <NewsletterSubscribe variant="default" />
                      </li>
                    )}
                  </Fragment>
                ))}
                {isLoadingMore &&
                  Array.from({ length: skeletonCount }, (_, i) => (
                    <li key={`skel-${i}`}>
                      <EntrySkeleton />
                    </li>
                  ))}
              </ol>

              <div ref={sentinelRef} className="h-1" />

              {!hasMore && !isLoadingMore && <EndOfList>{tCommon('endOfList')}</EndOfList>}
            </>
          )}
        </div>
      </section>
    </>
  );
}
