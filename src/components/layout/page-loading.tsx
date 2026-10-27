"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { PageSkeleton } from "@/components/ds";
import { PageShell } from "./page-shell";

/**
 * A route's loading state (its loading.tsx): the route's own components with placeholder data, drawn as a skeleton
 * (PageSkeleton). Next.js prefetches this shell for every link in view, so a click answers at once instead of waiting
 * on the server. `shell={false}` when the children already render the page shell.
 *
 * Only for moves within the site: on a full page load (server render and hydration) it draws nothing. Otherwise the
 * first HTML would carry a second header that React swaps out a moment after load, losing any click in between.
 */
export function PageLoading({
  children,
  shell = true,
}: {
  children: ReactNode;
  shell?: boolean;
}) {
  const t = useTranslations("common");
  if (
    typeof document === "undefined" ||
    !("hydrated" in document.documentElement.dataset)
  )
    return null;
  const skeleton = (
    <PageSkeleton label={t("loadingPage")}>{children}</PageSkeleton>
  );
  return shell ? <PageShell>{skeleton}</PageShell> : skeleton;
}
