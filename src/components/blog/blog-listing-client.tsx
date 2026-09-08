'use client';

import { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import { BlogSearch } from '@/components/blog/blog-search';
import { Title, Text, BlogCard, EndOfList } from '@/components/ds';
import type { BlogPost } from '@/types';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const INITIAL_COUNT = 6;
const PAGE_SIZE = 6;
const SKELETON_DELAY = 400;

interface BlogListingClientProps {
  posts: BlogPost[];
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
  const { locale } = useLocale();
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);
  const [isGridLoading, setIsGridLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const isLoadMoreRef = useRef(false);
  const prevCardCountRef = useRef(0);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  const displayedPosts = useMemo(
    () => filteredPosts.slice(0, visibleCount),
    [filteredPosts, visibleCount]
  );

  const hasMore = filteredPosts.length > visibleCount;
  const skeletonCount = Math.min(filteredPosts.length - visibleCount, PAGE_SIZE);

  const handleFilteredPostsChange = useCallback((newPosts: BlogPost[]) => {
    isLoadMoreRef.current = false;
    setFilteredPosts(newPosts);
    setVisibleCount(INITIAL_COUNT);
    setIsLoadingMore(false);
  }, []);

  // IntersectionObserver: trigger load when sentinel enters viewport
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore && !isGridLoading) {
          setIsLoadingMore(true);
          setTimeout(() => {
            isLoadMoreRef.current = true;
            setVisibleCount(prev => prev + PAGE_SIZE);
            setIsLoadingMore(false);
          }, SKELETON_DELAY);
        }
      },
      { rootMargin: '200px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, isGridLoading]);

  // Header elements animate once on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();

    if (titleRef.current) tl.fromTo(titleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' },
      '-=0.3'
    );
    if (descRef.current) tl.fromTo(descRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.35'
    );
    if (searchRef.current) tl.fromTo(searchRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' },
      '-=0.2'
    );
  }, []);

  // Cards re-animate on displayedPosts change, smartly handling load-more vs full refresh
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = cardsRef.current.filter((c): c is HTMLDivElement => c !== null);

    if (isLoadMoreRef.current) {
      // Animate only the newly added cards
      const newCards = cards.slice(prevCardCountRef.current);
      gsap.set(newCards, { opacity: 0, y: 28 });
      newCards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay: index * 0.07,
          ease: 'power2.out',
        });
      });
      isLoadMoreRef.current = false;
    } else {
      // Full re-animation: filter changed or initial load
      cards.forEach(card => {
        gsap.killTweensOf(card);
        ScrollTrigger.getAll()
          .filter(st => st.trigger === card)
          .forEach(st => st.kill());
      });
      gsap.set(cards, { opacity: 0, y: 28 });
      cards.forEach((card, index) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          delay: Math.min(index * 0.07, 0.35),
          ease: 'power2.out',
        });
      });
    }

    prevCardCountRef.current = cards.length;
  }, [displayedPosts]);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.04] to-amber-950/0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <div className="mb-12 text-center">
          <div ref={titleRef} style={{ opacity: 0 }}>
            <Title as="h1" className="mb-4 text-display-sm">
              {t('pageTitle')}
            </Title>
          </div>
          <div ref={descRef} className="opacity-0">
            <Text size="base" strength="secondary" className="max-w-2xl mx-auto">
              {t('pageDescription')}
            </Text>
          </div>
        </div>

        <div ref={searchRef} className="max-w-3xl mx-auto mb-12">
          <BlogSearch posts={posts} onFilteredPostsChange={handleFilteredPostsChange} onLoadingChange={setIsGridLoading} />
        </div>

        {isGridLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-foreground/[0.07] overflow-hidden animate-pulse">
                <div className="h-48 bg-foreground/[0.05]" />
                <div className="p-5 space-y-3">
                  <div className="h-3 w-1/3 rounded-full bg-foreground/[0.07]" />
                  <div className="h-5 w-4/5 rounded-full bg-foreground/[0.08]" />
                  <div className="h-4 w-full rounded-full bg-foreground/[0.05]" />
                  <div className="h-4 w-3/4 rounded-full bg-foreground/[0.05]" />
                  <div className="flex gap-2 pt-1">
                    <div className="h-5 w-16 rounded-full bg-foreground/[0.06]" />
                    <div className="h-5 w-20 rounded-full bg-foreground/[0.06]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/50 text-headline">{t('noArticles')}</p>
            <p className="text-sm text-foreground/35 mt-2">{t('tryAdjusting')}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {displayedPosts.map((post, index) => (
                <div
                  key={post.slug}
                  ref={(el) => { cardsRef.current[index] = el; }}
                  className="mt-5"
                >
                  <BlogCard
                    title={post.title}
                    slug={post.slug}
                    excerpt={post.excerpt}
                    date={post.date}
                    tags={post.tags}
                    coverImage={post.imageUrl}
                    readMoreLabel={tCommon('readMore')}
                    newLabel={t('new')}
                    isRecommended={RECOMMENDED_SLUGS.includes(post.slug)}
                    recommendedLabel={t('sortRecommended')}
                  />
                </div>
              ))}
              {isLoadingMore && Array.from({ length: skeletonCount }).map((_, i) => (
                <div key={`skel-${i}`} className="rounded-2xl border border-foreground/[0.07] overflow-hidden animate-pulse">
                  <div className="h-48 bg-foreground/[0.05]" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 w-1/3 rounded-full bg-foreground/[0.07]" />
                    <div className="h-5 w-4/5 rounded-full bg-foreground/[0.08]" />
                    <div className="h-4 w-full rounded-full bg-foreground/[0.05]" />
                    <div className="h-4 w-3/4 rounded-full bg-foreground/[0.05]" />
                    <div className="flex gap-2 pt-1">
                      <div className="h-5 w-16 rounded-full bg-foreground/[0.06]" />
                      <div className="h-5 w-20 rounded-full bg-foreground/[0.06]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div ref={sentinelRef} className="h-1" />

            {!hasMore && !isLoadingMore && (
              <EndOfList>{tCommon('endOfList')}</EndOfList>
            )}
          </>
        )}
      </div>
    </section>
  );
}
