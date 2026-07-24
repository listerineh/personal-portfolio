'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import { getBlogPosts } from '@/lib/data';

interface RelatedPostsProps {
  currentSlug: string;
  limit?: number;
}

export function RelatedPosts({ currentSlug, limit = 3 }: RelatedPostsProps) {
  const t = useTranslations('blog');
  const { locale } = useLocale();
  const relatedPosts = getBlogPosts(locale)
    .filter((post) => post.slug !== currentSlug)
    .slice(0, limit);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-foreground/[0.06]">
      <h3 className="font-headline font-black text-foreground mb-8" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)' }}>
        {t('relatedArticles')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 p-5 rounded-2xl transition-colors duration-200"
            style={{
              border: '1px solid var(--primary-border)',
              background: 'var(--primary-bg)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--primary-bg-hover)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--primary-bg)'; }}
          >
            <h4 className="font-headline font-bold text-sm leading-snug text-foreground line-clamp-3">
              {post.title}
            </h4>
            <p className="text-xs text-foreground/40 leading-relaxed line-clamp-2 flex-1">
              {post.excerpt}
            </p>
            <div
              className="flex items-center gap-1 text-xs font-headline font-semibold tracking-wide group-hover:gap-2 transition-all"
              style={{ color: 'rgb(var(--primary))' }}
            >
              {t('readMore')} <ArrowRight className="h-3.5 w-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
