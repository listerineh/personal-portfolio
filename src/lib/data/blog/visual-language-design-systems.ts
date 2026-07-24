import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const visualLanguageDesignSystems: Record<Locale, BlogPost> = {
  en: {
    slug: 'visual-language-design-systems',
    title: 'Your Portfolio Speaks Before You Do: On Design Language and Design Systems',
    date: 'July 24, 2026',
    excerpt: 'Great chefs know: love enters through the eyes. The same is true for software portfolios. Before a recruiter reads a single line of your experience, your visual language has already told them how professional you are.',
    imageUrl: '/blog/visual-language-design-systems.webp',
    imageAiHint: 'split composition showing design system evolution: left side shows chaotic, cartoon-style colorful web interface with mismatched fonts and inconsistent colors; right side shows sleek dark professional portfolio with amber accent color, consistent typography, amber design tokens, component library cards; center shows design tokens and a color palette going from scattered to organized; abstract concept of chef plating food elegantly on one side and developer arranging UI components with the same care on the other; professional tech illustration with warm amber and dark tones',
    content: `
## Introduction

There's a saying in fine dining that every great chef takes to heart: **love enters through the eyes**.

Before you taste anything, before the server describes the dish, before you even pick up your fork — you see it. The way a plate is composed, the colors, the negative space, the precision of the plating — all of it communicates something about the kitchen that made it. A beautifully composed plate tells you: *this person cares*.

A messy, haphazard plate tells you the opposite.

Your personal portfolio works exactly the same way.

A recruiter, a potential client, a CTO considering you for a senior role — they've all seen hundreds of portfolios. Within the first 3 seconds of landing on yours, their subconscious has already rendered a verdict. **Not about your skills. About your professionalism.**

This post is about that first impression — what creates it, why it matters so much in the context of a personal portfolio, how to engineer it intentionally through a design system, and what I learned by redesigning my own from the ground up.

---

## The Kitchen Analogy: Visual Language as a First Impression

Think about two restaurants you could visit tonight.

The first has mismatched furniture, menus with three different fonts, staff in random outfits, plates that look like they were assembled in a hurry. The food might be fantastic — but you already feel uncertain.

The second has a clear aesthetic: dark wood, warm lighting, a coherent color palette on the menus, staff in matching attire, food plated with obvious intention. You haven't tasted anything, but you already trust them.

That's **visual language**. It's the sum of all the intentional (and unintentional) design choices that communicate who you are and how you work.

For a personal portfolio — especially one seen by technical recruiters, engineering managers, and potential clients — this couldn't matter more. These are people who evaluate attention to detail for a living. They notice when something is off, even if they can't articulate why.

Your design language doesn't just make your portfolio look good. **It demonstrates how you think about problems, how you handle complexity, and how much you care about the work you ship.**

---

## What a Design Language Actually Is

A design language is the system of visual rules that defines how everything in your interface looks and behaves. It includes:

- **Typography** — which fonts you use, at what sizes, with what weight hierarchy
- **Color palette** — primary, secondary, neutral, semantic (error, success, warning)
- **Spacing** — consistent rhythms between elements, padding scales, grid systems
- **Motion** — how things animate, at what speed, with what easing curves
- **Tone** — the personality your design conveys (minimal, bold, playful, professional)

When all of these are consistent and intentional, your interface feels *coherent*. When they're not, it feels *amateur* — even if the individual components are well-built.

A **design system** is the technical implementation of that language: the component library, the design tokens, the documented patterns, and the shared rules that make sure everything stays consistent as the project grows.

The difference between a design language and a design system is the difference between knowing a recipe and having a professional kitchen: one is the idea, the other is what lets you execute it at scale.

---

## Why It Matters Even More for a Personal Portfolio

Generic business websites can survive with inconsistent design. A portfolio — especially a developer's portfolio — cannot.

Here's why: **the people evaluating you are professionals who deal with craft every day**. A misaligned button state, an inconsistent heading scale, a color that's off by a shade — it registers. Maybe not consciously, but it registers.

Your portfolio is making three arguments simultaneously:

**1. "I am technically capable."**
Proven by what you've built, the projects you show, the technologies you know.

**2. "I have good taste."**
Proven by how the portfolio itself looks and feels.

**3. "I am detail-oriented."**
Proven by the consistency and precision of every interaction.

Arguments 2 and 3 are made entirely through your design language — before anyone reads a single word of your bio.

For recruiters especially, a polished, intentional portfolio shortens the trust gap. They've seen enough rushed portfolios that a well-designed one feels immediately different. It signals: *this person puts the same care into their work that they put into their presentation.*

---

## The Technical Side: Building a Design System from the Start

Here's the honest truth: most developers think about design systems too late. You build the thing first, ship it, and then try to retrofit consistency onto a codebase that was never designed for it. The result is a mess of one-off styles, magic numbers, and components that all look slightly different for no good reason.

**Starting with a design system — even a minimal one — changes everything.**

### Step 1: Design Tokens

Design tokens are the atomic values of your system: named variables for colors, spacing, font sizes, border radii, etc. In a CSS or Tailwind context, these live in your config and become the shared language between design and code.

\`\`\`ts
// tailwind.config.ts
colors: {
  primary: '#f59e0b',      // amber — your accent
  background: '#0f0f11',   // near-black
  foreground: '#eaedf5',   // near-white
  muted: 'rgba(234,237,245,0.5)',
}
\`\`\`

Once every color in your codebase references a token instead of a hardcoded value, changing your entire visual language becomes a single edit.

### Step 2: Typography Scale

Define your typefaces and a clear hierarchy before you write a single component. Which font is for headings? Which for body? What sizes do you use? Map them to semantic names:

\`\`\`ts
fontFamily: {
  headline: ['Unbounded', 'sans-serif'],  // display / UI labels
  body: ['Outfit', 'sans-serif'],         // running text
}
\`\`\`

### Step 3: A Component Library

Not a massive one — you don't need Ant Design. But a handful of core components that enforce your design rules:

- **Button** — variants (primary, secondary, ghost), sizes, states
- **Text** — wraps semantic sizing/weight rules so headings are always consistent
- **Pill / Tag** — for badges, labels, technology tags
- **Card** — your content container with defined padding and border behavior

The key is that these components *do not accept arbitrary style overrides*. They have a fixed, opinionated API. That's what creates consistency.

### Step 4: Document the Rules

Even for a solo project, writing down your design decisions — even just in a README — forces clarity. "We use amber as the only accent color." "All CTAs use the Button DS component." "No inline styles except for dynamic values."

Rules that aren't written down get forgotten.

---

## Real Example: From Cartoon to Hyper-Professional

My portfolio went through a redesign that I genuinely didn't expect to be as impactful as it turned out to be.

The previous version had a spirit I'd describe as **cartoon-fun**: bright indigo and purple gradients, a more playful energy, inconsistent accent usage across pages. It was fun to build, and I liked it at the time. But as my career evolved, I started to notice the disconnect.

The design was saying *"cool side project"* when my work was saying *"senior engineer with 6+ years of production experience."*

That mismatch was costing me credibility.

### The Redesign Process

The decision that changed everything was simple: **pick one accent color and use it everywhere, consistently.**

I chose amber — \`#f59e0b\`. Not because amber is objectively better than indigo, but because committing to a single accent color and then enforcing it across every component, every hover state, every button, every section label, every OG image — *that* commitment creates coherence.

From there, the design system essentially designed itself:

- Dark, near-black backgrounds (\`#0f0f11\`) — premium, calm, focused
- Two typefaces with clear roles — \`Unbounded\` for headlines, \`Outfit\` for body
- Amber as the only accent — used sparingly, only for things that matter
- A component library: \`Button\`, \`Title\`, \`Text\`, \`SectionLabel\`, \`Pill\`, \`AccentCard\`
- Consistent motion: subtle, fast, purposeful GSAP animations

The result wasn't just a prettier website. It was a fundamentally different first impression. **The portfolio stopped looking like a side project and started looking like the work of a senior engineer.**

Every page — blog posts, privacy policy, error pages, even the offline fallback HTML — respects the same visual rules. That consistency is not accidental. It's the product of having a design system.

---

## Good Practices Make It Incremental

Here's the part nobody talks about when they discuss design systems: they don't just make your project look better — they make your project **easier to evolve**.

When every component is part of a system, every improvement is automatically inherited everywhere. Redesigning the amber accent color? Change one token. Updating the button hover state? Fix one component. Adding a new page? You have all the building blocks ready.

This is the compounding value of good architectural practices:

- **Expandability**: Adding new features doesn't mean new visual debt
- **Optimizability**: Performance improvements (lazy loading, code splitting, SSR) are easier when components are purpose-built
- **Incrementality**: Small changes have large surface area — a single token update propagates everywhere

The same principle applies to other good practices in the stack:
- Semantic HTML + accessible components means screen readers and SEO improve together
- Proper schema markup and sitemap hygiene means indexing gets better incrementally
- Bilingual content architecture means localization is additive, not a rewrite

None of these are about doing more work. They're about doing the right work once, in the right place.

---

## Conclusion

The best chefs I've ever read about — and the ones I most admire — treat plating as an extension of their cooking. The food isn't finished when it's cooked. It's finished when it's presented.

Your portfolio works the same way. Your skills are your cooking. Your design language is your plating. Both matter. Both communicate.

A strong design language backed by a real design system says:
- *"I think systematically."*
- *"I care about consistency."*
- *"I'm not just building features — I'm building something that lasts."*

In a world where remote hiring decisions happen at a glance, where attention spans are measured in seconds, where recruiters are reviewing 50 portfolios on a Tuesday morning — **your visual language is your handshake**.

Make it count.
`,
    author: 'Sebastian Alvarez',
    tags: ['Design Systems', 'UI/UX', 'Frontend', 'Personal Branding', 'Web Development', 'Career']
  },
  es: {
    slug: 'visual-language-design-systems',
    title: 'Tu Portafolio Habla Antes que Tú: Sobre Lenguaje Visual y Design Systems',
    date: 'July 24, 2026',
    excerpt: 'Los grandes chefs lo saben: el amor entra por los ojos. Lo mismo aplica para portafolios de software. Antes de que un reclutador lea una sola línea de tu experiencia, tu lenguaje visual ya le dijo qué tan profesional eres.',
    imageUrl: '/blog/visual-language-design-systems.webp',
    imageAiHint: 'composición dividida mostrando evolución de sistema de diseño: lado izquierdo muestra interfaz web caricaturesca y colorida con tipografías desiguales y colores inconsistentes; lado derecho muestra portafolio profesional oscuro con color de acento ámbar, tipografía consistente, tokens de diseño ámbar, tarjetas de librería de componentes; centro muestra tokens de diseño y paleta de colores pasando de dispersa a organizada; concepto abstracto de chef emplatando comida elegantemente en un lado y desarrollador organizando componentes UI con el mismo cuidado en el otro; ilustración técnica profesional con tonos ámbar cálidos y oscuros',
    content: `
## Introducción

Hay un dicho en la alta cocina que todo gran chef tiene grabado a fuego: **el amor entra por los ojos**.

Antes de probar cualquier cosa, antes de que el mesero describa el plato, antes de siquiera agarrar el tenedor — lo ves. La forma en que se compone el plato, los colores, el espacio negativo, la precisión del emplatado — todo comunica algo sobre la cocina que lo preparó. Un plato bellamente compuesto te dice: *a esta persona le importa*.

Un plato descuidado, sin intención, te dice lo contrario.

Tu portafolio personal funciona exactamente igual.

Un reclutador, un cliente potencial, un CTO considerándote para un rol senior — todos han visto cientos de portafolios. En los primeros 3 segundos de llegar al tuyo, su subconsciente ya emitió un veredicto. **No sobre tus habilidades. Sobre tu profesionalismo.**

Este post es sobre esa primera impresión — qué la crea, por qué importa tanto en el contexto de un portafolio personal, cómo diseñarla intencionalmente a través de un design system, y lo que aprendí al rediseñar el mío desde cero.

---

## La Analogía de la Cocina: El Lenguaje Visual como Primera Impresión

Imagina dos restaurantes a los que podrías ir esta noche.

El primero tiene muebles desiguales, menús con tres tipografías diferentes, personal en ropa aleatoria, platos que parecen armados a las apuradas. La comida podría ser fantástica — pero ya te sientes inseguro.

El segundo tiene una estética clara: madera oscura, iluminación cálida, una paleta de colores coherente en los menús, personal uniformado, comida emplatada con obvia intención. No has probado nada, pero ya confías en ellos.

Eso es **lenguaje visual**. Es la suma de todas las decisiones de diseño intencionales (y no intencionales) que comunican quién eres y cómo trabajas.

Para un portafolio personal — especialmente uno visto por reclutadores técnicos, engineering managers y clientes potenciales — esto no podría importar más. Son personas que evalúan la atención al detalle para vivir. Notan cuando algo está mal, aunque no puedan articular por qué.

Tu lenguaje visual no solo hace que tu portafolio se vea bien. **Demuestra cómo piensas sobre los problemas, cómo manejas la complejidad y cuánto te importa el trabajo que entregas.**

---

## Qué Es Realmente un Lenguaje Visual

Un lenguaje de diseño es el sistema de reglas visuales que define cómo se ve y se comporta todo en tu interfaz. Incluye:

- **Tipografía** — qué fuentes usas, a qué tamaños, con qué jerarquía de peso
- **Paleta de colores** — primario, secundario, neutro, semántico (error, éxito, advertencia)
- **Espaciado** — ritmos consistentes entre elementos, escalas de padding, sistemas de grilla
- **Movimiento** — cómo se animan las cosas, a qué velocidad, con qué curvas de easing
- **Tono** — la personalidad que transmite tu diseño (minimal, bold, juguetón, profesional)

Cuando todo esto es consistente e intencional, tu interfaz se siente *coherente*. Cuando no lo es, se siente *amateur* — incluso si los componentes individuales están bien construidos.

Un **design system** es la implementación técnica de ese lenguaje: la librería de componentes, los design tokens, los patrones documentados y las reglas compartidas que aseguran que todo permanezca consistente a medida que el proyecto crece.

La diferencia entre un lenguaje de diseño y un design system es la diferencia entre conocer una receta y tener una cocina profesional: uno es la idea, el otro es lo que te permite ejecutarla a escala.

---

## Por Qué Importa Más en un Portafolio Personal

Los sitios web de negocios genéricos pueden sobrevivir con diseño inconsistente. Un portafolio — especialmente el de un desarrollador — no puede.

La razón es simple: **las personas que te evalúan son profesionales que lidian con el oficio todos los días**. Un estado de botón desalineado, una escala de encabezados inconsistente, un color que está un shade mal — se registra. Tal vez no conscientemente, pero se registra.

Tu portafolio está haciendo tres argumentos simultáneamente:

**1. "Soy técnicamente capaz."**
Probado por lo que has construido, los proyectos que muestras, las tecnologías que dominas.

**2. "Tengo buen gusto."**
Probado por cómo se ve y se siente el portafolio en sí.

**3. "Soy detallista."**
Probado por la consistencia y precisión de cada interacción.

Los argumentos 2 y 3 se hacen enteramente a través de tu lenguaje de diseño — antes de que alguien lea una sola palabra de tu bio.

Para los reclutadores especialmente, un portafolio pulido e intencional acorta la brecha de confianza. Han visto suficientes portafolios apresurados que uno bien diseñado se siente inmediatamente diferente. Señala: *esta persona pone el mismo cuidado en su trabajo que en su presentación.*

---

## El Lado Técnico: Construir un Design System desde el Inicio

La verdad honesta: la mayoría de los desarrolladores piensa en los design systems demasiado tarde. Construyes la cosa primero, la lanzas, y luego intentas retrofittear consistencia sobre una codebase que nunca fue diseñada para ello. El resultado es un desastre de estilos únicos, números mágicos y componentes que todos se ven ligeramente diferentes sin razón.

**Empezar con un design system — incluso uno mínimo — cambia todo.**

### Paso 1: Design Tokens

Los design tokens son los valores atómicos de tu sistema: variables con nombre para colores, espaciado, tamaños de fuente, radios de borde, etc. En un contexto de CSS o Tailwind, estos viven en tu configuración y se convierten en el lenguaje compartido entre diseño y código.

\`\`\`ts
// tailwind.config.ts
colors: {
  primary: '#f59e0b',      // ámbar — tu acento
  background: '#0f0f11',   // negro profundo
  foreground: '#eaedf5',   // blanco suave
  muted: 'rgba(234,237,245,0.5)',
}
\`\`\`

Una vez que cada color en tu codebase hace referencia a un token en lugar de un valor hardcodeado, cambiar todo tu lenguaje visual se convierte en una sola edición.

### Paso 2: Escala Tipográfica

Define tus tipografías y una jerarquía clara antes de escribir un solo componente. ¿Qué fuente es para encabezados? ¿Cuál para el cuerpo? ¿Qué tamaños usas? Mapeálos a nombres semánticos:

\`\`\`ts
fontFamily: {
  headline: ['Unbounded', 'sans-serif'],  // display / etiquetas UI
  body: ['Outfit', 'sans-serif'],         // texto corrido
}
\`\`\`

### Paso 3: Una Librería de Componentes

No una enorme — no necesitas Ant Design. Pero un puñado de componentes core que hacen cumplir tus reglas de diseño:

- **Button** — variantes (primary, secondary, ghost), tamaños, estados
- **Text** — encapsula reglas semánticas de tamaño/peso para que los encabezados sean siempre consistentes
- **Pill / Tag** — para badges, etiquetas, tags de tecnología
- **Card** — tu contenedor de contenido con padding y comportamiento de borde definidos

La clave es que estos componentes *no aceptan overrides de estilo arbitrarios*. Tienen una API fija y opinionada. Eso es lo que crea consistencia.

### Paso 4: Documentar las Reglas

Incluso para un proyecto solo, escribir tus decisiones de diseño — aunque sea en un README — fuerza claridad. "Usamos ámbar como el único color de acento." "Todos los CTAs usan el componente Button del DS." "Sin estilos inline excepto para valores dinámicos."

Las reglas que no están escritas se olvidan.

---

## Ejemplo Real: De Cartoon a Hiper-Profesional

Mi portafolio pasó por un rediseño que genuinamente no esperaba que fuera tan impactante como resultó ser.

La versión anterior tenía un espíritu que describiría como **cartoon-fun**: gradientes brillantes de índigo y púrpura, una energía más juguetona, uso inconsistente de acentos entre páginas. Era divertido de construir, y me gustaba en ese momento. Pero a medida que mi carrera evolucionó, empecé a notar la desconexión.

El diseño decía *"proyecto paralelo cool"* cuando mi trabajo decía *"ingeniero senior con 6+ años de experiencia en producción."*

Esa discordancia me estaba costando credibilidad.

### El Proceso de Rediseño

La decisión que cambió todo fue simple: **elegir un color de acento y usarlo en todas partes, consistentemente.**

Elegí ámbar — \`#f59e0b\`. No porque el ámbar sea objetivamente mejor que el índigo, sino porque comprometerse con un solo color de acento y luego hacerlo cumplir en cada componente, cada estado hover, cada botón, cada section label, cada OG image — *ese* compromiso crea coherencia.

A partir de ahí, el design system prácticamente se diseñó solo:

- Fondos oscuros, casi negros (\`#0f0f11\`) — premium, tranquilo, enfocado
- Dos tipografías con roles claros — \`Unbounded\` para headlines, \`Outfit\` para cuerpo
- Ámbar como único acento — usado con moderación, solo para lo que importa
- Una librería de componentes: \`Button\`, \`Title\`, \`Text\`, \`SectionLabel\`, \`Pill\`, \`AccentCard\`
- Movimiento consistente: animaciones GSAP sutiles, rápidas, con propósito

El resultado no fue solo un sitio web más bonito. Fue una primera impresión fundamentalmente diferente. **El portafolio dejó de verse como un proyecto paralelo y empezó a verse como el trabajo de un ingeniero senior.**

Cada página — posts de blog, política de privacidad, páginas de error, incluso el HTML de fallback offline — respeta las mismas reglas visuales. Esa consistencia no es accidental. Es el producto de tener un design system.

---

## Las Buenas Prácticas lo Hacen Incremental

Aquí está la parte que nadie menciona cuando hablan de design systems: no solo hacen que tu proyecto se vea mejor — hacen que tu proyecto sea **más fácil de evolucionar**.

Cuando cada componente es parte de un sistema, cada mejora es heredada automáticamente en todas partes. ¿Rediseñar el color ámbar del acento? Cambias un token. ¿Actualizar el estado hover del botón? Arreglas un componente. ¿Agregar una nueva página? Ya tienes todos los bloques de construcción listos.

Este es el valor compuesto de las buenas prácticas arquitectónicas:

- **Expandibilidad**: Agregar nuevas features no significa nueva deuda visual
- **Optimizabilidad**: Las mejoras de rendimiento (lazy loading, code splitting, SSR) son más fáciles cuando los componentes están construidos con propósito
- **Incrementalidad**: Los cambios pequeños tienen gran área de superficie — una actualización de un solo token se propaga a todas partes

El mismo principio aplica a otras buenas prácticas en el stack:
- HTML semántico + componentes accesibles significa que los screen readers y el SEO mejoran juntos
- Schema markup apropiado y higiene del sitemap significa que el indexado mejora incrementalmente
- Arquitectura de contenido bilingüe significa que la localización es aditiva, no una reescritura

Nada de esto se trata de hacer más trabajo. Se trata de hacer el trabajo correcto una vez, en el lugar correcto.

---

## Conclusión

Los mejores chefs que he leído — y los que más admiro — tratan el emplatado como una extensión de su cocina. La comida no está terminada cuando está cocinada. Está terminada cuando está presentada.

Tu portafolio funciona igual. Tus habilidades son tu cocina. Tu lenguaje de diseño es tu emplatado. Ambos importan. Ambos comunican.

Un lenguaje de diseño sólido respaldado por un design system real dice:
- *"Pienso sistemáticamente."*
- *"Me importa la consistencia."*
- *"No solo construyo features — construyo algo que dura."*

En un mundo donde las decisiones de contratación remota suceden de un vistazo, donde los tiempos de atención se miden en segundos, donde los reclutadores están revisando 50 portafolios un martes por la mañana — **tu lenguaje visual es tu apretón de manos**.

Hazlo valer.
`,
    author: 'Sebastian Alvarez',
    tags: ['Design Systems', 'UI/UX', 'Frontend', 'Marca Personal', 'Desarrollo Web', 'Carrera']
  }
};
