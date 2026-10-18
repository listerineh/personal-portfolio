"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  /** Heading level of the title, so pages keep a valid outline. */
  headingLevel?: 'h2' | 'h3';
  jobTitle: string;
  company: string;
  employmentDates: string;
  location?: string;
  logoUrl?: string;
  responsibilities: string[];
  showMoreLabel?: string;
  showLessLabel?: string;
  initialVisible?: number;
  /** Live marker for the current role (e.g. "Now"). */
  currentLabel?: string;
}

/** One role: logo, title, company and dates up top, what I did below; the current role carries the live tag. */
export function ExperienceCard({
  headingLevel: Heading = 'h3',
  jobTitle,
  company,
  employmentDates,
  location,
  logoUrl,
  responsibilities,
  showMoreLabel = "See more",
  showLessLabel = "Show less",
  initialVisible = 3,
  currentLabel,
}: ExperienceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const visible = expanded
    ? responsibilities
    : responsibilities.slice(0, initialVisible);
  const hasMore = responsibilities.length > initialVisible;

  return (
    <article className="panel p-6 md:p-8">
      <div className="flex items-start gap-4">
        {logoUrl && (
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-[14px] bg-background shadow-card">
            <Image src={logoUrl} alt="" fill sizes="48px" className="object-contain p-1.5" />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Heading className="text-headline text-foreground">{jobTitle}</Heading>
            {currentLabel && (
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-primary/[0.14] px-2.5 text-[0.6875rem] font-semibold text-primary">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                {currentLabel}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-[0.9375rem] font-medium text-foreground/80">{company}</p>
          <p className="text-meta mt-1 text-muted-foreground">
            {[employmentDates, location].filter(Boolean).join(" · ")}
          </p>
        </div>
      </div>

      <ul id={listId} className="mt-6 grid max-w-[68ch] gap-2.5 md:pl-16">
        {visible.map((item) => (
          <li key={item} className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-foreground/85">
            <span aria-hidden="true" className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-foreground/40" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          onClick={() => setExpanded((value) => !value)}
          className="mt-4 inline-flex min-h-11 items-center gap-1 rounded-md text-[0.9375rem] font-medium text-primary hover:underline md:ml-16"
        >
          {expanded ? showLessLabel : showMoreLabel}
          <ChevronDown
            aria-hidden="true"
            className={cn(
              "h-4 w-4 transition-transform duration-snap ease-snap motion-reduce:transition-none",
              expanded && "rotate-180",
            )}
          />
        </button>
      )}
    </article>
  );
}
