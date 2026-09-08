'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceCardProps {
  jobTitle: string;
  company: string;
  employmentDates: string;
  location?: string;
  logoUrl?: string;
  responsibilities: string[];
  showMoreLabel?: string;
  showLessLabel?: string;
  initialVisible?: number;
}

export function ExperienceCard({
  jobTitle,
  company,
  employmentDates,
  location,
  logoUrl,
  responsibilities,
  showMoreLabel = 'See more',
  showLessLabel = 'Show less',
  initialVisible = 3,
}: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? responsibilities : responsibilities.slice(0, initialVisible);
  const hasMore = responsibilities.length > initialVisible;

  return (
    <article className="group py-2">
      <div className="flex items-start gap-4">
        {/* Logo */}
        <div className="shrink-0 pt-1">
          {logoUrl ? (
            <div className="w-11 h-11 rounded-full overflow-hidden relative bg-foreground/[0.03]">
              <Image src={logoUrl} alt={`${company} logo`} fill sizes="44px" className="object-cover" />
            </div>
          ) : (
            <div className="w-11 h-11 rounded-full flex items-center justify-center bg-foreground/[0.03]">
              <Briefcase className="w-5 h-5 text-foreground/40" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="font-headline font-bold text-foreground leading-tight text-headline">
            {jobTitle}
          </h3>
          <p className="text-sm text-foreground/50 mt-0.5">
            {company}
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-foreground/40">
            <span className="inline-flex items-center gap-1.5 font-headline tracking-wide uppercase">
              <Calendar className="w-3 h-3" />
              {employmentDates}
            </span>
            {location && (
              <span className="inline-flex items-center gap-1.5 font-headline tracking-wide uppercase">
                <MapPin className="w-3 h-3" />
                {location}
              </span>
            )}
          </div>

          <ul className="mt-5 space-y-2.5">
            {visible.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-primary/70" />
                <p className="text-sm text-foreground/60 leading-relaxed">{item}</p>
              </li>
            ))}
          </ul>

          {hasMore && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="mt-4 inline-flex items-center gap-1.5 min-h-11 px-1 -ml-1 text-xs font-headline font-semibold uppercase tracking-wide text-foreground/40 hover:text-primary transition-[color,transform] duration-200 ease-out active:scale-[0.97]"
            >
              {expanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" />
                  {showLessLabel}
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" />
                  {showMoreLabel}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
