import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

const enContent = `## A workshop I didn't follow to the letter

Saturday, March 28, 2026: the second Cursor workshop in Quito. The plan was simple. The instructor would hand out prompts, everyone would build a landing page with Cursor, and each attendee got $20 in credits to play with.

The thing is, I already have a landing page ([listerineh.dev](https://listerineh.dev)). So instead of following the script, I ran an experiment. I don't even use Cursor day to day (I'm a Windsurf person), but with $20 in credits and a hypothesis, I set out to build the [Cursor Quito landing page](https://cursor-quito.vercel.app/) to test one idea: vibe coding with a plan behind it can get professional results faster and cheaper than the usual way.

## The idea: AI as the architect, not just the typist

Most people use these tools with one prompt: "build me a landing page". The AI writes something, you iterate, and after fifty-odd prompts and a lot of manual cleanup you might have something decent.

I wanted to try something else: use Gemini as the architect and prompt designer, and Cursor in auto mode, guided by custom skills, to execute. Concretely:

1. **Plan with Gemini:** architecture, design system, content and SEO, all decided upfront.
2. **Write custom skills:** seven of them, to steer how Cursor behaves.
3. **Execute with few prompts:** eight in total, each written carefully.
4. **Deploy and polish:** ship to Vercel and fix by hand only what's needed.

The real question was whether technical knowledge plus a bit of AI orchestration could produce something professional in under an hour.

## Seven skills, eight prompts

The skills lived in \`.agents/skills/\`, and each one shaped a different part of what Cursor did:

1. **Frontend:** award-site composition, no cards, typography first, full-bleed hero.
2. **Community experience:** a Quito identity, a builder-to-builder tone, local coordinates.
3. **Technical SEO:** meta tags, structured data, performance, semantic HTML.
4. **Creative coding:** Three.js, particle systems at 60fps, atmospheric 3D.
5. **Tailwind:** no external CSS, utility-first, no component libraries.
6. **Motion:** Framer Motion, scroll-linked effects, smooth transitions.
7. **Project architecture:** clean folders, TypeScript interfaces, tidy imports.

Gemini helped me write them, but they weren't documentation. They were constraints, rules that kept the AI focused on quality instead of volume.

The prompts were numbered files, \`01-init.md\` to \`08-architecture.md\`: project setup and the visual concept, the "Product Engineer" manifesto section, the community activity log, environment variables, SEO, performance, resources, and a final architecture cleanup. Gemini designed them so each one built on the previous. No going back, no "let's try something else". Just one after another.

## The look: brutalist minimalism, Andes edition

The visual direction came from the first prompt, under the name "The Pulse of the Digital Andes": brutalist minimalism, a near-black background (#050505), volcanic neon accents and some glassmorphism. In practice:

- no cards, just layout, columns, dividers and whitespace
- huge headlines at \`clamp(3rem, 10vw, 8rem)\` with tight tracking
- a Three.js "neural field", a particle system that reacts to the mouse, standing in for Quito's tech community
- monospace details, like the coordinates (0° 13' 0" S / 78° 31' 0" W) in 10px
- a terminal-style activity log with timestamps and status badges

It ended up feeling more like a living system than a static page.

## Where I disagree with the workshop

The workshop's message was that you don't need to be technical to build a landing page with AI. I think that's half true.

You can generate a landing page with AI, no doubt. Making it professional, fast and polished is another story, and that's where knowing what you're doing shows up.

First, to steer it. I knew I wanted React Three Fiber and not raw Three.js, Framer Motion and not CSS transitions, Tailwind utilities and not custom stylesheets, real TypeScript interfaces and not \`any\` everywhere. Without that, you take whatever the AI gives you and hope.

Second, to design the plan. The seven skills weren't random. They came from years of frontend work, from understanding design systems and component architecture, SEO and web performance, and from knowing tools like Next.js, Vercel and TypeScript. Gemini helped me put that knowledge into words. It couldn't have come up with it on its own.

Third, to catch the mistakes. AI code has its quirks: hover states that don't work on mobile, spacing that breaks at some breakpoint, a Three.js scene that's heavier than it should be, contrast problems. I fixed them quickly because I knew where to look. Someone without that background would ship them and never notice.

## The numbers

- **Time:** under an hour from the first prompt to the Vercel deploy.
- **Cost:** less than half of the $20 in credits.
- **Prompts:** eight.
- **Manual fixes:** about ten minutes, mostly hover states and spacing.

The biggest surprise was Three.js. I asked for a particle system that reacts to the mouse and got a smooth 60fps result on the first try. The neural field genuinely looks expensive.

You can see it at [cursor-quito.vercel.app](https://cursor-quito.vercel.app/), and the code is at [github.com/listerineh/cursor_workshop](https://github.com/listerineh/cursor_workshop).

## Vibe coding with a plan vs. without one

The workshop showed that AI can build websites. My experiment was about what happens when you add structure and experience on top:

| Without a plan | With a plan |
|---|---|
| "Build me a landing page" | 8 sequential prompts with clear goals |
| 50+ iterations | 8 prompts, very little back and forth |
| Generic result | Custom skills behind every decision |
| Hours of cleanup | About 10 minutes of polish |
| "Good enough" | Ready for production |

The takeaway for me: AI is incredibly powerful when you know how to direct it, and directing it takes knowledge.

## AI makes building accessible, not expertise

The optimistic version is "anyone can build a website now". My version is "anyone can generate code now, and building something good still takes knowing what you're doing".

Cursor, Windsurf and the rest multiply what you already know. They let experienced developers move faster, try more things and spend their time on decisions instead of syntax. They don't replace design sense, performance awareness, accessibility, UX intuition or the ability to debug. You can vibe code your way to a landing page. Making it fast, good-looking, accessible and maintainable still needs someone who knows the craft.

## If you want to try this workflow

1. **Plan with an AI as architect** (Gemini, Claude, GPT). Have it define the visual concept, the content, the component structure and the skills for your coding AI.
2. **Write the skills.** Design principles, code standards, performance requirements, accessibility rules. They become your coding AI's personality.
3. **Write sequential prompts.** Each with one clear goal, building on the previous one and referencing the skills.
4. **Run it in auto mode** and let the skills do their job.
5. **Polish by hand** what AI usually gets wrong: hover states, responsive spacing, performance edge cases, visual details.

## What I took away

We're at a point where AI turns plain language into working code, and that's amazing. But the interesting part isn't prompting at random. It's designing the prompts, setting the constraints and refining the result. Vibe coding isn't about writing less code, it's about iterating faster with a better sense of direction. And that direction still comes from you.

If you want to dig into it, everything is public: the [live site](https://cursor-quito.vercel.app/), the [source code](https://github.com/listerineh/cursor_workshop), the [8 prompts](https://github.com/listerineh/cursor_workshop/tree/main/prompts) and the [7 skills](https://github.com/listerineh/cursor_workshop/tree/main/.agents/skills).

`;

