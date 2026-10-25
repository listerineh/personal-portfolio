import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const visualLanguageDesignSystems: Record<Locale, BlogPost> = {
  en: {
    slug: 'visual-language-design-systems',
    title: 'Your Portfolio Speaks Before You Do: Design Language and Design Systems',
    date: 'July 24, 2026',
    excerpt: 'Chefs say we eat with our eyes first, and portfolios work the same way. Typography, mockups, UI/UX basics, component libraries and the technical decisions that make a redesign easy, with my own as the example.',
    imageUrl: '/blog/visual-language-design-systems.webp',
    imageAiHint: 'split composition showing design system evolution: left side shows chaotic, cartoon-style colorful web interface with mismatched fonts and inconsistent colors; right side shows sleek dark professional portfolio with amber accent color, consistent typography, amber design tokens, component library cards; center shows design tokens and a color palette going from scattered to organized; abstract concept of chef plating food elegantly on one side and developer arranging UI components with the same care on the other; professional tech illustration with warm amber and dark tones',
    content: `
There's an old line in cooking that chefs repeat a lot: we eat with our eyes first.

Before you taste anything, before the waiter describes the dish, before you even pick up a fork, you see the plate. How it's composed, the colors, the empty space, how precise it is. All of that tells you something about the kitchen. A carefully plated dish says someone cared. A sloppy one says the opposite.

A personal portfolio works the same way. A recruiter, a potential client or a CTO looking for a senior engineer has seen hundreds of them. Within a few seconds of landing on yours they've already formed an opinion, and it isn't about your skills yet. It's about how professional you seem.

This post is about that first impression: what creates it, why it matters so much for a portfolio, how to build it on purpose with a design system, and what I learned redesigning mine from scratch.

## Two restaurants

Picture two places you could go for dinner tonight.

The first has mismatched chairs, a menu set in three different fonts, staff in whatever they happened to wear, and plates that look thrown together. The food might be great, but you're already a bit unsure.

The second has a clear look: dark wood, warm light, a menu with a consistent palette, staff dressed alike, food plated with obvious intent. You haven't tasted anything and you already trust them.

That's visual language: the sum of every design choice, deliberate or not, that tells people who you are and how you work.

For a portfolio that technical recruiters, engineering managers and clients will see, this matters a lot. These are people who judge attention to detail for a living. They notice when something is off, even if they can't say exactly what. Your design language doesn't just make the site look nice. It shows how you think about problems, how you handle complexity and how much you care about what you ship.

## Design language vs design system

A design language is the set of visual rules that decide how everything in your interface looks and behaves:

- **Typography:** which fonts, at what sizes, with what weight hierarchy
- **Color:** primary, secondary, neutrals and semantic colors (error, success, warning)
- **Spacing:** consistent rhythm between elements, padding scales, grids
- **Motion:** how things animate, how fast, with which easing
- **Tone:** the personality the design gives off (minimal, bold, playful, serious)

When those are consistent and deliberate, the interface feels coherent. When they aren't, it feels amateur, even if every individual component is well built.

A design system is how you implement that language in code: the component library, the design tokens, the documented patterns and the shared rules that keep things consistent as the project grows. If the design language is knowing the recipe, the design system is having a professional kitchen to cook it in every night.

## Typography tells a story

Of all the design decisions in a portfolio, typography is both the most underrated and the one with the biggest effect. Most developers pick a font quickly and move on. That's a mistake, because fonts have personality.

A geometric sans like Unbounded reads as precise and technical. A neo-grotesque like Inter feels neutral and professional. A serif like Playfair Display brings an editorial warmth. Pick the wrong one and the site sends a mixed message before anyone reads a word.

### Why there are so many

Typefaces were made for very different jobs (newspapers, signage, advertising) and they carry those personalities into screens today. The categories that matter for a portfolio:

- **Display / headlines:** lots of personality, used big. Unbounded, Space Grotesk, Cabinet Grotesk. These set your brand's character.
- **Body / reading:** built for small sizes. Outfit, Inter, DM Sans. They should disappear into the text.
- **Monospace:** for code. JetBrains Mono, Geist Mono.

### Choosing and pairing

The rule that works almost every time: pair a display font with personality with a neutral, readable body font. Let the headline carry the character and let the body carry the words.

When I wrote this, the site used Unbounded for headlines and Outfit for body text. Unbounded is geometric and bold, technical but modern. Outfit has a generous x-height and gets out of the way in long posts. Together they gave a clear hierarchy without fighting each other.

A few practical notes: two families at most, because more is noise. Test readability at real body size, around 15 to 16px with a line height of 1.6 to 1.7. And use \`next/font/google\` so the fonts are self-hosted and don't cause layout shift.

Oliver Reichenstein once argued that web design is 95% typography. It's an exaggeration, but not by much. Get it right first.

## Before you write code: mockups and flows

The workflow mistake I see most in developer portfolios is jumping straight into code with no visual plan. The design then evolves at random: each new section has slightly different spacing, headings don't match in size, hover states don't match anything.

The best investment you can make before building is a mockup. It doesn't have to be pixel-perfect, but some visual plan, even rough wireframes, forces decisions that are much cheaper in a design tool than in code.

There are three levels. Wireframes are low-fidelity structure, boxes and labels, answering "what goes where?". Mockups are high-fidelity static screens with real colors, fonts and spacing, answering "what does it actually look like?". Prototypes are interactive flows with transitions, answering "how does someone move through this?". For a portfolio, wireframes and mockups are the minimum; prototypes are worth it for complex interactions like navigation drawers or multi-step forms.

Then map the flows, meaning how people move between screens and states. For a portfolio the important ones are: from the hero into the sections (what pulls the eye down the page?), from a project card into its detail page, from the blog list into a post and then related posts, and how navigation works on mobile. Drawing these first saves you from finding out three weeks in that your navigation makes no sense on a 375px screen.

The tools I use: Figma, the industry standard and free for solo work, for design, prototyping and inspecting in one place. Whimsical for quick wireframes and flow diagrams before committing to Figma-level detail. And Mobbin, a collection of UI patterns from real production apps, which is a great reference for how common interactions are usually done.

## Why it matters even more in a portfolio

A generic company website can get away with inconsistent design. A developer's portfolio can't, because the people evaluating you deal with craft every day. A misaligned button state, a heading scale that's slightly off, a color a shade wrong: it registers, maybe not consciously, but it does.

Your portfolio is making three arguments at once. That you're technically capable, which your projects and the technologies you know prove. That you have good taste, which the site itself proves. And that you pay attention to detail, which shows in the consistency of every interaction. The second and third arguments are made entirely by your design language, before anyone reads a line of your bio.

For recruiters in particular, a polished, intentional portfolio shortens the trust gap. They've seen so many rushed ones that a well-designed site immediately stands out, and it suggests you put the same care into your work as into how you present it.

## It opens doors, but only if it shows the work

A beautiful portfolio with empty or badly documented projects is a gorgeous restaurant with no food. The visual language earns trust; the content has to back it up.

This is where developers often go wrong: listing projects isn't the same as presenting them. A GitHub link and one line of description isn't a presentation. Recruiters, managers and CTOs look at your projects with specific questions in mind, and your portfolio either answers them or it doesn't:

- **What problem did it solve?** Not the stack, the actual user or business problem.
- **What exactly did you do?** Especially important on team projects.
- **What were the interesting technical challenges?** This is where seniority shows.
- **What does it look like, and does it work?** Screenshots, live demos and videos aren't optional.
- **What would you do differently?** It shows self-awareness and that you keep learning.

A project that answers all five tells a complete story. Recruiters go through dozens of portfolios in a morning, and the ones they remember are the ones that told a story.

### It compounds

Every well-documented project is lasting proof of what you can do. It doesn't expire, it doesn't disappear when you leave a company, and nobody has to take your word for it. Anyone can look at it in a minute and a half.

That counts even more with how hiring works now. With remote-first hiring, your portfolio is often the only concrete thing someone sees before a first call. With async screening, it gets evaluated when you're not in the room, so the copy, the structure and the project write-ups have to do all the work. And for international roles, a portfolio that's visually professional and clearly written, in more than one language, reaches a lot further.

I've had opportunities come straight from people finding my portfolio, not from applications I sent but from someone landing on the site and reaching out. That only happens when the portfolio is worth finding.

### Presenting projects well

Lead with the outcome, not the tech: "built a real-time collaborative whiteboard used by 3,000 people" lands harder than "built with React, WebSockets and Redis". Show it running; a live demo or a screen recording beats ten screenshots. Be specific about your role: "led the frontend architecture" says more than "worked on the frontend". And include the messy parts: the problems you hit, the constraints, the trade-offs. How you talk about those is a big part of what separates senior engineers from junior ones.

## The UI/UX rules that quietly run everything

You don't need a design degree to follow the principles that make an interface feel right, but you do need to know they exist.

**Visual hierarchy.** Everything on the page is implicitly ranked. Size, weight, color and position create that ranking. Your name should be the biggest thing in the hero, section labels smaller than headings, body text smaller than both. If everything is the same size, nothing matters.

**Contrast.** WCAG AA asks for at least 4.5:1 for normal text. Amber on near-black (#f59e0b on #0f0f11) is close to 9:1, which is excellent. Light gray on white often fails. Check every text color against its background.

**Spacing rhythm.** Inconsistent spacing is the most common mistake in developer portfolios. Use an 8px base and build every gap from multiples of it: 8, 16, 24, 32, 48, 64. Tailwind's default scale already works this way. Stick to it and your layouts will feel settled even before any polish.

**The fold.** What people see without scrolling is your most valuable space. The hero has to say who you are, what you do and why they should keep reading before anyone touches the scroll wheel.

**Mobile first.** Around 60% of web traffic is mobile. A portfolio designed for desktop and then "adapted" usually shows it. Design the mobile layout first and expand from there.

**Cognitive load.** Every element costs the user some attention. Remove anything that doesn't serve what they came for. A few elements done well always beat many done carelessly.

## The technical side: a design system from day one

Most developers think about design systems too late. You build the thing, ship it, and then try to bolt consistency onto a codebase that was never meant for it. You end up with one-off styles, magic numbers and components that all look slightly different for no reason. Starting with a design system, even a minimal one, changes that.

### Step 1: design tokens

Tokens are the atomic values of the system: named variables for colors, spacing, font sizes, border radii and so on. With CSS and Tailwind they live in your config and become the shared vocabulary between design and code.

The key decision is how you store the values. Storing colors as space-separated RGB channels in CSS variables, instead of hardcoded hex, gives you Tailwind's opacity modifiers for free:

\`\`\`css
/* globals.css */
:root {
  --primary: 217 119 6;     /* amber, channel format */
  --background: 15 15 17;
  --foreground: 234 237 245;
}
\`\`\`

\`\`\`ts
// tailwind.config.ts
colors: {
  primary: 'rgb(var(--primary) / <alpha-value>)',
  background: 'rgb(var(--background) / <alpha-value>)',
}
\`\`\`

Now \`bg-primary/10\` gives you a 10% amber tint and \`text-primary/60\` gives you text at 60% opacity, with no extra tooling. And changing the primary color across the whole site is one variable.

### Step 2: the type scale

Define your typefaces and hierarchy before writing a single component. \`next/font/google\` self-hosts them and avoids layout shift:

\`\`\`ts
import { Unbounded, Outfit } from 'next/font/google';
const headline = Unbounded({ subsets: ['latin'], variable: '--font-headline' });
const body = Outfit({ subsets: ['latin'], variable: '--font-body' });
\`\`\`

\`\`\`ts
fontFamily: {
  headline: ['var(--font-headline)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
}
\`\`\`

### Step 3: a component library, where it really pays off

This is where most tutorials stay at the surface, but a real component library is what turns a design system from an idea into something that keeps paying you back.

In practice it's a set of self-contained UI primitives with fixed, opinionated APIs that enforce your design rules everywhere they're used. Each component is the single source of truth for how that pattern looks and behaves across the app. The backbone of this portfolio's:

- **\`Button\`:** variants (primary, secondary, ghost), accents, sizes and an optional \`href\`. Every call to action goes through it.
- **\`Title\`:** wraps heading tags with the right font, weight and an optional gradient. \`<Title as="h2" gradient="amber">\` covers it.
- **\`SectionLabel\`:** the small uppercase, tracked text above section headings. One component, the same everywhere.
- **\`AccentCard\`:** a bordered card with a tinted background, using the CSS tokens directly.
- **\`Pill\`:** technology tags and status badges, with accent support.

The rule that makes it work: design system components don't accept arbitrary color overrides. They have variant and accent props. If you need a new visual state, you add it to the component, never override it where it's used. That's what actually enforces consistency.

And the payoff compounds. When I decided to make amber the only accent color, I didn't hunt through 40 files. I changed one CSS variable and it reached every component at once. Something that could have taken days took minutes. Looking ahead, it also means that if I want to redesign the site with a different color direction or typographic personality, the architecture makes that easy: the tokens change, the component APIs and the content stay the same, and only the visual layer moves.

### Step 4: write the rules down

Even on a solo project, writing your design decisions down forces you to be clear. "Amber is the only accent color." "Every CTA uses the \`Button\` component." "No inline styles except for dynamic values." Rules that aren't written down get forgotten.

## The redesign: from cartoonish to professional

My portfolio went through a redesign that turned out to matter more than I expected.

The previous version had what I'd call a cartoonish spirit: bright indigo and purple gradients, a more playful energy, and accent colors used inconsistently from page to page. It was fun to build and I liked it at the time. But as my career moved on I started to notice the mismatch. The design said "cool side project" while my work said "senior engineer with more than six years in production". That gap was costing me credibility.

The decision that changed everything was simple: pick one accent color and use it everywhere. I went with amber. Not because amber is objectively better than indigo, but because committing to a single accent and enforcing it in every component, every hover state, every button, every section label and every Open Graph image is what makes a site feel coherent.

From there the system almost designed itself: near-black backgrounds (\`#0f0f11\`) that feel calm and focused, two typefaces with clear roles (Unbounded for headlines, Outfit for body), amber as the only accent and used sparingly, a component library (\`Button\`, \`Title\`, \`Text\`, \`SectionLabel\`, \`Pill\`, \`AccentCard\`), and consistent motion with short, purposeful GSAP animations.

The result wasn't just a prettier site. It made a completely different first impression. The portfolio stopped looking like a side project and started looking like the work of a senior engineer. Every page, from blog posts to the privacy policy, the error pages and even the offline fallback, follows the same visual rules. That consistency isn't luck; it comes from having a design system.

## What I learned working with designers

My most important design education didn't come from tutorials or books. It came from working next to designers and UI/UX specialists, and it permanently changed how I write frontend code.

There's a particular kind of learning that happens when a designer opens Figma, points at a component and explains not just what it should look like but why. Why a 4px gap and not 8px. Why that shade of amber and not a brighter one. Why the button radius is 12px and not 8 or 16. They're deliberate decisions with reasons behind them, and understanding those reasons changes how you code.

Designers think in states and transitions, while developers tend to think in components and props. A designer specs a button with hover, active, focus, disabled and loading states, because all of those are part of the experience. A developer might build the default state and move on, and the result works but doesn't feel right.

They also treat whitespace as a design element, not as missing content. Empty space is deliberate: it gives things room, groups related elements and guides the eye. Learning to resist filling every pixel was one of the most useful things I took from those teams.

These days the handoff between design and development happens through tokens. Designers define them as Figma variables and developers implement them in CSS. When both sides share the same vocabulary (\`color.primary\`, \`spacing.md\`, \`radius.card\`), going from design to code loses almost nothing. That's why a token-based system is worth it even when you work alone: you're learning the language every modern design team speaks.

The biggest change for me was understanding that design isn't decoration. Every visual decision is a UX decision. The button color says "you can click this". The font size says what matters most. The spacing says what belongs together. Once you think of design as a communication layer instead of an aesthetic one, your code gets better. You stop making arbitrary visual choices and start asking what this communicates, and to whom.

## Good practices make it incremental

What nobody mentions about design systems is that they don't just make a project look better. They make it easier to evolve.

When every component belongs to a system, every improvement is inherited everywhere. Changing the accent color means changing one token. Fixing the button hover state means fixing one component. Adding a page means assembling pieces you already have. New features don't add visual debt, performance work like lazy loading, code splitting or server rendering is easier with purpose-built components, and small changes have a big reach.

The same goes for other good practices in the stack. Semantic HTML and accessible components improve screen reader support and SEO at the same time. Clean structured data and a tidy sitemap improve indexing over time. A bilingual content structure makes translation something you add, not a rewrite. None of this means doing more work. It means doing the right work once, in the right place.

## Where I look for inspiration

One of the most common questions from developers working on a portfolio is "how do I know what looks good?" The honest answer is exposure. You train your eye by looking at a lot of good design. These are the places I keep going back to:

- **Awwwards:** award-winning sites with a very high bar. Spend an hour there and you'll feel the difference between good and great.
- **Dribbble:** shots from designers everywhere. Good for exploring color, component ideas and micro-interactions. Don't copy; figure out why something works.
- **Behance:** full case studies, not just final screens. Useful for understanding process and decisions.
- **dark.design:** a curated gallery of dark-mode sites, if that's the direction you're going.
- **bestfolios.com:** developer and designer portfolios you can filter by role and style.
- **Mobbin:** real UI patterns from top web and mobile apps, great for researching how a specific interaction is usually handled.
- **Linear:** often held up as one of the best examples of dark-mode product design. Worth studying closely.

It also helps to follow designers and engineers at companies known for design quality, like Vercel, Linear, Stripe and Notion, whose work sets the current bar, and the design community on X, where people constantly share their process and references.

The bigger lesson: when something works, a spacing decision, a color treatment, a hover interaction, ask yourself why. Don't just collect references. Understand the principle behind them and you'll be able to apply it in contexts that look nothing like the original.

## The plating counts

The chefs I admire most treat plating as part of the cooking. The dish isn't done when it's cooked; it's done when it's served.

A portfolio is the same. Your skills are the cooking and your design language is the plating. Both matter and both say something about you. Typography with personality, mockups before code, the UI/UX principles behind every interface that feels right, a component library that makes redesigns easy, learning from designers and looking for inspiration on purpose: none of it is about making things pretty. It's about making them right, structurally sound, visually coherent and built to change.

A solid design language backed by a real design system tells people you think in systems, you care about consistency, and you're building something that lasts, not just shipping features. When hiring decisions happen at a glance and a recruiter is reviewing fifty portfolios on a Tuesday morning, your visual language is your handshake.

## Update, October 2026: the next redesign

A few months after writing this, I redesigned the site again, and it was the best test of everything above. The new system is called Lumen: light neutral grounds with a dark theme, rounded surfaces, Geist instead of Unbounded and Outfit, spring motion tied to scroll, and amber (\`#D97706\`) still as the only accent. Because colors, spacing and type already lived in tokens, the content didn't have to change at all. The work went into the visual layer: new tokens, new components and a rebuilt home page.

## This portfolio is open source

Everything in this post, the design system, the tokens, the component library, the animations and the bilingual blog, is public under the MIT license. You can use it, fork it, adapt it and build your own version.

**→ [github.com/listerineh/personal-portfolio](https://github.com/listerineh/personal-portfolio)**

If the code, this post or any of these patterns helped you, a star on the repo goes a long way. It helps other people find it and keeps me motivated to keep documenting and improving it.
`,
    author: 'Sebastian Alvarez',
    tags: ['Design Systems', 'UI/UX', 'Frontend', 'Personal Branding', 'Web Development', 'Career']
  },
  es: {
    slug: 'visual-language-design-systems',
    title: 'Tu portafolio habla antes que tú: lenguaje visual y design systems',
    date: 'July 24, 2026',
    excerpt: 'En cocina dicen que la comida entra por los ojos, y con los portafolios pasa lo mismo. Tipografía, mockups, bases de UI/UX, librerías de componentes y las decisiones técnicas que hacen fácil un rediseño, con el mío como ejemplo.',
    imageUrl: '/blog/visual-language-design-systems.es.webp',
    imageAiHint: 'composición dividida mostrando evolución de sistema de diseño: lado izquierdo muestra interfaz web caricaturesca y colorida con tipografías desiguales y colores inconsistentes; lado derecho muestra portafolio profesional oscuro con color de acento ámbar, tipografía consistente, tokens de diseño ámbar, tarjetas de librería de componentes; centro muestra tokens de diseño y paleta de colores pasando de dispersa a organizada; concepto abstracto de chef emplatando comida elegantemente en un lado y desarrollador organizando componentes UI con el mismo cuidado en el otro; ilustración técnica profesional con tonos ámbar cálidos y oscuros',
    content: `
En cocina hay una frase que los chefs repiten harto: la comida entra por los ojos.

Antes de probar nada, antes de que el mesero te explique el plato, antes de tomar el tenedor, ves el plato. Cómo está armado, los colores, el espacio vacío, la precisión. Todo eso te dice algo de la cocina que lo hizo. Un plato bien montado dice que alguien se preocupó. Uno descuidado dice lo contrario.

Un portafolio personal funciona igual. Un reclutador, un posible cliente o un CTO que busca un ingeniero senior ya vio cientos. A los pocos segundos de entrar al tuyo ya tiene una opinión, y todavía no es sobre tus habilidades. Es sobre qué tan profesional pareces.

Este post va de esa primera impresión: qué la crea, por qué pesa tanto en un portafolio, cómo construirla a propósito con un design system y qué aprendí rediseñando el mío desde cero.

## Dos restaurantes

Piensa en dos lugares a los que podrías ir a cenar hoy.

El primero tiene sillas que no combinan, una carta con tres tipografías distintas, el personal vestido como le tocó y platos que parecen armados a la carrera. La comida puede ser buenísima, pero ya entras con dudas.

El segundo tiene una estética clara: madera oscura, luz cálida, una carta con una paleta coherente, el personal vestido igual y comida emplatada con intención. No has probado nada y ya les tienes confianza.

Eso es lenguaje visual: la suma de todas las decisiones de diseño, intencionales o no, que le dicen a la gente quién eres y cómo trabajas.

En un portafolio que van a ver reclutadores técnicos, engineering managers y clientes, esto pesa mucho. Es gente que evalúa la atención al detalle como parte de su trabajo. Se dan cuenta cuando algo está raro, aunque no sepan decir qué. Tu lenguaje de diseño no solo hace que el sitio se vea bien. Muestra cómo piensas los problemas, cómo manejas la complejidad y cuánto te importa lo que entregas.

## Lenguaje de diseño y design system

Un lenguaje de diseño es el conjunto de reglas visuales que decide cómo se ve y se comporta todo en tu interfaz:

- **Tipografía:** qué fuentes, en qué tamaños, con qué jerarquía de pesos
- **Color:** primario, secundario, neutros y colores semánticos (error, éxito, advertencia)
- **Espaciado:** un ritmo consistente entre elementos, escalas de padding, grillas
- **Movimiento:** cómo se animan las cosas, a qué velocidad, con qué curvas
- **Tono:** la personalidad que transmite el diseño (minimalista, audaz, juguetón, serio)

Cuando todo eso es consistente e intencional, la interfaz se siente coherente. Cuando no, se siente amateur, aunque cada componente por separado esté bien hecho.

Un design system es cómo implementas ese lenguaje en código: la librería de componentes, los design tokens, los patrones documentados y las reglas compartidas que mantienen todo consistente a medida que el proyecto crece. Si el lenguaje de diseño es saberse la receta, el design system es tener una cocina profesional para prepararla todas las noches.

## La tipografía cuenta una historia

De todas las decisiones de diseño de un portafolio, la tipografía es a la vez la más subestimada y la que más se nota. La mayoría de los developers elige una fuente rápido y sigue. Es un error, porque las fuentes tienen personalidad.

Una sans geométrica como Unbounded se lee precisa y técnica. Una neogrotesca como Inter se siente neutral y profesional. Una serif como Playfair Display tiene una calidez más editorial. Elige mal y el sitio manda un mensaje confuso antes de que alguien lea una palabra.

### Por qué hay tantas

Las tipografías se hicieron para trabajos muy distintos (diarios, señalética, publicidad) y llevan esa personalidad a las pantallas. Las categorías que importan en un portafolio:

- **Display / títulos:** mucha personalidad, se usan grandes. Unbounded, Space Grotesk, Cabinet Grotesk. Definen el carácter de tu marca.
- **Cuerpo / lectura:** pensadas para tamaños chicos. Outfit, Inter, DM Sans. Tienen que desaparecer en el texto.
- **Monoespaciadas:** para código. JetBrains Mono, Geist Mono.

### Elegir y combinar

La regla que funciona casi siempre: combina una fuente de títulos con personalidad con una de cuerpo neutral y legible. Que el título ponga el carácter y el cuerpo ponga las palabras.

Cuando escribí esto, el sitio usaba Unbounded para los títulos y Outfit para el cuerpo. Unbounded es geométrica y potente, técnica pero moderna. Outfit tiene una altura de x generosa y no estorba en posts largos. Juntas daban una jerarquía clara sin pelearse.

Algunas notas prácticas: dos familias como máximo, porque más es ruido. Prueba la legibilidad al tamaño real del cuerpo, unos 15 a 16px con un interlineado de 1,6 a 1,7. Y usa \`next/font/google\` para que las fuentes se sirvan desde tu propio sitio y no provoquen saltos de layout.

Oliver Reichenstein dijo alguna vez que el diseño web es 95% tipografía. Exagera, pero no tanto. Resuélvela primero.

## Antes de escribir código: mockups y flujos

El error de flujo de trabajo que más veo en portafolios de developers es lanzarse directo al código sin ningún plan visual. El diseño termina evolucionando al azar: cada sección nueva trae un espaciado un poco distinto, los títulos no calzan en tamaño y los estados hover no se parecen a nada.

La mejor inversión antes de construir es un mockup. No tiene que estar perfecto al pixel, pero algún plan visual, aunque sean wireframes a mano alzada, te obliga a tomar decisiones que salen mucho más baratas en una herramienta de diseño que en código.

Hay tres niveles. Los wireframes son estructura de baja fidelidad, cajas y etiquetas, y responden "¿qué va dónde?". Los mockups son pantallas estáticas de alta fidelidad con colores, fuentes y espaciados reales, y responden "¿cómo se ve de verdad?". Los prototipos son flujos interactivos con transiciones y responden "¿cómo se mueve alguien por esto?". Para un portafolio, wireframes y mockups son lo mínimo; los prototipos valen la pena para interacciones complejas como menús laterales o formularios de varios pasos.

Después mapea los flujos, o sea, cómo se mueve la gente entre pantallas y estados. En un portafolio los importantes son: del hero hacia las secciones (¿qué hace que la vista baje por la página?), de una tarjeta de proyecto a su detalle, del listado del blog a un post y luego a los relacionados, y cómo funciona la navegación en móvil. Dibujarlos antes te ahorra descubrir tres semanas después que tu navegación no tiene sentido en una pantalla de 375px.

Las herramientas que uso: Figma, el estándar de la industria y gratis para trabajo individual, para diseñar, prototipar e inspeccionar en un solo lugar. Whimsical para wireframes y diagramas de flujo rápidos antes de pasar al nivel de detalle de Figma. Y Mobbin, una colección de patrones de UI de apps reales en producción, que es una referencia buenísima para ver cómo se suelen resolver las interacciones comunes.

## Por qué importa todavía más en un portafolio

El sitio de una empresa cualquiera puede sobrevivir con un diseño inconsistente. El portafolio de un developer no, porque la gente que te evalúa trabaja con oficio todos los días. Un estado de botón desalineado, una escala de títulos un poco chueca, un color un tono fuera: se nota, quizás no de forma consciente, pero se nota.

Tu portafolio está haciendo tres argumentos a la vez. Que eres técnicamente capaz, cosa que demuestran tus proyectos y las tecnologías que manejas. Que tienes buen gusto, cosa que demuestra el sitio mismo. Y que te fijas en los detalles, cosa que se ve en la consistencia de cada interacción. El segundo y el tercero los hace completamente tu lenguaje de diseño, antes de que alguien lea una línea de tu bio.

Con los reclutadores en particular, un portafolio pulido e intencional acorta la distancia de confianza. Han visto tantos hechos a la carrera que uno bien diseñado destaca de una, y da a entender que le pones el mismo cuidado a tu trabajo que a cómo lo presentas.

## Abre puertas, pero solo si muestra el trabajo

Un portafolio precioso con proyectos vacíos o mal documentados es un restaurante espectacular sin comida. El lenguaje visual genera confianza; el contenido tiene que estar a la altura.

Aquí es donde muchos developers fallan: listar proyectos no es lo mismo que presentarlos. Un link a GitHub y una línea de descripción no es una presentación. Reclutadores, managers y CTOs miran tus proyectos con preguntas concretas en mente, y tu portafolio las responde o no:

- **¿Qué problema resolvió?** No el stack, el problema real del usuario o del negocio.
- **¿Qué hiciste tú exactamente?** Sobre todo en proyectos de equipo.
- **¿Cuáles fueron los desafíos técnicos interesantes?** Aquí es donde se nota la seniority.
- **¿Cómo se ve y funciona?** Capturas, demos en vivo y videos no son opcionales.
- **¿Qué harías distinto?** Muestra autocrítica y que sigues aprendiendo.

Un proyecto que responde las cinco cuenta una historia completa. Los reclutadores revisan decenas de portafolios en una mañana, y los que recuerdan son los que contaron una historia.

### Se va acumulando

Cada proyecto bien documentado es una prueba duradera de lo que sabes hacer. No vence, no desaparece cuando te vas de una empresa y nadie tiene que creerte a ciegas. Cualquiera lo puede revisar en un minuto y medio.

Eso pesa todavía más con cómo se contrata hoy. Con la contratación remota, tu portafolio suele ser lo único concreto que alguien ve antes de una primera llamada. Con los filtros asíncronos, te evalúan cuando no estás presente, así que los textos, la estructura y la presentación de los proyectos tienen que hacer todo el trabajo. Y para roles internacionales, un portafolio visualmente profesional y bien escrito, en más de un idioma, llega mucho más lejos.

Me han llegado oportunidades directamente porque alguien encontró mi portafolio: no por postulaciones que mandé, sino porque alguien llegó al sitio y me escribió. Eso solo pasa cuando el portafolio vale la pena encontrarlo.

### Cómo presentar bien un proyecto

Parte por el resultado, no por la tecnología: "armé una pizarra colaborativa en tiempo real que usan 3.000 personas" pega más fuerte que "hecho con React, WebSockets y Redis". Muéstralo funcionando; una demo en vivo o una grabación de pantalla vale más que diez capturas. Sé específico con tu rol: "lideré la arquitectura del frontend" dice más que "trabajé en el frontend". E incluye las partes desordenadas: los problemas que encontraste, las restricciones, los trade-offs. Cómo hablas de eso es buena parte de lo que separa a un senior de un junior.

## Las reglas de UI/UX que lo gobiernan todo sin hacer ruido

No necesitas un título en diseño para seguir los principios que hacen que una interfaz se sienta bien, pero sí necesitas saber que existen.

**Jerarquía visual.** Todo en la página tiene un orden de importancia implícito. El tamaño, el peso, el color y la posición lo crean. Tu nombre debería ser lo más grande del hero, las etiquetas de sección más chicas que los títulos y el texto de cuerpo más chico que ambos. Si todo tiene el mismo tamaño, nada importa.

**Contraste.** WCAG AA pide al menos 4,5:1 para texto normal. Ámbar sobre casi negro (#f59e0b sobre #0f0f11) llega a casi 9:1, que es excelente. Gris claro sobre blanco muchas veces no pasa. Revisa cada color de texto contra su fondo.

**Ritmo de espaciado.** El espaciado inconsistente es el error más común en portafolios de developers. Usa una base de 8px y construye cada separación con múltiplos: 8, 16, 24, 32, 48, 64. La escala por defecto de Tailwind ya funciona así. Si te apegas a ella, tus layouts se van a sentir asentados incluso antes de pulirlos.

**El primer pantallazo.** Lo que la gente ve sin hacer scroll es tu espacio más valioso. El hero tiene que decir quién eres, qué haces y por qué seguir leyendo antes de que alguien toque la rueda del mouse.

**Mobile first.** Cerca del 60% del tráfico web es móvil. Un portafolio diseñado para escritorio y después "adaptado" casi siempre se nota. Diseña primero el layout móvil y crece desde ahí.

**Carga cognitiva.** Cada elemento le cuesta algo de atención al usuario. Saca todo lo que no sirva para lo que vino a hacer. Pocos elementos bien resueltos siempre le ganan a muchos hechos a la carrera.

## El lado técnico: un design system desde el día uno

La mayoría de los developers piensa en el design system demasiado tarde. Construyes, publicas y después intentas meterle consistencia a la fuerza a un código que nunca se pensó para eso. Terminas con estilos sueltos, números mágicos y componentes que se ven todos un poco distintos sin razón. Partir con un design system, aunque sea mínimo, cambia eso.

### Paso 1: design tokens

Los tokens son los valores atómicos del sistema: variables con nombre para colores, espaciados, tamaños de fuente, radios de borde, etc. Con CSS y Tailwind viven en tu configuración y se vuelven el vocabulario compartido entre diseño y código.

La decisión clave es cómo guardas los valores. Guardar los colores como canales RGB separados por espacios en variables CSS, en vez de hex fijos, te da los modificadores de opacidad de Tailwind gratis:

\`\`\`css
/* globals.css */
:root {
  --primary: 217 119 6;     /* ámbar, formato de canales */
  --background: 15 15 17;
  --foreground: 234 237 245;
}
\`\`\`

\`\`\`ts
// tailwind.config.ts
colors: {
  primary: 'rgb(var(--primary) / <alpha-value>)',
  background: 'rgb(var(--background) / <alpha-value>)',
}
\`\`\`

Ahora \`bg-primary/10\` te da un tinte ámbar al 10% y \`text-primary/60\` te da texto al 60% de opacidad, sin herramientas extra. Y cambiar el color primario en todo el sitio es una sola variable.

### Paso 2: la escala tipográfica

Define tus tipografías y la jerarquía antes de escribir un solo componente. \`next/font/google\` las sirve desde tu sitio y evita los saltos de layout:

\`\`\`ts
import { Unbounded, Outfit } from 'next/font/google';
const headline = Unbounded({ subsets: ['latin'], variable: '--font-headline' });
const body = Outfit({ subsets: ['latin'], variable: '--font-body' });
\`\`\`

\`\`\`ts
fontFamily: {
  headline: ['var(--font-headline)', 'sans-serif'],
  body: ['var(--font-body)', 'sans-serif'],
}
\`\`\`

### Paso 3: una librería de componentes, donde de verdad rinde

Aquí es donde la mayoría de los tutoriales se queda en la superficie, pero una librería de componentes de verdad es lo que convierte un design system de una idea en algo que te sigue devolviendo la inversión.

En la práctica es un conjunto de primitivas de UI autocontenidas, con APIs fijas y opinadas, que imponen tus reglas de diseño en cada lugar donde se usan. Cada componente es la única fuente de verdad de cómo se ve y se comporta ese patrón en toda la app. La columna vertebral de la de este portafolio:

- **\`Button\`:** variantes (primary, secondary, ghost), acentos, tamaños y un \`href\` opcional. Todos los llamados a la acción pasan por aquí.
- **\`Title\`:** envuelve las etiquetas de título con la fuente, el peso y un degradado opcional. \`<Title as="h2" gradient="amber">\` lo resuelve.
- **\`SectionLabel\`:** el textito en mayúsculas y espaciado que va sobre los títulos de sección. Un componente, igual en todas partes.
- **\`AccentCard\`:** una tarjeta con borde y fondo tintado, usando los tokens CSS directamente.
- **\`Pill\`:** etiquetas de tecnologías y badges de estado, con soporte de acentos.

La regla que hace que funcione: los componentes del design system no aceptan colores arbitrarios desde afuera. Tienen props de variante y de acento. Si necesitas un estado visual nuevo, lo agregas al componente; nunca lo sobrescribes donde se usa. Eso es lo que de verdad impone la consistencia.

Y la ganancia se acumula. Cuando decidí que el ámbar fuera el único color de acento, no anduve buscando en 40 archivos. Cambié una variable CSS y llegó a todos los componentes a la vez. Algo que podría haber tomado días tomó minutos. Mirando hacia adelante, también significa que si quiero rediseñar el sitio con otra dirección de color u otra personalidad tipográfica, la arquitectura lo hace fácil: cambian los tokens, las APIs de los componentes y el contenido se quedan igual, y solo se mueve la capa visual.

### Paso 4: escribe las reglas

Aunque sea un proyecto tuyo solo, escribir tus decisiones de diseño te obliga a tenerlas claras. "El ámbar es el único color de acento." "Todos los CTAs usan el componente \`Button\`." "Nada de estilos inline salvo para valores dinámicos." Las reglas que no se escriben se olvidan.

## El rediseño: de caricaturesco a profesional

Mi portafolio pasó por un rediseño que terminó importando más de lo que esperaba.

La versión anterior tenía un espíritu que yo describiría como caricaturesco: degradados índigo y morados bien brillantes, una energía más juguetona y colores de acento usados de forma inconsistente entre páginas. Fue entretenido construirla y en su momento me gustaba. Pero a medida que avanzó mi carrera empecé a notar el desajuste. El diseño decía "proyecto paralelo chévere" mientras mi trabajo decía "ingeniero senior con más de seis años en producción". Esa distancia me estaba quitando credibilidad.

La decisión que lo cambió todo fue simple: elegir un solo color de acento y usarlo en todas partes. Me quedé con el ámbar. No porque sea objetivamente mejor que el índigo, sino porque comprometerse con un solo acento e imponerlo en cada componente, cada hover, cada botón, cada etiqueta de sección y cada imagen de Open Graph es lo que hace que un sitio se sienta coherente.

De ahí el sistema casi se diseñó solo: fondos casi negros (\`#0f0f11\`) que se sienten tranquilos y enfocados, dos tipografías con roles claros (Unbounded para títulos, Outfit para el cuerpo), el ámbar como único acento y usado con moderación, una librería de componentes (\`Button\`, \`Title\`, \`Text\`, \`SectionLabel\`, \`Pill\`, \`AccentCard\`) y movimiento consistente con animaciones de GSAP cortas y con propósito.

El resultado no fue solo un sitio más bonito. Dio una primera impresión completamente distinta. El portafolio dejó de verse como un proyecto paralelo y empezó a verse como el trabajo de un ingeniero senior. Todas las páginas, desde los posts del blog hasta la política de privacidad, las páginas de error e incluso la página offline, siguen las mismas reglas visuales. Esa consistencia no es suerte; viene de tener un design system.

## Lo que aprendí trabajando con diseñadores

Mi formación en diseño más importante no vino de tutoriales ni de libros. Vino de trabajar al lado de diseñadores y especialistas en UI/UX, y cambió para siempre cómo escribo frontend.

Hay un tipo de aprendizaje bien particular que pasa cuando un diseñador abre Figma, apunta a un componente y te explica no solo cómo debería verse sino por qué. Por qué una separación de 4px y no de 8px. Por qué ese tono de ámbar y no uno más brillante. Por qué el radio del botón es 12px y no 8 ni 16. Son decisiones deliberadas con razones detrás, y entender esas razones cambia cómo programas.

Los diseñadores piensan en estados y transiciones, mientras que los developers solemos pensar en componentes y props. Un diseñador especifica un botón con estados hover, active, focus, disabled y loading, porque todos son parte de la experiencia. Un developer quizás implementa el estado por defecto y sigue, y el resultado funciona pero no se siente bien.

También tratan el espacio en blanco como un elemento de diseño, no como contenido que falta. El espacio vacío es deliberado: le da aire a las cosas, agrupa lo que va junto y guía la vista. Aprender a resistir las ganas de llenar cada pixel fue de lo más útil que me llevé de esos equipos.

Hoy el traspaso entre diseño y desarrollo pasa por los tokens. Los diseñadores los definen como variables en Figma y los developers los implementan en CSS. Cuando los dos lados comparten el mismo vocabulario (\`color.primary\`, \`spacing.md\`, \`radius.card\`), pasar del diseño al código casi no pierde nada. Por eso un sistema basado en tokens vale la pena incluso trabajando solo: estás aprendiendo el idioma que habla cualquier equipo de diseño moderno.

El cambio más grande para mí fue entender que el diseño no es decoración. Cada decisión visual es una decisión de experiencia de usuario. El color del botón dice "esto se puede clickear". El tamaño de la fuente dice qué importa más. El espaciado dice qué va junto. Cuando empiezas a pensar el diseño como una capa de comunicación y no como una capa estética, tu código mejora. Dejas de tomar decisiones visuales arbitrarias y empiezas a preguntarte qué comunica esto y a quién.

## Las buenas prácticas lo hacen incremental

Lo que nadie menciona de los design systems es que no solo hacen que un proyecto se vea mejor. Hacen que sea más fácil de evolucionar.

Cuando cada componente es parte de un sistema, cada mejora se hereda en todas partes. Cambiar el color de acento es cambiar un token. Arreglar el hover de los botones es arreglar un componente. Agregar una página es armarla con piezas que ya tienes. Las funcionalidades nuevas no suman deuda visual, el trabajo de rendimiento como lazy loading, code splitting o renderizado en servidor es más fácil con componentes hechos a propósito, y los cambios chicos tienen mucho alcance.

Lo mismo pasa con otras buenas prácticas del stack. HTML semántico y componentes accesibles mejoran el soporte para lectores de pantalla y el SEO al mismo tiempo. Datos estructurados limpios y un sitemap ordenado mejoran la indexación con el tiempo. Una estructura de contenido bilingüe hace que traducir sea algo que agregas, no una reescritura. Nada de esto significa trabajar más. Significa hacer el trabajo correcto una vez, en el lugar correcto.

## Dónde busco inspiración

Una de las preguntas más comunes de developers armando su portafolio es "¿cómo sé qué se ve bien?". La respuesta honesta es exposición. El ojo se entrena mirando mucho buen diseño. Estos son los lugares a los que siempre vuelvo:

- **Awwwards:** sitios premiados con una vara altísima. Pasa una hora ahí y vas a sentir la diferencia entre bueno y excelente.
- **Dribbble:** shots de diseñadores de todo el mundo. Sirve para explorar color, ideas de componentes y microinteracciones. No copies; entiende por qué algo funciona.
- **Behance:** casos de estudio completos, no solo pantallas finales. Útil para entender el proceso y las decisiones.
- **dark.design:** una galería curada de sitios en modo oscuro, si para allá vas.
- **bestfolios.com:** portafolios de developers y diseñadores que puedes filtrar por rol y estilo.
- **Mobbin:** patrones de UI reales de las mejores apps web y móviles, ideal para investigar cómo se suele resolver una interacción puntual.
- **Linear:** muchas veces se pone como uno de los mejores ejemplos de diseño de producto en modo oscuro. Vale la pena estudiarlo de cerca.

También ayuda seguir a diseñadores e ingenieros de empresas conocidas por la calidad de su diseño, como Vercel, Linear, Stripe y Notion, que son las que ponen la vara hoy, y a la comunidad de diseño en X, donde la gente comparte su proceso y sus referencias todo el tiempo.

La lección de fondo: cuando algo funciona, una decisión de espaciado, un tratamiento de color, una interacción al pasar el mouse, pregúntate por qué. No solo juntes referencias. Entiende el principio detrás y vas a poder aplicarlo en contextos que no se parecen en nada al original.

## El emplatado cuenta

Los chefs que más admiro tratan el emplatado como parte de la cocina. El plato no está listo cuando está cocinado; está listo cuando se sirve.

Un portafolio es igual. Tus habilidades son la cocina y tu lenguaje de diseño es el emplatado. Los dos importan y los dos dicen algo de ti. Tipografía con personalidad, mockups antes del código, los principios de UI/UX detrás de cada interfaz que se siente bien, una librería de componentes que hace fáciles los rediseños, aprender de diseñadores y buscar inspiración a propósito: nada de eso es para que las cosas se vean bonitas. Es para que queden bien, sólidas en su estructura, coherentes en lo visual y hechas para cambiar.

Un lenguaje de diseño sólido respaldado por un design system de verdad le dice a la gente que piensas en sistemas, que te importa la consistencia y que estás construyendo algo que dure, no solo sacando funcionalidades. Cuando las decisiones de contratación se toman de un vistazo y un reclutador revisa cincuenta portafolios un martes en la mañana, tu lenguaje visual es tu apretón de manos.

## Actualización, octubre de 2026: el siguiente rediseño

Unos meses después de escribir esto rediseñé el sitio otra vez, y fue la mejor prueba de todo lo anterior. El sistema nuevo se llama Lumen: fondos neutros claros con tema oscuro, superficies redondeadas, Geist en vez de Unbounded y Outfit, movimiento con resortes ligado al scroll, y el ámbar (\`#D97706\`) sigue siendo el único acento. Como los colores, el espaciado y la tipografía ya vivían en tokens, el contenido no tuvo que cambiar nada. El trabajo se fue a la capa visual: tokens nuevos, componentes nuevos y una home reconstruida.

## Este portafolio es open source

Todo lo de este post, el design system, los tokens, la librería de componentes, las animaciones y el blog bilingüe, es público bajo licencia MIT. Puedes usarlo, hacerle fork, adaptarlo y armar tu propia versión.

**→ [github.com/listerineh/personal-portfolio](https://github.com/listerineh/personal-portfolio)**

Si el código, este post o alguno de estos patrones te sirvió, una estrella en el repo ayuda harto. Hace que más gente lo encuentre y me mantiene motivado para seguir documentándolo y mejorándolo.
`,
    author: 'Sebastian Alvarez',
    tags: ['Design Systems', 'UI/UX', 'Frontend', 'Marca Personal', 'Desarrollo Web', 'Carrera']
  }
};
