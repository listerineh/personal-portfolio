"use client";

import { usePathname } from "next/navigation";
import { locales } from "@/i18n/config";

const LOCALE_PREFIX = new RegExp(`^/(?:${locales.join("|")})(?=/|$)`);

/**
 * The pathname visitors see. Pages live under app/[locale] (src/middleware.ts rewrites /blog to /es/blog), and a
 * prerendered page only knows its internal path, so the language is stripped: /es/blog -> /blog, /es -> /. Use it
 * instead of usePathname for anything rendered, or the server and browser disagree and hydration fails.
 */
export function useSitePathname(): string {
  return usePathname().replace(LOCALE_PREFIX, "") || "/";
}
