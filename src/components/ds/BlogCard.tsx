"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MONTHS_EN, MONTHS_ES } from "@/lib/blog-constants";

interface BlogCardProps {
  /** Heading level of the title, so pages keep a valid outline. */
  headingLevel?: 'h2' | 'h3';
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  readingTime?: number;
  /** Unit after the reading time, localized by the caller. */
  readingTimeLabel?: string;
  tags?: string[];
  coverImage?: string;
  readMoreLabel?: string;
  newLabel?: string;
  isRecommended?: boolean;
  recommendedLabel?: string;
  /** `row` = entry in a written-works list; `stack` = cover on top (narrow columns). */
  layout?: "row" | "stack";
  className?: string;
}

function isNewPost(date?: string): boolean {
  if (!date) return false;
  const now = new Date();
  // Handle "Month DD, YYYY" format (Safari-safe — Date constructor rejects this)
  const match = date.match(/^(\w+)\s+\d+,\s+(\d{4})$/);
  if (match) {
    const month =
      MONTHS_EN.indexOf(match[1]) !== -1
        ? MONTHS_EN.indexOf(match[1])
        : MONTHS_ES.indexOf(match[1]);
    const year = parseInt(match[2], 10);
    return (
      month !== -1 && year === now.getFullYear() && month === now.getMonth()
    );
  }
  const postDate = new Date(date);
  if (isNaN(postDate.getTime())) return false;
  return (
    postDate.getFullYear() === now.getFullYear() &&
    postDate.getMonth() === now.getMonth()
  );
}

/** A written work: catalog line, title, excerpt. The cover is a small framed print, not a banner. */
export function BlogCard({
  headingLevel: Heading = 'h3',
  title,
  slug,
  excerpt,
  date,
  readingTime,
  readingTimeLabel = "min read",
  tags = [],
  coverImage,
  readMoreLabel = "Read more",
  newLabel = "New",
  isRecommended,
  recommendedLabel,
  layout = "row",
  className,
}: BlogCardProps) {
  const isNew = isNewPost(date);
  const catalog = [
    date,
    readingTime !== undefined ? `${readingTime} ${readingTimeLabel}` : null,
    ...tags.slice(0, 2),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <article className={cn("group relative", className)}>
      <Link
        href={`/blog/${slug}`}
        aria-label={`${title}. ${readMoreLabel}`}
        className={cn(
          "grid gap-4 no-underline outline-offset-4",
          layout === "row" &&
            coverImage &&
            "sm:grid-cols-[1fr_9rem] sm:gap-6 md:grid-cols-[1fr_11rem]",
        )}
      >
        <div
          className={cn(
            "grid content-start gap-2",
            layout === "row" && "sm:order-1",
          )}
        >
          <div className="flex flex-wrap items-center gap-2">
            {isNew && newLabel && (
              <span className="inline-flex h-6 items-center bg-primary px-2 font-mono text-[0.6875rem] font-medium text-primary-foreground">
                {newLabel}
              </span>
            )}
            {isRecommended && recommendedLabel && (
              <span className="inline-flex h-6 items-center border border-foreground/40 px-2 font-mono text-[0.6875rem] font-medium text-foreground">
                {recommendedLabel}
              </span>
            )}
            {catalog && (
              <p className="text-catalog text-muted-foreground">
                {date ? <time dateTime={date}>{catalog}</time> : catalog}
              </p>
            )}
          </div>
          <Heading className="text-headline text-foreground decoration-1 underline-offset-[0.2em] group-hover:underline">
            {title}
          </Heading>
          {excerpt && (
            <p className="max-w-[62ch] text-sm leading-relaxed text-muted-foreground line-clamp-3">
              {excerpt}
            </p>
          )}
        </div>

        {coverImage && (
          <div
            className={cn(
              "plaque p-1.5 transition-[box-shadow,transform] duration-hang ease-hang motion-reduce:transition-none",
              "group-hover:-translate-y-0.5 group-hover:shadow-lift",
              layout === "row"
                ? "order-first sm:order-2 sm:self-start"
                : "order-first",
            )}
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted sm:aspect-[4/3]">
              <Image
                src={coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 176px"
              />
            </div>
          </div>
        )}
      </Link>
    </article>
  );
}
