# listerineh.dev

Personal site of Sebastian Alvarez, a full-stack engineer working on applied AI. It shows the work (career, projects, skills), a bilingual technical blog with a newsletter, and `/why`, the music behind the username.

Built with Next.js 15 (App Router), React 18, TypeScript, Tailwind CSS 3 and `next-intl` (English and Spanish). The visual system is called **Lumen**: neutral grounds, rounded surfaces, one amber accent (`#D97706`) and spring motion. See [`DESIGN.md`](DESIGN.md) for tokens and rules and [`PRODUCT.md`](PRODUCT.md) for audience and purpose.

| Environment | Branch | URL |
|---|---|---|
| Production | `main` | [listerineh.dev](https://listerineh.dev) |
| Staging | `develop` | [listerineh.vercel.app](https://listerineh.vercel.app) |

---

## Quick start

Requires Node.js 18.18+ (developed on 22).

```bash
git clone https://github.com/listerineh/personal-portfolio.git
cd personal-portfolio
npm install
npm run dev          # http://localhost:9008 (webpack)
```

Create `.env.local` with the variables below. Locally you can leave most of them out: without Redis the view counters use memory and the rate limits are skipped; the email routes need `RESEND_API_KEY` to work.

| Variable | Used by |
|---|---|
| `RESEND_API_KEY` | Contact form, newsletter (subscribe, unsubscribe, blog notifications) |
| `NEWSLETTER_SECRET` | Required to send blog notifications (`Authorization: Bearer …`) and to sign unsubscribe links. Long random string; same value in Vercel, the GitHub secret and your shell when running `npm run notify-blog` |
| `REVALIDATE_SECRET` | `POST /api/revalidate` (called by the `revalidate-on-deploy` workflow) |
| `CRON_SECRET` | The weekly digest cron (`vercel.json`): Vercel sends it as `Authorization: Bearer …`. Without it the digest never runs |
| `OWNER_EMAIL` | Where contact messages and the weekly digest go (defaults to the address in `src/lib/email/layout.ts`) |
| `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN` (or `KV_REST_API_URL` / `KV_REST_API_TOKEN`) | Blog views and reactions, API rate limits |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, metadata, links in emails (defaults to `https://listerineh.dev`) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console verification meta |
| `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_HOTJAR_SCRIPT` | Analytics, loaded after the page is interactive (only if set) |

---

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on port 9008 (webpack) |
| `npm run dev:turbo` | Dev server with Turbopack on port 9006 |
| `npm run build` | Production build (`prebuild` bumps the service worker cache version) |
| `npm run build:prod` | Vercel build: SW version, Storybook build moved into `public/docs/components`, then `next build` |
| `npm start` | Serve the production build |
| `npm run lint` / `npm run typecheck` | ESLint (flat config) / `tsc --noEmit` |
| `npm run analyze` | Build with the bundle analyzer |
| `npm run storybook` / `npm run build-storybook` | Storybook on port 6006 / static build |
| `npm run test:setup`, `test` | Playwright: install browsers once, then run the suite (it starts the app on port 3001) |
| `npm run generate-og-images` | Share images into `public/og` and app icons into `public/icons` (see [`scripts/README.md`](scripts/README.md)) |
| `npm run generate-project-images` | Project product shots into `public/projects` |
| `npm run notify-blog` | Email a new post to subscribers (needs `NEWSLETTER_SECRET`) |
| `npm run convert-images` / `convert-heic` | Convert images in `public/` to WebP. **Deletes the originals**; see the scripts README before running |

---

## Pages

`/` home (hero, career, projects, skills, latest articles, contact) · `/about` · `/projects` and `/projects/[slug]` · `/skills` · `/blog` and `/blog/[slug]` · `/contact` · `/why` · `/privacy` · `/terms` · `/newsletter/confirm` · `/unsubscribe` · `/docs/components` (Storybook) · `/feed.xml` · `/sitemap.xml` · `/robots.txt`

`/experience` permanently redirects to `/#career` (the career section lists every role).

Error states: `src/app/not-found.tsx`, `error.tsx`, `global-error.tsx`, and `public/offline.html` (served by the service worker without a connection).

---

## Architecture

```
src/
├── app/                 Routes, API routes, root layout, globals.css (Lumen tokens)
├── components/
│   ├── ds/              Design system (Button, Section, PageHeader, ProjectCard, BlogCard, Carousel, RoleExplorer, …)
│   ├── sections/        Home sections and the /about content
│   ├── blog/ projects/ skills/ contact/   Page-level client components
│   ├── layout/          Header, footer, PageShell
│   ├── common/          Language switcher, cookie banner, schema.org, back-to-top, …
│   └── providers/       next-intl client provider
├── context/             Locale and theme contexts
├── i18n/                next-intl config, request config, client-side message loading
├── lib/
│   ├── data/            Static content: experiences, projects, skills, blog posts, music, home summaries
│   ├── email/           Every email the site sends: one Lumen layout (HTML + plain text) and the templates, EN/ES
│   ├── server/          API guards (rate limit, secrets, HTML escaping, signed subscribe/unsubscribe links)
│   └── metadata.ts      Every page's title, description, canonical, Open Graph and Twitter data
├── stories/             Storybook stories (+ support/mock-api.ts for the site's /api routes)
└── types/
messages/                en.json, es.json
public/                  og/ (share images), icons/, projects/, blog/, images/, sw.js, offline.html, manifest.json
scripts/                 Image generation, conversions, SW version, blog notifications
tests/                   Playwright suite
```

Decisions worth knowing before changing things:

- **Language lives in a cookie, not the URL.** `NEXT_LOCALE` picks the language on the server; the switcher changes it client-side on the same URL. The server sends only the visitor's messages; the other language loads on demand (`src/i18n/client-messages.ts`). Detail pages receive both language versions so the switch needs no reload. Trade-off: every page is rendered per request, and search engines (which send no cookie) only index English.
- **Server data is slimmed before it reaches the client.** Lists get summaries (`toBlogSummary`, `toBlogListing`, `src/lib/data/home.ts`), never full posts. Client components import `@/lib/data/<module>`, not the `@/lib/data` barrel.
- **Motion is opt-in.** A pre-paint script adds `html.js-motion` only when reduced motion is off; reveals, marquees and ambient light hang off that class, so content is visible without JS. GSAP is loaded only for the draggable hero cards (`CardStack`).
- **Metadata has one source.** Routes export `generateMetadata = metadataFor('<page>')` from `src/lib/metadata.ts`. Share images are PNG/JPG because WebP previews are unreliable on LinkedIn, iMessage and Slack.

---

## API routes

| Route | Access | Notes |
|---|---|---|
| `POST /api/send` | Public | Contact form. Validated with Zod, 5 per hour per IP |
| `POST /api/newsletter/subscribe` | Public | Double opt-in, step one: emails a signed confirmation link (7 days, HMAC with `NEWSLETTER_SECRET`) and adds nobody. Same answer whether or not the address is subscribed. 5 per hour per IP, 3 per day per address |
| `POST /api/newsletter/confirm` | Public | Step two, posted by `/newsletter/confirm` after a click: with a valid link, creates the contact (or re-activates one who had unsubscribed), sends the welcome email and schedules "three posts to start with" (the most read) for three days later; unsubscribing before then cancels it. 10 per hour per IP |
| `POST /api/newsletter/unsubscribe` | Public | Needs a signed link (`email` + `token`, HMAC with `NEWSLETTER_SECRET`); without one it emails a link, same answer whether or not the address is subscribed. Also accepts RFC 8058 one-click POSTs. 10 per hour per IP |
| `POST /api/newsletter/send-blog-notification` | `Bearer NEWSLETTER_SECRET` | Emails a new post to every subscribed contact, each with its own unsubscribe link and `List-Unsubscribe` headers |
| `POST /api/revalidate` | `Bearer REVALIDATE_SECRET` | On-demand revalidation of a path |
| `GET /api/cron/weekly-digest` | `Bearer CRON_SECRET` | Vercel Cron, Mondays 13:00 UTC (08:00 in Quito): emails the owner last week's subscribers, views, reactions, contact messages and CSP reports. `?dry=1` returns the JSON without sending |
| `GET/POST /api/blog/[slug]/views`, `/reactions` | Public | Redis counters, one per IP per hour (views) or day (reactions) |
| `GET /api/spotify/tracks?ids=` | Public | Spotify oEmbed metadata, up to 10 track ids |
| `POST /api/csp-report` | Public | CSP violation reports (`report-uri`; the route also accepts Reporting API batches), logged as `[csp]`. 30 per 10 minutes per IP, always `204` |

Every response carries `X-Content-Type-Options`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy` and HSTS (`next.config.ts`).

### Content Security Policy

Pages get a CSP with a fresh nonce per request (`src/middleware.ts`, policy in `src/lib/csp.ts`). The root layout puts the nonce on every inline or third-party script; Next.js adds it to its own. In production `script-src` is `'self' 'nonce-…' 'strict-dynamic'`, so anything those scripts load (Vercel Analytics, GA, Hotjar) is trusted and no script hosts are listed. Previews list the script hosts instead, because Vercel's comment toolbar doesn't support `'strict-dynamic'`; development adds `'unsafe-eval'`. API routes, static files and the Storybook build in `/docs/components` get no CSP.

Violations go to `POST /api/csp-report`, show up in the Vercel runtime logs as `[csp] {…}` (kept one hour on Hobby) and are counted by week for the Monday digest. **Adding a third-party script, iframe, image host or API?** Add its origin to the matching list in `src/lib/csp.ts`, or it will be blocked.

---

## Weekly counters

`src/lib/server/stats.ts` counts newsletter joins and leaves, contact messages and CSP reports per ISO week in Redis (`stats:<VERCEL_ENV>:<week>:…`, kept 10 weeks), so staging and previews never mix into production's numbers. Views and reactions are compared with the totals the previous digest saved. Blog view counters are shared by every environment.

## Caching and offline

| Path | `Cache-Control` |
|---|---|
| Pages | `private, no-cache, max-age=0, must-revalidate` (per-visitor language; `no-cache` keeps the back/forward cache) |
| `/_next/static/*` | `public, max-age=31536000, immutable` |
| `/images/*`, `/og/*`, `/icons/*`, `/blog/*.webp`, `/docs/components/*` | `public, max-age=86400, stale-while-revalidate=604800` |

The service worker (`public/sw.js`) serves pages network-first and keeps every page that loads, so visited pages open offline; static assets are cache-first; anything else falls back to `offline.html`. The cache name is bumped on every build.

---

## Design system and Storybook

Pages compose components from `src/components/ds` (import from `@/components/ds`). Tokens, type scale, radii, springs and the rules for using them are in [`DESIGN.md`](DESIGN.md). Every ds component has a story in `src/stories/`; the static build is served at `/docs/components`, with light/dark and EN/ES switches in the toolbar.

UI text goes in both `messages/en.json` and `messages/es.json`, including `aria-label`s.

---

## Content

| What | Where |
|---|---|
| Roles | `src/lib/data/experiences.ts` |
| Projects | `src/lib/data/projects.ts` (+ product shot via `npm run generate-project-images`, share image via `node scripts/generate-og-images.js projects`) |
| Skills | `src/lib/data/skills.ts`, categories in `skill-categories.ts` |
| Blog posts | One file per post in `src/lib/data/blog/` (cover in `public/blog/`), registered in `get-blog-posts.ts`. Related posts and previous/next are worked out from tags, text and dates (`src/lib/data/blog/related.ts`), nothing to set. The share image is drawn on demand at `/og/blog/<slug>.png` (title, byline, cover; `src/app/og/blog/[file]/route.tsx`), nothing to generate. Pushing a new post to `main` triggers the `notify-new-blog` workflow |
| Music | `src/lib/data/music.ts` |
| Page copy and metadata | `messages/*.json`, `src/lib/metadata.ts` |

### Adding a page

1. Create `src/app/<page>/page.tsx` and export `generateMetadata = metadataFor('<page>')` after adding the page to `PAGES` in `src/lib/metadata.ts`.
2. Build it from `PageShell`, `PageHeader` and ds components; put copy in both message files.
3. Add it to `src/app/sitemap.ts`, and to the header/footer navigation if it belongs there.
4. Add a template to `scripts/generate-og-images.js` and run `node scripts/generate-og-images.js <page>`.

---

## Testing

Playwright specs live in `tests/` (home sections, header, every page in both languages, and the contact/unsubscribe/search flows; see [`tests/README.md`](tests/README.md)). Run `npm run test:setup` once, then `npm run test`; Playwright starts the app on port 3001 itself. Vercel sets `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, so deploys never download browsers.

---

## Deployment

Vercel deploys `main` and `develop` with `npm run build:prod` (`vercel.json`). Set the environment variables above in the Vercel dashboard and add `NEWSLETTER_SECRET` and `REVALIDATE_SECRET` as GitHub Actions secrets for the workflows described in [`.github/workflows/README.md`](.github/workflows/README.md).

---

## License

MIT. Author: **Sebastian Alvarez** · [listerineh.dev](https://listerineh.dev) · [@listerineh](https://github.com/listerineh)
