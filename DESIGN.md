---
name: listerineh.dev
description: Sala — the portfolio of Sebastian Alvarez as an exhibition in numbered rooms.
colors:
  amber: "#D97706"
  amber-ink: "#92400E"
  amber-on-wall: "#F5B54A"
  ink-blue: "#1B2540"
  ink-blue-night: "#18213A"
  wall-paper: "#F8F6F2"
  wall-muted: "#C9D0E0"
  bone: "#EFECE6"
  bone-deep: "#D9DBD4"
  plaque: "#F8F6F2"
  ink: "#16181D"
  ink-muted: "#4F5360"
  hairline: "#C5C8BF"
  control-line: "#6E6A62"
  after-hours: "#12141A"
  after-hours-plaque: "#1A1D25"
  after-hours-ink: "#ECE9E2"
  after-hours-muted: "#A3A8B5"
  destructive: "#B42318"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 10.5vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.9
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(2rem, 8vw, 3.75rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.02em"
    fontVariation: "'wdth' 118"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 4.5vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.1
    fontVariation: "'wdth' 110"
  work:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.125rem, 2.4vw, 1.375rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1.6vw, 1.1875rem)"
    lineHeight: 1.55
  catalog:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.8125rem"
    fontWeight: 400
    lineHeight: 1.6
    fontFeature: "'tnum'"
rounded:
  none: "0px"
spacing:
  gutter-mobile: "16px"
  gutter-sm: "24px"
  gutter-md: "40px"
  gutter-lg: "64px"
  gutter-xl: "72px"
  module: "8px"
  room-y-mobile: "80px"
  room-y-desktop: "128px"
components:
  button-live:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 32px"
    height: "56px"
  button-ink:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bone}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  catalog-tag:
    backgroundColor: "transparent"
    textColor: "{colors.ink-muted}"
    typography: "{typography.catalog}"
    rounded: "{rounded.none}"
    padding: "0 10px"
    height: "28px"
  live-tag:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    typography: "{typography.catalog}"
    rounded: "{rounded.none}"
    height: "24px"
  plaque:
    backgroundColor: "{colors.plaque}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "24px"
  field:
    backgroundColor: "{colors.plaque}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "48px"
---

# Design System: listerineh.dev

## Overview

**Creative North Star: "Sala"**

The site is an exhibition in numbered rooms. Every page is a wall you face; every project hangs as a work in its mat frame with a paper plaque beside it and, where it helps, a working drawing of its stack. Sections are rooms on a single route (01 Work, 02 Writing, 03 Career, 04 Craft, 05 Contact), and one continuous line along the floor shows how far you have walked.

Two grounds carry the whole system: cool bone in light, gallery after hours in dark. Painted ink-blue walls own whole regions (the entrance, alternating rooms, the exit wall). Amber is the house's only signal and it means one thing: live now. Everything is square. Nothing is glass. Depth exists only as the shadow of the work you are facing.

The voice is engineering-first. Music has its own temporary exhibitions on /why and a quiet section on /about; it does not decorate the rest of the building.

**Key Characteristics:**
- Committed color: painted walls cover full sections; bone and plaques carry reading.
- One wide grotesk (Archivo) with a width axis: Expanded for wall titles, normal for text. Mono only for catalog data.
- Square corners everywhere; no gradients, glass, glow or emoji.
- Asymmetric 12-column hangs; rooms separated by deliberate empty wall.
- Springs, not easing curves; motion only on the works and the route.

## Colors

A restrained neutral ground, one painted wall color, and one signal.

