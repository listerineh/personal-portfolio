"use client";

import { useTranslations } from "next-intl";
import { ArrowDown, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button, Directory } from "@/components/ds";

/**
 * Entrance. The wall title is the name and the statement; beside it hangs the floor plan
 * of the rooms. Works belong to room 01, so none hang here.
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const tSala = useTranslations("sala");
  const { toast } = useToast();

  const stops = [
    { number: "01", name: tSala("work"), href: "#work" },
    { number: "02", name: tSala("writing"), href: "#writing" },
    { number: "03", name: tSala("career"), href: "#career" },
    { number: "04", name: tSala("craft"), href: "#craft" },
    { number: "05", name: tSala("contact"), href: "#contact" },
  ];

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
      <div className="mx-auto grid max-w-[1296px] gap-14 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <h1 id="hero-title" className="text-display">
            <span className="block">Sebastian</span>
            <span className="block">Alvarez</span>
          </h1>
          <p className="mt-6 text-[clamp(1.125rem,2.6vw,1.5rem)] font-semibold leading-snug [font-stretch:108%]">
            {t("subtitle")}
          </p>
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

        <Directory
          label={tSala("route")}
          stops={stops}
          className="lg:col-span-4 lg:col-start-9 lg:self-end"
        />
      </div>
    </section>
  );
}
