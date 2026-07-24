'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBlogPosts } from '@/lib/data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { SectionLabel, Title, BlogCard, Button } from '@/components/ds';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function BlogPreviewSection() {
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const { locale } = useLocale();
  const allPosts = getBlogPosts(locale);
  const displayedPosts = allPosts.slice(0, 3);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.from(card, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
        });
      }
    });
  }, [displayedPosts.length]);

  return (
    <section id="blog" className="relative py-28 md:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <SectionLabel accent="amber" className="mb-8 reveal-up">{t('badge')}</SectionLabel>
        <Title as="h2" animate className="mb-16" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)' }}>
          {t('title')}
        </Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post, index) => (
            <div
              key={post.slug}
              className="h-full"
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
        <div className="flex justify-start mt-12 reveal-up">
          <Button
            href="/blog"
            variant="ghost"
            accent="neutral"
            size="md"
            className="border border-foreground/15 hover:border-foreground/30"
          >
            {t('viewAllPosts')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Watermark */}
      <div
        className="absolute inset-x-0 overflow-hidden whitespace-nowrap font-headline font-black pointer-events-none select-none leading-none"
        style={{ top: '11%', fontSize: 'clamp(6rem, 20vw, 12rem)', color: 'var(--wm-amber)' }}
      >
        {Array.from({ length: 10 }, (_, i) => <span key={i}>{t('watermark')}&nbsp;&nbsp;</span>)}
      </div>
    </section>
  );
}
