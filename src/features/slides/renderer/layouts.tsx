"use client";

import Image from "next/image";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils";
import type { SlideLayout, SlideOf } from "../schema";
import { useBuild, useSlide } from "./context";
import { RichText } from "./RichText";
import { CountUp } from "./Stat";

/** Canvas width minus the side padding of .slide-pad. */
const CONTENT_WIDTH = 1920 - 2 * 128;

type LayoutProps<L extends SlideLayout> = { slide: SlideOf<L>; lang: string };

/** Staggered entrance index for data-enter. */
const enter = (i: number) => ({
  "data-enter": "",
  style: { "--i": i } as React.CSSProperties,
});

function Light({
  placement = "top-right",
}: {
  placement?: "top-right" | "bottom-left";
}) {
  return (
    <div aria-hidden="true">
      <span className="sl-grid" />
      <span
        className="sl-halo"
        style={
          placement === "top-right"
            ? { width: 1400, height: 1400, top: -620, right: -420 }
            : { width: 1200, height: 1200, bottom: -620, left: -380 }
        }
      />
    </div>
  );
}

/** Deck title and slide number along the bottom edge of content slides. */
function Footer() {
  const { deckTitle, index, total } = useSlide();
  return (
    <div
      className="sl-meta absolute bottom-[56px] left-[128px] right-[128px] flex items-center justify-between text-muted-foreground"
      aria-hidden="true"
    >
      <span className="flex items-center gap-4">
        <span className="h-[10px] w-[10px] rounded-full bg-primary" />
        {deckTitle}
      </span>
      <span className="tabular-nums">
        {index + 1} / {total}
      </span>
    </div>
  );
}

function Heading({ text, i = 0 }: { text: string; i?: number }) {
  return (
    <h2 className="sl-title max-w-[1500px]" {...enter(i)}>
      {text}
    </h2>
  );
}

export function TitleLayout({ slide }: LayoutProps<"title">) {
  return (
    <>
      <Light />
      <div className="slide-pad justify-end pb-[160px]">
        {slide.eyebrow && (
          <p className="sl-meta mb-10 text-primary" {...enter(0)}>
            {slide.eyebrow}
          </p>
        )}
        <h1 className="sl-display max-w-[1500px]" {...enter(1)}>
          {slide.title}
        </h1>
        {slide.subtitle && (
          <div {...enter(2)}>
            <RichText
              as="p"
              text={slide.subtitle}
              className="sl-lead mt-12 max-w-[1200px] text-muted-foreground"
            />
          </div>
        )}
      </div>
    </>
  );
}

export function SectionLayout({ slide }: LayoutProps<"section">) {
  return (
    <>
      <Light placement="bottom-left" />
      <div className="slide-pad justify-center">
        {slide.number && (
          <p
            className="sl-stat mb-8 text-amber"
            aria-hidden="true"
            {...enter(0)}
          >
            {slide.number}
          </p>
        )}
        <h2 className="sl-display max-w-[1500px]" {...enter(1)}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <div {...enter(2)}>
            <RichText
              as="p"
              text={slide.subtitle}
              className="sl-lead mt-10 max-w-[1200px] text-muted-foreground"
            />
          </div>
        )}
      </div>
    </>
  );
}

export function StatementLayout({ slide }: LayoutProps<"statement">) {
  return (
    <div className="slide-pad justify-center">
      <div {...enter(0)}>
        <RichText
          as="p"
          text={slide.statement}
          className="sl-statement max-w-[1600px]"
        />
      </div>
      {slide.emphasis && (
        <p className="sl-subhead mt-14 text-muted-foreground" {...enter(1)}>
          {slide.emphasis}
        </p>
      )}
      <Footer />
    </div>
  );
}

