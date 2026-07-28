'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Pill } from './Pill';
import { cn } from '@/lib/utils';
import { MONTHS_EN, MONTHS_ES } from '@/lib/blog-constants';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
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
  tags = [],
  coverImage,
  readMoreLabel = 'Read more',
  newLabel = 'New',
  isRecommended,
  recommendedLabel,
}: BlogCardProps) {
  const [starHovered, setStarHovered] = useState(false);
  const [tagsTooltipOpen, setTagsTooltipOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const isNew = isNewPost(date);

  return (
    <div className="relative h-full">
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? (dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.18)') : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.11)')}`,
        background: hovered ? (dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)') : (dark ? 'transparent' : 'rgba(255,255,255,0.6)'),
        transform: hovered ? 'translateY(-2px)' : 'none',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Cover image */}
      {coverImage && (
        <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image
            src={coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-500"
            style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.5) 100%)' }}
          />
          {isNew && newLabel && (
            <div className="absolute top-0 right-0 z-20">
              <span
                className="inline-flex items-center font-headline font-bold text-[10px] tracking-widest uppercase text-white shadow-lg"
                style={{
                  background: 'rgb(var(--primary))',
                  borderRadius: '0 0 0 8px',
                  padding: '4px 10px',
                }}
              >
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
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full shadow-md backdrop-blur-sm transition-transform duration-200"
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  transform: starHovered ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                <Sparkles className="h-4 w-4" style={{ color: 'rgb(var(--primary))' }} />
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-[10px] font-headline font-bold uppercase tracking-wider text-white shadow-md backdrop-blur-sm transition-all duration-200"
                style={{
                  background: 'rgba(0,0,0,0.45)',
                  opacity: starHovered ? 1 : 0,
                  transform: starHovered ? 'translateX(0)' : 'translateX(-4px)',
                  pointerEvents: 'none',
                }}
              >
                {recommendedLabel}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Date */}
        {date && (
          <span className="text-xs font-headline font-semibold uppercase tracking-widest text-foreground/30">
            {date}
          </span>
        )}

        {/* Title */}
        <h3
          className="font-headline font-bold text-foreground leading-tight transition-colors duration-200 line-clamp-3"
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: hovered ? (dark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,0.9)') : undefined,
          }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-foreground/45 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex items-center gap-2 mt-1 overflow-hidden">
            {tags.slice(0, 2).map((tag) => (
              <Pill key={tag} variant="outline" accent="neutral" size="sm" uppercase={false} className="shrink-0">
                {tag}
              </Pill>
            ))}
            {tags.length > 2 && (
              <span
                className="relative shrink-0 text-xs font-headline font-semibold text-foreground/40 cursor-default select-none hover:text-foreground/70 transition-colors duration-150"
                onMouseEnter={() => setTagsTooltipOpen(true)}
                onMouseLeave={() => setTagsTooltipOpen(false)}
              >
                +{tags.length - 2}
                {tagsTooltipOpen && (
                  <span
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2.5 z-[100] flex flex-wrap gap-2 p-3.5 rounded-xl shadow-2xl min-w-max max-w-[220px] pointer-events-none"
                    style={{
                      background: dark ? 'rgba(20,20,25,0.98)' : 'rgba(255,255,255,0.98)',
                      border: '1px solid rgba(128,128,128,0.2)',
                      boxShadow: dark
                        ? '0 8px 32px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)'
                        : '0 8px 32px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08)',
                    }}
                  >
                    {tags.slice(2).map((tag) => (
                      <Pill key={tag} variant="outline" accent="neutral" size="sm" uppercase={false}>
                        {tag}
                      </Pill>
                    ))}
                  </span>
                )}
              </span>
            )}
          </div>
        )}

        {/* Read more */}
        <div
          className="flex items-center gap-1.5 text-xs font-headline font-semibold uppercase tracking-wider transition-all duration-200 mt-auto pt-2"
          style={{
            color: hovered
              ? (dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.75)')
              : (dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)'),
          }}
        >
          {readMoreLabel}
          <ArrowRight
            className="w-3.5 h-3.5 transition-transform duration-200"
            style={{ transform: hovered ? 'translateX(4px)' : 'none' }}
          />
        </div>
      </div>
    </Link>
    </div>
  );
}
