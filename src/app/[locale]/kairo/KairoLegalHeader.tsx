"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { PageHeader } from "@/components/ds";
import { KAIRO_LEGAL_LAST_UPDATED } from "@/lib/legal";

/** Header shared by Kairo's legal pages: back to the project, title and the date the text last changed. */
export function KairoLegalHeader({ title }: { title: string }) {
  const t = useTranslations("kairoLegal");
  const locale = useLocale();
  const lastUpdated = new Date(
    `${KAIRO_LEGAL_LAST_UPDATED}T12:00:00Z`,
  ).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  return (
    <PageHeader
      title={title}
      nav={
        <Link
          href="/projects/kairo"
          className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground/[0.06] pl-2.5 pr-4 text-[0.8125rem] font-medium text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1] motion-reduce:transition-none"
        >
          <ChevronLeft aria-hidden="true" className="h-4 w-4" />
          {t("back")}
        </Link>
      }
    >
      <p className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground/[0.05] px-4 text-[0.8125rem] font-medium text-foreground/80">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-primary" />
        {t("lastUpdated")} {lastUpdated}
      </p>
    </PageHeader>
  );
}

export const inlineLink =
  "font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[0.22em] hover:decoration-primary";
