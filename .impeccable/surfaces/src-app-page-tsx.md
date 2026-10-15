---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/components/layout/header.tsx","src/components/layout/footer.tsx"]
---

# Surface brief: home (and site shell)

Scope: home (`src/app/page.tsx`) plus the shared shell (header, footer) that every route inherits. Visitor mode: Experience. The work leads from the first viewport.

Audience: a balanced mix of hiring managers, founders, and developers (see PRODUCT.md). About half arrive on mobile, so mobile-first from the first commit: every composition is designed at 360px first and expanded upward.

Action: explore the work (projects, posts, roles). Contact, CV, and newsletter are secondary.

Constraints: primary color stays amber #D97706 (user decision, 2026-10-15). Content unchanged except hero and metadata copy, which may move to "full-stack + applied AI". Music lives only in about and /why.

## Direction contract

THESIS: The site is an exhibition in numbered rooms. Each project hangs as a work with its label and its working drawing. It refuses the badge + headline + two CTAs hero and the grid of identical rounded cards.

OWN-WORLD: Painted gallery-green walls (#1F4A3A light, #183A2E dark) over cool plaster (#E6E7E2) or after-hours ground (#121513). Amber #D97706 is law, not decoration: it marks only what is live now (current role, latest post, available, current room on the route) and is used as fill or large type. Small amber text on light ground uses amber-ink #92400E for AA. Wall titles are cut-vinyl Archivo Expanded. Labels are flat paper plaques (#F3F3EF) in Archivo, with catalog numbers in JetBrains Mono. Square corners. No glass, no gradients. Only the work you are facing casts a shadow. Everything snaps to a strict modular grid (4px base, 8px rhythm, 12 columns at desktop and 4 at mobile).

STORY: The visitor learns who Sebastian is in one wall title, sees a real recent work immediately, and walks the rooms (Obra, Escritos, Trayectoria, Oficio, Contacto) along one continuous route line. They believe it through the specifics on each label and drawing, not through adjectives.

FIRST VIEWPORT: Mobile (360–430px): the green wall fills the screen. At the top, the room number "SALA 01" in amber mono and the name as a two-line wall title (about 14vw). Below it, one line of role (full-stack + applied AI). Then the latest project hangs full width, edge to edge minus the 16px gutter, with its plaque below it at the bottom of the viewport. The route line is a 4px rail pinned to the bottom edge showing the current room. Desktop: the name spans columns 1–7, the room number is large at the right, the work hangs on columns 1–7 below, and the plaque and working drawing sit on columns 8–12. The route line runs along the floor strip. The primary action ("Recorrer la obra"/"Walk the work") is the plaque's link into the room.

FORM: Exhibition hang (museum installation: painted walls, vinyl, object labels, floor route). Position 6 of 7 on the grounded list, assigned by the roll; the user chose it. seed: none (unavailable)
Raises: amber reserved for one meaning (vu-meter bridge). Strict module grid, nothing off-grid (CRT arcade). Handled things have weight: a work settles on a damped spring, and only the work in front of you casts a shadow (leather studio). Every work hangs beside its working drawing of architecture and stack (desert sign program). Rooms are separated by deliberate voids of bare wall (cloud quarry). One continuous route line connects every room and is the progress indicator (neon circuit).
Signature interaction: the route line. As you scroll, the amber segment advances along the rail and the current room's number swaps with a spring. Works settle with a damped spring (stiffness ~170, damping ~26) when they enter. Reduced motion: final states, no spring, the rail still updates.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
