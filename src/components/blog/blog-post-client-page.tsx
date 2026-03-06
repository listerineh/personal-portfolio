
"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/types';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogStructuredData } from '@/components/blog/blog-structured-data';
import { ArticleSchema } from '@/components/blog/article-schema';
import { TableOfContents } from './table-of-contents';
import { BlogPostHeader } from './blog-post-header';
import { BlogPostHeroImage } from './blog-post-hero-image';
import { BlogPostContent } from './blog-post-content';
import { BlogPostActions } from './blog-post-actions';
import { ArrowLeft } from 'lucide-react';
import { getBlogPost } from '@/lib/data';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface BlogPostClientPageProps {
  post: BlogPost;
}

export function BlogPostClientPage({ post: initialPost }: BlogPostClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations('blog');
  
  // Obtener el post en el idioma correcto basado en el locale actual
  const post = useMemo(() => {
    const localizedPost = getBlogPost(initialPost.slug, locale);
    return localizedPost || initialPost;
  }, [initialPost.slug, locale]);
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const proseRef = useRef<HTMLDivElement>(null);
  const asideRef = useRef<HTMLDivElement>(null);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!contentRef.current) {
            ticking = false;
            return;
          }

          const element = contentRef.current;
          const { top } = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          const scrollDepth = window.scrollY - element.offsetTop;
          const totalScrollableHeight = element.scrollHeight - viewportHeight;

          // Calculate progress once and set state once
          let progress: number;
          if (totalScrollableHeight <= 0) {
            progress = top < viewportHeight ? 100 : 0;
          } else {
            progress = (scrollDepth / totalScrollableHeight) * 100;
          }
          
          setReadingProgress(Math.min(100, Math.max(0, progress)));
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (proseRef.current) {
      const headings = proseRef.current.querySelectorAll('h2, h3');
      
      headings.forEach((heading, index) => {
        const text = heading.textContent || '';
        const id = text
          .toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
        heading.id = id || `heading-${index}`;
      });
    }
  }, [post.content]);

  useEffect(() => {
    const handleAsideVisibility = () => {
      if (!asideRef.current) return;

      const footer = document.querySelector('footer');
      if (!footer) {
        gsap.to(asideRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto',
        });
        return;
      }

      const footerRect = footer.getBoundingClientRect();
      const asideRect = asideRef.current.getBoundingClientRect();

      if (asideRect.bottom > footerRect.top) {
        gsap.to(asideRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: 'none',
        });
      } else {
        gsap.to(asideRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: 'auto',
        });
      }
    };

    window.addEventListener('scroll', handleAsideVisibility, { passive: true });
    handleAsideVisibility();

    return () => {
      window.removeEventListener('scroll', handleAsideVisibility);
    };
  }, []);

  useEffect(() => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    const ctx = gsap.context(() => {
      if (headerRef.current && headerRef.current.children.length > 0) {
        gsap.fromTo(headerRef.current.children,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power2.out',
          }
        );
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [post.slug]);

  return (
    <>
      <BlogStructuredData post={post} />
      <ArticleSchema post={post} />
      <Header />
      <aside ref={asideRef} className="hidden xl:block xl:fixed xl:right-4 xl:top-24 xl:w-[280px] xl:max-h-[calc(100vh-6rem)] xl:overflow-y-auto xl:z-40 xl:pointer-events-auto">
        <div className="pr-2">
          <TableOfContents content={post.content} />
        </div>
      </aside>
      <main className="pt-20 bg-background">
        <Progress value={readingProgress} className="fixed top-20 left-0 right-0 h-1 z-50 rounded-none bg-primary/20 transition-all duration-150" />
        <div className="container mx-auto px-4 py-12 md:py-16 xl:mr-[320px]">
          <div className="relative max-w-7xl mx-auto">
            <article key={post.slug} ref={contentRef} className="max-w-4xl">
          <BlogPostHeader 
            ref={headerRef}
            post={post}
            locale={locale}
            formatDate={formatDate}
          />

          {post.imageUrl && (
            <BlogPostHeroImage
              ref={imageRef}
              imageUrl={post.imageUrl}
              title={post.title}
              imageAiHint={post.imageAiHint}
            />
          )}

          <Separator className="my-6 md:my-12" />

          <BlogPostContent ref={proseRef} content={post.content} />

          <BlogPostActions 
            slug={post.slug}
            title={post.title}
            url={typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`}
          />

          <Separator className="my-12" />

          <div className="text-center">
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> {t('moreArticles')}
              </Link>
            </Button>
          </div>

            </article>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
