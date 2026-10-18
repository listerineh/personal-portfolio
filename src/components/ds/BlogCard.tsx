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

/**
 * A post. `stack` = rounded card with the cover on top (home, related posts);
 * `row` = list entry with a small rounded cover beside it (blog listing).
 */
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
  const meta = [
    date,
    readingTime !== undefined ? `${readingTime} ${readingTimeLabel}` : null,
  ]
    .filter(Boolean)
    .join(" · ");
  const stack = layout === "stack";

  const badges = (
    <>
      {isNew && newLabel && (
        <span className="inline-flex h-6 items-center gap-1.5 rounded-full bg-primary/[0.14] px-2.5 text-[0.6875rem] font-semibold text-primary">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-primary" />
          {newLabel}
        </span>
      )}
      {isRecommended && recommendedLabel && (
        <span className="inline-flex h-6 items-center rounded-full bg-foreground/[0.06] px-2.5 text-[0.6875rem] font-medium text-foreground">
          {recommendedLabel}
        </span>
      )}
    </>
  );

  return (
    <article className={cn("group relative h-full", className)}>
      <Link
        href={`/blog/${slug}`}
        aria-label={`${title}. ${readMoreLabel}`}
        className={cn(
          "no-underline",
          stack
            ? "panel flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-glide ease-glide hover:-translate-y-1 hover:shadow-float focus-visible:-translate-y-1 focus-visible:shadow-float motion-reduce:transition-none"
            : cn("grid gap-4 rounded-lg", coverImage && "sm:grid-cols-[1fr_10rem] sm:gap-8 md:grid-cols-[1fr_13rem]"),
        )}
      >
        {coverImage && (
          <div
            className={cn(
              "relative w-full overflow-hidden bg-muted",
              stack ? "aspect-[16/10]" : "order-first aspect-[16/10] rounded-lg sm:order-2 sm:aspect-[4/3] sm:self-start",
            )}
          >
            <Image
              src={coverImage}
              alt=""
              fill
              className="object-cover transition-transform duration-glide ease-glide group-hover:scale-[1.04] motion-reduce:transition-none"
              sizes={stack ? "(max-width: 768px) 100vw, 380px" : "(max-width: 640px) 100vw, 208px"}
            />
          </div>
        )}

        <div className={cn("grid content-start gap-2", stack ? "flex-1 p-6" : "sm:order-1")}>
          <div className="flex flex-wrap items-center gap-2">
            {badges}
            {meta && (
              <p className="text-meta text-muted-foreground">
                {date ? <time dateTime={date}>{meta}</time> : meta}
              </p>
            )}
          </div>
          <Heading className="text-headline text-foreground transition-colors duration-snap ease-snap group-hover:text-primary motion-reduce:transition-none">
            {title}
          </Heading>
          {excerpt && (
            <p className="max-w-[62ch] text-[0.9375rem] leading-relaxed text-muted-foreground line-clamp-3">
              {excerpt}
            </p>
          )}
          {tags.length > 0 && (
            <p className="text-meta mt-1 text-muted-foreground">{tags.slice(0, 3).join(" · ")}</p>
          )}
        </div>
      </Link>
    </article>
  );
}
