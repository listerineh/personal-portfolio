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
  PageHeader,
  Pill,
  Panel,
  SpotifyTopTracks,
  Ambient,
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

// Exhibition marker colors: the bands' identities, used only as markers and platform links.
const MN = "#D97706";
const SS = "#5A7799";
const SOLO = "#1DB954";

/** /why: the artist behind the code, shown as three temporary exhibitions. */
export default function WhyPage() {
  const t = useTranslations("why");

  return (
    <PageShell>
      <PageHeader
        ambient
        title={
          <>
            <span className="block">{t("heroWhy")}</span>
            <span className="block text-muted-foreground">Listerineh?</span>
          </>
        }
        intro={t("heroSubtitle")}
      >
        <p className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground/[0.05] px-4 text-[0.8125rem] font-medium text-foreground/80">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
          {t("heroEyebrow")}
        </p>
      </PageHeader>

      {/* The photograph, hung, and where the name comes from */}
      <section className="px-gutter pb-24 pt-8 md:pb-32 md:pt-12">
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <div className="overflow-hidden rounded-xl shadow-card">
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <Image
                  src="/images/sebas-playing.webp"
                  alt="Sebastian Alvarez playing guitar"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </Reveal>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <h2 className="text-display-sm">{t("originHeadline")}</h2>
            <div className="mt-6 grid gap-5 text-lead text-muted-foreground">
              <p>{t("originParagraph1")}</p>
              <p>{t("originParagraph2")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Margarita Nugget */}
      <Exhibit
        tone="tint"
        id="margarita-nugget"
        color={MN}
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
    </PageShell>
  );
}
