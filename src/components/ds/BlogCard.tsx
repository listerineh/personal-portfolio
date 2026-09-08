'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Pill } from './Pill';
import { cn } from '@/lib/utils';
import { MONTHS_EN, MONTHS_ES } from '@/lib/blog-constants';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  readingTime?: number;
  tags?: string[];
  coverImage?: string;
  readMoreLabel?: string;
  newLabel?: string;
  isRecommended?: boolean;
  recommendedLabel?: string;
}

function isNewPost(date?: string): boolean {
  if (!date) return false;
  const now = new Date();
  // Handle "Month DD, YYYY" format (Safari-safe — Date constructor rejects this)
  const match = date.match(/^(\w+)\s+\d+,\s+(\d{4})$/);
  if (match) {
    const month = MONTHS_EN.indexOf(match[1]) !== -1
      ? MONTHS_EN.indexOf(match[1])
      : MONTHS_ES.indexOf(match[1]);
    const year = parseInt(match[2], 10);
    return month !== -1 && year === now.getFullYear() && month === now.getMonth();
  }
  // Fallback for ISO or other standard formats
  const postDate = new Date(date);
  if (isNaN(postDate.getTime())) return false;
  return postDate.getFullYear() === now.getFullYear() && postDate.getMonth() === now.getMonth();
}

export function BlogCard({
  title,
  slug,
  excerpt,
  date,
  readingTime,
  tags = [],
  coverImage,
  readMoreLabel = 'Read more',
  newLabel = 'New',
  isRecommended,
  recommendedLabel,
}: BlogCardProps) {
  const [starHovered, setStarHovered] = useState(false);
  const isNew = isNewPost(date);

  return (
    <article className="group relative h-full">
      <Link
        href={`/blog/${slug}`}
        className="flex flex-col h-full rounded-2xl overflow-hidden border border-foreground/[0.08] bg-card transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] hover:border-primary/25 hover:bg-foreground/[0.03] no-underline"
      >
        {/* Cover image */}
        {coverImage && (
          <div className="relative w-full overflow-hidden aspect-video">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="blog-image object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent from-60% to-black/50" />
            {isNew && newLabel && (
              <div className="absolute top-0 right-0 z-20">
                <span className="inline-flex items-center font-headline font-bold text-[10px] tracking-widest uppercase text-white shadow-lg bg-primary rounded-bl-lg px-2.5 py-1">
                  {newLabel}
                </span>
              </div>
            )}
            {isRecommended && (
              <div
                className="absolute top-3 left-3 z-10 flex items-center gap-1.5"
                onMouseEnter={() => setStarHovered(true)}
                onMouseLeave={() => setStarHovered(false)}
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-full shadow-md backdrop-blur-sm transition-transform duration-200 ease-out bg-black/45 group-hover/star:scale-[1.15]">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-headline font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-sm bg-black/45 transition-[opacity,transform] duration-200 ease-out',
                    starHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-1'
                  )}
                >
                  {recommendedLabel}
                </span>
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          {/* Date */}
          {date && (
            <time className="text-xs font-headline font-semibold uppercase tracking-widest text-foreground/30" dateTime={date}>
              {date}{readingTime !== undefined ? ` · ${readingTime} min read` : ''}
            </time>
          )}

          {/* Title */}
          <h3 className="font-headline font-bold text-foreground leading-tight line-clamp-3 text-headline">
            {title}
          </h3>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-sm text-foreground/55 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex items-center gap-2 mt-1">
              {tags.slice(0, 2).map((tag) => (
                <Pill key={tag} variant="outline" accent="neutral" size="sm" uppercase={false} className="shrink-0">
                  {tag}
                </Pill>
              ))}
              {tags.length > 2 && (
                <Pill variant="outline" accent="neutral" size="sm" uppercase={false} className="shrink-0">
                  +{tags.length - 2}
                </Pill>
              )}
            </div>
          )}

          {/* Read more */}
          <div className="flex items-center gap-1.5 text-xs font-headline font-semibold uppercase tracking-wide mt-auto pt-3 text-foreground/40 group-hover:text-primary transition-colors duration-200">
            {readMoreLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
