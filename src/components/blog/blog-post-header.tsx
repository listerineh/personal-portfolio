'use client';

import { forwardRef } from 'react';
import { useTranslations } from 'next-intl';
import type { BlogPost } from '@/types';
import { Pill, Button, Title, SectionLabel } from '@/components/ds';
import { ShareButtons } from './share-buttons';
import { BlogViews } from './blog-views';
import { ArrowLeft, CalendarDays, UserCircle, Tag, Clock } from 'lucide-react';
import { calculateReadingTime, formatReadingTime } from '@/lib/reading-time';

interface BlogPostHeaderProps {
  post: BlogPost;
  locale: string;
  formatDate: (dateString: string) => string;
}

export const BlogPostHeader = forwardRef<HTMLElement, BlogPostHeaderProps>(
  ({ post, locale, formatDate }, ref) => {
    const t = useTranslations('blog');

    return (
      <header ref={ref} className="mb-6 md:mb-12">
        <Button variant="ghost" accent="neutral" size="sm" href="/blog" className="mb-4 md:mb-6">
          <ArrowLeft className="w-4 h-4" /> {t('backToBlog')}
        </Button>
        
        <div className="flex flex-col gap-4 mb-6">
          <Title as="h1" style={{ fontSize: 'clamp(1.9rem, 5vw, 3.8rem)' }} className="leading-[1.1]">
            {post.title}
          </Title>
          <div className="hidden md:block">
            <ShareButtons 
              title={post.title} 
              url={typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`} 
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-x-6 sm:gap-y-2 text-sm text-foreground/45 mb-4">
          <div className="flex items-center">
            <CalendarDays className="mr-2 h-5 w-5" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center">
            <UserCircle className="mr-2 h-5 w-5" />
            <span>{t('by')} {post.author}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5" />
            <span>{formatReadingTime(post.readingTime || calculateReadingTime(post.content), locale)}</span>
          </div>
          <BlogViews slug={post.slug} />
        </div>
        
        <div className="flex flex-col gap-4 mb-4">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
              {post.tags.map((tag) => (
                <Pill key={tag} variant="outline" accent="amber" uppercase={false}>{tag}</Pill>
              ))}
            </div>
          )}
          <div className="md:hidden">
            <ShareButtons 
              title={post.title} 
              url={typeof window !== 'undefined' ? window.location.href : `https://listerineh.dev/blog/${post.slug}`} 
            />
          </div>
        </div>
      </header>
    );
  }
);

BlogPostHeader.displayName = 'BlogPostHeader';
