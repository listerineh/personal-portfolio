"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
  /** Live marker text (e.g. "In progress"); renders the amber tag. Only one card in a view should carry it. */
  liveLabel?: string;
  /** Neutral status text for works that are not the live one (e.g. "In progress", "On hold"). */
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
  liveLabel,
  statusLabel,
  priority = false,
  className,
}: ProjectCardProps) {
  const feature = size === "feature";
  const stack = tags.slice(0, feature ? 5 : 3).join(" · ");

  return (
    <article className={cn("group relative h-full", className)}>
      <Link
        href={`/projects/${slug}`}
        className={cn(
          "panel flex h-full flex-col overflow-hidden no-underline",
          "transition-[transform,box-shadow] duration-glide ease-glide motion-reduce:transition-none",
          "hover:-translate-y-1 hover:shadow-float focus-visible:-translate-y-1 focus-visible:shadow-float",
        )}
      >
        {imageUrl && (
          <div
            className={cn(
              "relative w-full overflow-hidden bg-muted",
              feature ? "aspect-[16/10]" : "aspect-[4/3]",
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

        <div className="flex flex-1 flex-col gap-2 p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-2">
            {number && <span className="text-meta text-muted-foreground">{number}</span>}
            {liveLabel && (
              <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-primary/[0.14] px-2.5 text-[0.6875rem] font-semibold text-primary">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary motion-safe:animate-pulse" />
                {liveLabel}
              </span>
            )}
            {!liveLabel && statusLabel && (
              <span className="inline-flex h-6 items-center rounded-full bg-foreground/[0.06] px-2.5 text-[0.6875rem] font-medium text-muted-foreground">
                {statusLabel}
              </span>
            )}
          </div>
          <Heading
            className={cn(
              "text-foreground",
              feature ? "text-subhead" : "text-headline",
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
          <div className="mt-auto flex flex-wrap items-end justify-between gap-x-4 gap-y-2 pt-4">
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
