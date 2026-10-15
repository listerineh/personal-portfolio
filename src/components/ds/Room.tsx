import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface RoomProps {
  /** Anchor id; also used by the route line. */
  id: string;
  /** Room number on the route, e.g. "02". */
  number: string;
  /** Room name as shown on the route line and in the header. */
  name: string;
  title: ReactNode;
  /** Optional one-line statement under the title. */
  intro?: ReactNode;
  /** Right-hand slot beside the title on desktop (e.g. a "see all" link). */
  aside?: ReactNode;
  tone?: "paint" | "plaster";
  titleAs?: "h1" | "h2";
  className?: string;
  children: ReactNode;
}

/**
 * A numbered room on the route. The number carries information (your place on the route),
 * so it sits beside the title as a large wall numeral, never above it as an eyebrow.
 */
export function Room({
  id,
  number,
  name,
  title,
  intro,
  aside,
  tone = "plaster",
  titleAs: TitleTag = "h2",
  className,
  children,
}: RoomProps) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      data-room={number}
      data-room-name={name}
      className={cn(
        tone === "paint" ? "wall" : "bg-background text-foreground",
        "px-gutter py-20 md:py-28 lg:py-32 scroll-mt-20",
        className,
      )}
    >
      <div className="mx-auto max-w-[1296px]">
        <header className="grid grid-cols-[1fr_auto] items-end gap-x-6 gap-y-4 md:grid-cols-12 md:gap-x-6">
          <TitleTag
            id={headingId}
            className="text-display-sm col-span-1 md:col-span-8"
          >
            {title}
          </TitleTag>
          <span
            aria-hidden="true"
            className="font-sans text-[clamp(2.5rem,10vw,6rem)] font-extrabold leading-[0.8] [font-stretch:125%] text-foreground/15 md:col-span-4 md:justify-self-end"
          >
            {number}
          </span>
          {intro && (
            <div className="col-span-2 max-w-[60ch] text-lead text-muted-foreground md:col-span-7">
              {intro}
            </div>
          )}
          {aside && (
            <div className="col-span-2 md:col-span-5 md:justify-self-end md:self-end">
              {aside}
            </div>
          )}
        </header>
        <div className="mt-12 md:mt-16">{children}</div>
      </div>
    </section>
  );
}
