---
name: listerineh.dev
description: Lumen — the portfolio of Sebastian Alvarez. Quiet neutral grounds, rounded surfaces, one warm accent, spring motion tied to scroll.
colors:
  amber: "#D97706"
  amber-ink: "#A84B0A"
  amber-ink-night: "#E8890C"
  ground: "#FFFFFF"
  tint: "#F5F5F7"
  panel-on-plain: "#F5F5F7"
  panel-on-tint: "#FFFFFF"
  ink: "#1D1D1F"
  ink-muted: "#6E6E73"
  hairline: "#D2D2D7"
  control-line: "#86868B"
  night-ground: "#000000"
  night-tint: "#161617"
  night-panel: "#1C1C1E"
  night-panel-on-tint: "#242426"
  night-ink: "#F5F5F7"
  night-muted: "#A1A1A6"
  night-hairline: "#38383A"
  destructive: "#D70015"
typography:
  display:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 11vw, 6.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.045em"
  section:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(2rem, 6.5vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.038em"
  subhead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.375rem, 3.4vw, 1.875rem)"
    fontWeight: 650
    lineHeight: 1.15
    letterSpacing: "-0.028em"
  headline:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2vw, 1.3125rem)"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.018em"
  lead:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.8vw, 1.25rem)"
    lineHeight: 1.5
    letterSpacing: "-0.012em"
  meta:
    fontFamily: "Geist, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 500
    lineHeight: 1.5
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
rounded:
  sm: "10px"
  md: "14px"
  lg: "22px"
  xl: "30px"
  full: "9999px"
spacing:
  gutter: "20px → 28px (sm) → 48px (lg) → 64px (1440)"
  content: "1200px"
  section: "96px / 128px / 160px (phone / md / lg)"
  header: "52px / 56px (lg)"
motion:
  snap: "critically damped, response 0.35s (514ms settle) — UI feedback"
  glide: "critically damped, response 0.55s (808ms settle) — content settling"
  bounce: "damping 0.8, response 0.45s (606ms) — only after a gesture carried momentum"
---

# Lumen

## Overview

The site of a full-stack engineer with an applied-AI focus. It should read as calm, precise and quietly confident: Apple-like restraint (neutral grounds, generous space, rounded surfaces, type that tightens as it grows) with one warm accent and motion that feels physical. Minimal, never boring: the interest comes from motion tied to scroll, ambient light, and content presented as interactive objects (a deck, a carousel, a role explorer, drifting skill rows), not from decoration.

Mobile first: about half the visitors are on phones. Every pattern starts at 360px.

## Colors

- **Grounds:** plain `#FFFFFF` and tint `#F5F5F7` alternate down the page; in dark, `#000000` and `#161617`. Sections are told apart by ground, not by rules.
- **Panels** (`.panel`): `#F5F5F7` on plain, `#FFFFFF` on tint (the `.tint` class re-scopes `--card`), `#1C1C1E` / `#242426` in dark. Radius 22px.
- **Ink** `#1D1D1F` (16.8:1), **muted** `#6E6E73` (5.1:1 on white, 4.7:1 on tint). Dark: `#F5F5F7` / `#A1A1A6`.
- **Amber `#D97706`** is the only accent: the primary action, what is live (in-progress dot, current role, new post), active and selected states, focus rings. As a fill it carries ink text (5.3:1). Small amber text uses `text-primary`, which resolves to `#A84B0A` in light and `#E8890C` in dark (AA on every surface).
- Music projects on /why keep their identity colors, used only as a dot, a faint glow and their platform links.

## Typography

One family, **Geist**, with tracking that tightens as size grows and leading that shrinks with it (`.text-display`, `.text-display-sm`, `.text-subhead`, `.text-headline`, `.text-lead`, `.text-meta`). Weight carries hierarchy. **Geist Mono only for code.** Two-tone headlines (a line in ink, the next in muted) are the signature move for page titles.

## Layout

12-column grid inside a 1200px column with the gutter token (`px-gutter`). Sections: `py-24 md:py-32 lg:py-40`, title → content `mt-12 md:mt-16 lg:mt-20`. The hero fills the first screen (`min-h-[100svh]`). Inner pages share `PageHeader`: on desktop the title and intro share a row. Reading pages: 760px text column, sticky TOC on the left.

## Elevation & Depth

