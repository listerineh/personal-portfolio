/**
 * Content Security Policy, built per request with a fresh nonce (src/middleware.ts).
 *
 * - production: nonce + 'strict-dynamic'. Only scripts carrying the nonce run, and whatever they load (Vercel
 *   Analytics, GA, Hotjar) inherits that trust, so no script hosts are listed.
 * - preview (develop staging, PR deploys): Vercel's comment toolbar is injected without a nonce and doesn't support
 *   'strict-dynamic', so previews list the script hosts instead.
 * - development: adds 'unsafe-eval' (React/Next dev tooling) and the local Storybook frame.
 *
 * `upgrade-insecure-requests` only goes out over HTTPS, so `next start` on http://localhost (CI) keeps working.
 *
 * Violations are reported to /api/csp-report, which logs them (Vercel runtime logs).
 */
export type CspMode = 'production' | 'preview' | 'development';

export const CSP_REPORT_PATH = '/api/csp-report';

const GOOGLE_ANALYTICS = ['https://www.googletagmanager.com', 'https://*.google-analytics.com', 'https://*.analytics.google.com'];
const HOTJAR = ['https://*.hotjar.com', 'https://*.hotjar.io', 'wss://*.hotjar.com'];
// Hotjar now runs on Contentsquare: its tag pulls code from t.contentsquare.net and reports to l.contentsquare.net.
// https://docs.contentsquare.com/en/web/content-security-policy/
const CONTENTSQUARE = ['https://*.contentsquare.net', 'https://*.contentsquare.com'];
// Skill icons render unoptimized straight from these CDNs (src/lib/data/skills.ts).
const ICON_CDNS = ['https://raw.githubusercontent.com', 'https://cdn.simpleicons.org', 'https://cdn.worldvectorlogo.com'];
// https://vercel.com/docs/vercel-toolbar/managing-toolbar#using-a-content-security-policy
const VERCEL_TOOLBAR = {
  script: ['https://vercel.live'],
  connect: ['https://vercel.live', 'wss://ws-us3.pusher.com'],
  img: ['https://vercel.live', 'https://vercel.com'],
  frame: ['https://vercel.live'],
  style: ['https://vercel.live'],
  font: ['https://vercel.live', 'https://assets.vercel.com'],
};

export function cspMode(): CspMode {
  if (process.env.NODE_ENV === 'development') return 'development';
  return process.env.VERCEL_ENV === 'preview' ? 'preview' : 'production';
}

export function buildCsp(nonce: string, { mode = cspMode(), https = true }: { mode?: CspMode; https?: boolean } = {}): string {
  const preview = mode === 'preview';
  const dev = mode === 'development';

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': [
      "'self'",
      `'nonce-${nonce}'`,
      ...(preview ? [...VERCEL_TOOLBAR.script, 'https://www.googletagmanager.com', 'https://*.hotjar.com', 'https://*.contentsquare.net'] : ["'strict-dynamic'"]),
      ...(dev ? ["'unsafe-eval'"] : []),
    ],
    // Inline styles are unavoidable (React style attributes in server HTML, next/font, Hotjar) and low risk.
    'style-src': ["'self'", "'unsafe-inline'", ...(preview ? VERCEL_TOOLBAR.style : [])],
    'img-src': ["'self'", 'data:', 'blob:', ...ICON_CDNS, ...GOOGLE_ANALYTICS, 'https://*.hotjar.com', 'https://*.contentsquare.net', ...(preview ? VERCEL_TOOLBAR.img : [])],
    'font-src': ["'self'", 'data:', 'https://*.hotjar.com', ...(preview ? VERCEL_TOOLBAR.font : [])],
    'connect-src': ["'self'", ...GOOGLE_ANALYTICS, ...HOTJAR, ...CONTENTSQUARE, ...(preview ? VERCEL_TOOLBAR.connect : []), ...(dev ? ['ws:'] : [])],
    // The /why video, Hotjar's widget frame, and /docs/components (Storybook, same origin; local server in dev).
    'frame-src': ["'self'", 'https://www.youtube.com', 'https://vars.hotjar.com', ...(preview ? VERCEL_TOOLBAR.frame : []), ...(dev ? ['http://localhost:6006'] : [])],
    'worker-src': ["'self'"],
    'manifest-src': ["'self'"],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"],
    'frame-ancestors': ["'self'"],
    // report-uri only: with `report-to` present Chrome switches to the Reporting API, which batches and delays
    // delivery (and some embedded Chromiums never send). report-uri posts right away in every browser.
    'report-uri': [CSP_REPORT_PATH],
  };

  const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(' ')}`);
  if (https) policy.push('upgrade-insecure-requests');
  return policy.join('; ');
}
