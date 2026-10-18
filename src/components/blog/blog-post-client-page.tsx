"use client";

import { useState, useEffect, useRef, type ReactNode } from 'react';
import Link from 'next/link';
import { useLocale } from '@/context/locale-context';
import { useTranslations } from 'next-intl';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import type { BlogPostSummary } from '@/types';
import type { Locale } from '@/i18n/config';
import { Ambient, BlogCard, Button, PageHeader, Reveal } from '@/components/ds';
import { NewsletterSubscribe } from './newsletter-subscribe';
import { PageShell } from '@/components/layout';
import { TableOfContents } from './table-of-contents';
import { BlogPostHeader } from './blog-post-header';
import { BlogPostHeroImage } from './blog-post-hero-image';
import { BlogPostActions } from './blog-post-actions';

export interface BlogPostVersion {
  post: BlogPostSummary;
  /** Article body rendered on the server (markdown never reaches the client bundle). */
  body: ReactNode;
  related: BlogPostSummary[];
}

interface BlogPostClientPageProps {
  /** Each available language of the post; the active locale picks one, falling back to the request's. */
  versions: Partial<Record<Locale, BlogPostVersion>>;
  initialLocale: Locale;
}

export function BlogPostClientPage({ versions, initialLocale }: BlogPostClientPageProps) {
  const { locale } = useLocale();
  const t = useTranslations('blog');
  const tCommon = useTranslations('common');
  const version = versions[locale as Locale] ?? versions[initialLocale]!;
  const { post } = version;
  const [readingProgress, setReadingProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  
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

  const url = typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`;

  return (
    <>
      {/* Reading progress: a hairline under the header that fills with amber. */}
      <div aria-hidden="true" className="fixed inset-x-0 top-header z-40 h-0.5 bg-transparent">
        <div className="h-full origin-left rounded-r-full bg-primary" style={{ transform: `scaleX(${readingProgress / 100})` }} />
      </div>
      <PageShell>
        <PageHeader
          title={post.title}
          titleSize="section"
          intro={post.excerpt}
          nav={
            <Link
              href="/blog"
              className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground/[0.06] pl-2.5 pr-4 text-[0.8125rem] font-medium text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1]"
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4" />
              {t('backToBlog')}
            </Link>
          }
        >
          <BlogPostHeader post={post} locale={locale} formatDate={formatDate} />
        </PageHeader>

        {/* The cover, full column width, before the text starts. */}
        {post.imageUrl && (
          <div className="px-gutter">
            <div className="mx-auto max-w-[1200px]">
              <BlogPostHeroImage imageUrl={post.imageUrl} title={post.title} imageAiHint={post.imageAiHint} />
            </div>
          </div>
        )}

        <div className="px-gutter pb-20 pt-4 md:pb-28">
          <div className="mx-auto grid max-w-[1200px] gap-10 lg:grid-cols-12 lg:gap-10">
            <aside className="lg:col-span-3">
              <details className="panel group p-2 lg:hidden">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between rounded-[14px] px-3 text-sm font-semibold">
                  {t('tableOfContents')}
                  <ChevronDown aria-hidden="true" className="h-4 w-4 transition-transform duration-snap ease-snap group-open:rotate-180" />
                </summary>
                <div className="px-1 pb-2 pt-1">
                  <TableOfContents key={`${post.slug}:${locale}`} contentKey={`${post.slug}:${locale}`} />
                </div>
              </details>
              <div className="sticky top-[calc(var(--header-h)+1.5rem)] hidden max-h-[calc(100vh-8rem)] overflow-y-auto pr-2 lg:block">
                <TableOfContents key={`${post.slug}:${locale}`} contentKey={`${post.slug}:${locale}`} />
              </div>
            </aside>

            <article key={post.slug} ref={contentRef} className="min-w-0 lg:col-span-8 lg:col-start-5">
              {version.body}
              <BlogPostActions slug={post.slug} title={post.title} url={url} />
            </article>
          </div>
        </div>
        {/* After the article: related posts as cards, the newsletter, the way back. */}
        <section aria-labelledby="keep-reading" className="tint relative isolate overflow-clip px-gutter py-20 md:py-28">
          <Ambient intensity="soft" grid={false} spotlight={false} />
          <div className="mx-auto max-w-[1200px]">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <h2 id="keep-reading" className="text-display-sm">
                {t('keepReading')}
              </h2>
              <Button variant="ghost" accent="amber" href="/blog" className="self-start md:self-auto">
                {t('moreArticles')}
                <ChevronRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
            {version.related.length > 0 && (
              <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                {version.related.slice(0, 3).map((related) => (
                  <Reveal as="li" key={related.slug}>
                    <BlogCard
                      layout="stack"
                      title={related.title}
                      slug={related.slug}
                      excerpt={related.excerpt}
                      date={related.date}
                      coverImage={related.imageUrl}
                      readingTime={related.readingTime}
                      readingTimeLabel={t('readingTime', { minutes: '' }).trim()}
                      readMoreLabel={tCommon('readMore')}
                      newLabel={t('new')}
                    />
                  </Reveal>
                ))}
              </ul>
            )}
            <div className="mt-10">
              <NewsletterSubscribe variant="default" />
            </div>
          </div>
        </section>
      </PageShell>
    </>
  );
}
