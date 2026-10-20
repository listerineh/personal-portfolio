import { NextResponse, type NextRequest } from 'next/server';
import { buildCsp, CSP_REPORT_PATH } from '@/lib/csp';

/**
 * Sets the Content Security Policy on every page with a fresh nonce. Next.js reads the nonce from the request's CSP
 * header and puts it on its own scripts; the root layout reads `x-nonce` for ours. Pages are already rendered per
 * request (language cookie), so nonces cost no caching.
 */
export function middleware(request: NextRequest) {
  const nonce = btoa(crypto.randomUUID());
  const csp = buildCsp(nonce, { https: request.nextUrl.protocol === 'https:' });

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('Content-Security-Policy', csp);
  // Endpoint named by `report-to csp` (Reporting API); `report-uri` covers browsers without it.
  response.headers.set('Reporting-Endpoints', `csp="${new URL(CSP_REPORT_PATH, request.nextUrl.origin)}"`);
  return response;
}

export const config = {
  matcher: [
    {
      // Pages only: not API routes, Next's assets, Vercel's scripts, files (sw.js, offline.html, images, feed.xml…)
      // or the static Storybook build in /docs/components, which keeps the other security headers but no CSP.
      source: '/((?!api|_next/static|_next/image|_vercel|docs/components|.*\\..*).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
