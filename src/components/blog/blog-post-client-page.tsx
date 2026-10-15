"use client";

import { useState, useEffect, useRef, useMemo } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import { ArrowLeft } from 'lucide-react';
import type { BlogPost } from '@/types';
import { Button, PageHeader } from '@/components/ds';
import { PageShell } from '@/components/layout';
import { BlogStructuredData } from '@/components/blog/blog-structured-data';
import { ArticleSchema } from '@/components/blog/article-schema';
import { TableOfContents } from './table-of-contents';
import { BlogPostHeader } from './blog-post-header';
import { BlogPostHeroImage } from './blog-post-hero-image';
import { BlogPostContent } from './blog-post-content';
import { BlogPostActions } from './blog-post-actions';
import { getBlogPost } from '@/lib/data/blog';

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
  const proseRef = useRef<HTMLDivElement>(null);
  
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

  const url = typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`;

  return (
    <>
      <BlogStructuredData post={post} />
      <ArticleSchema post={post} />
      <div aria-hidden="true" className="fixed inset-x-0 top-14 z-40 h-1 bg-foreground/10 md:top-16">
        <div className="h-full origin-left bg-primary" style={{ transform: `scaleX(${readingProgress / 100})` }} />
      </div>
      <PageShell>
        <PageHeader
          name={t('title')}
          title={post.title}
          titleSize="room"
          nav={
            <Link href="/blog" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline-offset-[0.3em] hover:underline">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
              {t('backToBlog')}
            </Link>
          }
        >
          <BlogPostHeader post={post} locale={locale} formatDate={formatDate} url={url} />
        </PageHeader>

        <div className="px-gutter py-12 md:py-20">
          <div className="mx-auto grid max-w-[1296px] gap-10 lg:grid-cols-12 lg:gap-6">
            <aside className="lg:col-span-3">
              <details className="group border-y border-foreground/20 py-3 lg:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-sm font-semibold">
                  {t('tableOfContents')}
                  <span aria-hidden="true" className="font-mono transition-transform group-open:rotate-45">+</span>
                </summary>
                <div className="pt-3">
                  <TableOfContents content={post.content} />
                </div>
              </details>
              <div className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 lg:block">
                <TableOfContents content={post.content} />
              </div>
            </aside>

            <article key={post.slug} ref={contentRef} className="min-w-0 lg:col-span-8 lg:col-start-5">
              {post.imageUrl && <BlogPostHeroImage imageUrl={post.imageUrl} title={post.title} imageAiHint={post.imageAiHint} />}
              <BlogPostContent ref={proseRef} content={post.content} />
              <BlogPostActions slug={post.slug} title={post.title} url={url} />
              <div className="mt-16 border-t border-foreground/20 pt-8">
                <Button variant="secondary" href="/blog" className="w-full sm:w-auto">
                  <ArrowLeft aria-hidden="true" className="h-4 w-4" /> {t('moreArticles')}
                </Button>
              </div>
            </article>
          </div>
        </div>
      </PageShell>
    </>
  );
}