### Primary
- **Live Amber** (#D97706): the only accent. Marks what is live now: current role, newest post, work in progress, current page in navigation, the walked part of the route, the single primary action of a wall. Used as fill with ink text (5.7:1) or as large type; never as small text on bone (2.56:1).
- **Amber Ink** (#92400E): small amber text on bone and plaques (5.7:1). Resolved automatically by `text-primary` in light.
- **Amber on Wall** (#F5B54A): small amber text on ink blue (8.4:1). Resolved automatically inside `.wall`.

### Secondary
- **Ink Blue** (#1B2540; night #18213A): painted walls. Re-scopes foreground, muted, amber and focus tokens for everything hung on it (`.wall`).

### Neutral
- **Bone** (#EFECE6): light ground.
- **Plaque Paper** (#F8F6F2): labels, framed mats, fields, notices (`.plaque`, which restores ground tokens wherever it hangs).
- **Ink** (#16181D): text, ink buttons, rules (15.1:1 on bone).
- **Ink Muted** (#4F5360): secondary text (6.1:1).
- **Wall Muted** (#C9D0E0): secondary text on ink blue (9.8:1).
- **Hairline** (#C5C8BF) decorative rules; **Control Line** (#6E6A62) field boundaries (≥3:1).
- **After Hours** (#12141A), **After Hours Plaque** (#1A1D25), **After Hours Ink** (#ECE9E2), **After Hours Muted** (#A3A8B5): the dark theme. Amber stays #D97706 (5.8:1 on the ground).

### Named Rules
**The Live Amber Rule.** Amber means "live now" and nothing else. If an element is not current, new, in progress, or the one primary action, it is ink.

**The Surface Rule.** Text on a foreground fill uses `text-surface` (the ground you are standing on), never a hard-coded background color, so inverted buttons work on bone, wall and plaque alike.

## Typography

**Display Font:** Archivo (wdth 125, Expanded) with system-ui
**Body Font:** Archivo (wdth 100) with system-ui
**Label/Mono Font:** JetBrains Mono, for catalog data only

**Character:** cut-vinyl wall titles and plain gallery labels from one family; the width axis does the work a second display face would.

### Hierarchy
- **Display** (800, clamp(2.25rem, 10.5vw, 6rem), 0.9): wall titles, one per page (`.text-display`).
- **Headline** (800, clamp(2rem, 8vw, 3.75rem), 0.95): room titles (`.text-display-sm`).
- **Title** (700, clamp(1.5rem, 4.5vw, 2.25rem), 1.1): subsections, featured works (`.text-subhead`).
- **Work** (700, clamp(1.125rem, 2.4vw, 1.375rem), 1.25): a work's or entry's title (`.text-headline`).
- **Lead** (400, ~1.125rem, 1.55): one-line intros under titles, max 56–60ch (`.text-lead`).
- **Body** (400, 1rem–1.0625rem, 1.6–1.7): reading, 68ch measure (`.prose-sala` for articles).
- **Catalog** (JetBrains Mono 400, 0.8125rem, 1.6, tabular): dates, stacks, numbers, counts (`.text-catalog`).

### Named Rules
**The Catalog Rule.** Mono is for data printed on a label: dates, stacks, catalog numbers. Never for headings, buttons or decoration.

**The No Eyebrow Rule.** No kicker above a heading. Room numbers sit beside the title as a light numeral, because they carry route information.

## Layout

Mobile-first from 360px. Gutter token `--gutter`: 16 → 24 (640) → 40 (768) → 64 (1024) → 72px (1440). Content max-width 1296px. Twelve columns from `md`/`lg`, a single column below.

Rooms (`Room`) pad 80px (mobile) to 128px (desktop) vertically and open with title + numeral on one baseline. Works hang off-grid on purpose: one large (8 cols) then two smaller (5 cols, the second offset down ~128px and started at col 8). Reading pages place the text column at cols 4–11 with a sticky table of contents in cols 1–3. Rhythm alternates bone and painted rooms; the footer is always a painted exit wall.

## Elevation & Depth

Flat by default. Depth is reserved for the work you are facing.

### Shadow Vocabulary
- **Hang** (`box-shadow: 0 28px 48px -24px rgb(10 14 12 / 0.45), 0 2px 6px rgb(10 14 12 / 0.12)`; dark uses higher alpha): a hung work under hover/focus, the entrance work, dialogs, toasts, the cookie notice.
- **Lift** (`box-shadow: 0 12px 24px -16px rgb(10 14 12 / 0.35)`): small prints and menus.

### Named Rules
**The Facing Rule.** Only the work in front of you casts a shadow. Containers never carry shadow and border together.

## Shapes

Every corner is square (`--radius: 0`). Frames are mats: a plaque-colored padding (8–12px) around the image. Lines are 1px hairlines for structure and 1.5px for controls. The only circle in the system is the logo mark.

## Components

### Buttons
- **Shape:** square (0px), min height 40/48/56px.
- **Live (amber):** amber fill, ink text; one per wall.
- **Ink:** foreground fill, `text-surface`.
- **Secondary:** 1.5px foreground border; hover inverts to foreground fill.
- **Ghost:** underlined text link, thickness 1 → 2px on hover.
- **Motion:** `active:scale(0.98)` on the snap spring; reduced motion removes it.

### Catalog tags (Pill) and filters (FilterTag)
- **Style:** mono, square, ruled (outline) or tinted (solid); amber solid only for live states.
- **Filters:** `aria-pressed`; pressed = ink fill with `text-surface`.

### Plaques and frames
- **Plaque:** flat paper, no border, 20–24px padding; resets tokens so it reads the same on any wall.
- **Work (ProjectCard):** framed image, then title, catalog line (number · stack), description, underlined action. Hover/focus: hang shadow and a 4px rise on the hang spring.

### Inputs / Fields
- **Style:** plaque background, 1px control line, square, min 48px.
- **Focus:** border to foreground plus the global 2px outline (ink on bone, amber on dark and walls).
- **Error:** destructive border with inset ring; message wired via `aria-describedby`, `role="alert"`.

### Navigation
- **Header:** solid ground, hairline below, mark + Archivo Expanded wordmark, current room as catalog text. The current page carries a 2px amber bar.
- **Mobile:** full painted-wall sheet with the site's rooms as numbered wall titles; Escape closes, focus is trapped and restored.

### Signature components
- **Room / PageHeader:** numbered room with route data attributes; page header is a painted wall.
- **RouteRail:** 4px line along the bottom edge; amber segment = progress, ticks = rooms.
- **WorkingDrawing:** a project's real tags sorted into stack layers as a ruled elevation.
- **Hang:** works settle once on the hang spring (stiffness 180, damping 18) when they enter view.
- **Exhibit:** a temporary exhibition (music) whose identity color is only a marker square and its platform link.

## Do's and Don'ts

### Do:
- **Do** paint whole sections ink blue and hang plaques on them; let `.wall` and `.plaque` handle contrast.
- **Do** use amber only for live state and the single primary action of a wall.
- **Do** set dates, stacks and counts in `.text-catalog`.
- **Do** hang works asymmetrically (8 / 5 / 5 offset) and leave empty wall between rooms.
- **Do** use springs from `src/lib/motion.ts` (`--spring-hang`, `--spring-snap`) and keep content visible without JS and under reduced motion.
- **Do** design every surface at 360px first.

### Don't:
- **Don't** use gradients, glassmorphism, backdrop blur, glows or neon.
- **Don't** round corners or build grids of identical rounded cards.
- **Don't** put a kicker or eyebrow above a heading.
- **Don't** use emoji or Unicode glyphs as icons; use lucide or the ds brand SVGs.
- **Don't** set small text in #D97706 on bone.
- **Don't** fade-up every section; only works and the route move.
