"use client";

import { useTranslations } from "next-intl";
import { PageSkeleton } from "@/components/ds";
import { PageShell } from "./page-shell";

/**
 * A route's loading state (its loading.tsx): the header and footer stay, the page's place holds a skeleton. Next.js
 * prefetches this shell for every link in view, so a click answers at once instead of waiting on the server.
 */
export function PageLoading() {
  const t = useTranslations("common");
  return (
    <PageShell>
      <PageSkeleton label={t("loadingPage")} />
    </PageShell>
  );
}
