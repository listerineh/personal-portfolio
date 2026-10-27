"use client";

import { useSyncExternalStore, type ReactNode } from "react";
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
 * useSyncExternalStore makes that call hydration-safe: React uses the server value (false) while it hydrates, even
 * when a page's boundary hydrates after the rest of the app, and the client value (true) for a fresh render.
 */
const subscribe = () => () => {};

export function PageLoading({
  children,
  shell = true,
}: {
  children: ReactNode;
  shell?: boolean;
}) {
  const t = useTranslations("common");
  const clientRender = useSyncExternalStore(subscribe, () => true, () => false);
  if (!clientRender) return null;
  const skeleton = (
    <PageSkeleton label={t("loadingPage")}>{children}</PageSkeleton>
  );
  return shell ? <PageShell>{skeleton}</PageShell> : skeleton;
}