export function BulletsLayout({ slide }: LayoutProps<"bullets">) {
  const build = useBuild(slide.build);
  return (
    <div className="slide-pad">
      <Heading text={slide.title} />
      <ul className="mt-20 flex max-w-[1500px] flex-col gap-10">
        {slide.items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-8"
            {...(slide.build ? build(i + 1) : enter(i + 1))}
          >
            <span
              aria-hidden="true"
              className="mt-[22px] h-[14px] w-[14px] shrink-0 rounded-full bg-primary"
            />
            <RichText text={item} className="sl-lead" />
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export function TwoColumnLayout({ slide }: LayoutProps<"two-column">) {
  const build = useBuild(slide.build);
  return (
    <div className="slide-pad">
      <Heading text={slide.title} />
      <div className="mt-16 grid flex-1 grid-cols-2 gap-10 pb-16">
        {slide.columns.map((column, i) => (
          <section
            key={i}
            className="panel flex flex-col p-14"
            {...(slide.build ? build(i + 1) : enter(i + 1))}
          >
            <h3 className={cn("sl-subhead", i === 1 && "text-primary")}>
              {column.heading}
            </h3>
            {column.body && (
              <RichText
                as="p"
                text={column.body}
                className="sl-body mt-6 text-muted-foreground"
              />
            )}
            {column.items && (
              <ul className="mt-8 flex flex-col gap-6">
                {column.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-5">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[18px] h-[10px] w-[10px] shrink-0 rounded-full",
                        i === 1 ? "bg-primary" : "bg-muted-foreground/50",
                      )}
                    />
                    <RichText text={item} className="sl-body" />
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export function ImageFullLayout({ slide }: LayoutProps<"image-full">) {
  return (
    <>
      <Image
        src={slide.image.src}
        alt={slide.image.alt}
        fill
        sizes="100vw"
        loading="eager"
        className="object-cover"
        data-enter=""
      />
      {slide.caption && (
        <div
          className="absolute bottom-[56px] left-[56px] max-w-[1100px] rounded-full bg-background/80 px-10 py-5 shadow-float backdrop-blur-xl"
          {...enter(1)}
        >
          <RichText as="p" text={slide.caption} className="sl-body" />
        </div>
      )}
    </>
  );
}

export function ImageTextLayout({ slide }: LayoutProps<"image-text">) {
  const image = (
    <div
      className="relative h-full overflow-hidden rounded-[30px] shadow-card"
      {...enter(slide.side === "left" ? 0 : 2)}
    >
      <Image
        src={slide.image.src}
        alt={slide.image.alt}
        fill
        sizes="50vw"
        loading="eager"
        className="object-cover"
      />
    </div>
  );
  return (
    <div className="slide-pad">
      <div className={cn("grid flex-1 grid-cols-2 items-center gap-24 pb-16")}>
        {slide.side === "left" && image}
        <div>
          <Heading text={slide.title} i={slide.side === "left" ? 1 : 0} />
          <div {...enter(slide.side === "left" ? 2 : 1)}>
            <RichText
              as="p"
              text={slide.body}
              className="sl-lead mt-10 text-muted-foreground"
            />
          </div>
        </div>
        {slide.side === "right" && image}
      </div>
      <Footer />
    </div>
  );
}

export function StatsLayout({ slide, lang }: LayoutProps<"stats">) {
  const { active, still, step } = useSlide();
  const build = useBuild(slide.build);
  // The longest figure sets one size for the row, so 1,920px never spills out of its column.
  const longest = Math.max(...slide.stats.map((stat) => `${stat.prefix ?? ""}${stat.value.toLocaleString(lang)}${stat.suffix ?? ""}`.length));
  const column = (CONTENT_WIDTH - 48 * (slide.stats.length - 1)) / slide.stats.length;
  const statSize = Math.min(184, Math.floor(column / (longest * 0.62)));
  return (
    <div className="slide-pad">
      {slide.title && <Heading text={slide.title} />}
      <dl
        className={cn(
          "grid flex-1 items-center gap-12 pb-20",
          ["", "grid-cols-1", "grid-cols-2", "grid-cols-3", "grid-cols-4"][
            slide.stats.length
          ],
        )}
      >
        {slide.stats.map((stat, i) => (
          <div
            key={i}
            className="flex flex-col-reverse"
            {...(slide.build ? build(i + 1) : enter(i + 1))}
          >
            <dt className="sl-subhead mt-6 text-muted-foreground">
              {stat.label}
            </dt>
            <dd className="sl-stat whitespace-nowrap text-primary" style={{ fontSize: statSize }}>
              {stat.prefix}
              <CountUp
                value={stat.value}
                locale={lang}
                run={active && !still && (!slide.build || step >= i + 1)}
              />
              {stat.suffix}
            </dd>
          </div>
        ))}
      </dl>
      <Footer />
    </div>
  );
}

export function QuoteLayout({ slide }: LayoutProps<"quote">) {
  return (
    <div className="slide-pad justify-center">
      <figure className="max-w-[1500px]">
        <span
          aria-hidden="true"
          className="sl-stat block h-[120px] text-amber"
          {...enter(0)}
        >
          “
        </span>
        <div {...enter(1)}>
          <RichText
            as="blockquote"
            text={slide.quote}
            className="sl-statement text-[88px]"
          />
        </div>
        <figcaption className="mt-14 flex items-center gap-6" {...enter(2)}>
          <span
            aria-hidden="true"
            className="h-[3px] w-16 rounded-full bg-primary"
          />
          <span className="sl-headline">{slide.author}</span>
          {slide.role && (
            <span className="sl-body text-muted-foreground">
              · {slide.role}
            </span>
          )}
        </figcaption>
      </figure>
      <Footer />
    </div>
  );
}

export function CodeLayout({ slide }: LayoutProps<"code">) {
  return (
    <div className="slide-pad">
      {slide.title && <Heading text={slide.title} />}
      <figure
        className="mt-14 flex min-h-0 flex-1 flex-col pb-16"
        {...enter(1)}
      >
        <div className="panel relative min-h-0 flex-1 overflow-hidden p-14">
          <span className="sl-meta absolute right-10 top-8 uppercase text-muted-foreground">
            {slide.language}
          </span>
          {/* Syntax highlighting arrives with shiki in phase 3. */}
          <pre className="sl-code overflow-hidden whitespace-pre-wrap">
            <code>{slide.code}</code>
          </pre>
        </div>
        {slide.caption && (
          <figcaption>
            <RichText
              as="p"
              text={slide.caption}
              className="sl-body mt-8 text-muted-foreground"
            />
          </figcaption>
        )}
      </figure>
      <Footer />
    </div>
  );
}

export function DiagramLayout({ slide }: LayoutProps<"diagram">) {
  return (
    <div className="slide-pad">
      {slide.title && <Heading text={slide.title} />}
      <figure
        className="mt-14 flex min-h-0 flex-1 flex-col pb-16"
        {...enter(1)}
      >
        <div className="panel flex min-h-0 flex-1 items-center justify-center p-14">
          {slide.svg ? (
            // Stored already sanitized by the editor (phase 3); the viewer never runs Mermaid.
            <div
              className="h-full w-full [&_svg]:h-full [&_svg]:w-full"
              dangerouslySetInnerHTML={{ __html: slide.svg }}
            />
          ) : (
            <pre className="sl-code whitespace-pre-wrap text-muted-foreground">
              {slide.source}
            </pre>
          )}
        </div>
        {slide.caption && (
          <figcaption>
            <RichText
              as="p"
              text={slide.caption}
              className="sl-body mt-8 text-muted-foreground"
            />
          </figcaption>
        )}
      </figure>
      <Footer />
    </div>
  );
}

export function EmbedLayout({ slide }: LayoutProps<"embed">) {
  const { active, still } = useSlide();
  return (
    <div className="slide-pad">
      {slide.title && <Heading text={slide.title} />}
      <figure
        className="mt-12 flex min-h-0 flex-1 flex-col pb-16"
        {...enter(1)}
      >
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[30px] bg-tint shadow-card">
          {/* Mounted only on screen, so off-screen slides and thumbnails never load third-party frames. */}
          {active && !still && (
            <iframe
              src={slide.url}
              title={slide.title ?? slide.caption ?? "Embed"}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; encrypted-media; fullscreen; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
              loading="lazy"
            />
          )}
        </div>
        {slide.caption && (
          <figcaption>
            <RichText
              as="p"
              text={slide.caption}
              className="sl-body mt-8 text-muted-foreground"
            />
          </figcaption>
        )}
      </figure>
      <Footer />
    </div>
  );
}

export function IconsGridLayout({ slide }: LayoutProps<"icons-grid">) {
  const build = useBuild(slide.build);
  const columns = slide.items.length <= 4 ? "grid-cols-2" : "grid-cols-3";
  return (
    <div className="slide-pad">
      <Heading text={slide.title} />
      <ul
        className={cn("mt-12 grid content-start gap-6", columns)}
      >
        {slide.items.map((item, i) => (
          <li
            key={i}
            className="panel flex flex-col p-10"
            {...(slide.build ? build(i + 1) : enter(i + 1))}
          >
            <span
              aria-hidden="true"
              className="flex h-[72px] w-[72px] items-center justify-center rounded-full bg-primary/[0.14] text-primary"
            >
              <DynamicIcon
                name={item.icon as IconName}
                size={36}
                strokeWidth={1.75}
                fallback={() => <span className="h-4 w-4 rounded-full bg-current" />}
              />
            </span>
            <h3 className="sl-headline mt-6">{item.title}</h3>
            {item.body && (
              <RichText
                as="p"
                text={item.body}
                className="sl-body mt-2 text-[28px] text-muted-foreground"
              />
            )}
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
}

export function ClosingLayout({ slide }: LayoutProps<"closing">) {
  return (
    <>
      <Light />
      <div className="slide-pad justify-center">
        <h2 className="sl-display" {...enter(0)}>
          {slide.title}
        </h2>
        {slide.subtitle && (
          <div {...enter(1)}>
            <RichText
              as="p"
              text={slide.subtitle}
              className="sl-lead mt-10 max-w-[1200px] text-muted-foreground"
            />
          </div>
        )}
        {slide.links && slide.links.length > 0 && (
          <ul className="mt-16 flex flex-wrap gap-6" {...enter(2)}>
            {slide.links.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "sl-headline inline-flex min-h-[88px] items-center rounded-full px-12",
                    i === 0
                      ? "bg-primary text-primary-foreground"
                      : "bg-foreground/[0.07] text-foreground",
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
