# Changelog

Versions are git tags (`vX.Y.Z`) on `main`. Earlier releases (`v2.1.0`, `v2.0.0`, `1.0.0`) predate this file.

## [Unreleased]

## [3.5.3] - 2026-10-25

### Added
- Blog post "When AI can clone your app" / "Cuando la IA puede clonar tu app": ArtCraft, REA and AI-driven reverse engineering, with sources.
- Blog covers drawn from HTML with the Lumen kit (`scripts/blog-covers`, `scripts/generate-blog-covers.js`): a short phrase and objects from each post's world, one cover per language (`<slug>.webp`, `<slug>.es.webp`).

### Changed
- Every post uses the new covers, replacing the AI-generated images (about 30 KB each instead of about 250 KB).

## [3.5.2] - 2026-10-24

### Fixed
- The "De la idea al Micro-SaaS" seed mirrors the talk in production: the owner's edited copy (without the case study and a few slides) restructured with the new material, 44 slides with a source under every figure. The 3.5.1 rework had only reached the seed, so production, which serves the stored copy, never showed it.

## [3.5.1] - 2026-10-24

### Added
- `/slides` follows the site's metadata pattern: it's in the page registry with its own title, description and keywords in both languages, and its own share card (`/og/slides.png`, from `scripts/generate-og-images.js`). Structured data: the listing is a `CollectionPage` of talks and each published deck a `PresentationDigitalDocument` with its PDF.
- Stats and statement slides can show where their figures come from (a citation under them, editable in the editor). The Git, Python and Firebase vs Supabase talks show their sources.
- The "De la idea al Micro-SaaS" talk reworked: the engineer's role shifting from writing code to architecture, deployment, costs and risk; a new module on security in the AI era (OWASP Top 10:2025, insecure AI-generated code, package hallucinations); the speaker's story; and a source under every figure.

### Changed
- A draft deck's share image is the talks card instead of the home one, and a deck's Open Graph locale matches the language it's shown in.

## [3.5.0] - 2026-10-23

### Added
- The "De la idea al Micro-SaaS" talk as a draft deck (`/slides/idea-micro-saas`) for a university talk on 11 November 2026, in Spanish and English: finding real problems, building with AI as a conductor, industry standards with a pipe head-loss case study (Python, FastAPI, Next.js), and the student Micro-SaaS, with a slide for professors in each module.

## [3.4.0] - 2026-10-23

### Added
- The "Firebase vs Supabase" talk as a draft deck (`/slides/firebase-vs-supabase`), grown from the GDG Quito Firebase talk and the blog post of the same name, updated to October 2026, in Spanish and English: what a BaaS is, each platform's model and features, a head-to-head comparison with pricing and Firebase SQL Connect, and how to choose.

## [3.3.0] - 2026-10-23

