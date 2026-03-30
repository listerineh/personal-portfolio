import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

const enContent = `## The Setup: A Workshop With a Twist

Saturday, March 28, 2026. The second Cursor workshop in Quito, Ecuador. The plan was simple: the instructor would provide prompts, and attendees would generate a landing page using Cursor's AI capabilities. Everyone got $20 in credits to experiment.

But here's the thing: **I already have a landing page** ([listerineh.dev](https://listerineh.dev)). So instead of following the standard path, I decided to run an experiment that would push the boundaries of what "vibe coding" could actually achieve.

I don't use Cursor day-to-day — I'm a Windsurf user. But with $20 in credits and a hypothesis to test, I set out to build the [Cursor Quito landing page](https://cursor-quito.vercel.app/) in a way that would prove a point: **organized vibe coding, powered by AI planning, can produce professional results faster and cheaper than traditional development.**

---

## The Hypothesis: AI as Architect, Not Just Coder

Most people approach AI coding tools with a simple prompt: "Build me a landing page." The AI generates code, you iterate, maybe you get something decent after 50+ prompts and lots of manual cleanup.

I wanted to test a different approach:

**What if I used Gemini as the architect and prompt designer, then used Cursor in auto mode with custom skills to execute the vision?**

The workflow:
1. **Plan with Gemini**: Define the entire project architecture, design system, content strategy, and SEO approach
2. **Design custom skills**: Create 7 specialized skills that would guide Cursor's behavior
3. **Execute with precision**: Use only 8 carefully crafted prompts to build the entire site
4. **Deploy and iterate**: Ship to Vercel with minimal manual intervention

The goal wasn't just to build a landing page. It was to prove that **technical knowledge + AI orchestration = professional results in under an hour**.

---

## The Architecture: 7 Skills, 8 Prompts, 1 Vision

### The Skills (My AI Toolkit)

I created 7 custom skills in \`.agents/skills/\` that would shape every decision Cursor made:

1. **Frontend Skill**: Award-level composition, cardless layouts, typography-first design, full-bleed heroes
2. **Community Experience Skill**: Quito-specific identity, builder-to-builder tone, local coordinates integration
3. **Technical SEO Skill**: Meta tags, structured data, performance optimization, semantic HTML
4. **Creative Coding Skill**: Three.js integration, 60fps particle systems, atmospheric 3D elements
5. **Tailwind Utility Skill**: Zero external CSS, utility-first approach, no component libraries
6. **Motion Performance Skill**: Framer Motion animations, scroll-linked effects, smooth transitions
7. **Project Architecture Skill**: Clean folder structure, TypeScript interfaces, proper imports

Each skill was a set of rules and patterns that Gemini helped me design. They weren't just documentation — they were **behavioral constraints** that kept the AI focused on quality over quantity.

### The Prompts (Precision Over Volume)

Instead of iterating endlessly, I used 8 numbered prompts (\`01-init.md\` through \`08-architecture.md\`):

1. **Init**: Project setup, visual thesis ("The Pulse of the Digital Andes"), Three.js configuration
2. **Manifest**: The "Product Engineer" philosophy section, cardless layout, sticky positioning
3. **Community**: Activity log, social proof, terminal-style event feed
4. **Env Local**: Environment variables, API configuration, deployment prep
5. **SEO**: Meta tags, Open Graph, structured data, semantic HTML
6. **Performance**: Image optimization, lazy loading, bundle analysis
7. **Resources**: Links, documentation, community channels
8. **Architecture**: File reorganization, import cleanup, TypeScript interfaces

Each prompt was designed by Gemini to build on the previous one. No backtracking. No "let's try this instead." Just **sequential execution**.

---

## The Design Philosophy: Brutalist Minimalism Meets the Andes

The visual direction came from the first prompt's "visual thesis":

> **"The Pulse of the Digital Andes"**  
> Brutalist minimalism, deep darkness (#050505), volcanic neon accents, glass morphism.

Key design decisions:
- **No cards**: Everything is layout, columns, dividers, and whitespace
- **Massive typography**: Headlines at \`clamp(3rem, 10vw, 8rem)\` with tight tracking
- **Three.js neural field**: A particle system that reacts to mouse movement, representing Quito's tech community
- **Monospace details**: Coordinates (0° 13' 0" S / 78° 31' 0" W) in 10px mono font
- **Terminal aesthetics**: Activity logs styled like system output with timestamps and status badges

The result? A landing page that feels like **a living system**, not a static website.

---

## The Reality Check: You Still Need Technical Knowledge

Here's where I push back on the workshop's premise.

The workshop's message was: **"You don't need to be technical to build a landing page with AI."**

My take? **That's only half true.**

Yes, you can generate a landing page with AI. But to make it **professional, performant, and polished**, you need:

### 1. Technical Knowledge to Guide the AI

I knew what I wanted:
- React Three Fiber for 3D, not vanilla Three.js
- Framer Motion for animations, not CSS transitions
- Tailwind utilities, not custom CSS files
- Proper TypeScript interfaces, not \`any\` types

Without that knowledge, I'd be accepting whatever the AI generated and hoping for the best.

### 2. Architectural Thinking

The 7 skills weren't random. They were based on:
- Years of frontend development experience
- Understanding of design systems and component architecture
- Knowledge of SEO best practices and web performance
- Familiarity with modern tooling (Next.js, Vercel, TypeScript)

Gemini helped me **formalize** that knowledge into prompts, but it couldn't create it from scratch.

### 3. The Ability to Spot and Fix AI Mistakes

AI-generated code has quirks:
- Hover states that don't work on mobile
- Spacing issues in responsive layouts
- Performance bottlenecks in Three.js scenes
- Accessibility problems with color contrast

I caught and fixed these **quickly** because I knew what to look for. Someone without technical knowledge would ship broken interactions and never know.

---

## The Results: Fast, Cheap, and Surprisingly Good

**Time**: Under 1 hour from first prompt to Vercel deployment  
**Cost**: $20 in Cursor credits (barely used half)  
**Prompts used**: 8 total  
**Manual fixes**: ~10 minutes of hover state and spacing refinements  
**Final quality**: Production-ready, performant, visually striking

The Three.js integration was the biggest surprise. I asked for a particle system with mouse interaction, and it delivered a smooth 60fps experience on the first try. The neural field effect genuinely looks **premium**.

Check it out: [cursor-quito.vercel.app](https://cursor-quito.vercel.app/)  
Source code: [github.com/listerineh/cursor_workshop](https://github.com/listerineh/cursor_workshop)

---

## The Lesson: Organized Vibe Coding > Random Prompting

The workshop demonstrated that AI can build websites. My experiment demonstrated that **AI + structure + expertise = professional results**.

The difference between "vibe coding" and "organized vibe coding":

| Random Vibe Coding | Organized Vibe Coding |
|-------------------|----------------------|
| "Build me a landing page" | 8 sequential prompts with clear objectives |
| 50+ iterations | 8 prompts, minimal iteration |
| Generic output | Custom skills guide every decision |
| Hours of cleanup | 10 minutes of refinement |
| "Good enough" | Production-ready |

**The key insight**: AI is incredibly powerful when you know how to direct it. But direction requires knowledge.

---

## The Controversial Take: AI Democratizes Building, Not Expertise

The workshop's optimistic view: "Anyone can build a website now!"

My pragmatic view: "Anyone can generate code now. Building something **good** still requires expertise."

AI tools like Cursor and Windsurf are **force multipliers**, not replacements for knowledge. They let experienced developers move faster, experiment more, and focus on high-level decisions instead of syntax.

But they don't eliminate the need for:
- Design sense
- Performance awareness
- Accessibility knowledge
- User experience intuition
- Debugging skills

You can "vibe code" your way to a landing page. But to make it **fast, beautiful, accessible, and maintainable**, you need to know what you're doing.

---

## The Workflow I'd Recommend

If you want to replicate this approach:

### 1. Plan with an AI Architect (Gemini, Claude, GPT-4)

Ask it to:
- Define your visual thesis
- Create a content plan
- Design a component architecture
- Write custom skills for your coding AI

### 2. Create Custom Skills

Document your:
- Design principles
- Code standards
- Performance requirements
- Accessibility rules

These become the "personality" of your coding AI.

### 3. Write Sequential Prompts

Each prompt should:
- Build on the previous one
- Have a single clear objective
- Reference your skills
- Avoid backtracking

### 4. Execute in Auto Mode

Let the AI work. Trust your skills to guide it.

### 5. Refine the Details

Fix the things AI struggles with:
- Hover states
- Responsive spacing
- Performance edge cases
- Visual polish

This workflow is **fast** (under an hour), **cheap** (minimal credits), and **high-quality** (production-ready).

---

## Conclusion: The Future is Organized Chaos

The Cursor workshop showed me that we're at an inflection point. AI can generate functional code from natural language. That's incredible.

But the **real power** comes from combining AI generation with human expertise. Not just prompting randomly, but **architecting the prompts**, **designing the constraints**, and **refining the output**.

Vibe coding isn't about writing less code. It's about **iterating faster with better direction**.

And that direction? It still comes from you.

---

**Want to see the full project?**
- Live site: [cursor-quito.vercel.app](https://cursor-quito.vercel.app/)
- Source code: [github.com/listerineh/cursor_workshop](https://github.com/listerineh/cursor_workshop)
- All 8 prompts: [\`/prompts\`](https://github.com/listerineh/cursor_workshop/tree/main/prompts)
- All 7 skills: [\`.agents/skills\`](https://github.com/listerineh/cursor_workshop/tree/main/.agents/skills)
`;

