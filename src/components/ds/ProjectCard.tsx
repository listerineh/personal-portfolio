"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type ProjectStatus = "in-progress" | "completed" | "on-hold" | "archived";

// Amber only for work that is moving now; finished and paused work stay neutral.
export const projectStatusDot: Record<ProjectStatus, string> = {
  "in-progress": "bg-primary motion-safe:animate-pulse",
  completed: "bg-foreground/60",
  "on-hold": "border border-foreground/50 bg-transparent",
  archived: "border border-foreground/30 bg-transparent",
};

interface ProjectCardProps {
  /** Heading level of the title, so pages keep a valid outline. */
  headingLevel?: 'h2' | 'h3';
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  viewMoreLabel?: string;
  /** Optional index, e.g. "03". */
  number?: string;
  /** `feature` = the large card (first in a listing). */
  size?: "default" | "feature";
  /** `wide` lays the card out horizontally (image beside the text) for a lead spanning a whole row. */
  layout?: "card" | "wide";
  /** Project status; every card shows it the same way, only the dot changes. */
  status?: ProjectStatus;
  /** Localized status text, e.g. "In progress". */
  statusLabel?: string;
  priority?: boolean;
  className?: string;
}

/**
 * A project as a rounded card: the image first, then name, status, one line and the stack.
 * Hover and keyboard focus lift the card and ease the image in on the glide spring.
 */
export function ProjectCard({
  headingLevel: Heading = 'h3',
  slug,
  title,
  description,
  imageUrl,
  tags = [],
  viewMoreLabel = "View project",
  number,
  size = "default",
  layout = "card",
  status,
  statusLabel,
  priority = false,
  className,
}: ProjectCardProps) {
  const wide = layout === "wide";
  const feature = size === "feature" || wide;
  const stack = tags.slice(0, feature ? 5 : 3).join(" · ");

  return (
    <article className={cn("group relative h-full", className)}>
      <Link
        href={`/projects/${slug}`}
        className={cn(
          "panel flex h-full flex-col overflow-hidden no-underline",
          wide && "md:grid md:grid-cols-2",
          "transition-[transform,box-shadow] duration-glide ease-glide motion-reduce:transition-none",
          "hover:-translate-y-1 hover:shadow-float focus-visible:-translate-y-1 focus-visible:shadow-float",
        )}
      >
        {imageUrl && (
          <div
            className={cn(
              "relative w-full overflow-hidden bg-muted",
              "aspect-[4/3]",
              wide && "md:aspect-auto md:h-full md:min-h-[360px]",
            )}
          >
            <Image
              src={imageUrl}
              alt=""
              fill
              priority={priority}
              className="object-cover transition-transform duration-glide ease-glide group-hover:scale-[1.04] motion-reduce:transition-none"
              sizes={
                feature
                  ? "(max-width: 768px) 100vw, 60vw"
                  : "(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 520px"
              }
            />
          </div>
        )}

        <div className={cn("flex flex-1 flex-col gap-2 p-6 md:p-7", wide && "md:justify-center md:gap-3 md:p-10 lg:p-12")}>
          <div className="flex flex-wrap items-center gap-2">
            {number && <span className="text-meta text-muted-foreground">{number}</span>}
            {status && statusLabel && (
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-foreground/[0.06] px-2.5 text-[0.6875rem] font-medium text-foreground/80">
                <span aria-hidden="true" className={cn("h-1.5 w-1.5 rounded-full", projectStatusDot[status])} />
                {statusLabel}
              </span>
            )}
          </div>
          <Heading
            className={cn(
              "text-foreground",
              wide ? "text-display-sm" : feature ? "text-subhead" : "text-headline",
            )}
          >
            {title}
          </Heading>
          <p
            className={cn(
              "max-w-[60ch] text-muted-foreground",
              feature ? "text-lead line-clamp-3" : "text-[0.9375rem] leading-relaxed line-clamp-3",
            )}
          >
            {description}
          </p>
          <div className={cn("mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-2 pt-4", wide && "md:mt-4")}>
            {stack && <p className="text-meta text-muted-foreground">{stack}</p>}
            <span className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-primary">
              {viewMoreLabel}
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