### Added
- The "Python tipado" talk as a draft deck (`/slides/python-typing`, [#88](https://github.com/listerineh/personal-portfolio/pull/88)), rebuilt from its Canva version and updated to Python 3.15, in Spanish and English: type systems, type hints from PEP 484 to 3.15, good practices and tools, Python against other languages, and a before/after example.

### Fixed
- The back button in a presentation returns to the `/slides` listing instead of the home page, and is labeled "Back to talks".

## [3.2.1] - 2026-10-23

### Fixed
- Saving a deck from the editor failed in production with "Firestore has already been initialized": Firestore is now configured with `initializeFirestore`, which is safe however many server chunks load it.

### Changed
- The e2e job runs on `ubuntu-24.04`: Playwright 1.58 can't install its browsers on `ubuntu-latest` now that it resolves to 26.04.

## [3.2.0] - 2026-10-23

### Added
- Talks at `/slides/<slug>` ([#83](https://github.com/listerineh/personal-portfolio/pull/83)): presentations in Lumen where only the accent changes per deck, drawn on a fixed 1920×1080 canvas from a closed set of 15 layouts (title, intro, section, statement, bullets, two columns, images, stats, quote, code, Mermaid diagram, embed, icon grid, closing) validated with zod. Keyboard and touch navigation, build steps, deep links, fullscreen, speaker notes kept out of the public page, and the site's light/dark theme.
- Bilingual decks: one deck with an optional translation into the other language (only the text that differs is stored); the viewer follows the site's EN/ES switch on the same URL.
- Owner-only editor at `/slides/<slug>/edit`: a form per layout with a live preview, drag-and-drop image upload (WebP, EXIF stripped), icon picker, gallery of layouts to add, per-language editing with translation progress, and versioned saves that refuse to overwrite a newer version. `/slides/manage` creates and deletes decks. Sign-in is Auth.js with GitHub, allowlisted to one account id. Needs `AUTH_SECRET`, `AUTH_GITHUB_ID`, `AUTH_GITHUB_SECRET` and `SLIDES_OWNER_GITHUB_ID`.
- Decks in Firestore and images and PDFs in Firebase Storage (server-only access, deny-all rules), with the last 20 versions kept. Without Firebase, decks come from the repo seeds.
- Code highlighted with shiki on the server, Mermaid diagrams rendered in the editor and stored as sanitized SVG, and embeds from an allowlist (YouTube, Vimeo, CodeSandbox, StackBlitz, Figma).
- PDF download per deck, version and language: headless Chromium prints `/slides/<slug>/print` and the file is cached in Storage.
- Talks on the home page and in a `/slides` listing, a Talks link in the header, mobile menu and footer, a share image per deck at `/og/slides/<slug>.png`, and published decks in the sitemap.
- The "Git, GitHub & GitFlow" talk as a draft, in Spanish and English.
- Design system: `Select`, `SegmentedControl`, `ImageDropzone`, `IconPicker`, `GalleryPicker` and `DeckCard`, each with a story.
- Kairo, the open-source iOS and Android task app, in the projects list (English and Spanish), with a product shot and a share image.

### Changed
- Node 22 is required (`engines`), for the Firebase Admin SDK; CI workflows moved to Node 22.
- Content Security Policy allows the GitHub sign-in form and the embed origins.

## [3.1.0] - 2026-10-20

### Changed
- Every blog post rewritten in English and Spanish in a more natural, first-person voice (no AI-style scaffolding), with new titles and excerpts. Factual errors fixed along the way (versions, dates, pricing, outdated snippets) and unverifiable claims removed.
- First visits follow the browser's language (`Accept-Language`) instead of always English; a language picked with the switcher still wins. One `requestLocale()` replaces the cookie checks repeated in each page.

### Fixed
- The new-post notification only fires when a post file is added. Editing existing posts or helper modules in `src/lib/data/blog` no longer emails every subscriber.

### Added
- Weekly digest for the owner (Vercel Cron, Mondays 08:00 Quito): subscribers, joins and leaves, views and reactions with the top posts, contact messages and CSP reports, from weekly counters in Redis. Needs `CRON_SECRET`.
- "Three posts to start with": three days after confirming, new subscribers get the most-read posts (scheduled with Resend, cancelled if they unsubscribe first).
- Newsletter double opt-in: subscribing emails a signed confirmation link (valid 7 days) and only `/newsletter/confirm` adds the contact, so nobody can sign up someone else's address. Per-address limit on confirmation emails. Fixes re-subscribing after unsubscribing (the contact stayed unsubscribed).
- Every email redesigned in Lumen on one shared layout with a plain-text version (`src/lib/email`): subscription confirmation, welcome, unsubscribe link, new post (now with the post's share card) and the contact form, which now sends from `hello@listerineh.dev` instead of Resend's test sender.
- After each article: the three most related posts (40% shared tags, 60% similar text, the same in both languages) instead of the latest three, and links to the previous and next post by date (`PostPager` in the design system, with a story).
- Share image per blog post with its title, byline and cover, drawn on demand by `next/og` at `/og/blog/<slug>.png` (Geist TTF in `src/assets/fonts`, cover converted with sharp, cached on the CDN by a versioned URL). Also used as the article's structured-data image.
- Content Security Policy on every page: per-request nonce, `'strict-dynamic'` in production, host list on previews (Vercel toolbar), violations reported to `/api/csp-report` and logged. Storybook, API routes and static files are excluded.
- Playwright: CSP header and nonce checks, and no violations on any page in either language.
- Pause control in the hero (WCAG 2.2.2): stops the card deck, the rotating words, the drifting halos and the looping dots. Per visit; hidden under reduced motion.
- `PauseButton` in the design system (with a story), now shared by the hero and the skills rows. `CardStack` and `RotatingWords` take a `paused` prop.
- Playwright: the hero pause is tested with motion on, using a fake clock.

### Removed
- `public/og/blog/*.jpg` and the `covers` step of `generate-og-images.js`: the blurred-cover share images the new cards replace.
- The `animate` prop on `Title`, `Text`, `SectionLabel` and `AccentCard`: it added a `reveal-up` class that no longer exists (scroll motion lives in `<Reveal>`).

## [3.0.0] - 2026-10-19

The whole site redesigned into **Lumen** ([#67](https://github.com/listerineh/personal-portfolio/pull/67)).

### Changed
- New visual system: neutral grounds, rounded surfaces, Geist, amber `#D97706` as the only accent, spring motion tied to scroll (see `DESIGN.md`).
- Home rebuilt: full-screen hero with a draggable deck of cards, then career, projects (carousel), skills (moving rows with a filter), latest articles and contact.
- Every inner page redesigned: about, projects and project detail, skills, blog and article, contact, why, privacy, terms, cookie dialog, error, 404 and offline pages.
- Blog listing shows every post at once (no lazy loading); search matches every word in any order.
- One metadata helper for all pages; new PNG/JPG share images in `public/og/`, app icons in `public/icons/`, updated manifest.
- Pages are `no-cache` instead of `no-store` (back/forward cache); `/og` and `/icons` are cacheable.
- Only the visitor's language ships to the browser; the other loads when switching.

### Added
- Newsletter unsubscribe through signed links, with RFC 8058 one-click headers in every email and a `NewsletterUnsubscribe` component reachable from the subscribe form and the footer.
- Pause control for the moving skill rows (WCAG 2.2.2).
- The service worker keeps visited pages for offline use.
- Security headers on every response; per-IP rate limits and server-side validation on public API routes.
- Playwright suite rewritten: home sections, header, every page in English and Spanish, contact/unsubscribe/search flows.

### Removed
- The `/experience` page. It now permanently redirects to `/#career`, where every role is listed.
- The old `public/images/*-og.webp` share images.

### Security
- Blog notification endpoint requires `NEWSLETTER_SECRET` (it was open), escapes its input and skips unsubscribed contacts.
- Next.js 15.5.28 (GHSA-2xp9-vwfh-vxw4 and cache poisoning advisories) and sharp 0.35.5.
- Unsubscribing requires proof of the mailbox (HMAC token) instead of just an address.

### Upgrade notes
- Set `NEWSLETTER_SECRET` in every Vercel environment and as a GitHub Actions secret. Without it, post notifications and unsubscribing are disabled by design.
