# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

A balanced mix, none dominating the hierarchy:
- Hiring managers and recruiters (mostly US-based) evaluating a senior remote engineer.
- Founders or teams looking for someone to build a project end to end.
- Developers arriving from the blog, GDG Quito talks, or the newsletter.

## Product Purpose

Personal site of Sebastian Alvarez (listerineh.dev), a senior full-stack engineer from Quito, Ecuador. It shows who he is, what he has built, and how he thinks. Success means visitors explore the work (projects, blog, experience) and contact follows from that. Contact, CV download, and newsletter are secondary actions.

## Positioning

Full-stack senior engineer with an applied-AI focus: backend systems, cloud infrastructure, and React/Next.js interfaces, now applied to generative AI integration and AI agents (MCP) that automate real business workflows. 6+ years with US companies, tech lead experience, 3+ years organizing and speaking at GDG Quito.

## Operating Context

- Bilingual EN/ES (next-intl, `messages/en.json`, `messages/es.json`); both languages must stay coherent.
- Light and dark themes (`src/context/theme-context.tsx`).
- Technical blog with newsletter (Resend), reactions and view counts (Upstash/KV).
- Contact form, downloadable CV, Spotify-powered music showcase, `/why` storytelling page.

## Capabilities and Constraints

- Next.js 15 App Router, Tailwind 3, next-intl, Storybook for the design system in `src/components/ds`. Motion is CSS springs and scroll-driven animation; GSAP only for the draggable hero deck.
- All UI built from `src/components/ds`; no ad-hoc components outside it.
- Content (projects, posts, experience) must not change during the redesign. Exception approved on 2026-10-15: hero and metadata copy (EN+ES) may be rewritten toward "full-stack + applied AI".
- Responsive from 360px; loading, empty, and error states designed.

## Brand Commitments

- Name: Sebastian Alvarez. Domain and alias: listerineh.
- Music (alias Listerineh: lo-fi/electronic; plays guitar, bass, ukulele, piano) is a separate section (about, /why). The rest of the site is engineering-first.
- Must not read as AI-generated. Avoid: purple/blue/neon gradients, glassmorphism, generic centered hero, identical rounded card grids, unintentional system fonts, emoji icons, fade-up on everything, generic "crafting digital experiences" copy.

## Evidence on Hand

- Projects: `src/lib/data/projects.ts`. Blog posts: `src/lib/data/blog/*.ts`.
- Photos: `public/images/hero-photo.webp`, `sebas-playing.webp`, `sebas-playing-footer.webp`, `footer-photo.webp`. (`sebastian_alvarez_photo.webp` was removed by the owner; don't reintroduce a portrait in the hero.)
- Employer and community logos: Informat, Blue Express, Galileo Financial Technologies, ioet, GDG Quito (`public/images/*_logo.webp`).
- No testimonials, client metrics, or benchmarks exist; do not invent any.

## Product Principles

1. The work leads: every page should pull the visitor toward a project, post, or role.
2. Engineering credibility comes from specifics (real systems, real stacks), not adjectives.
3. Applied AI is the current edge, built on full-stack fundamentals, not a replacement for them.
4. Equal care in both languages and both themes.

## Accessibility & Inclusion

WCAG 2.2 AA: contrast in both themes, visible focus, `prefers-reduced-motion` respected by every animation (motion only under `html.js-motion`), a way to pause anything that keeps moving, and `<html lang>` that follows the language switch.
