"use client";

import Link from "next/link";
import { ChevronLeft, Mail } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { PageShell } from "@/components/layout";
import {
  Button,
  DocList,
  DocText,
  LegalDocument,
  PageHeader,
} from "@/components/ds";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

const inlineLink =
  "font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[0.22em] hover:decoration-primary";

/** Terms of use: same document layout as the privacy policy. */
export default function TermsPage() {
  const t = useTranslations("terms");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const lastUpdated = new Date(
    `${LEGAL_LAST_UPDATED}T12:00:00Z`,
  ).toLocaleDateString(locale, {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });

  const plain = (id: string, title: string, text: string) => ({
    id,
    title,
    children: <DocText>{text}</DocText>,
  });

  const sections = [
    plain("agreement", t("agreementTitle"), t("agreementText")),
    {
      id: "license",
      title: t("licenseTitle"),
      children: (
        <>
          <DocText>{t("licenseText")}</DocText>
          <h3 className="text-headline mt-2">{t("licenseNotAllowedTitle")}</h3>
          <DocList
            items={[
              t("modifyMaterials"),
              t("commercialUse"),
              t("reverseEngineer"),
              t("removeCopyright"),
              t("transferMaterials"),
            ]}
          />
        </>
      ),
    },
    plain(
      "disclaimer",
      t("disclaimerTitle"),
      `${t("disclaimerText1")} ${t("disclaimerText2")}`,
    ),
    plain("limitations", t("limitationsTitle"), t("limitationsText")),
    plain("external-links", t("externalLinksTitle"), t("externalLinksText")),
    {
      id: "blog-content",
      title: t("blogContentTitle"),
      children: (
        <>
          <DocText>{t("blogContentText")}</DocText>
          <div className="panel max-w-[66ch] p-5 md:p-6">
            <p className="text-[0.9375rem] font-semibold">
              {t("codeExamplesLabel").replace(/:$/, "")}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {t("codeExamplesText")}
            </p>
          </div>
        </>
      ),
    },
    plain("comments", t("userCommentsTitle"), t("userCommentsText")),
    plain(
      "intellectual-property",
      t("intellectualPropertyTitle"),
      t("intellectualPropertyText"),
    ),
    plain("modifications", t("modificationsTitle"), t("modificationsText")),
    plain("governing-law", t("governingLawTitle"), t("governingLawText")),
    {
      id: "contact",
      title: t("contactInfoTitle"),
      children: (
        <div className="panel grid gap-5 p-6 md:p-8">
          <DocText>
            {t.rich("contactInfoText", {
              contactLink: (chunks) => (
                <Link href="/contact" className={inlineLink}>
                  {chunks}
                </Link>
              ),
            })}
          </DocText>
          <p className="max-w-[66ch] text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">
              {t("noteLabel")}{" "}
            </span>
            {t.rich("noteText", {
              privacyLink: (chunks) => (
                <Link href="/privacy" className={inlineLink}>
                  {chunks}
                </Link>
              ),
            })}
          </p>
          <Button
            accent="amber"
            href="/contact"
            className="w-full sm:w-auto sm:justify-self-start"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            {t("contactInfoTitle")}
          </Button>
        </div>
      ),
    },
  ];

  return (
    <PageShell>
      <PageHeader
        title={t("title")}
        nav={
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-1 rounded-full bg-foreground/[0.06] pl-2.5 pr-4 text-[0.8125rem] font-medium text-foreground transition-colors duration-snap ease-snap hover:bg-foreground/[0.1]"
          >
            <ChevronLeft aria-hidden="true" className="h-4 w-4" />
            {tCommon("back")}
          </Link>
        }
      >
        <p className="inline-flex h-9 items-center gap-2 rounded-full bg-foreground/[0.05] px-4 text-[0.8125rem] font-medium text-foreground/80">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-primary"
          />
          {t("lastUpdated")} {lastUpdated}
        </p>
      </PageHeader>

      <div className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="mx-auto max-w-[1200px]">
          <LegalDocument sections={sections} tocLabel={tCommon("onThisPage")} />
        </div>
      </div>
    </PageShell>
  );
}
