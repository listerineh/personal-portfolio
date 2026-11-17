"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { PageShell } from "@/components/layout";
import { DocList, DocText, LegalDocument } from "@/components/ds";
import { KairoLegalHeader, inlineLink } from "../KairoLegalHeader";

/** How to delete a Kairo account, from the app or by asking. Google Play links here as the account deletion URL. */
export default function KairoDeleteAccountPage() {
  const t = useTranslations("kairoLegal.delete");
  const tCommon = useTranslations("common");
  const list = (key: string) => t.raw(key) as string[];

  const sections = [
    {
      id: "in-app",
      title: t("appTitle"),
      children: (
        <>
          <ol className="grid max-w-[66ch] gap-3">
            {list("appSteps").map((step, i) => (
              <li
                key={step}
                className="flex items-start gap-3 text-[1.0625rem] leading-relaxed text-foreground/85"
              >
                <span
                  aria-hidden="true"
                  className="mt-[0.15em] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/[0.14] text-[0.8125rem] font-semibold text-primary"
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <DocText>{t("appNote")}</DocText>
        </>
      ),
    },
    {
      id: "by-request",
      title: t("askTitle"),
      children: (
        <DocText>
          {t.rich("askText", {
            contactLink: (chunks) => (
              <Link href="/contact" className={inlineLink}>
                {chunks}
              </Link>
            ),
          })}
        </DocText>
      ),
    },
    {
      id: "what",
      title: t("whatTitle"),
      children: (
        <>
          <DocList items={list("whatItems")} />
          <DocText>{t("whatNote")}</DocText>
          <DocText>
            <Link href="/kairo/privacy" className={inlineLink}>
              {t("privacyLink")}
            </Link>
          </DocText>
        </>
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
