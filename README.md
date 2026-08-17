# 🚀 Personal Portfolio — listerineh.dev

✨ A modern, high-performance personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features a custom design system, GSAP-powered animations with parallax effects, bilingual (EN/ES) support via `next-intl`, a full technical blog with newsletter, dedicated Experience/Skills/Contact pages, Spotify-powered music showcases, and a `/why` storytelling page.

---

## 🌍 Deployment

Deployed on Vercel with automatic CI/CD.

| Environment | Branch | URL |
|-------------|--------|-----|
| Production  | `main` | [listerineh.dev](https://listerineh.dev) |
| Staging     | `develop` | [listerineh.vercel.app](https://listerineh.vercel.app) |

---

## 🛠 Tech Stack

### 🔧 Core

| Technology | Description |
|------------|-------------|
| ![Next.js](https://img.shields.io/badge/-Next.js_15-000000?logo=next.js) | App Router, Server Components, SSG/ISR |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript) | Strict mode throughout |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css) | Utility-first, CSS variables for theming |
| ![React](https://img.shields.io/badge/-React_18-61DAFB?logo=react) | Client/server component split |
| ![next-intl](https://img.shields.io/badge/-next--intl-7C3AED) | EN/ES internationalization |

### 🎨 UI & Animations

- **GSAP + ScrollTrigger** — parallax effects, `reveal-up`/`reveal-stagger` scroll animations, timeline sequences
- **Custom Design System** (`src/components/ds/`) — see [Design System](#-design-system-srccomponentsds) below
- **Storybook** — Component documentation and development environment at `/docs/components`
- **shadcn/ui** (`src/components/ui/`) — accessible primitives (Radix UI based)
- **Lucide** — icon set

### 📦 Key Dependencies

- **Resend** — email API for the contact form and newsletter
- **Zod + React Hook Form** — schema validation and form state
- **Sharp** — image processing (WebP conversion, OG image compositing)
- **Playwright** (dev only) — E2E test suite (`tests/`) and headless Chromium rendering for OG/project image generation scripts
- **Vercel Analytics / Speed Insights** — web analytics and performance monitoring
- **@upstash/redis / @vercel/kv** — blog view counters and reaction storage
- **react-markdown / remark-gfm / rehype-*** — markdown rendering for blog posts

### 🛠 Development Tools

- **Turbopack** — fast dev server (port 9006)
- **ESLint** — linting
- **Storybook** — isolated component development

---

## ✨ Features

| Category | Details |
|----------|---------|
| **🌍 Internationalization** | Full EN/ES support via `next-intl`; language switcher in header |
| **🎭 Theme** | Dark/light mode with CSS variable theming; curtain-effect toggle; mode-adaptive component colors |
| **🎬 Animations** | GSAP parallax on hero, footer, and `/why` backgrounds; `reveal-up` scroll entrances; stagger grids; hover micro-interactions |
| **📝 Blog** | Markdown blog with SSG; tag filtering via pills; search; sort (recommended/most-viewed/date); reading time; view counters; reactions; newsletter subscription (Resend); blog post notification via GitHub Actions |
| **💼 Experience** | Homepage teaser (latest 3 roles) + dedicated `/experience` page with a full CV-style timeline |
| **🧰 Skills** | Homepage animated marquee + dedicated `/skills` page with technologies grouped by category (languages, frontend, backend, mobile, database, AI, DevOps, testing, tools, management), each filterable via pills and multi-category tagging |
| **📧 Contact** | Homepage teaser CTA + dedicated `/contact` page with a two-column layout (contact info/socials + form) |
| **🎵 Music (`/why`)** | Spotify top-tracks widget with multi-platform links (Spotify, YouTube, Apple Music, SoundCloud) per track |
| **📱 Homepage Sections** | Hero · Experience (preview) · Skills (preview) · Projects (preview) · Blog (preview) · Contact (teaser) |
| **🎨 Component Library** | Storybook documentation at `/docs/components` with interactive examples and theme switching |
| **📄 Pages** | `/` Homepage · `/about` · `/experience` · `/skills` · `/projects` · `/projects/[slug]` · `/blog` · `/blog/[slug]` · `/contact` · `/why` · `/privacy` · `/terms` · `/docs/components` |
| **🚀 Performance** | WebP images · SSG/ISR · font optimization · code splitting · smart caching · Service Worker |
| **♿ Accessibility** | Skip-to-content link · `aria` labels · reduced-motion support throughout GSAP hooks |
| **🔍 SEO** | Per-page metadata (OpenGraph/Twitter cards), custom OG images per page, `sitemap.xml`, `robots.ts`, JSON-LD structured data |

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+

### Installation

```bash
git clone https://github.com/listerineh/personal-portfolio.git
cd personal-portfolio
npm install
```

### Environment Variables

Create `.env.local`:

```bash
# Contact form / email
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com

# Newsletter
NEWSLETTER_FROM=newsletter@yourdomain.com

# Storage (blog view counters / reactions)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# SEO
GOOGLE_SITE_VERIFICATION=your_google_site_verification_code

# Cache revalidation (used by the revalidate-on-deploy GitHub Action)
REVALIDATE_SECRET=your_revalidate_secret

# App
NEXT_PUBLIC_SITE_URL=http://localhost:9006
```

### Run

```bash
npm run dev        # http://localhost:9006
```

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with Turbopack on port 9006 |
| `npm run build` | Production build (runs `prebuild` → bumps Service Worker version) |
| `npm run build:prod` | Full production build: bumps SW version, builds Storybook, moves it into `public/docs`, then `next build` — used as the Vercel build command |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run analyze` | Build with the bundle analyzer enabled |
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build Storybook for production |
| `npm run test:setup` | Install Playwright browsers (only if not already cached) |
| `npm run test` | Run the Playwright E2E suite (`tests/`) |
| `npm run test:ui` / `test:debug` / `test:report` | Playwright UI mode, debug mode, and HTML report |
| `npm run convert-images` | Batch convert JPEG/PNG → WebP in `/public` |
| `npm run convert-heic` | Convert HEIC → WebP |
| `npm run generate-og-images` | Render per-page Open Graph images via headless Chromium (Playwright + Sharp) |
| `npm run generate-project-images` | Render project showcase screenshots |
| `npm run notify-blog` | Send a blog notification to subscribers |
| `npm run update-sw` | Bump Service Worker cache version |

> See `scripts/README.md` for detailed usage of each script.

> **Note:** `playwright` (the browser-download package) lives in `devDependencies` and is only needed for the local test suite and image-generation scripts — it's never invoked during `next build`. Vercel sets `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` (see `vercel.json`) so browser binaries aren't downloaded on every deploy.

---

## 🔄 Cache Strategy

**HTTP Headers** (`next.config.ts`):

| Path | Strategy |
|------|----------|
| `/:path*` (HTML) | `max-age=0, must-revalidate` — always fresh |
| `/images/`, `/blog/*.webp` | `max-age=3600, stale-while-revalidate=86400` |
| `/_next/static/` | `max-age=31536000, immutable` |

**Service Worker** (`public/sw.js`):
- Cache-first strategy for offline support
- Auto-bumped version on every `npm run build` via the `prebuild` script

**On-demand revalidation:**
- `POST /api/revalidate` — triggered by the `revalidate-on-deploy` GitHub Action after every production deploy to refresh ISR pages and recent blog posts

---

## 📁 Project Structure

```
personal-portfolio/
├── public/
│   ├── images/              # Site images, per-page OG images (home-og.webp, blog-og.webp, experience-og.webp, skills-og.webp, contact-og.webp, why-og.webp, etc.)
│   ├── blog/                # Blog post images
│   ├── projects/            # Project screenshots
│   ├── docs/                # Storybook static build (served at /docs/components) + downloadable resume PDF
│   └── sw.js                # Service Worker
├── scripts/
│   ├── generate-og-images.js       # Playwright + Sharp OG image renderer (all pages)
│   ├── generate-project-images.js  # Project screenshot renderer
│   ├── convert-images-to-webp.js
│   ├── convert-heic-to-webp.js
│   ├── send-blog-notification.js
│   ├── extract-blog-data.js
│   ├── setup-playwright.js
│   ├── update-sw-version.js
│   ├── move-storybook.js
│   └── README.md
├── tests/                    # Playwright E2E suite (rendering + action specs per page/section)
├── .storybook/
│   ├── main.ts               # Storybook configuration
│   └── preview.tsx           # Storybook preview with theme integration
├── messages/
│   ├── en.json                # English translations
│   └── es.json                # Spanish translations
├── src/
│   ├── app/
│   │   ├── about/            # /about page
│   │   ├── api/               # API routes (contact, newsletter, blog views/reactions, revalidate, spotify, etc.)
│   │   ├── blog/               # /blog list + /blog/[slug] detail
│   │   ├── contact/            # /contact page
│   │   ├── docs/                # /docs/components (Storybook)
│   │   ├── experience/          # /experience page
│   │   ├── projects/            # /projects list + /projects/[slug] detail
│   │   ├── skills/               # /skills page
│   │   ├── feed.xml/              # RSS feed
│   │   ├── privacy/                # /privacy page
│   │   ├── terms/                   # /terms page
│   │   ├── why/                      # /why storytelling page
│   │   ├── globals.css                # CSS variables (light/dark themes)
│   │   ├── layout.tsx                  # Root layout with providers
│   │   ├── page.tsx                     # Homepage
│   │   ├── robots.ts                     # robots.txt
│   │   └── sitemap.ts                     # sitemap.xml
│   ├── components/
│   │   ├── blog/              # Blog-specific components (BlogSearch, NewsletterSubscribe, TableOfContents, etc.)
│   │   ├── common/             # Shared UI (ThemeToggle, LanguageSwitcher, CookieSettings, etc.)
│   │   ├── contact/             # /contact page client component
│   │   ├── ds/                    # Custom Design System — see below
│   │   ├── email/                  # Email templates (React Email)
│   │   ├── experience/              # /experience page client component
│   │   ├── layout/                   # Header + Footer layout components
│   │   ├── projects/                  # /projects listing + detail client components
│   │   ├── providers/                  # React context providers wrapper
│   │   ├── sections/                    # Homepage sections (Hero, Experience, Skills, Projects, Blog preview, Contact)
│   │   ├── skills/                       # /skills page client component
│   │   └── ui/                            # shadcn/ui primitives (do NOT add DS components here)
│   ├── context/               # ThemeContext, LocaleContext
│   ├── hooks/                  # useGSAP, useScrollTrigger, useIsMobile, useHashScroll, use-toast, etc.
│   ├── i18n/                    # next-intl config (`config.ts`, `request.ts`) — messages live in `/messages`
│   ├── lib/
│   │   ├── data/                  # Static data: experiences.ts, projects.ts, skills.ts, blog/, music.ts, navigation.ts, hero.ts
│   │   ├── metadata.ts              # Shared SEO metadata helper (used by /about, /why, /privacy, /terms, home)
│   │   ├── i18n-data.ts               # getLocalizedData() helper for locale-aware static data
│   │   ├── performance.ts              # supportsAnimations, isLowEndDevice, prefersReducedMotion
│   │   └── utils.ts                     # cn() and general helpers
│   ├── stories/                # Storybook stories mirroring `components/ds` and other shared components
│   └── types/                   # Shared TypeScript types (Experience, Project, BlogPost, Skill, SkillCategory, etc.)
├── .env.local                # Environment variables (not in git)
├── vercel.json                # Vercel build command + build-time env overrides
├── next.config.ts              # Next.js config + cache headers
├── tailwind.config.ts           # Tailwind config
└── tsconfig.json
```

---

## 📚 Storybook

Storybook is used for component development and documentation. It provides an interactive environment to develop and test UI components in isolation.

### Running Storybook

```bash
npm run storybook          # Start dev server on http://localhost:6006
npm run build-storybook    # Build for production
```

### Theme Integration

Storybook is integrated with the app's theme system. Use the theme switcher in the Storybook toolbar to toggle between light and dark modes.

### Stories Location

Stories are organized in `src/stories/`, mirroring the structure of `src/components/`.

### Production Deployment

Storybook is built as part of `npm run build:prod` (moved into `public/docs` by `scripts/move-storybook.js`) and served at `/docs/components`. A dedicated GitHub Action (`deploy-storybook.yml`) also verifies the Storybook build on pushes that touch component/story files.

---

## 🧪 Testing

End-to-end tests live in `tests/` and use Playwright, organized by page/section with two layers per area:

- **Rendering specs** (`*.rendering.spec.ts`) — verify elements, layout, and visual state
- **Action specs** (`*.actions.spec.ts`) — verify interactions, form submissions, and navigation

```bash
npm run test:setup   # one-time: installs Playwright browsers locally
npm run test:server  # runs the app on port 3001 for the test suite
npm run test         # run the full suite (in another terminal)
npm run test:ui      # interactive UI mode
```

> Playwright browser binaries are **not** downloaded during `npm install` in deployment environments — `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1` is set in `vercel.json` to keep production builds fast. Run `npm run test:setup` locally before running tests for the first time.

---

## 🎨 Design System (`src/components/ds/`)

The project uses a hand-crafted design system. Components are theme-aware via the `useTheme` hook and/or Tailwind `dark:` variants depending on the component.

| Component | Notes |
|-----------|-------|
| `Button` | `variant`: primary/secondary/ghost · `accent`: amber/indigo/green/neutral · `size` · `href`/`external` · `gradient` |
| `Input` / `Textarea` / `FormField` | Form primitives with `accent` + validation error states |
| `Pill` | `variant`: solid/outline · `accent` · `color` (hex override) |
| `Title` / `Text` / `SectionLabel` | Typography primitives · `gradient`/`accent`/`strength` · `animate` (adds `reveal-up` class) |
| `AccentCard` | Bordered card with accent tint (used across Experience/Skills/Contact pages) |
| `MemberCard` | Band/team member card (used on `/why`) |
| `ExperienceCard` | Job entry card with expandable responsibilities |
| `ProjectCard` / `BlogCard` | Listing cards for `/projects` and `/blog` |
| `BrandLink` | Social/platform link pill (solid or outline) |
| `SpotifyTopTracks` | Fetches track metadata via `/api/spotify/tracks` and renders per-track platform buttons (Spotify/YouTube/Apple Music/SoundCloud) |
| `SpotifyIcon` / `YoutubeIcon` / `AppleMusicIcon` / `SoundcloudIcon` / `InstagramIcon` | Brand icons; `SpotifyIcon` supports a `base` (fixed brand colors) mode and a `currentColor`-driven mode |
| `Modal` / `Dropdown` / `Switch` / `Toaster` | Radix-based interactive primitives styled to match the DS |

> Import from `@/components/ds`. Never add DS components to `src/components/ui/` (that folder is reserved for shadcn/ui primitives).

---

## 🌐 Internationalization

Translations live in `messages/en.json` and `messages/es.json`, loaded via `next-intl` (configured in `src/i18n/`). The `LanguageSwitcher` component in the header lets users toggle between locales; the selected locale is persisted via the `NEXT_LOCALE` cookie and used for locale-aware metadata and static data (see `getLocalizedData()` in `src/lib/i18n-data.ts`).

---

## 🔄 Customization Guide

### Personal Information

Edit files in `src/lib/data/`:

| File | Content |
|------|---------|
| `experiences.ts` | Work history (`experiencesData`, `getExperiences(locale)`) |
| `projects.ts` | Project showcase (`projectsData`, `getProjects(locale)`) |
| `skills.ts` | Technologies, grouped by `category` (`getSkillsByCategory()`) — a skill can belong to multiple categories |
| `navigation.ts` | Social links and community links |
| `blog/` | Blog posts (one file per post, registered in `get-blog-posts.ts`) |
| `music.ts` | Music project links, including per-track Spotify/YouTube/Apple Music/SoundCloud URLs (`musicLinks`) |

Also update translations in `messages/en.json` and `messages/es.json` for hero copy, section labels, page titles/descriptions, etc.

### Theme Colors

CSS variables in `src/app/globals.css` — separate `:root` (light) and `.dark` blocks. Key variables:

```css
--background, --foreground, --primary, --primary-light, --accent
--why-background, --why-foreground   /* /why page */
--wm-indigo, --wm-amber, --wm-green  /* section watermarks */
```

Text selection color (`::selection`) is tied to `--primary` (brand amber), not `--accent`.

### Blog Posts

Add a new `.ts` file to `src/lib/data/blog/` following the existing post schema, then export it from `get-blog-posts.ts`. Run `npm run notify-blog` to notify subscribers, or let the `notify-new-blog` GitHub Action handle it automatically on push to `main`.

### Adding Animations

Use the `animate` prop on `Title`, `Text`, `SectionLabel` DS components to add the `reveal-up` class. The homepage and `/why` page scan for `.reveal-up`/`.reveal-stagger` elements and animate them on scroll; standalone listing pages (`/projects`, `/blog`, `/experience`, `/skills`, `/contact`) animate specific refs directly with `useGSAP` instead.

### Adding a New Page

1. Create `src/app/<page>/page.tsx` with `generateMetadata()` (title/description/OpenGraph/Twitter/canonical/robots) + JSON-LD structured data — follow `src/app/experience/page.tsx` or `src/app/skills/page.tsx` as a template.
2. Build the page UI in a client component under `src/components/<page>/`.
3. Add the route to `src/app/sitemap.ts`.
4. Add a template function to `scripts/generate-og-images.js` and run `node scripts/generate-og-images.js <page>` to generate its OG image.
5. Link to it from `Header`/`Footer` nav (`src/components/layout/`) if it should appear in navigation.

---

## 🚀 Deployment

1. Push to `main` (production) or `develop` (staging)
2. Vercel auto-deploys both branches using the build command in `vercel.json` (`npm run build:prod`)
3. Set environment variables in the Vercel dashboard (same keys as `.env.local`)
4. After a production deploy, the `revalidate-on-deploy` GitHub Action refreshes ISR caches for key routes

---

## 📝 License

MIT — feel free to adapt for your own portfolio.

---

## 👨‍💻 Author

**Sebastian Alvarez**  
[listerineh.dev](https://listerineh.dev) · [@listerineh](https://github.com/listerineh)

---

⭐ If this helped you, a star is appreciated!
