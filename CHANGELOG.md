# Changelog

Versions are git tags (`vX.Y.Z`) on `main`. Earlier releases (`v2.1.0`, `v2.0.0`, `1.0.0`) predate this file.

## [Unreleased]

### Added
- First visits follow the browser's language (`Accept-Language`) instead of always English; a language picked with the switcher still wins. One `requestLocale()` replaces the cookie checks repeated in each page.
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
