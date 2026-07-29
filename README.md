# 🚀 Personal Portfolio — listerineh.dev

✨ A modern, high-performance personal portfolio built with Next.js 15, TypeScript, and Tailwind CSS. Features a custom design system, GSAP-powered animations with parallax effects, bilingual (EN/ES) support via `next-intl`, a full technical blog with newsletter, and a `/why` storytelling page.

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
| ![Next.js](https://img.shields.io/badge/-Next.js_15-000000?logo=next.js) | App Router, Server Components, SSG |
| ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript) | Strict mode throughout |
| ![Tailwind CSS](https://img.shields.io/badge/-Tailwind_CSS-38B2AC?logo=tailwind-css) | Utility-first, CSS variables for theming |
| ![React](https://img.shields.io/badge/-React_19-61DAFB?logo=react) | Client/server component split |
| ![next-intl](https://img.shields.io/badge/-next--intl-7C3AED) | EN/ES internationalization |

### 🎨 UI & Animations

- **GSAP + ScrollTrigger** — parallax effects, `reveal-up`/`reveal-stagger` scroll animations, timeline sequences
- **Custom Design System** (`src/components/ds/`) — `Button`, `Input`, `Pill`, `Title`, `Text`, `SectionLabel`, `AccentCard`, `MemberCard`
- **Storybook** — Component documentation and development environment at `/docs/components`
- **shadcn/ui** (`src/components/ui/`) — accessible primitives (Radix UI based)
- **Lucide** — icon set

### 📦 Key Dependencies

- **Resend** — email API for contact form and newsletter
- **Zod** — schema validation
- **Sharp** — image processing (WebP conversion)
- **Vercel Analytics** — web analytics
- **gray-matter / remark** — markdown processing for blog

### 🛠 Development Tools

- **Turbopack** — fast dev server (port 9002)
- **ESLint + Prettier** — linting and formatting

---

## ✨ Features

| Category | Details |
|----------|---------|
| **🌍 Internationalization** | Full EN/ES support via `next-intl`; language switcher in header |
| **🎭 Theme** | Dark/light mode with CSS variable theming; curtain-effect toggle; mode-adaptive component colors |
| **🎬 Animations** | GSAP parallax on hero, footer, and `/why` backgrounds; `reveal-up` scroll entrances; stagger grids; hover micro-interactions |
| **📝 Blog** | Markdown blog with SSG; tag filtering; reading time; newsletter subscription (Resend); blog post notification via GitHub Actions |
| **📱 Homepage Sections** | Hero · Experience · Skills · Projects · Blog preview · Contact |
| **🎨 Component Library** | Storybook documentation at `/docs/components` with interactive examples and theme switching |
| **📄 Pages** | `/` Homepage · `/about` · `/blog` · `/blog/[slug]` · `/why` · `/privacy` · `/terms` · `/docs/components` |
| **🚀 Performance** | WebP images · SSG · font optimization · code splitting · Lighthouse 95+ · smart caching |
| **♿ Accessibility** | Skip-to-content link · `aria` labels · reduced-motion support throughout GSAP hooks |

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
# Contact form
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=noreply@yourdomain.com
EMAIL_TO=your@email.com

# Newsletter
NEWSLETTER_FROM=newsletter@yourdomain.com

# App
NEXT_PUBLIC_SITE_URL=http://localhost:9002
```

### Run

```bash
npm run dev        # http://localhost:9002
```

---

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server with Turbopack on port 9002 |
| `npm run build` | Production build (also runs `update-sw`) |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript type check |
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build Storybook for production |
| `npm run convert-images` | Batch convert JPEG/PNG → WebP in `/public` |
| `npm run convert-heic` | Convert HEIC → WebP |
| `npm run notify-blog` | Send blog notification to subscribers |
| `npm run update-sw` | Bump Service Worker cache version |

> See `scripts/README.md` for detailed usage of each script.

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
- Auto-bumped version on every `npm run build` via `update-sw` script

---

## 📁 Project Structure

```
personal-portfolio/
├── public/
│   ├── images/              # Site images (hero-photo.webp, footer-photo.webp, etc.)
│   ├── blog/                # Blog post images
│   ├── projects/            # Project screenshots
│   ├── docs/                # Downloadable resume PDF
│   └── sw.js                # Service Worker
├── scripts/
│   ├── convert-images-to-webp.js
│   ├── convert-heic-to-webp.js
│   ├── send-blog-notification.js
│   ├── update-sw-version.js
│   └── README.md
├── .storybook/
│   ├── main.ts              # Storybook configuration
│   └── preview.tsx          # Storybook preview with theme integration
├── src/
│   ├── app/
│   │   ├── about/           # /about page
│   │   ├── api/             # API routes (contact, newsletter, etc.)
│   │   ├── blog/            # /blog list + /blog/[slug] detail
│   │   ├── docs/            # /docs/components (Storybook)
│   │   ├── feed.xml/        # RSS feed
│   │   ├── privacy/         # /privacy page
│   │   ├── terms/           # /terms page
│   │   ├── why/             # /why storytelling page
│   │   ├── globals.css      # CSS variables (light/dark themes)
│   │   ├── layout.tsx       # Root layout with providers
│   │   ├── page.tsx         # Homepage
│   │   ├── robots.ts        # robots.txt
│   │   └── sitemap.ts       # sitemap.xml
│   ├── components/
│   │   ├── blog/            # Blog-specific components (PostCard, NewsletterSubscribe, etc.)
│   │   ├── common/          # Shared UI (Header, Footer, ThemeToggle, LanguageSwitcher, etc.)
│   │   ├── ds/              # Custom Design System (Button, Input, Pill, Title, Text, AccentCard…)
│   │   ├── email/           # Email templates (React Email)
│   │   ├── layout/          # Header + Footer layout components
│   │   ├── providers/       # React context providers wrapper
│   │   ├── sections/        # Homepage sections (Hero, Experience, Skills, Projects, Blog, Contact)
│   │   └── ui/              # shadcn/ui primitives (do NOT add DS components here)
│   ├── context/             # ThemeContext, LocaleContext
│   ├── hooks/               # useGSAP, useScrollTrigger, useIsMobile, useHashScroll, etc.
│   ├── i18n/                # next-intl config + locale message files (en.json, es.json)
│   ├── lib/
│   │   ├── data/            # Static data (experience, projects, skills, blog posts, social links)
│   │   ├── gsap-animations.ts  # Reusable GSAP utilities (parallaxEffect, staggerFadeIn, etc.)
│   │   ├── metadata.ts      # SEO metadata helpers
│   │   ├── performance.ts   # supportsAnimations, isLowEndDevice, prefersReducedMotion
│   │   └── utils.ts         # cn() and general helpers
│   ├── stories/             # Storybook stories
│   │   ├── blog/            # Blog component stories
│   │   ├── common/          # Common component stories
│   │   ├── ds/              # Design System component stories
│   │   └── Introduction.stories.tsx  # Design system documentation
│   └── types/               # Shared TypeScript types
├── .env.local               # Environment variables (not in git)
├── next.config.ts           # Next.js config + cache headers
├── tailwind.config.ts       # Tailwind config
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

Stories are organized in `src/stories/`:
- `ds/` — Design System component stories
- `blog/` — Blog-specific component stories
- `common/` — Shared UI component stories
- `Introduction.stories.tsx` — Design system documentation homepage

### Production Deployment

Storybook is automatically deployed to `/docs/components` via GitHub Actions when changes are pushed to `main` or `develop` branches.

---

## 🎨 Design System (`src/components/ds/`)

The project uses a hand-crafted design system. All components use inline styles + `useTheme` (not `dark:` Tailwind prefix) for theme-aware rendering.

| Component | Props |
|-----------|-------|
| `Button` | `variant`: primary/secondary/ghost · `accent`: amber/indigo/green/neutral · `size` · `href` · `gradient` |
| `Input` | `accent` · `error` · `forceDark` (for always-dark contexts like footer) |
| `Pill` | `variant`: solid/outline · `accent` · `color` (hex override) |
| `Title` | `as` · `gradient`: amber/indigo/green · `animate` (adds `reveal-up` class) |
| `Text` | `strength`: primary/secondary/accent/muted · `accent` · `animate` |
| `SectionLabel` | `accent` · `animate` |
| `AccentCard` | Bordered card with accent tint |

> Import from `@/components/ds`. Never add DS components to `src/components/ui/`.

---

## 🌐 Internationalization

Translations live in `src/i18n/` as `en.json` and `es.json`. The `LanguageSwitcher` component in the header lets users toggle between locales. All page content and section copy is translated.

---

## 🔄 Customization Guide

### Personal Information

Edit files in `src/lib/data/`:

| File | Content |
|------|---------|
| `experience.ts` | Work history |
| `projects.ts` | Project showcase |
| `skills.ts` | Skills & technologies |
| `social.ts` | Social media links |
| `blog/` | Blog posts (one file per post) |
| `music.ts` | Music project links |

Also update translations in `src/i18n/en.json` and `src/i18n/es.json` for hero copy, section labels, etc.

### Theme Colors

CSS variables in `src/app/globals.css` — separate `:root` (light) and `.dark` blocks. Key variables:

```css
--background, --foreground, --primary, --accent
--why-background, --why-foreground   /* /why page */
--wm-indigo, --wm-amber, --wm-green  /* section watermarks */
```

### Blog Posts

Add a new `.ts` file to `src/lib/data/blog/` following the existing post schema, then export it from the index. Run `npm run notify-blog` to notify subscribers.

### Adding Animations

Use `animate` prop on `Title`, `Text`, `SectionLabel` DS components to add the `reveal-up` class. The homepage and `/why` page automatically initialize scroll-triggered entrance animations for these elements.

---

## 🚀 Deployment

1. Push to `main` (production) or `develop` (staging)
2. Vercel auto-deploys both branches
3. Set environment variables in Vercel dashboard (same keys as `.env.local`)

---

## 📝 License

MIT — feel free to adapt for your own portfolio.

---

## 👨‍💻 Author

**Sebastian Alvarez**  
[listerineh.dev](https://listerineh.dev) · [@listerineh](https://github.com/listerineh)

---

⭐ If this helped you, a star is appreciated!
