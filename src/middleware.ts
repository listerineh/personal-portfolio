import { NextResponse, type NextRequest } from "next/server";
import { buildCsp } from "@/lib/csp";
import { PRE_PAINT_SCRIPT, scriptHash } from "@/lib/inline-scripts";
import { negotiateLocale } from "@/i18n/negotiate";

/** The owner's slides area: rendered per request (sign-in), so it keeps a nonce-based policy. */
const OWNER_ROUTE = /^\/slides\/(?:manage|[^/]+\/edit)(?:\/|$)/;

let prePaintHash: Promise<string> | undefined;

/**
 * Serves each page in the visitor's language and sets its Content Security Policy.
 *
 * Language: URLs carry no locale. The request is rewritten to the `[locale]` segment picked from the NEXT_LOCALE cookie
 * (the switcher), else Accept-Language, else English, so both languages can be prerendered and cached per URL.
 *
 * CSP: public pages get the static policy (src/lib/csp.ts). Owner routes get a fresh nonce; Next.js reads it from the
 * request's CSP header and puts it on its own scripts, and the layout's inline script is allowed by hash.
 */
export async function middleware(request: NextRequest) {
  const { pathname, protocol } = request.nextUrl;
  const locale = negotiateLocale(
    request.cookies.get("NEXT_LOCALE")?.value,
    request.headers.get("accept-language"),
  );
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  const https = protocol === "https:";

  if (OWNER_ROUTE.test(pathname)) {
    prePaintHash ??= scriptHash(PRE_PAINT_SCRIPT);
    const csp = buildCsp({
      nonce: btoa(crypto.randomUUID()),
      hashes: [await prePaintHash],
      https,
    });
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("Content-Security-Policy", csp);
    const response = NextResponse.rewrite(url, {
      request: { headers: requestHeaders },
    });
    response.headers.set("Content-Security-Policy", csp);
    return response;
  }

  const response = NextResponse.rewrite(url);
  response.headers.set("Content-Security-Policy", buildCsp({ https }));
  return response;
}

export const config = {
  // Pages only (prefetches included, so they reach the same [locale] page): not API routes, Next's assets, Vercel's
  // scripts or files (sw.js, offline.html, images, feed.xml, share cards, the static Storybook build).
  matcher: ["/((?!api|_next/static|_next/image|_vercel|.*\\..*).*)"],
};
