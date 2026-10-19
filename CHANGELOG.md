# Changelog

Versions are git tags (`vX.Y.Z`) on `main`. Earlier releases (`v2.1.0`, `v2.0.0`, `1.0.0`) predate this file.

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
