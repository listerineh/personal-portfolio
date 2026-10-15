"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  imageUrl?: string;
  tags: string[];
  viewMoreLabel?: string;
  /** Catalog number on the label, e.g. "03". */
  number?: string;
  /** `feature` hangs the work large (first work in a room). */
  size?: "default" | "feature";
  /** Live marker text (e.g. "In progress"); renders the amber tag. */
  liveLabel?: string;
  priority?: boolean;
  className?: string;
}

/**
 * A work on the wall: the piece in its mat frame, its label below.
 * Only the work you face casts a shadow (hover / keyboard focus).
 */
export function ProjectCard({
  slug,
  title,
  description,
  imageUrl,
  tags = [],
  viewMoreLabel = "View project",
  number,
  size = "default",
  liveLabel,
  priority = false,
  className,
}: ProjectCardProps) {
  const feature = size === "feature";
  const catalog = [number, ...tags.slice(0, feature ? 5 : 3)]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/projects/${slug}`}
        className="block no-underline outline-offset-4"
      >
        {imageUrl && (
          <div
            className={cn(
              "plaque p-2 sm:p-3",
              "transition-[box-shadow,transform] duration-hang ease-hang motion-reduce:transition-none",
              "group-hover:-translate-y-1 group-hover:shadow-hang group-focus-visible:-translate-y-1 group-focus-visible:shadow-hang",
            )}
          >
            <div
              className={cn(
                "relative w-full overflow-hidden bg-muted",
                feature ? "aspect-[4/3] md:aspect-[16/10]" : "aspect-[4/3]",
              )}
            >
              <Image
                src={imageUrl}
                alt=""
                fill
                priority={priority}
                className="object-cover"
                sizes={
                  feature
                    ? "(max-width: 768px) 100vw, 60vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </div>
          </div>
        )}

        <div className="mt-4 grid gap-2 md:mt-5">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3
              className={cn(
                "text-foreground",
                feature ? "text-subhead" : "text-headline",
              )}
            >
              {title}
            </h3>
            {liveLabel && (
              <span className="inline-flex h-6 items-center bg-primary px-2 font-mono text-[0.6875rem] font-medium text-primary-foreground">
                {liveLabel}
              </span>
            )}
          </div>
          {catalog && (
            <p className="text-catalog text-muted-foreground">{catalog}</p>
          )}
          <p
            className={cn(
              "max-w-[60ch] text-muted-foreground",
              feature
                ? "text-lead line-clamp-4"
                : "text-sm leading-relaxed line-clamp-3",
            )}
          >
            {description}
          </p>
          <span className="mt-1 inline-flex items-center gap-1.5 text-sm font-semibold text-foreground underline decoration-1 underline-offset-[0.3em] group-hover:decoration-2">
            {viewMoreLabel}
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:translate-x-0.5"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
