'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import { BlogSearch } from '@/components/blog/blog-search';
import { SectionHeader, BlogCard } from '@/components/ds';
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
  const headerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
    if (searchRef.current) {
      gsap.fromTo(searchRef.current,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.12, ease: 'power2.out' }
      );
    }
    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      gsap.fromTo(card,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, delay: Math.min(index * 0.05, 0.3), ease: 'power2.out' }
      );
    });
  }, []);

  return (
    <section className="py-20 md:py-32 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div ref={headerRef} className="mb-8">
          <SectionHeader
            label={t('badge')}
            labelAccent="indigo"
            title={t('pageTitle')}
            description={t('pageDescription')}
            align="center"
            className="mb-0"
          />
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
      </div>
    </section>
  );
}
