"use client";

import { useTranslations } from "next-intl";
import { PageSkeleton } from "@/components/ds";
import { PageShell } from "./page-shell";

/**
 * A route's loading state (its loading.tsx): the header and footer stay, the page's place holds a skeleton. Next.js
 * prefetches this shell for every link in view, so a click answers at once instead of waiting on the server.
 *
 * Only for moves within the site: on a full page load (server render and hydration) it draws nothing. Otherwise the
 * first HTML would carry a second header that React swaps out a moment after load, losing any click in between.
 */
export function PageLoading() {
  const t = useTranslations("common");
  if (
    typeof document === "undefined" ||
    !("hydrated" in document.documentElement.dataset)
  )
    return null;
  return (
    <PageShell>
      <PageSkeleton label={t("loadingPage")} />
    </PageShell>
  );
}
