"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
  /** Live marker for the current role (e.g. "Now"). */
  currentLabel?: string;
}

/** One stop in the career timeline: dates in the margin, role and work on the wall. */
export function ExperienceCard({
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
    <article className="grid gap-3 border-t border-foreground/20 pt-6 md:grid-cols-[11rem_1fr] md:gap-8 md:pt-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 md:block md:space-y-1">
        <p className="text-catalog text-foreground">{employmentDates}</p>
        {location && (
          <p className="text-catalog text-muted-foreground">{location}</p>
        )}
        {currentLabel && (
          <span className="inline-flex h-6 items-center bg-primary px-2 font-mono text-[0.6875rem] font-medium text-primary-foreground md:mt-2">
            {currentLabel}
          </span>
        )}
      </div>

      <div className="min-w-0">
        <div className="flex items-start gap-4">
          {logoUrl && (
            <div className="plaque relative h-11 w-11 shrink-0 overflow-hidden p-1">
              <Image
                src={logoUrl}
                alt=""
                fill
                sizes="44px"
                className="object-contain p-1"
              />
            </div>
          )}
          <div className="min-w-0">
            <h3 className="text-headline text-foreground">{jobTitle}</h3>
            <p className="mt-0.5 text-base text-muted-foreground">{company}</p>
          </div>
        </div>

        <ul id={listId} className="mt-5 grid max-w-[68ch] gap-2.5">
          {visible.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-[0.9375rem] leading-relaxed text-foreground/85"
            >
              <span
                aria-hidden="true"
                className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-foreground"
              />
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
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-1 underline-offset-[0.3em] hover:decoration-2"
          >
            <ChevronDown
              aria-hidden="true"
              className={cn(
                "h-4 w-4 transition-transform duration-snap ease-snap motion-reduce:transition-none",
                expanded && "rotate-180",
              )}
            />
            {expanded ? showLessLabel : showMoreLabel}
          </button>
        )}
      </div>
    </article>
  );
}