const esContent = `## Un workshop que no seguí al pie de la letra

Sábado 28 de marzo de 2026: el segundo workshop de Cursor en Quito. El plan era sencillo. El instructor iba a pasar prompts, todos íbamos a hacer una landing page con Cursor y cada asistente tenía $20 en créditos para jugar.

El tema es que yo ya tengo una landing page ([listerineh.dev](https://listerineh.dev)). Así que en vez de seguir el guion, hice un experimento. Ni siquiera uso Cursor en el día a día (soy de Windsurf), pero con $20 en créditos y una hipótesis, me puse a armar la [landing de Cursor Quito](https://cursor-quito.vercel.app/) para probar una idea: el vibe coding con un plan detrás puede dar resultados profesionales más rápido y más barato que la forma tradicional.

## La idea: la IA como arquitecta, no solo como teclado

La mayoría usa estas herramientas con un solo prompt: "hazme una landing page". La IA escribe algo, iteras y, después de unos cincuenta prompts y mucha limpieza a mano, con suerte tienes algo decente.

Yo quería probar otra cosa: usar Gemini como arquitecto y diseñador de prompts, y Cursor en modo automático, guiado por skills propias, para ejecutar. En concreto:

1. **Planificar con Gemini:** arquitectura, sistema de diseño, contenido y SEO, todo decidido desde el inicio.
2. **Escribir skills propias:** siete, para dirigir cómo se comporta Cursor.
3. **Ejecutar con pocos prompts:** ocho en total, cada uno bien pensado.
4. **Desplegar y pulir:** subir a Vercel y arreglar a mano solo lo necesario.

La pregunta de fondo era si conocimiento técnico más un poco de orquestación de IA podía sacar algo profesional en menos de una hora.

## Siete skills, ocho prompts

Las skills vivían en \`.agents/skills/\`, y cada una moldeaba una parte distinta de lo que hacía Cursor:

1. **Frontend:** composición de sitio premiado, sin tarjetas, tipografía primero, hero a pantalla completa.
2. **Experiencia de comunidad:** identidad quiteña, tono de builder a builder, coordenadas locales.
3. **SEO técnico:** meta tags, datos estructurados, rendimiento, HTML semántico.
4. **Creative coding:** Three.js, sistemas de partículas a 60fps, 3D con atmósfera.
5. **Tailwind:** nada de CSS externo, utilidades primero, sin librerías de componentes.
6. **Movimiento:** Framer Motion, efectos ligados al scroll, transiciones suaves.
7. **Arquitectura del proyecto:** carpetas limpias, interfaces de TypeScript, imports ordenados.

Gemini me ayudó a escribirlas, pero no eran documentación. Eran restricciones, reglas que mantenían a la IA enfocada en la calidad y no en la cantidad.

Los prompts eran archivos numerados, de \`01-init.md\` a \`08-architecture.md\`: arranque del proyecto y concepto visual, la sección de manifiesto "Product Engineer", el registro de actividad de la comunidad, variables de entorno, SEO, rendimiento, recursos y una limpieza final de arquitectura. Gemini los diseñó para que cada uno se apoyara en el anterior. Sin volver atrás, sin "probemos otra cosa". Uno tras otro.

## El look: minimalismo brutalista, versión Andes

La dirección visual salió del primer prompt, bajo el nombre "The Pulse of the Digital Andes": minimalismo brutalista, un fondo casi negro (#050505), acentos neón volcánicos y algo de glassmorphism. En la práctica:

- nada de tarjetas, solo layout, columnas, divisores y espacio en blanco
- titulares enormes con \`clamp(3rem, 10vw, 8rem)\` y tracking apretado
- un "campo neuronal" en Three.js, un sistema de partículas que reacciona al mouse y representa a la comunidad tech de Quito
- detalles en monoespaciada, como las coordenadas (0° 13' 0" S / 78° 31' 0" W) a 10px
- un registro de actividad estilo terminal, con timestamps y badges de estado

Terminó sintiéndose más como un sistema vivo que como una página estática.

## Donde no estoy de acuerdo con el workshop

El mensaje del workshop era que no hace falta ser técnico para hacer una landing page con IA. Creo que eso es verdad a medias.

Generar una landing con IA, se puede, sin duda. Que quede profesional, rápida y pulida es otra historia, y ahí es donde se nota saber lo que estás haciendo.

Primero, para dirigirla. Yo sabía que quería React Three Fiber y no Three.js a pelo, Framer Motion y no transiciones de CSS, utilidades de Tailwind y no hojas de estilo propias, interfaces de TypeScript de verdad y no \`any\` por todos lados. Sin eso, te quedas con lo que la IA te dé y cruzas los dedos.

Segundo, para diseñar el plan. Las siete skills no salieron de la nada. Salieron de años de frontend, de entender sistemas de diseño y arquitectura de componentes, SEO y rendimiento web, y de conocer herramientas como Next.js, Vercel y TypeScript. Gemini me ayudó a ponerlo en palabras. No podría haberlo inventado solo.

Tercero, para detectar los errores. El código de IA tiene sus mañas: hovers que no funcionan en el celular, espaciados que se rompen en algún breakpoint, una escena de Three.js más pesada de lo que debería, problemas de contraste. Los arreglé rápido porque sabía dónde mirar. Alguien sin esa base los subiría a producción sin darse cuenta.

## Los números

- **Tiempo:** menos de una hora desde el primer prompt hasta el deploy en Vercel.
- **Costo:** menos de la mitad de los $20 en créditos.
- **Prompts:** ocho.
- **Arreglos a mano:** unos diez minutos, sobre todo hovers y espaciados.

La mayor sorpresa fue Three.js. Pedí un sistema de partículas que reaccionara al mouse y salió fluido, a 60fps, al primer intento. El campo neuronal de verdad se ve caro.

Lo puedes ver en [cursor-quito.vercel.app](https://cursor-quito.vercel.app/) y el código está en [github.com/listerineh/cursor_workshop](https://github.com/listerineh/cursor_workshop).

## Vibe coding con plan y sin plan

El workshop mostró que la IA puede hacer sitios web. Mi experimento fue sobre qué pasa cuando le sumas estructura y experiencia:

| Sin plan | Con plan |
|---|---|
| "Hazme una landing page" | 8 prompts en secuencia con objetivos claros |
| Más de 50 iteraciones | 8 prompts, casi sin ida y vuelta |
| Resultado genérico | Skills propias detrás de cada decisión |
| Horas de limpieza | Unos 10 minutos de pulido |
| "Suficientemente bueno" | Listo para producción |

Lo que me llevo: la IA es increíblemente potente cuando sabes dirigirla, y dirigirla requiere conocimiento.

## La IA democratiza construir, no la experiencia

La versión optimista es "ahora cualquiera puede hacer un sitio web". La mía es "ahora cualquiera puede generar código, y hacer algo bueno sigue requiriendo saber lo que haces".

Cursor, Windsurf y compañía multiplican lo que ya sabes. Dejan que un desarrollador con experiencia vaya más rápido, pruebe más cosas y dedique su tiempo a decidir en vez de a la sintaxis. No reemplazan el ojo para el diseño, la conciencia de rendimiento, la accesibilidad, la intuición de UX ni saber depurar. Puedes llegar a una landing a puro vibe coding. Que sea rápida, linda, accesible y mantenible sigue necesitando a alguien que conozca el oficio.

## Si quieres probar este flujo

1. **Planifica con una IA como arquitecta** (Gemini, Claude, GPT). Que defina el concepto visual, el contenido, la estructura de componentes y las skills para tu IA de código.
2. **Escribe las skills.** Principios de diseño, estándares de código, requisitos de rendimiento, reglas de accesibilidad. Se vuelven la personalidad de tu IA de código.
3. **Escribe prompts en secuencia.** Cada uno con un objetivo claro, apoyado en el anterior y haciendo referencia a las skills.
4. **Córrelo en modo automático** y deja que las skills hagan su trabajo.
5. **Pule a mano** lo que la IA suele hacer mal: hovers, espaciado responsive, casos borde de rendimiento, detalles visuales.

## Con qué me quedo

Estamos en un punto en que la IA convierte lenguaje natural en código que funciona, y eso es increíble. Pero lo interesante no es soltar prompts al azar. Es diseñar los prompts, poner las restricciones y afinar el resultado. El vibe coding no va de escribir menos código, va de iterar más rápido y con mejor dirección. Y esa dirección sigue saliendo de ti.

Si quieres revisarlo a fondo, todo es público: el [sitio](https://cursor-quito.vercel.app/), el [código](https://github.com/listerineh/cursor_workshop), los [8 prompts](https://github.com/listerineh/cursor_workshop/tree/main/prompts) y las [7 skills](https://github.com/listerineh/cursor_workshop/tree/main/.agents/skills).

`;