const esContent = `## El Contexto: Un Workshop con un Giro

Sábado 28 de marzo de 2026. El segundo workshop de Cursor en Quito, Ecuador. El plan era simple: el instructor proporcionaría prompts, y los asistentes generarían una landing page usando las capacidades de IA de Cursor. Todos recibimos $20 en créditos para experimentar.

Pero aquí está el detalle: **yo ya tengo una landing page** ([listerineh.dev](https://listerineh.dev)). Así que en lugar de seguir el camino estándar, decidí realizar un experimento que empujaría los límites de lo que el "vibe coding" realmente podría lograr.

No uso Cursor día a día — soy usuario de Windsurf. Pero con $20 en créditos y una hipótesis que probar, me propuse construir la [landing page de Cursor Quito](https://cursor-quito.vercel.app/) de una manera que demostraría un punto: **el vibe coding organizado, potenciado por planificación con IA, puede producir resultados profesionales más rápido y más barato que el desarrollo tradicional.**

---

## La Hipótesis: IA como Arquitecto, No Solo Programador

La mayoría de las personas abordan las herramientas de codificación con IA con un prompt simple: "Construye una landing page." La IA genera código, iteras, tal vez obtienes algo decente después de 50+ prompts y mucha limpieza manual.

Quise probar un enfoque diferente:

**¿Qué pasaría si usara Gemini como arquitecto y diseñador de prompts, y luego usara Cursor en modo auto con skills personalizadas para ejecutar la visión?**

El flujo de trabajo:
1. **Planificar con Gemini**: Definir toda la arquitectura del proyecto, sistema de diseño, estrategia de contenido y enfoque SEO
2. **Diseñar skills personalizadas**: Crear 7 skills especializadas que guiarían el comportamiento de Cursor
3. **Ejecutar con precisión**: Usar solo 8 prompts cuidadosamente elaborados para construir todo el sitio
4. **Desplegar e iterar**: Enviar a Vercel con mínima intervención manual

El objetivo no era solo construir una landing page. Era demostrar que **conocimiento técnico + orquestación con IA = resultados profesionales en menos de una hora**.

---

## La Arquitectura: 7 Skills, 8 Prompts, 1 Visión

### Las Skills (Mi Kit de Herramientas IA)

Creé 7 skills personalizadas en \`.agents/skills/\` que darían forma a cada decisión que tomara Cursor:

1. **Frontend Skill**: Composición nivel premio, layouts sin cards, diseño typography-first, héroes full-bleed
2. **Community Experience Skill**: Identidad específica de Quito, tono builder-to-builder, integración de coordenadas locales
3. **Technical SEO Skill**: Meta tags, datos estructurados, optimización de rendimiento, HTML semántico
4. **Creative Coding Skill**: Integración Three.js, sistemas de partículas a 60fps, elementos 3D atmosféricos
5. **Tailwind Utility Skill**: Cero CSS externo, enfoque utility-first, sin librerías de componentes
6. **Motion Performance Skill**: Animaciones Framer Motion, efectos scroll-linked, transiciones suaves
7. **Project Architecture Skill**: Estructura de carpetas limpia, interfaces TypeScript, imports apropiados

Cada skill era un conjunto de reglas y patrones que Gemini me ayudó a diseñar. No eran solo documentación — eran **restricciones de comportamiento** que mantenían a la IA enfocada en calidad sobre cantidad.

### Los Prompts (Precisión Sobre Volumen)

En lugar de iterar sin fin, usé 8 prompts numerados (\`01-init.md\` hasta \`08-architecture.md\`):

1. **Init**: Configuración del proyecto, tesis visual ("El Pulso de los Andes Digitales"), configuración Three.js
2. **Manifest**: La sección de filosofía del "Product Engineer", layout sin cards, posicionamiento sticky
3. **Community**: Log de actividad, prueba social, feed de eventos estilo terminal
4. **Env Local**: Variables de entorno, configuración API, preparación para deployment
5. **SEO**: Meta tags, Open Graph, datos estructurados, HTML semántico
6. **Performance**: Optimización de imágenes, lazy loading, análisis de bundle
7. **Resources**: Enlaces, documentación, canales de comunidad
8. **Architecture**: Reorganización de archivos, limpieza de imports, interfaces TypeScript

Cada prompt fue diseñado por Gemini para construir sobre el anterior. Sin retrocesos. Sin "intentemos esto en su lugar." Solo **ejecución secuencial**.

---

## La Filosofía de Diseño: Minimalismo Brutalista Encuentra los Andes

La dirección visual vino de la "tesis visual" del primer prompt:

> **"El Pulso de los Andes Digitales"**  
> Minimalismo brutalista, oscuridad profunda (#050505), acentos neón volcánicos, glassmorphism.

Decisiones de diseño clave:
- **Sin cards**: Todo es layout, columnas, divisores y espacio en blanco
- **Tipografía masiva**: Títulos en \`clamp(3rem, 10vw, 8rem)\` con tracking ajustado
- **Campo neural Three.js**: Un sistema de partículas que reacciona al movimiento del mouse, representando la comunidad tech de Quito
- **Detalles monospace**: Coordenadas (0° 13' 0" S / 78° 31' 0" W) en fuente mono de 10px
- **Estética terminal**: Logs de actividad estilizados como salida de sistema con timestamps y badges de estado

¿El resultado? Una landing page que se siente como **un sistema vivo**, no un sitio web estático.

---

## La Verificación de Realidad: Aún Necesitas Conocimiento Técnico

Aquí es donde cuestiono la premisa del workshop.

El mensaje del workshop era: **"No necesitas ser técnico para construir una landing page con IA."**

¿Mi opinión? **Eso es solo medio cierto.**

Sí, puedes generar una landing page con IA. Pero para hacerla **profesional, performante y pulida**, necesitas:

### 1. Conocimiento Técnico para Guiar la IA

Yo sabía lo que quería:
- React Three Fiber para 3D, no Three.js vanilla
- Framer Motion para animaciones, no transiciones CSS
- Utilidades Tailwind, no archivos CSS personalizados
- Interfaces TypeScript apropiadas, no tipos \`any\`

Sin ese conocimiento, estaría aceptando lo que sea que la IA generara y esperando lo mejor.

### 2. Pensamiento Arquitectónico

Las 7 skills no fueron aleatorias. Se basaron en:
- Años de experiencia en desarrollo frontend
- Comprensión de sistemas de diseño y arquitectura de componentes
- Conocimiento de mejores prácticas SEO y rendimiento web
- Familiaridad con herramientas modernas (Next.js, Vercel, TypeScript)

Gemini me ayudó a **formalizar** ese conocimiento en prompts, pero no pudo crearlo desde cero.

### 3. La Capacidad de Detectar y Corregir Errores de IA

El código generado por IA tiene peculiaridades:
- Estados hover que no funcionan en móvil
- Problemas de espaciado en layouts responsivos
- Cuellos de botella de rendimiento en escenas Three.js
- Problemas de accesibilidad con contraste de color

Los detecté y arreglé **rápidamente** porque sabía qué buscar. Alguien sin conocimiento técnico enviaría interacciones rotas y nunca lo sabría.

---

## Los Resultados: Rápido, Barato y Sorprendentemente Bueno

**Tiempo**: Menos de 1 hora desde el primer prompt hasta el deployment en Vercel  
**Costo**: $20 en créditos de Cursor (apenas usé la mitad)  
**Prompts usados**: 8 en total  
**Correcciones manuales**: ~10 minutos de refinamiento de estados hover y espaciado  
**Calidad final**: Listo para producción, performante, visualmente impactante

La integración de Three.js fue la mayor sorpresa. Pedí un sistema de partículas con interacción del mouse, y entregó una experiencia suave a 60fps en el primer intento. El efecto del campo neural genuinamente se ve **premium**.

Échale un vistazo: [cursor-quito.vercel.app](https://cursor-quito.vercel.app/)  
Código fuente: [github.com/listerineh/cursor_workshop](https://github.com/listerineh/cursor_workshop)

---

## La Lección: Vibe Coding Organizado > Prompting Aleatorio

El workshop demostró que la IA puede construir sitios web. Mi experimento demostró que **IA + estructura + expertise = resultados profesionales**.

La diferencia entre "vibe coding" y "vibe coding organizado":

| Vibe Coding Aleatorio | Vibe Coding Organizado |
|----------------------|------------------------|
| "Construye una landing page" | 8 prompts secuenciales con objetivos claros |
| 50+ iteraciones | 8 prompts, iteración mínima |
| Salida genérica | Skills personalizadas guían cada decisión |
| Horas de limpieza | 10 minutos de refinamiento |
| "Suficientemente bueno" | Listo para producción |

**La clave**: La IA es increíblemente poderosa cuando sabes cómo dirigirla. Pero la dirección requiere conocimiento.

---

## La Opinión Controversial: La IA Democratiza la Construcción, No la Expertise

La visión optimista del workshop: "¡Cualquiera puede construir un sitio web ahora!"

Mi visión pragmática: "Cualquiera puede generar código ahora. Construir algo **bueno** aún requiere expertise."

Las herramientas de IA como Cursor y Windsurf son **multiplicadores de fuerza**, no reemplazos del conocimiento. Permiten a desarrolladores experimentados moverse más rápido, experimentar más y enfocarse en decisiones de alto nivel en lugar de sintaxis.

Pero no eliminan la necesidad de:
- Sentido del diseño
- Conciencia de rendimiento
- Conocimiento de accesibilidad
- Intuición de experiencia de usuario
- Habilidades de debugging

Puedes "vibe codear" tu camino hacia una landing page. Pero para hacerla **rápida, hermosa, accesible y mantenible**, necesitas saber lo que estás haciendo.

---

## El Flujo de Trabajo que Recomendaría

Si quieres replicar este enfoque:

### 1. Planifica con un Arquitecto IA (Gemini, Claude, GPT-4)

Pídele que:
- Defina tu tesis visual
- Cree un plan de contenido
- Diseñe una arquitectura de componentes
- Escriba skills personalizadas para tu IA de codificación

### 2. Crea Skills Personalizadas

Documenta tus:
- Principios de diseño
- Estándares de código
- Requisitos de rendimiento
- Reglas de accesibilidad

Estas se convierten en la "personalidad" de tu IA de codificación.

### 3. Escribe Prompts Secuenciales

Cada prompt debe:
- Construir sobre el anterior
- Tener un objetivo claro único
- Referenciar tus skills
- Evitar retrocesos

### 4. Ejecuta en Modo Auto

Deja que la IA trabaje. Confía en tus skills para guiarla.

### 5. Refina los Detalles

Arregla las cosas con las que la IA tiene problemas:
- Estados hover
- Espaciado responsivo
- Casos extremos de rendimiento
- Pulido visual

Este flujo de trabajo es **rápido** (menos de una hora), **barato** (créditos mínimos) y **alta calidad** (listo para producción).

---

## Conclusión: El Futuro es Caos Organizado

El workshop de Cursor me mostró que estamos en un punto de inflexión. La IA puede generar código funcional desde lenguaje natural. Eso es increíble.

Pero el **verdadero poder** viene de combinar la generación de IA con expertise humana. No solo prompting aleatorio, sino **arquitecturar los prompts**, **diseñar las restricciones** y **refinar la salida**.

El vibe coding no se trata de escribir menos código. Se trata de **iterar más rápido con mejor dirección**.

¿Y esa dirección? Aún viene de ti.

---

**¿Quieres ver el proyecto completo?**
- Sitio en vivo: [cursor-quito.vercel.app](https://cursor-quito.vercel.app/)
- Código fuente: [github.com/listerineh/cursor_workshop](https://github.com/listerineh/cursor_workshop)
- Los 8 prompts: [\`/prompts\`](https://github.com/listerineh/cursor_workshop/tree/main/prompts)
- Las 7 skills: [\`.agents/skills\`](https://github.com/listerineh/cursor_workshop/tree/main/.agents/skills)
`;

