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
import { CookieSettingsLink } from "@/components/common/cookie-settings-link";
import { LEGAL_LAST_UPDATED } from "@/lib/legal";

const inlineLink =
  "font-medium text-primary underline decoration-primary/40 decoration-1 underline-offset-[0.22em] hover:decoration-primary";

/** Privacy policy: numbered sections beside a sticky index; the cookie link opens the real preferences dialog. */
export default function PrivacyPage() {
  const t = useTranslations("privacy");
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

  const cookieTypes = [
    [t("necessaryCookies"), t("necessaryCookiesDesc")],
    [t("analyticsCookies"), t("analyticsCookiesDesc")],
    [t("preferenceCookies"), t("preferenceCookiesDesc")],
  ];

  const sections = [
    {
      id: "information",
      title: t("infoCollectTitle"),
      children: (
        <>
          <h3 className="text-headline mt-2">{t("autoCollectedTitle")}</h3>
          <DocText>{t("autoCollectedText")}</DocText>
          <DocList
            items={[
              t("browserType"),
              t("operatingSystem"),
              t("ipAddress"),
              t("pagesVisited"),
              t("referringWebsite"),
            ]}
          />
        </>
      ),
    },
    {
      id: "cookies",
      title: t("cookiesTitle"),
      children: (
        <>
          <DocText>
            {t.rich("cookiesText", {
              cookieLink: () => <CookieSettingsLink className={inlineLink} />,
            })}
          </DocText>
          <div>
            <p className="text-meta mb-3 text-muted-foreground">
              {t("cookieTypesLabel")}
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {cookieTypes.map(([label, desc]) => (
                <li key={label} className="panel p-5">
                  <p className="text-[0.9375rem] font-semibold">
                    {label.replace(/:$/, "")}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "use",
      title: t("howUseTitle"),
      children: (
        <>
          <DocText>{t("howUseText")}</DocText>
          <DocList
            items={[
              t("provideWebsite"),
              t("improveExperience"),
              t("analyzeUsage"),
              t("rememberPreferences"),
              t("detectIssues"),
            ]}
          />
        </>
      ),
    },
    {
      id: "rights",
      title: t("yourRightsTitle"),
      children: (
        <>
          <DocText>{t("yourRightsText")}</DocText>
          <DocList
            items={[
              t("accessInfo"),
              t("correctInfo"),
              t("deleteInfo"),
              t("objectProcessing"),
              t("withdrawConsent"),
            ]}
          />
        </>
      ),
    },
    {
      id: "third-party",
      title: t("thirdPartyTitle"),
      children: <DocText>{t("thirdPartyText")}</DocText>,
    },
    {
      id: "retention",
      title: t("dataRetentionTitle"),
      children: <DocText>{t("dataRetentionText")}</DocText>,
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
        <div className="panel grid gap-5 p-6 md:p-8">
          <DocText>
            {t.rich("contactText", {
              contactLink: (chunks) => (
                <Link href="/contact" className={inlineLink}>
                  {chunks}
                </Link>
              ),
            })}
          </DocText>
          <Button
            accent="amber"
            href="/contact"
            className="w-full sm:w-auto sm:justify-self-start"
          >
            <Mail aria-hidden="true" className="h-4 w-4" />
            {t("contactTitle")}
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
