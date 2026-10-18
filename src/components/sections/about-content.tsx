"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Bot, Cloud, Mail, Monitor, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Ambient,
  Button,
  CountUp,
  Reveal,
  ScrollText,
  Section,
} from "@/components/ds";
import { communityLinks } from "@/lib/data/navigation";
import { cn } from "@/lib/utils";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

// The three music projects' identity colors, previewed on the music card (same as /why).
const BAND_COLORS = ["#D97706", "#5A7799", "#1DB954"];

/**
 * About, told in five moves: who (split hero with figures that count up), what I believe (a statement that lights
 * up as you scroll), how I got here (chapters beside a sticky index), what I do (a bento with AI leading), and the
 * people and music around the work.
 */
export function AboutContent() {
  const t = useTranslations("about");
  const tHero = useTranslations("hero");

  const phases = [
    {
      id: "phase1",
      label: t("phase1Label"),
      title: t("phase1Title"),
      body: t("phase1Body"),
    },
    {
      id: "phase2",
      label: t("phase2Label"),
      title: t("phase2Title"),
      body: t("phase2Body"),
    },
    {
      id: "phase3",
      label: t("phase3Label"),
      title: t("phase3Title"),
      body: t("phase3Body"),
    },
  ];

  const glance = [
    { value: tHero("statsYears"), label: t("glanceYears") },
    { value: t("communityStat3"), label: t("glanceCommunity") },
    { value: t("communityStat1"), label: t("glanceOrganizer") },
    { value: t("glanceInstrumentsValue"), label: t("glanceInstruments") },
  ];

  const stats = [
    { stat: t("communityStat1"), label: t("communityStat1Label") },
    { stat: t("communityStat2"), label: t("communityStat2Label") },
    { stat: t("communityStat3"), label: t("communityStat3Label") },
  ];

  // Journey: the chapter in view lights up in the sticky index.
  const [activePhase, setActivePhase] = useState(0);
  const chapterRefs = useRef<(HTMLLIElement | null)[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActivePhase(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    chapterRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 1. Who: split hero, the figures count up beside the name. */}
      <section className="relative isolate overflow-clip bg-background px-gutter pb-20 pt-[calc(var(--header-h)+3.5rem)] md:pb-28 md:pt-[calc(var(--header-h)+6rem)]">
        <Ambient />
        <div className="mx-auto grid max-w-[1200px] items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <p
              data-intro=""
              style={step(0)}
              className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground/[0.05] px-4 text-[0.8125rem] font-medium text-foreground/80"
            >
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-primary"
              />
              Quito, Ecuador
            </p>
            <h1 className="mt-8">
              <span
                data-intro=""
                style={step(1)}
                className="text-display block"
              >
                {t("heroGreeting")}
              </span>
              <span
                data-intro=""
                style={step(2)}
                className="text-display block text-muted-foreground"
              >
                Sebastian.
              </span>
            </h1>
            <p
              data-intro=""
              style={step(3)}
              className="text-lead mt-8 max-w-[44ch] text-muted-foreground"
            >
              {t("heroRole")}
            </p>
            <div
              data-intro=""
              style={step(4)}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Button
                accent="amber"
                size="lg"
                href="/contact"
                className="w-full sm:w-auto"
              >
                <Mail aria-hidden="true" className="h-4 w-4" />
                {t("heroCTA")}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/why"
                className="w-full sm:w-auto"
              >
                {t("musicLink")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div data-intro="" style={step(3)} className="lg:col-span-5">
            <h2 className="text-meta text-muted-foreground">
              {t("glanceTitle")}
            </h2>
            <dl className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
              {glance.map(({ value, label }, index) => (
                <div
                  key={label}
                  className={cn(
                    "panel flex flex-col justify-between gap-6 p-5 shadow-card md:p-6",
                    index === 0 &&
                      "bg-primary text-primary-foreground",
                  )}
                >
                  <dt
                    className={cn(
                      "order-2 text-[0.875rem] leading-snug",
                      index === 0
                        ? "font-medium text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                  >
                    {label}
                  </dt>
                  <dd className="order-1 text-[clamp(2.25rem,5vw,3.25rem)] font-bold leading-none tracking-[-0.045em]">
                    <CountUp value={value} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 2. What I believe: the statement lights up word by word as it scrolls past. */}
      <section className="px-gutter py-24 md:py-36">
        <div className="mx-auto max-w-[1200px]">
          <ScrollText
            text={t("heroDescription")}
            className="max-w-[26ch] text-[clamp(1.75rem,4.4vw,3.5rem)] font-semibold leading-[1.15] tracking-[-0.035em]"
          />
        </div>
      </section>

      {/* 3. How I got here: a sticky index beside the chapters. */}
      <section
        aria-labelledby="journey-title"
        className="tint relative isolate overflow-clip px-gutter py-24 md:py-32 lg:py-40"
      >
        <Ambient intensity="soft" grid={false} spotlight={false} />
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:col-span-5 lg:self-start">
            <h2 id="journey-title" className="text-display-sm">
              {t("journeyTitle")}
            </h2>
            <p className="text-lead mt-5 max-w-[36ch] text-muted-foreground">
              {t("journeyIntro")}
            </p>
            <ol aria-hidden="true" className="mt-10 hidden gap-1 lg:grid">
              {phases.map(({ id, label, title }, index) => (
                <li
                  key={id}
                  className={cn(
                    "flex items-center gap-4 rounded-[14px] px-4 py-3 transition-[background-color,color] duration-glide ease-glide motion-reduce:transition-none",
                    index === activePhase
                      ? "bg-background text-foreground shadow-card"
                      : "text-muted-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rounded-full transition-colors duration-glide ease-glide",
                      index === activePhase ? "bg-primary" : "bg-foreground/20",
                    )}
                  />
                  <span className="min-w-0">
                    <span className="block text-[0.9375rem] font-semibold">
                      {title}
                    </span>
                    <span className="block text-[0.8125rem]">{label}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <ol className="grid gap-5 lg:col-span-7 lg:gap-6">
            {phases.map(({ id, label, title, body }, index) => (
              <li
                key={id}
                ref={(el) => {
                  chapterRefs.current[index] = el;
                }}
                data-index={index}
              >
                <Reveal className="panel p-7 md:p-10 lg:min-h-[52vh]">
                  <p className="text-[clamp(2.5rem,6vw,4rem)] font-bold leading-none tracking-[-0.05em] text-primary/80">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="text-meta mt-8 text-muted-foreground">
                    {label}
                  </p>
                  <h3 className="text-subhead mt-2">{title}</h3>
                  <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.75] text-muted-foreground">
                    {body}
                  </p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 4. What I do: a bento, AI leading. */}
      <Section id="expertise" title={t("expertiseTitle")}>
        <ul className="grid gap-5 md:grid-cols-6 md:gap-6">
          {[
            {
              id: "ai",
              Icon: Bot,
              title: t("expertise4Title"),
              body: t("expertise4Body"),
              span: "md:col-span-4 md:row-span-2",
              lead: true,
            },
            {
              id: "backend",
              Icon: Server,
              title: t("expertise1Title"),
              body: t("expertise1Body"),
              span: "md:col-span-2",
            },
            {
              id: "cloud",
              Icon: Cloud,
              title: t("expertise3Title"),
              body: t("expertise3Body"),
              span: "md:col-span-2",
            },
            {
              id: "frontend",
              Icon: Monitor,
              title: t("expertise2Title"),
              body: t("expertise2Body"),
              span: "md:col-span-6",
            },
          ].map(({ id, Icon, title, body, span, lead }) => (
            <Reveal
              as="li"
              key={id}
              className={cn(
                "panel relative isolate flex flex-col overflow-hidden p-6 md:p-8",
                span,
                lead && "justify-end md:min-h-[420px]",
              )}
            >
              {lead && (
                <Ambient intensity="soft" grid={false} spotlight={false} />
              )}
              <span
                className={cn(
                  "inline-flex items-center justify-center rounded-full bg-primary/[0.14] text-primary",
                  lead ? "h-14 w-14" : "h-11 w-11",
                )}
              >
                <Icon
                  aria-hidden="true"
                  className={lead ? "h-7 w-7" : "h-5 w-5"}
                />
              </span>
              <h3
                className={cn(
                  "mt-6",
                  lead ? "text-display-sm max-w-[16ch]" : "text-headline",
                )}
              >
                {title}
              </h3>
              <p
                className={cn(
                  "mt-3 leading-relaxed text-muted-foreground",
                  lead ? "max-w-[52ch] text-[1.0625rem]" : "text-[0.9375rem]",
                )}
              >
                {body}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 5a. People: the community in big numbers, the group beside them. */}
      <Section
        id="community"
        title={t("communityTitle")}
        intro={t("communityBody")}
        tone="tint"
        ambient={{ halos: false }}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-10">
          <dl className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            {stats.map(({ stat, label }) => (
              <div
                key={`${stat}-${label}`}
                className="flex flex-col border-t border-foreground/15 pt-5"
              >
                <dt className="order-2 mt-3 text-[0.9375rem] text-muted-foreground">
                  {label}
                </dt>
                <dd className="order-1 text-[clamp(3rem,6vw,4.5rem)] font-bold leading-none tracking-[-0.05em]">
                  <CountUp value={stat} />
                </dd>
              </div>
            ))}
          </dl>
          <Reveal className="panel flex flex-col p-6 md:p-8 lg:col-span-5">
            <div className="flex items-center gap-4">
              <span className="relative block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/[0.06]">
                <Image
                  src="/images/gdg_quito_logo.webp"
                  alt=""
                  fill
                  sizes="48px"
                  className="object-contain p-2"
                />
              </span>
              <h3 className="text-headline">Google Developer Groups · Quito</h3>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              {t("communityCardBody")}
            </p>
            <Button
              variant="ghost"
              accent="amber"
              href={communityLinks.gdgQuito}
              external
              className="mt-6 self-start"
            >
              {t("communityJoin")}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </Reveal>
        </div>
      </Section>

      {/* 5b. Music: a doorway to /why, with the three projects' colors. */}
      <section
        aria-labelledby="music-title"
        className="bg-background px-gutter py-24 md:py-32"
      >
        <Reveal className="panel relative isolate mx-auto grid max-w-[1200px] gap-8 overflow-hidden p-7 md:grid-cols-12 md:items-center md:gap-10 md:p-12">
          {BAND_COLORS.map((color, index) => (
            <span
              key={color}
              aria-hidden="true"
              className="pointer-events-none absolute -z-10 h-[28vmax] w-[28vmax] rounded-full opacity-[0.16]"
              style={{
                background: `radial-gradient(closest-side, ${color}, transparent)`,
                right: `${-8 + index * 10}%`,
                top: `${-40 + index * 30}%`,
              }}
            />
          ))}
          <div className="md:col-span-7">
            <div aria-hidden="true" className="flex gap-2">
              {BAND_COLORS.map((color) => (
                <span
                  key={color}
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <h2 id="music-title" className="text-display-sm mt-6">
              {t("musicTitle")}
            </h2>
            <p className="text-lead mt-5 max-w-[52ch] text-muted-foreground">
              {t("musicBody")}
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <Button
              variant="secondary"
              size="lg"
              href="/why"
              className="w-full sm:w-auto"
            >
              {t("musicLink")}
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>
        </Reveal>
      </section>

      {/* Close: the same lit card as the home page. */}
      <section
        aria-labelledby="cta-title"
        className="bg-background px-gutter pb-24 md:pb-32 lg:pb-40"
      >
        <Reveal className="tint relative isolate mx-auto max-w-[1200px] overflow-hidden rounded-xl px-6 py-16 text-center md:px-12 md:py-24">
          <Ambient intensity="soft" spotlight={false} />
          <h2 id="cta-title" className="text-display-sm mx-auto max-w-[18ch]">
            {t("ctaTitle")}
          </h2>
          <p className="text-lead mx-auto mt-5 max-w-[52ch] text-muted-foreground">
            {t("ctaBody")}
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              accent="amber"
              size="lg"
              href="/contact"
              className="w-full sm:w-auto"
            >
              <Mail aria-hidden="true" className="h-4 w-4" />
              {t("ctaPrimary")}
            </Button>
            <Button
              variant="secondary"
              size="lg"
              href="/"
              className="w-full sm:w-auto"
            >
              {t("ctaSecondary")}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
