"use client";

import { useTranslations } from "next-intl";
import { ChevronDown, ChevronRight, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Ambient, Button, RotatingWords } from "@/components/ds";
import { HeroVignettes } from "./hero-vignettes";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * First screen, full height. Left: who, what I build (the noun keeps changing), the actions.
 * Right: what I build, shown as a deck of small app windows that leans toward the pointer and deals itself.
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const tSala = useTranslations("sala");
  const { toast } = useToast();
  const words = t.raw("buildWords") as string[];

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
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-background px-gutter pb-28 pt-[calc(var(--header-h)+2.5rem)] md:pb-32"
    >
      <Ambient />
      <div className="relative mx-auto my-auto grid w-full max-w-[1200px] items-center gap-16 py-10 lg:grid-cols-12 lg:gap-10 lg:py-16">
        <div className="lg:col-span-7">
          <p
            data-intro=""
            style={step(0)}
            className="inline-flex items-center gap-2.5 rounded-full bg-foreground/[0.05] py-1.5 pl-3 pr-4 text-[0.8125rem] font-medium text-foreground/80"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            {t("subtitle")}
          </p>

          <h1 id="hero-title" className="mt-8 md:mt-10">
            <span data-intro="" style={step(1)} className="text-display block">
              Sebastian Alvarez.
            </span>
            <span
              data-intro=""
              style={step(2)}
              className="mt-3 block text-[clamp(1.75rem,5vw,3.75rem)] font-semibold leading-[1.1] tracking-[-0.04em] text-muted-foreground"
            >
              <span className="sr-only">{t("buildSentence")}</span>
              <span aria-hidden="true">{t("buildPrefix")} </span>
              <RotatingWords words={words} className="text-primary" />
            </span>
          </h1>

          <p
            data-intro=""
            style={step(3)}
            className="text-lead mt-8 max-w-[52ch] text-muted-foreground md:mt-10"
          >
            {t("description")}
          </p>

          <div
            data-intro=""
            style={step(4)}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:mt-12"
          >
            <Button
              href="#work"
              accent="amber"
              size="lg"
              className="w-full sm:w-auto"
            >
              {tSala("walkTheWork")}
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
              accent="amber"
              href="/contact"
              className="justify-center sm:ml-3"
            >
              {t("getInTouch")}
              <ChevronRight aria-hidden="true" className="h-4 w-4" />
            </Button>
          </div>

          <p
            data-intro=""
            style={step(5)}
            className="text-meta mt-10 text-muted-foreground md:mt-12"
          >
            {tSala("yearsRemote", {
              years: t("statsYears"),
              remote: t("statsRemote"),
            })}{" "}
            · Quito, EC
          </p>
        </div>

        <div
          data-intro=""
          style={step(3)}
          className="mx-auto w-full max-w-[480px] lg:col-span-5 lg:max-w-none"
        >
          <HeroVignettes />
        </div>
      </div>

      <a
        href="#work"
        aria-label={tSala("walkTheWork")}
        className="absolute bottom-6 left-1/2 inline-flex h-11 w-11 -translate-x-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors duration-snap ease-snap hover:text-foreground md:bottom-8"
      >
        <ChevronDown
          aria-hidden="true"
          className="h-5 w-5 motion-safe:animate-bounce"
        />
      </a>
    </section>
  );
}
