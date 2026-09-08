'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
  const visibleTags = tags.slice(0, 3);
  const extraCount = tags.length - visibleTags.length;

  return (
    <article className="group relative h-full">
      <Link
        href={`/projects/${slug}`}
        className="flex flex-col h-full rounded-2xl overflow-hidden border border-foreground/[0.08] bg-card transition-[transform,border-color,background-color] duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.98] hover:border-primary/25 hover:bg-foreground/[0.03] no-underline"
      >
        {/* Cover image */}
        {imageUrl && (
          <div className="relative w-full overflow-hidden aspect-video">
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="project-image object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex flex-col flex-1 p-5 gap-3">
          <h3 className="font-headline font-bold text-foreground leading-tight line-clamp-2 text-headline">
            {title}
          </h3>

          <p className="text-sm text-foreground/55 leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 mt-1">
              {visibleTags.map((tag) => (
                <Pill key={tag} variant="outline" accent="neutral" size="sm" uppercase={false}>
                  {tag}
                </Pill>
              ))}
              {extraCount > 0 && (
                <Pill variant="outline" accent="neutral" size="sm" uppercase={false}>
                  +{extraCount}
                </Pill>
              )}
            </div>
          )}

          {/* View more */}
          <div className="flex items-center gap-1.5 text-xs font-headline font-semibold uppercase tracking-wide mt-auto pt-3 text-foreground/40 group-hover:text-primary transition-colors duration-200">
            {viewMoreLabel}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </div>
        </div>
      </Link>
    </article>
  );
}
