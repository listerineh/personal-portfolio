'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useLocale } from '@/context/locale-context';
import { getBlogPosts } from '@/lib/data';
import { Button } from '@/components/ui/button';

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

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-2xl font-headline font-bold mb-8">{t('relatedArticles')}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group p-4 rounded-lg border border-border hover:border-primary hover:shadow-lg transition-all"
          >
            <h4 className="font-headline font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {post.title}
            </h4>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {post.excerpt}
            </p>
            <div className="flex items-center text-sm text-primary font-semibold">
              {t('readMore')} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
