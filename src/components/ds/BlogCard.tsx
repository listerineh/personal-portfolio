'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Pill } from './Pill';

interface BlogCardProps {
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  tags?: string[];
  coverImage?: string;
  readMoreLabel?: string;
}

export function BlogCard({
  title,
  slug,
  excerpt,
  date,
  tags = [],
  coverImage,
  readMoreLabel = 'Read more',
}: BlogCardProps) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <Link
      href={`/blog/${slug}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? (dark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)') : (dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)')}`,
        background: hovered ? (dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)') : 'transparent',
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
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-3">
        {/* Date + Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {date && (
            <span className="text-xs font-headline font-semibold uppercase tracking-widest text-foreground/30">
              {date}
            </span>
          )}
          {tags.map((tag) => (
            <Pill key={tag} variant="outline" accent="neutral" size="sm" uppercase={false}>
              {tag}
            </Pill>
          ))}
        </div>

        {/* Title */}
        <h3
          className="font-headline font-bold text-foreground leading-tight transition-colors duration-200"
          style={{
            fontSize: 'clamp(1.05rem, 2vw, 1.3rem)',
            color: hovered ? 'rgba(255,255,255,1)' : undefined,
          }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-sm text-foreground/45 leading-relaxed line-clamp-2 flex-1">
            {excerpt}
          </p>
        )}

        {/* Read more */}
        <div
          className="flex items-center gap-1.5 text-xs font-headline font-semibold uppercase tracking-wider transition-all duration-200 mt-1"
          style={{
            color: hovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)',
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
  );
}
