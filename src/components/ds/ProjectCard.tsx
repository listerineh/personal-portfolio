'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Pill } from './Pill';

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  viewMoreLabel?: string;
}

export function ProjectCard({
  slug,
  title,
  description,
  imageUrl,
  tags = [],
  viewMoreLabel = 'View project',
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div className="relative h-full">
      <Link
        href={`/projects/${slug}`}
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
        {imageUrl && (
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: '16/9' }}>
            <Image
              src={imageUrl}
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

          {/* Description */}
          <p className="text-sm text-foreground/45 leading-relaxed line-clamp-3">
            {description}
          </p>

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

          {/* View more */}
          <div
            className="flex items-center gap-1.5 text-xs font-headline font-semibold uppercase tracking-wider transition-all duration-200 mt-auto pt-2"
            style={{
              color: hovered
                ? (dark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.75)')
                : (dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.35)'),
            }}
          >
            {viewMoreLabel}
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
