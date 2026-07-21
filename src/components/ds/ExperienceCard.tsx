'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';
import { useTheme } from '@/context/theme-context';
import { Pill } from './Pill';
import { Button } from './Button';

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
  const { theme } = useTheme();
  const dark = theme === 'dark';
  const visible = expanded ? responsibilities : responsibilities.slice(0, initialVisible);
  const hasMore = responsibilities.length > initialVisible;

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'}`,
        background: dark ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.7)',
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-4 p-6 pb-4" style={{ borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.09)'}` }}>
        {/* Logo */}
        <div className="shrink-0">
          {logoUrl ? (
            <div className="w-14 h-14 rounded-full overflow-hidden relative" style={{ border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.13)'}` }}>
              <Image src={logoUrl} alt={`${company} logo`} fill className="object-cover" />
            </div>
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.05)', border: `1px solid ${dark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.13)'}` }}
            >
              <Briefcase className="w-6 h-6 text-foreground/40" />
            </div>
          )}
        </div>

        {/* Title + Company */}
        <div className="flex-1 min-w-0">
          <h3 className="font-headline font-bold text-foreground truncate" style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}>
            {jobTitle}
          </h3>
          <p className="text-sm font-semibold text-foreground/50 mt-0.5 truncate">{company}</p>
        </div>
      </div>

      {/* Meta & Responsibilities */}
      <div className="p-6 space-y-5">
        {/* Dates + Location */}
        <div className="flex flex-wrap gap-2">
          <Pill variant="outline" accent="neutral">
            <Calendar className="w-3 h-3" />
            {employmentDates}
          </Pill>
          {location && (
            <Pill variant="outline" accent="neutral">
              <MapPin className="w-3 h-3" />
              {location}
            </Pill>
          )}
        </div>

        {/* Responsibilities */}
        <ul className="space-y-3">
          {visible.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span
                className="mt-2 shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ background: dark ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)' }}
              />
              <p className="text-sm text-foreground/65 leading-relaxed">{item}</p>
            </li>
          ))}
        </ul>

        {hasMore && (
          <Button
            variant="ghost"
            accent="neutral"
            size="sm"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <><ChevronUp className="w-3.5 h-3.5" />{showLessLabel}</>
            ) : (
              <><ChevronDown className="w-3.5 h-3.5" />{showMoreLabel}</>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
