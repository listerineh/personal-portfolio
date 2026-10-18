"use client";

import { useTranslations } from "next-intl";
import { ChevronRight, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ds";

const step = (i: number) => ({ "--i": i }) as React.CSSProperties;

/**
 * First screen: the name large, the role as a second line in gray, one paragraph, the actions.
 * Each line comes into focus in turn once, on load. Projects start right below.
 */
export function HeroSection() {
  const t = useTranslations("hero");
  const tSala = useTranslations("sala");
  const { toast } = useToast();

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
      className="bg-background px-gutter pb-16 pt-[calc(var(--header-h)+3.5rem)] md:pb-24 md:pt-[calc(var(--header-h)+6.5rem)]"
    >
      <div className="mx-auto max-w-[1200px]">
        <p
          data-intro=""
          style={step(0)}
          className="text-meta inline-flex items-center gap-2 text-muted-foreground"
        >
          <span aria-hidden="true" className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          {tSala("yearsRemote", {
            years: t("statsYears"),
            remote: t("statsRemote"),
          })}{" "}
          · Quito, EC
        </p>

        <h1 id="hero-title" className="mt-6">
          <span data-intro="" style={step(1)} className="text-display block">
            Sebastian Alvarez.
          </span>
          {/* The role as a quieter second voice, one clean line per part: no orphaned separators. */}
          <span
            data-intro=""
            style={step(2)}
            className="mt-2 block text-[clamp(1.75rem,5.6vw,4.25rem)] font-semibold leading-[1.05] tracking-[-0.04em] text-muted-foreground"
          >
            {t("subtitle")
              .split("·")
              .map((part) => (
                <span key={part} className="block">
                  {part.trim()}
                </span>
              ))}
          </span>
        </h1>

        <p
          data-intro=""
          style={step(3)}
          className="text-lead mt-8 max-w-[54ch] text-muted-foreground"
        >
          {t("description")}
        </p>

        <div
          data-intro=""
          style={step(4)}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
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
      </div>
    </section>
  );
}