export const vibeCodingCursorWorkshop: Record<Locale, BlogPost> = {
  en: {
    slug: 'vibe-coding-cursor-workshop',
    title: 'Vibe Coding with AI: Building a Production Landing Page in Under an Hour',
    date: 'March 30, 2026',
    excerpt: 'I attended a Cursor workshop in Quito and decided to run an experiment: could I use Gemini as an architect and Cursor in auto mode with custom skills to build a professional landing page in under an hour? The answer surprised me — and challenged the workshop\'s premise that "anyone can build with AI."',
    imageUrl: '/blog/vibe-coding-cursor-workshop.webp',
    imageAiHint: 'split screen illustration: left side shows Gemini AI interface with architectural diagrams, prompts, and planning documents in organized structure; right side shows Cursor editor with Three.js particle system code, React components, and a preview of dark minimalist landing page with neural field effect; center shows workflow arrows connecting planning to execution; Quito Andes mountains silhouette in background; dark theme with neon cyan and volcanic orange accents; professional tech illustration style',
    author: 'Sebastian Alvarez',
    tags: ['AI', 'Cursor', 'Vibe Coding', 'Web Development', 'Three.js', 'Gemini', 'Windsurf', 'Landing Pages', 'Quito'],
    content: enContent,
  },
  es: {
    slug: 'vibe-coding-cursor-workshop',
    title: 'Vibe Coding con IA: Construyendo una Landing de Producción en Menos de una Hora',
    date: 'March 30, 2026',
    excerpt: 'Asistí a un workshop de Cursor en Quito y decidí realizar un experimento: ¿podría usar Gemini como arquitecto y Cursor en modo auto con skills personalizadas para construir una landing profesional en menos de una hora? La respuesta me sorprendió — y desafió la premisa del workshop de que "cualquiera puede construir con IA."',
    imageUrl: '/blog/vibe-coding-cursor-workshop.webp',
    imageAiHint: 'ilustración de pantalla dividida: lado izquierdo muestra interfaz de Gemini AI con diagramas arquitectónicos, prompts y documentos de planificación en estructura organizada; lado derecho muestra editor Cursor con código de sistema de partículas Three.js, componentes React y preview de landing page minimalista oscura con efecto de campo neural; centro muestra flechas de flujo de trabajo conectando planificación con ejecución; silueta de montañas de los Andes de Quito en el fondo; tema oscuro con acentos neón cian y naranja volcánico; estilo de ilustración técnica profesional',
    author: 'Sebastian Alvarez',
    tags: ['IA', 'Cursor', 'Vibe Coding', 'Desarrollo Web', 'Three.js', 'Gemini', 'Windsurf', 'Landing Pages', 'Quito'],
    content: esContent,
  },
};
