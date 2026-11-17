"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout";
import { DocList, DocText, LegalDocument } from "@/components/ds";
import { KairoLegalHeader, inlineLink } from "../KairoLegalHeader";

/** Privacy policy of the Kairo app (linked from the app and its store listings). */
export default function KairoPrivacyPage() {
  const t = useTranslations("kairoLegal.privacy");
  const tCommon = useTranslations("common");
  const list = (key: string) => t.raw(key) as string[];

  const sections = [
    {
      id: "summary",
      title: t("introTitle"),
      children: <DocText>{t("introText")}</DocText>,
    },
    {
      id: "data",
      title: t("collectTitle"),
      children: (
        <>
          <h3 className="text-headline mt-2">{t("accountTitle")}</h3>
          <DocList items={list("accountItems")} />
          <h3 className="text-headline mt-4">{t("contentTitle")}</h3>
          <DocList items={list("contentItems")} />
          <h3 className="text-headline mt-4">{t("deviceTitle")}</h3>
          <DocList items={list("deviceItems")} />
        </>
      ),
    },
    {
      id: "use",
      title: t("useTitle"),
      children: (
        <>
          <DocText>{t("useText")}</DocText>
          <DocList items={list("useItems")} />
          <DocText>{t("useNever")}</DocText>
        </>
      ),
    },
    {
      id: "sharing",
      title: t("shareTitle"),
      children: (
        <>
          <DocText>{t("shareText")}</DocText>
          <DocList items={list("shareItems")} />
        </>
      ),
    },
    {
      id: "retention",
      title: t("retentionTitle"),
      children: <DocText>{t("retentionText")}</DocText>,
    },
    {
      id: "rights",
      title: t("rightsTitle"),
      children: (
        <DocText>
          {t("rightsText")}{" "}
          <Link href="/kairo/delete-account" className={inlineLink}>
            {t("rightsDelete")}
          </Link>
          .
        </DocText>
      ),
    },
    {
      id: "security",
      title: t("securityTitle"),
      children: <DocText>{t("securityText")}</DocText>,
    },
    {
      id: "children",
      title: t("childrenTitle"),
      children: <DocText>{t("childrenText")}</DocText>,
    },
    {
      id: "changes",
      title: t("changesTitle"),
      children: <DocText>{t("changesText")}</DocText>,
    },
    {
      id: "contact",
      title: t("contactTitle"),
      children: (
        <DocText>
          {t.rich("contactText", {
            contactLink: (chunks) => (
              <Link href="/contact" className={inlineLink}>
                {chunks}
              </Link>
            ),
          })}
        </DocText>
      ),
    },
  ];

  return (
    <PageShell>
      <KairoLegalHeader title={t("title")} />
      <div className="px-gutter pb-24 pt-4 md:pb-32 md:pt-8">
        <div className="mx-auto max-w-[1200px]">
          <LegalDocument sections={sections} tocLabel={tCommon("onThisPage")} />
        </div>
      </div>
    </PageShell>
  );
}