Flat by default. `shadow-card` for resting lifted things (selected tabs, logo discs, chips on panels); `shadow-float` for what floats or is hovered (cards on hover, dialogs, toasts, the back-to-top button). The header is a translucent material (`.material`: 72% ground + blur + saturate) with a hairline that appears only once content scrolls under it; `prefers-reduced-transparency` makes it solid.

## Shapes

Rounded everywhere: 10 / 14 / 22 / 30px, buttons and tags fully round. Logos sit on white discs (they are drawn for white). Images get `rounded-xl` and no mats.

## Motion

Springs, never fixed easing curves: `duration-snap ease-snap` for feedback, `duration-glide ease-glide` for content, `duration-bounce ease-bounce` only after a press or flick. Patterns:

- **Intro** (`data-intro`, staggered by `--i`): the first screen comes into focus once (rise + blur → sharp).
- **Reveal** (`<Reveal>`): content rises in as it enters; scroll-driven (`animation-timeline: view()`) where supported, IntersectionObserver + spring elsewhere.
- **Ambient** (`<Ambient>`): drifting warm halos, a fading dot grid, an amber spotlight under the pointer. Hero full, other sections soft or grid-only; mirrored on neighbours.
- **Interactive objects:** `CardStack` (deck with pointer parallax that deals itself; the front card can be grabbed and thrown), `RotatingWords`, `Carousel` (native snap, arrows, dots), `RoleExplorer` (tabs pattern), `Marquee` (two rows, opposite directions, pauses on hover and focus, plus a pause button where it is used: WCAG 2.2.2).
- **Drag:** the only GSAP in the site is Draggable + Inertia for the hero deck, imported on demand inside `CardStack`. A gentle release springs home, a throw sends the card to the back. Touch drags horizontally only so the page still scrolls.
- **Pause (WCAG 2.2.2):** anything that keeps moving on its own gets a `PauseButton`. The skills rows have one; the hero has one that stops the deck, the rotating words and every CSS loop inside it (`data-motion-paused` on the section pauses all animations below it except the one-off intro). Per visit, not remembered.
- Everything is gated on `html.js-motion` (set pre-paint only when JS runs and reduced motion is off). Reduced motion gets still content, never hidden content.

## Components

All in `src/components/ds`, each with a story in `src/stories/ds`:

| Need | Component |
|---|---|
| Page section (title, intro, aside, tone, ambient, bleed) | `Section` |
| Top of an inner page | `PageHeader` (`nav`, `ambient`, `titleSize`) |
| Full-width band / rounded surface | `Band`, `Panel` |
| Ambient light | `Ambient` (`intensity`, `grid`, `spotlight`, `halos`, `mirror`) |
| Scroll-in motion | `Reveal` |
| Actions | `Button` (pill; `accent="amber"` = the brand action; `secondary` gray pill; `ghost` link) |
| Tag, filter, search | `Pill`, `FilterTag`, `SearchField` |
| Fields | `FormField` + `Input` / `Textarea` (page ground on panels, amber focus ring) |
| Project | `ProjectCard` (one status pill style for all statuses; dot color differs) |
| Post | `BlogCard` (`feature`, `stack`, `row`, `compact`) |
| Previous / next post | `PostPager` |
| Roles | `RoleExplorer` |
| Shelf of cards | `Carousel` |
| Skills | `Marquee` + `SkillTile` |
| Stop motion (WCAG 2.2.2) | `PauseButton` |
| Hero | `CardStack`, `RotatingWords` (both take `paused`) |
| Architecture | `StackList` |
| Music project (/why) | `Exhibit`, `MemberCard`, `SpotifyTopTracks`, `BrandLink` |
| Feedback | `Toaster`, `Modal`, `Dropdown`, `Switch`, `EntrySkeleton`, `EndOfList` |

## Do's and Don'ts

- **Do** alternate plain and tint grounds; let panels change fill with the ground.
- **Do** keep amber for the one primary action per view and for live/selected states.
- **Do** present content as something to interact with (explore, swipe, filter), not as a static grid of identical cards.
- **Do** give every motion a reduced-motion equivalent and keep content visible without JS.
- **Don't** use mono outside code, neon or glow effects, text gradients, emoji as icons, or square corners.
- **Don't** add a second accent color, or a rule/border where a change of ground would do.
- **Don't** import the `@/lib/data` barrel (or `skills.ts`) in client components; pass slim data from the server.
