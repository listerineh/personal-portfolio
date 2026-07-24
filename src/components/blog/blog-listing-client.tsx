'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import { BlogSearch } from '@/components/blog/blog-search';
import { SectionLabel, Title, Text, BlogCard } from '@/components/ds';
import type { BlogPost } from '@/types';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogListingClientProps {
  posts: BlogPost[];
}

export function BlogListingClient({ posts }: BlogListingClientProps) {
  const { locale } = useLocale();
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const wmRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();

    if (wmRef.current) {
      gsap.fromTo(wmRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1.2, ease: 'power2.out' }
      );
    }

    if (labelRef.current) tl.fromTo(labelRef.current,
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
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

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0,
          duration: 0.55,
          delay: Math.min(index * 0.08, 0.45),
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        }
      );
    });
  }, []);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-amber-950/0 via-amber-950/[0.04] to-amber-950/0 pointer-events-none" />
      <div
        ref={wmRef}
        className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
        style={{ top: '4%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)', opacity: 0 }}
      >
        {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <div className="mb-12 text-center">
          <div ref={labelRef} className="opacity-0">
            <SectionLabel accent="amber" className="mb-6">{t('badge')}</SectionLabel>
          </div>
          <div ref={titleRef} style={{ opacity: 0 }}>
            <Title as="h1" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }} className="mb-4">
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
          <BlogSearch posts={posts} onFilteredPostsChange={setFilteredPosts} />
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-foreground/50" style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}>{t('noArticles')}</p>
            <p className="text-sm text-foreground/35 mt-2">{t('tryAdjusting')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <div
                key={post.slug}
                ref={(el) => { cardsRef.current[index] = el; }}
              >
                <BlogCard
                  title={post.title}
                  slug={post.slug}
                  excerpt={post.excerpt}
                  date={post.date}
                  tags={post.tags}
                  coverImage={post.imageUrl}
                  readMoreLabel={tCommon('readMore')}
                />
              </div>
            ))}
          </div>
        )}

        {filteredPosts.length > 0 && (
          <div className="mt-16 flex items-center gap-4">
            <div className="flex-1 h-px bg-foreground/[0.07]" />
            <span className="font-headline text-[10px] tracking-[0.3em] uppercase text-foreground/25">
              {t('endOfList')}
            </span>
            <div className="flex-1 h-px bg-foreground/[0.07]" />
          </div>
        )}
      </div>
    </section>
  );
}
