'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getBlogPosts } from '@/lib/data';
import { useLocale } from '@/context/locale-context';
import { useGSAP } from '@/hooks/use-gsap';
import { Title, BlogCard, Button } from '@/components/ds';
import { RECOMMENDED_SLUGS } from '@/lib/blog-constants';

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
        gsap.fromTo(
          card,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            ease: 'power2.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none none' },
          }
        );
      }
    });
  }, [displayedPosts.length]);

  return (
    <section id="blog" className="relative py-28 md:py-44 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 relative z-10">
        <div className="mb-16">
          <Title as="h2" animate className="text-display-sm">
            {t('title')}
          </Title>
        </div>
        {/* Balanced 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedPosts.map((post, index) => (
            <div
              key={post.slug}
              className="reveal-initial h-full"
              ref={(el) => { cardsRef.current[index] = el; }}
            >
              <BlogCard
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                date={post.date}
                tags={post.tags}
                coverImage={post.imageUrl}
                readingTime={post.readingTime}
                readMoreLabel={tCommon('readMore')}
                newLabel={t('new')}
                isRecommended={RECOMMENDED_SLUGS.includes(post.slug)}
                recommendedLabel={t('sortRecommended')}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Button
            href="/blog"
            variant="ghost"
            accent="neutral"
            size="md"
            className="w-full sm:w-auto rounded-2xl sm:rounded-full justify-center border border-foreground/15 hover:border-foreground/30"
          >
            {t('viewAllPosts')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>


    </section>
  );
}
