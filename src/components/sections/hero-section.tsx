"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowDown, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { projectsData } from "@/lib/data";
import { getLocalizedData } from "@/lib/i18n-data";
import { useLocale } from "@/context/locale-context";
import { stackLayers } from "@/lib/stack-layers";
import { Button, Hang, Plaque, WorkingDrawing } from "@/components/ds";

/**
 * Entrance. The wall title is the name; the latest work already hangs beside it,
 * with its label and its working drawing. The primary action walks into the rooms.
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const tSala = useTranslations("sala");
  const tProject = useTranslations("project");
  const { toast } = useToast();
  const { locale } = useLocale();
  const latest = getLocalizedData(projectsData, locale)[0];
  const year = latest?.startDate?.slice(0, 4);

  const downloadCv = () => {
    const link = document.createElement("a");
    link.href = "/docs/CV_SebastianAlvarez_FS_EN.pdf";
    link.download = "CV_SebastianAlvarez_EN.pdf";
    link.click();
    toast({
      title: t("cvDownloadedTitle"),
      description: t("cvDownloadedDescription"),
    });
  };

  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      data-room="00"
      data-room-name={tSala("entrance")}
      className="wall px-gutter pb-16 pt-24 md:pb-24 md:pt-32"
    >
      <div className="mx-auto grid max-w-[1296px] gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-6 lg:pt-6">
          <div>
            <h1 id="hero-title" className="text-display">
              <span className="block">Sebastian</span>
              <span className="block">Alvarez</span>
            </h1>
          </div>
          <div className="mt-6 flex items-center gap-4">
            <div className="plaque w-16 shrink-0 p-1 sm:w-20 lg:w-24">
              <div className="relative aspect-[3/4] overflow-hidden bg-muted">
                <Image
                  src="/images/sebastian_alvarez_photo.webp"
                  alt="Sebastian Alvarez"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>

          <p className="text-[clamp(1.125rem,2.6vw,1.5rem)] font-semibold leading-snug [font-stretch:108%]">
            {t("subtitle")}
          </p>
          </div>
          <p className="text-lead mt-4 max-w-[52ch] text-muted-foreground">
            {t("description")}
          </p>
          <p className="text-catalog mt-5 text-muted-foreground">
            {tSala("yearsRemote", {
              years: t("statsYears"),
              remote: t("statsRemote"),
            })}{" "}
            · Quito, EC
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Button
              href="#work"
              accent="amber"
              size="lg"
              className="w-full sm:w-auto"
            >
              {tSala("walkTheWork")}
              <ArrowDown aria-hidden="true" className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={downloadCv}
              className="w-full sm:w-auto"
            >
              <FileText aria-hidden="true" className="h-4 w-4" />
              {t("downloadCV")}
            </Button>
            <Button
              variant="ghost"
              href="/contact"
              className="justify-start sm:ml-2"
            >
              {t("getInTouch")}
            </Button>
          </div>
        </div>

        {latest && (
          <div className="grid gap-6 sm:grid-cols-[1fr_auto] lg:col-span-6 lg:grid-cols-[1fr_11rem] lg:gap-6">
            <Hang className="sm:col-span-2 lg:col-span-2">
              <Link
                href={`/projects/${latest.slug}`}
                className="group block outline-offset-4"
                aria-label={latest.title}
              >
                <div className="plaque p-2 shadow-hang sm:p-3">
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <Image
                      src={latest.imageUrl}
                      alt=""
                      fill
                      priority
                      fetchPriority="high"
                      sizes="(max-width: 1024px) 100vw, 48vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Link>
            </Hang>
            <Plaque className="self-start">
              <p className="text-catalog text-muted-foreground">
                {tSala("latestWork")}
              </p>
              <h2 className="text-headline mt-2">
                <Link
                  href={`/projects/${latest.slug}`}
                  className="underline-offset-[0.2em] hover:underline"
                >
                  {latest.title}
                </Link>
              </h2>
              <p className="text-catalog mt-2 text-muted-foreground">
                {[year, latest.role].filter(Boolean).join(" · ")}
              </p>
              {latest.status === "in-progress" && (
                <span className="mt-3 inline-flex h-6 items-center bg-primary px-2 font-mono text-[0.6875rem] font-medium text-primary-foreground">
                  {tProject("status.in-progress")}
                </span>
              )}
            </Plaque>
            <WorkingDrawing
              caption={tSala("drawingCaption")}
              layers={stackLayers(latest.tags).map(({ layer, items }) => ({
                name: tSala(`layers.${layer}`),
                items,
              }))}
              className="sm:w-64 lg:w-auto"
            />
          </div>
        )}
      </div>
    </section>
  );
}
