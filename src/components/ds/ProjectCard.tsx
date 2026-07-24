'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Github, ExternalLink } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Pill } from './Pill';
import { Button } from './Button';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  liveDemoUrl?: string;
  sourceCodeUrl?: string;
  liveLabel?: string;
  sourceLabel?: string;
}

export function ProjectCard({
  title,
  description,
  imageUrl,
  tags,
  liveDemoUrl,
  sourceCodeUrl,
  liveLabel = 'Live Demo',
  sourceLabel = 'Source',
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();
  const dark = theme === 'dark';

  return (
    <div
      className="flex flex-col h-full rounded-2xl overflow-hidden transition-all duration-300"
      style={{
        border: `1px solid ${hovered ? (dark ? 'rgba(255,255,255,0.14)' : 'rgba(0,0,0,0.18)') : (dark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.11)')}`,
        background: hovered ? (dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)') : (dark ? 'transparent' : 'rgba(255,255,255,0.6)'),
        transform: hovered ? 'translateY(-2px)' : 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
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
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6) 100%)',
              opacity: hovered ? 1 : 0.4,
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 gap-4">
        <div className="flex-1 space-y-3">
          <h3
            className="font-headline font-bold text-foreground leading-tight"
            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)' }}
          >
            {title}
          </h3>
          <p className="text-sm text-foreground/50 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Pill key={tag} variant="outline" accent="neutral" size="sm" uppercase={false}>
                {tag}
              </Pill>
            ))}
          </div>
        )}

        {/* Actions */}
        {(liveDemoUrl || sourceCodeUrl) && (
          <div className="flex items-center gap-2 pt-1">
            {liveDemoUrl && (
              <Button
                variant="primary"
                accent="amber"
                size="sm"
                href={liveDemoUrl}
                external
              >
                <ExternalLink className="w-3.5 h-3.5" />
                {liveLabel}
              </Button>
            )}
            {sourceCodeUrl && (
              <Button
                variant="ghost"
                accent="neutral"
                size="sm"
                href={sourceCodeUrl}
                external
              >
                <Github className="w-3.5 h-3.5" />
                {sourceLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
