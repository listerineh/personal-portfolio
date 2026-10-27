/**
 * Content Security Policy, set on every page by src/middleware.ts. Two policies:
 *
 * - public pages (no nonce): statically rendered and cached, so they can't carry a per-request nonce. Scripts come
 *   from this origin, inline (the layout's pre-paint script, Next.js's page data) or the listed hosts (GA, Hotjar).
 * - owner routes (a fresh nonce): production uses nonce + 'strict-dynamic', so only scripts carrying the nonce (or
 *   the layout's inline scripts, by hash) run, and whatever they load inherits that trust. Previews list the script
 *   hosts instead, since Vercel's comment toolbar is injected without a nonce and doesn't support 'strict-dynamic'.
 * - development: adds 'unsafe-eval' (React/Next dev tooling) and the local Storybook frame.
 *
 * `upgrade-insecure-requests` only goes out over HTTPS, so `next start` on http://localhost (CI) keeps working.
 *
 * Violations are reported to /api/csp-report, which logs them (Vercel runtime logs).
 */
import { EMBED_ORIGINS } from '@/features/slides/embeds';

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

const SCRIPT_HOSTS = ['https://www.googletagmanager.com', 'https://*.hotjar.com', 'https://*.contentsquare.net'];

interface CspOptions {
  /** Owner routes only: a fresh per-request nonce. Without one, the public (static) policy. */
  nonce?: string;
  /** With a nonce: 'sha256-…' sources for the layout's inline scripts (src/lib/inline-scripts.ts). */
  hashes?: string[];
  mode?: CspMode;
  https?: boolean;
}

export function buildCsp({ nonce, hashes = [], mode = cspMode(), https = true }: CspOptions = {}): string {
  const preview = mode === 'preview';
  const dev = mode === 'development';
  const scripts = nonce
    ? [`'nonce-${nonce}'`, ...hashes, ...(preview ? [...VERCEL_TOOLBAR.script, ...SCRIPT_HOSTS] : ["'strict-dynamic'"])]
    : ["'unsafe-inline'", ...SCRIPT_HOSTS, ...(preview ? VERCEL_TOOLBAR.script : [])];

  const directives: Record<string, string[]> = {
    'default-src': ["'self'"],
    'script-src': ["'self'", ...scripts, ...(dev ? ["'unsafe-eval'"] : [])],
    // Inline styles are unavoidable (React style attributes in server HTML, next/font, Hotjar) and low risk.
    'style-src': ["'self'", "'unsafe-inline'", ...(preview ? VERCEL_TOOLBAR.style : [])],
    'img-src': ["'self'", 'data:', 'blob:', ...ICON_CDNS, ...GOOGLE_ANALYTICS, 'https://*.hotjar.com', 'https://*.contentsquare.net', ...(preview ? VERCEL_TOOLBAR.img : [])],
    'font-src': ["'self'", 'data:', 'https://*.hotjar.com', ...(preview ? VERCEL_TOOLBAR.font : [])],
    'connect-src': ["'self'", ...GOOGLE_ANALYTICS, ...HOTJAR, ...CONTENTSQUARE, ...(preview ? VERCEL_TOOLBAR.connect : []), ...(dev ? ['ws:'] : [])],
    // The /why video, slide embeds, Hotjar's widget frame, and /docs/components (Storybook, same origin; local server in dev).
    'frame-src': ["'self'", 'https://www.youtube.com', ...EMBED_ORIGINS, 'https://vars.hotjar.com', ...(preview ? VERCEL_TOOLBAR.frame : []), ...(dev ? ['http://localhost:6006'] : [])],
    'worker-src': ["'self'"],
    'manifest-src': ["'self'"],
    'media-src': ["'self'"],
    'object-src': ["'none'"],
    'base-uri': ["'self'"],
    // The owner's GitHub sign-in posts here and is redirected to GitHub, which form-action also governs (Chrome).
    'form-action': ["'self'", 'https://github.com'],
    'frame-ancestors': ["'self'"],
    // report-uri only: with `report-to` present Chrome switches to the Reporting API, which batches and delays
    // delivery (and some embedded Chromiums never send). report-uri posts right away in every browser.
    'report-uri': [CSP_REPORT_PATH],
  };

  const policy = Object.entries(directives).map(([name, values]) => `${name} ${values.join(' ')}`);
  if (https) policy.push('upgrade-insecure-requests');
  return policy.join('; ');
}
