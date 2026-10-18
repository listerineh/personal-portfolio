import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { Ambient } from "./Ambient";

interface SectionProps {
  /** Anchor id; the heading id derives from it. */
  id: string;
  title: ReactNode;
  /** Optional one-line statement under the title. */
  intro?: ReactNode;
  /** Right-hand slot beside the title on desktop (e.g. a "see all" link). */
  aside?: ReactNode;
  tone?: "tint" | "plain";
  titleAs?: "h1" | "h2";
  /** `wide` lets children break out of the content column (carousels). */
  bleed?: boolean;
  /** Ambient light behind the section; pass Ambient's props, or `true` for the default. */
  ambient?: boolean | React.ComponentProps<typeof Ambient>;
  className?: string;
  children: ReactNode;
}

/** A section of a page: a large title that rises in, one line on what is inside, then the content. */
export function Section({
  id,
  title,
  intro,
  aside,
  tone = "plain",
  titleAs: TitleTag = "h2",
  bleed = false,
  ambient,
  className,
  children,
}: SectionProps) {
  const headingId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn(
        tone === "tint" ? "tint" : "bg-background text-foreground",
        "py-24 md:py-32 lg:py-40",
        ambient && "relative isolate overflow-clip",
        className,
      )}
    >
      {ambient && <Ambient {...(ambient === true ? {} : ambient)} />}
      <div className="mx-auto max-w-[1200px] px-gutter">
        <Reveal
          as="header"
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-10"
        >
          <div className="max-w-[44rem]">
            <TitleTag id={headingId} className="text-display-sm">
              {title}
            </TitleTag>
            {intro && (
              <div className="text-lead mt-5 max-w-[56ch] text-muted-foreground">
                {intro}
              </div>
            )}
          </div>
          {aside && <div className="shrink-0 md:pb-1">{aside}</div>}
        </Reveal>
      </div>
      <div
        className={cn(
          "mt-12 md:mt-16 lg:mt-20",
          !bleed && "mx-auto max-w-[1200px] px-gutter",
        )}
      >
        {children}
      </div>
    </section>
  );
}
