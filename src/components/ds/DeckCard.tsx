"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface DeckCardProps {
  href: string;
  title: string;
  description?: string;
  /** The deck's cover, 16:9, edge to edge (the slides feature renders the real first slide). */
  preview: ReactNode;
  /** Small line above the title: event, date, language. */
  meta?: string;
  viewLabel?: string;
  /** Heading level of the title, so pages keep a valid outline. */
  headingLevel?: "h2" | "h3";
  className?: string;
}

/**
 * A presentation as a rounded card: its cover slide first, then where it was given, the title and one line.
 * Hover and keyboard focus lift the card on the glide spring, like ProjectCard.
 */
export function DeckCard({ href, title, description, preview, meta, viewLabel = "View slides", headingLevel: Heading = "h3", className }: DeckCardProps) {
  return (
    <article className={cn("group relative h-full", className)}>
      <Link
        href={href}
        className={cn(
          "panel flex h-full flex-col overflow-hidden no-underline",
          "transition-[transform,box-shadow] duration-glide ease-glide motion-reduce:transition-none",
          "hover:-translate-y-1 hover:shadow-float focus-visible:-translate-y-1 focus-visible:shadow-float",
        )}
      >
        <div aria-hidden="true" className="pointer-events-none relative aspect-video w-full overflow-hidden bg-muted">
          {preview}
        </div>
        <div className="flex flex-1 flex-col gap-2 p-6 md:p-7">
          {meta && <p className="text-meta text-muted-foreground">{meta}</p>}
          <Heading className="text-headline text-foreground">{title}</Heading>
          {description && <p className="line-clamp-2 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted-foreground">{description}</p>}
          <span className="mt-auto inline-flex items-center gap-1 pt-4 text-[0.9375rem] font-medium text-primary">
            {viewLabel}
            <ChevronRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