export const vibeCodingCursorWorkshop: Record<Locale, BlogPost> = {
  en: {
    slug: 'vibe-coding-cursor-workshop',
    title: 'Vibe Coding with AI: Building a Production Landing Page in Under an Hour',
    date: 'March 30, 2026',
    excerpt: "At a Cursor workshop in Quito I skipped the script and ran an experiment: Gemini as the architect, Cursor in auto mode with custom skills, a production landing page in under an hour. It worked, and it made me disagree with the workshop's main message.",
    imageUrl: '/blog/vibe-coding-cursor-workshop.webp',
    imageAiHint: 'split screen illustration: left side shows Gemini AI interface with architectural diagrams, prompts, and planning documents in organized structure; right side shows Cursor editor with Three.js particle system code, React components, and a preview of dark minimalist landing page with neural field effect; center shows workflow arrows connecting planning to execution; Quito Andes mountains silhouette in background; dark theme with neon cyan and volcanic orange accents; professional tech illustration style',
    author: 'Sebastian Alvarez',
    tags: ['AI', 'Cursor', 'Vibe Coding', 'Web Development', 'Three.js', 'Gemini', 'Windsurf', 'Landing Pages', 'Quito'],
    content: enContent
  },
  es: {
    slug: 'vibe-coding-cursor-workshop',
    title: 'Vibe coding con IA: una landing de producción en menos de una hora',
    date: 'March 30, 2026',
    excerpt: 'En un workshop de Cursor en Quito me salí del guion e hice un experimento: Gemini como arquitecto, Cursor en modo automático con skills propias y una landing de producción en menos de una hora. Funcionó, y me hizo discrepar con el mensaje del workshop.',
    imageUrl: '/blog/vibe-coding-cursor-workshop.webp',
    imageAiHint: 'ilustración de pantalla dividida: lado izquierdo muestra interfaz de Gemini AI con diagramas arquitectónicos, prompts y documentos de planificación en estructura organizada; lado derecho muestra editor Cursor con código de sistema de partículas Three.js, componentes React y preview de landing page minimalista oscura con efecto de campo neural; centro muestra flechas de flujo de trabajo conectando planificación con ejecución; silueta de montañas de los Andes de Quito en el fondo; tema oscuro con acentos neón cian y naranja volcánico; estilo de ilustración técnica profesional',
    author: 'Sebastian Alvarez',
    tags: ['IA', 'Cursor', 'Vibe Coding', 'Desarrollo Web', 'Three.js', 'Gemini', 'Windsurf', 'Landing Pages', 'Quito'],
    content: esContent
  }
};
