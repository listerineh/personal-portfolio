"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { musicLinks } from "@/lib/data/music";
import {
  BrandLink,
  Button,
  Exhibit,
  Reveal,
  MemberCard,
  Pill,
  Panel,
  SpotifyTopTracks,
  Ambient,
  Equalizer,
  ScrollText,
  Vinyl,
} from "@/components/ds";
import { PageShell } from "@/components/layout";

const members = [
  { nameKey: "mnMember1Name" as const, roleKey: "mnMember1Role" as const },
  { nameKey: "mnMember2Name" as const, roleKey: "mnMember2Role" as const },
  { nameKey: "mnMember3Name" as const, roleKey: "mnMember3Role" as const },
  { nameKey: "mnMember4Name" as const, roleKey: "mnMember4Role" as const },
];

const ssMembers = [
  { nameKey: "ssMember1Name" as const, roleKey: "ssMember1Role" as const },
  { nameKey: "ssMember2Name" as const, roleKey: "ssMember2Role" as const },
  { nameKey: "ssMember3Name" as const, roleKey: "ssMember3Role" as const },
];

// Each project's identity color: used for its marker dot, its soft glow and its platform links.
const MN = "#D97706";
const SS = "#5A7799";
const SOLO = "#1DB954";

/** /why: the artist behind the code, shown as three temporary exhibitions. */
export default function WhyPage() {
  const t = useTranslations("why");

  return (
    <PageShell>
      {/* The whole page is a night stage, whatever the site theme. */}
      <div className="stage">
      {/* Hero: the photo fills the stage, a spotlight sweeps, the equalizer keeps time. */}
      <section
        aria-labelledby="why-title"
        className="relative isolate flex min-h-[100svh] items-end overflow-clip px-gutter pb-16 pt-[calc(var(--header-h)+3rem)] md:pb-24"
      >
        <Image
          src="/images/sebas-playing.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[60%_30%] opacity-70"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-20 bg-gradient-to-t from-black via-black/70 to-black/25" />
        <span
          aria-hidden="true"
          className="stage-light pointer-events-none absolute -top-[30%] left-1/2 -z-10 h-[130%] w-[60vmax] -translate-x-1/2 opacity-60 mix-blend-screen"
          style={{ background: 'radial-gradient(ellipse 35% 70% at 50% 0%, rgba(217,119,6,0.55), transparent 70%)' }}
        />
        <div className="mx-auto w-full max-w-[1200px]">
          <p
            data-intro=""
            style={{ '--i': 0 } as React.CSSProperties}
            className="inline-flex h-9 items-center gap-2 rounded-full bg-white/10 px-4 text-[0.8125rem] font-medium text-foreground backdrop-blur-md"
          >
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
            {t("heroEyebrow")}
          </p>
          <h1 id="why-title" className="mt-8">
            <span data-intro="" style={{ '--i': 1 } as React.CSSProperties} className="text-display block">
              {t("heroWhy")}
            </span>
            <span data-intro="" style={{ '--i': 2 } as React.CSSProperties} className="text-display block text-primary">
              Listerineh?
            </span>
          </h1>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p data-intro="" style={{ '--i': 3 } as React.CSSProperties} className="text-lead max-w-[48ch] text-foreground/80">
              {t("heroSubtitle")}
            </p>
            <Equalizer className="h-12 md:h-16" bars={14} />
          </div>
        </div>
      </section>

      {/* Where the name comes from: the first paragraph lights up as it scrolls by. */}
      <section aria-labelledby="origin-title" className="px-gutter py-24 md:py-36">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="origin-title" className="text-meta text-primary">
            {t("originHeadline")}
          </h2>
          <ScrollText
            text={t("originParagraph1")}
            className="mt-6 max-w-[30ch] text-[clamp(1.625rem,4vw,3.25rem)] font-semibold leading-[1.18] tracking-[-0.035em]"
          />
          <p className="text-lead mt-10 max-w-[56ch] text-muted-foreground">{t("originParagraph2")}</p>
        </div>
      </section>

      {/* Tracklist: the three projects as records; each one jumps to its section. */}
      <section aria-labelledby="tracklist-title" className="px-gutter pb-24 md:pb-32">
        <div className="mx-auto max-w-[1200px]">
          <h2 id="tracklist-title" className="text-display-sm">
            {t("tracklist")}
          </h2>
          <ol className="mt-10 grid gap-4 sm:grid-cols-3 md:gap-6">
            {[
              { id: 'margarita-nugget', color: MN, title: t("mnTitle"), genre: t("mnGenre"), status: t("mnStatus") },
              { id: 'sofones-solares', color: SS, title: t("ssTitle"), genre: t("ssGenre"), status: t("ssPaused") },
              { id: 'listerineh-solo', color: SOLO, title: 'Listerineh', genre: t("soloGenre"), status: t("soloBadge") },
            ].map((record, index) => (
              <Reveal as="li" key={record.id}>
                <a
                  href={`#${record.id}`}
                  className="panel group flex h-full flex-col gap-6 p-5 no-underline transition-[transform,box-shadow] duration-glide ease-glide hover:-translate-y-1 hover:shadow-float motion-reduce:transition-none md:p-6"
                >
                  <Vinyl color={record.color} className="w-full max-w-[220px] self-center" />
                  <span className="flex items-start justify-between gap-3">
                    <span className="min-w-0">
                      <span className="text-meta text-muted-foreground">{String(index + 1).padStart(2, '0')}</span>
                      <span className="mt-1 block text-headline transition-colors duration-snap ease-snap group-hover:text-primary">
                        {record.title}
                      </span>
                      <span className="mt-1 block text-[0.875rem] text-muted-foreground">{record.genre}</span>
                    </span>
                    <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-full bg-foreground/[0.07] px-2.5 text-[0.6875rem] font-medium">
                      <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: record.color }} />
                      {record.status}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Margarita Nugget */}
      <Exhibit
        tone="tint"
        id="margarita-nugget"
        color={MN}
        visual={<Vinyl color={MN} />}
        tags={
          <>
            <Pill variant="outline">{t("mnBadge")}</Pill>
            <Pill variant="solid" accent="amber">
              {t("mnStatus")}
            </Pill>
          </>
        }
        title={t("mnTitle")}
        subtitle={t("mnGenre")}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="grid content-start gap-5 lg:col-span-6">
            <p className="text-lead">{t("mnDescription")}</p>
            <p className="text-muted-foreground">{t("mnDescription2")}</p>
            <div className="pt-2">
              <BrandLink
                href={musicLinks.mn.linktree}
                color={MN}
                variant="solid"
              >
                {t("mnLinktree")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </BrandLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-headline">{t("mnMembersTitle")}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {members.map(({ nameKey, roleKey }) => (
                <li key={nameKey}>
                  <MemberCard name={t(nameKey)} role={t(roleKey)} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-headline">{t("mnVideoTitle")}</h3>
          <div className="mt-4 overflow-hidden rounded-xl shadow-card">
            <div className="relative aspect-video w-full overflow-hidden bg-muted">
              <iframe
                src={`https://www.youtube.com/embed/${musicLinks.mn.featuredVideoId}?rel=0&modestbranding=1`}
                title={`${t("mnTitle")} · ${t("mnVideoTitle")}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h3 className="text-headline">{t("topTracksTitle")}</h3>
          <div className="mt-4">
            <SpotifyTopTracks
              tracks={musicLinks.mn.topTracks}
              accentColor={MN}
            />
          </div>
        </div>
      </Exhibit>

      {/* Sofones Solares */}
      <Exhibit
        id="sofones-solares"
        color={SS}
        visual={<Vinyl color={SS} />}
        tags={
          <>
            <Pill variant="outline">{t("ssBadge")}</Pill>
            <Pill variant="outline">{t("ssPaused")}</Pill>
          </>
        }
        title={t("ssTitle")}
        subtitle={t("ssGenre")}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="grid content-start gap-5 lg:col-span-6">
            <p className="text-lead">{t("ssDescription")}</p>
            <p className="text-muted-foreground">{t("ssDescription2")}</p>
            <Panel className="p-5">
              <p className="text-meta text-muted-foreground">
                {t("ssAlbumNote")}
              </p>
              <p className="mt-2 text-sm leading-relaxed">{t("ssAlbumDesc")}</p>
            </Panel>
            <div className="pt-2">
              <BrandLink href={musicLinks.ss.instagram} color={SS}>
                {t("soloIG")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </BrandLink>
            </div>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h3 className="text-headline">{t("ssMembersTitle")}</h3>
            <ul className="mt-4 grid grid-cols-2 gap-2">
              {ssMembers.map(({ nameKey, roleKey }) => (
                <li key={nameKey}>
                  <MemberCard name={t(nameKey)} role={t(roleKey)} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 max-w-3xl">
          <h3 className="text-headline">{t("topTracksTitle")}</h3>
          <div className="mt-4">
            <SpotifyTopTracks
              tracks={musicLinks.ss.topTracks}
              accentColor={SS}
            />
          </div>
        </div>
      </Exhibit>

      {/* Listerineh solo */}
      <Exhibit
        tone="tint"
        id="listerineh-solo"
        color={SOLO}
        visual={<Vinyl color={SOLO} />}
        tags={<Pill variant="outline">{t("soloBadge")}</Pill>}
        title="Listerineh"
        subtitle={t("soloGenre")}
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
          <div className="grid content-start gap-6 lg:col-span-5">
            <p className="text-lead">{t("soloDescription")}</p>
            <div>
              <BrandLink
                href={musicLinks.solo.instagram}
                color={SOLO}
                variant="solid"
              >
                {t("soloIG")}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
              </BrandLink>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <h3 className="text-headline">{t("topTracksTitle")}</h3>
            <div className="mt-4">
              <SpotifyTopTracks
                tracks={musicLinks.solo.topTracks}
                accentColor={SOLO}
              />
            </div>
          </div>
        </div>
      </Exhibit>

      {/* Close: a lit card, back to the engineering side */}
      <section
        aria-labelledby="why-cta-title"
        className="bg-background px-gutter py-24 md:py-32"
      >
        <div className="tint relative isolate mx-auto grid max-w-[1200px] items-center gap-10 overflow-hidden rounded-xl p-6 md:p-12 lg:grid-cols-12 lg:gap-10">
          <Ambient intensity="soft" spotlight={false} />
          <div className="lg:col-span-6">
            <h2 id="why-cta-title" className="text-display-sm">
              {t("ctaTitle")}
            </h2>
            <p className="text-lead mt-6 max-w-[48ch] text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                accent="amber"
                size="lg"
                href="/contact"
                className="w-full sm:w-auto"
              >
                {t("getInTouch")}
              </Button>
              <Button variant="ghost" accent="amber" href="/">
                {t("backToPortfolio")}
              </Button>
            </div>
          </div>
          <Reveal className="lg:col-span-5 lg:col-start-8">
            <div className="overflow-hidden rounded-xl shadow-card">
              <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                <Image
                  src="/images/sebas-playing-footer.webp"
                  alt="Sebastian Alvarez performing"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      </div>
    </PageShell>
  );
}
