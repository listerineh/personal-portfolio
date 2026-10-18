"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
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
  /**
   * `row` = list entry with a small cover beside it (blog listing); `stack` = card with the cover on top;
   * `feature` = the lead story, large cover and title, tags as chips; `compact` = a tight row with a thumbnail.
   */
  layout?: "row" | "stack" | "feature" | "compact";
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

  if (layout === "compact") {
    return (
      <article className={cn("group relative", className)}>
        <Link
          href={`/blog/${slug}`}
          aria-label={`${title}. ${readMoreLabel}`}
          className="-mx-3 flex items-center gap-4 rounded-lg px-3 py-4 no-underline transition-colors duration-snap ease-snap hover:bg-foreground/[0.04] motion-reduce:transition-none"
        >
          {coverImage && (
            <span className="relative aspect-[4/3] w-24 shrink-0 overflow-hidden rounded-[14px] bg-muted sm:w-28">
              <Image src={coverImage} alt="" fill sizes="112px" className="object-cover transition-transform duration-glide ease-glide group-hover:scale-[1.06] motion-reduce:transition-none" />
            </span>
          )}
          <span className="min-w-0 flex-1">
            <span className="flex flex-wrap items-center gap-2">
              {badges}
              {meta && <span className="text-meta text-muted-foreground">{meta}</span>}
            </span>
            <Heading className="mt-1 line-clamp-2 text-[1.0625rem] font-semibold leading-snug tracking-[-0.015em] text-foreground transition-colors duration-snap ease-snap group-hover:text-primary motion-reduce:transition-none">
              {title}
            </Heading>
          </span>
          <ChevronRight aria-hidden="true" className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-snap ease-snap group-hover:translate-x-1 group-hover:text-foreground motion-reduce:transition-none" />
        </Link>
      </article>
    );
  }

  if (layout === "feature") {
    return (
      <article className={cn("group relative h-full", className)}>
        <Link
          href={`/blog/${slug}`}
          aria-label={`${title}. ${readMoreLabel}`}
          className="panel flex h-full flex-col overflow-hidden no-underline transition-[transform,box-shadow] duration-glide ease-glide hover:-translate-y-1 hover:shadow-float focus-visible:-translate-y-1 focus-visible:shadow-float motion-reduce:transition-none"
        >
          {coverImage && (
            <span className="relative block aspect-[16/9] w-full overflow-hidden bg-muted">
              <Image src={coverImage} alt="" fill sizes="(max-width: 1024px) 100vw, 700px" className="object-cover transition-transform duration-glide ease-glide group-hover:scale-[1.03] motion-reduce:transition-none" />
            </span>
          )}
          <span className="flex flex-1 flex-col gap-3 p-6 md:p-8">
            <span className="flex flex-wrap items-center gap-2">
              {badges}
              {meta && <span className="text-meta text-muted-foreground">{date ? <time dateTime={date}>{meta}</time> : meta}</span>}
            </span>
            <Heading className="text-subhead text-foreground transition-colors duration-snap ease-snap group-hover:text-primary motion-reduce:transition-none">
              {title}
            </Heading>
            {excerpt && <span className="line-clamp-3 max-w-[62ch] text-[1.0625rem] leading-relaxed text-muted-foreground">{excerpt}</span>}
            <span className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
              {tags.length > 0 && (
                <span className="flex flex-wrap gap-1.5">
                  {tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="inline-flex h-7 items-center rounded-full bg-foreground/[0.06] px-3 text-xs font-medium text-foreground">
                      {tag}
                    </span>
                  ))}
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-[0.9375rem] font-medium text-primary">
                {readMoreLabel}
                <ChevronRight aria-hidden="true" className="h-4 w-4 transition-transform duration-snap ease-snap group-hover:translate-x-0.5 motion-reduce:transition-none" />
              </span>
            </span>
          </span>
        </Link>
      </article>
    );
  }

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
