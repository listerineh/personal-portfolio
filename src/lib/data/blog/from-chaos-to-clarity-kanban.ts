import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const fromChaosToClarity: Record<Locale, BlogPost> = {
  en: {
    slug: 'from-chaos-to-clarity-kanban',
    title: 'From Chaos to Clarity: Why I Ended Up Building My Own Kanban Board',
    date: 'July 7, 2025',
    excerpt: "Lists and spreadsheets kept failing me, a Kanban board didn't. Why boards work, what limiting work in progress changed, and the board I built for myself.",
    imageUrl: '/blog/from-chaos-to-clarity-kanban.webp',
    imageAiHint: 'kanban board interface visualization: three columns (backlog, in progress, done) with colorful task cards; cards being dragged between columns with smooth motion lines; developer at desk interacting with board on screen; productivity metrics and progress indicators; calendar and time management elements; modern clean design with blue and green accent colors, professional tech illustration',
    content: `
## Lists stopped working

Between freelance work, a full-time job and side projects, I tried every way of keeping track of tasks: to-do lists, spreadsheets, sticky notes on the monitor. They all broke the same way. The list grew, nothing told me what was actually in progress, and I'd find a "quick fix" from three weeks ago still sitting there.

What finally worked was a Kanban board. This post is about why, and about [Open Kanban](https://open-kanban.vercel.app/), the board I ended up building for myself.

## What a board gives you that a list doesn't

A list tells you what exists. A board tells you where everything is. Tasks move through columns, something like:

Backlog → In progress → Review → Done

That flow matches how software work actually happens, and seeing it is the point. When the Review column fills up, you know where the bottleneck is without anyone telling you. And when your process has a step the default columns don't cover (QA, waiting on the client), you just add a column.

It works the same alone or with a team. I use boards to break features down during sprints, to track freelance deliverables, for side projects, and for things that have nothing to do with code, like workouts or what I'm reading. Once you get used to cards and columns, plain lists feel flat.

The part that changed my habits the most was limiting what's "In progress". If only three cards fit there, you finish things before starting new ones. Fewer half-done features, fewer context switches, and a real sense that the week moved forward.

## Why build another one

There are dozens of Kanban tools. I wanted one that was simple, fast and that I could change whenever I needed something new, so I built [Open Kanban](https://open-kanban.vercel.app/) over a weekend. It has:

- sign-in with Google
- drag and drop for cards and columns
- custom columns and per-project settings
- dark mode
- storage in Firestore

It's Next.js and Tailwind, and most of the effort went into making it feel quick. I still use it every day.

## How I actually use it

For work and freelance projects, it's where features and bugs live. I stopped jumping between Notion, Trello and email to figure out what was pending, and planning a sprint is a matter of dragging cards around.

For everything else, I plan my day on it every morning. Moving a card to Done is a small thing, but it's satisfying in a way that ticking a checkbox isn't. Recurring templates make it easier to keep long-term habits on the board too.

And since it's my code, when I need something new I add it, usually in minutes. That's the real advantage of building your own tool: it adapts to how you work instead of the other way around. Over time it became a second brain that keeps my head clear, not only for coding.

## UI is what makes you keep using it

I'm convinced the reason I stuck with this board when I dropped so many other tools is how it feels. Drag and drop that responds immediately, a dark mode for late sessions, a layout that works on the phone. When the interface gets out of the way, you open the tool because you want to, not because you should.

I spent most of the polish time on drag and drop. I used \`dnd-kit\` to get it smooth and predictable, and also looked at the browser's native drag-and-drop API (the HTML \`draggable\` attribute), which is simpler to reason about but harder to make feel good, especially on touch screens.

## Try it

Kanban changed how I plan and, more importantly, how I finish things. Building my own board around that idea also made me a better developer, because I was the user every single day.

If you're juggling several projects, or just want to finish what you start, give [Open Kanban](https://open-kanban.vercel.app/) a try. It's free, and it's built around one idea: software should work, and it should also feel good to use.
`,
    author: 'Sebastian Alvarez',
    tags: ['Productivity', 'Developer Tools', 'UI/UX', 'Side Projects', 'Kanban', 'Open Source']
  },
  es: {
    slug: 'from-chaos-to-clarity-kanban',
    title: 'Del caos a la claridad: por qué terminé haciendo mi propio tablero Kanban',
    date: 'July 7, 2025',
    excerpt: 'Las listas y las hojas de cálculo me fallaban; un tablero Kanban no. Por qué funcionan, qué cambió al limitar lo que está en curso y el tablero que construí para mí.',
    imageUrl: '/blog/from-chaos-to-clarity-kanban.es.webp',
    imageAiHint: 'visualización de interfaz de tablero kanban: tres columnas (backlog, en progreso, hecho) con tarjetas de tareas coloridas; tarjetas siendo arrastradas entre columnas con líneas de movimiento suaves; desarrollador en escritorio interactuando con tablero en pantalla; métricas de productividad e indicadores de progreso; elementos de calendario y gestión de tiempo; diseño moderno limpio con colores de acento azul y verde, ilustración técnica profesional',
    content: `
## Las listas dejaron de funcionar

Entre trabajos freelance, un empleo a tiempo completo y proyectos personales, probé de todo para llevar mis tareas: listas de pendientes, hojas de cálculo, post-its pegados en el monitor. Todo fallaba de la misma forma. La lista crecía, nada me decía qué estaba realmente en curso y aparecía un "arreglo rápido" de hace tres semanas que seguía ahí.

Lo que por fin funcionó fue un tablero Kanban. Este post va de por qué, y de [Open Kanban](https://open-kanban.vercel.app/), el tablero que terminé construyendo para mí.

## Lo que un tablero te da y una lista no

Una lista te dice qué existe. Un tablero te dice dónde está cada cosa. Las tareas avanzan por columnas, algo así:

Backlog → En progreso → Revisión → Hecho

Ese flujo se parece a cómo se trabaja de verdad en software, y verlo es justamente la gracia. Cuando la columna de Revisión se llena, sabes dónde está el cuello de botella sin que nadie te lo diga. Y si tu proceso tiene un paso que las columnas por defecto no cubren (QA, esperando al cliente), simplemente agregas una columna.

Funciona igual solo que en equipo. Uso tableros para partir features en sprints, para seguir entregables freelance, para proyectos personales y para cosas que no tienen nada que ver con código, como el gimnasio o lo que estoy leyendo. Cuando te acostumbras a tarjetas y columnas, las listas se sienten planas.

Lo que más me cambió los hábitos fue limitar lo que está "En progreso". Si solo caben tres tarjetas ahí, terminas las cosas antes de empezar otras. Menos features a medias, menos saltos de contexto y la sensación real de que la semana avanzó.

## Por qué hacer otro más

Hay decenas de herramientas Kanban. Yo quería una simple, rápida y que pudiera cambiar cada vez que necesitara algo nuevo, así que armé [Open Kanban](https://open-kanban.vercel.app/) en un fin de semana. Tiene:

- inicio de sesión con Google
- arrastrar y soltar tarjetas y columnas
- columnas personalizadas y ajustes por proyecto
- modo oscuro
- almacenamiento en Firestore

Está hecho con Next.js y Tailwind, y casi todo el esfuerzo se fue en que se sienta ágil. Lo sigo usando todos los días.

## Cómo lo uso de verdad

En el trabajo y en proyectos freelance, es donde viven las features y los bugs. Dejé de saltar entre Notion, Trello y el correo para saber qué estaba pendiente, y planificar un sprint es cuestión de mover tarjetas.

Para todo lo demás, cada mañana organizo el día ahí. Pasar una tarjeta a Hecho es algo pequeño, pero satisface de una forma que marcar un checkbox no. Las plantillas recurrentes también me ayudan a mantener hábitos de largo plazo en el tablero.

Y como el código es mío, cuando necesito algo nuevo lo agrego, normalmente en minutos. Esa es la ventaja real de hacer tu propia herramienta: se adapta a cómo trabajas tú y no al revés. Con el tiempo se volvió un segundo cerebro que me mantiene la cabeza despejada, no solo para programar.

## La interfaz es lo que hace que la sigas usando

Estoy convencido de que la razón por la que me quedé con este tablero, cuando abandoné tantas otras herramientas, es cómo se siente. Un drag and drop que responde al instante, modo oscuro para las sesiones de noche, un diseño que funciona en el celular. Cuando la interfaz no estorba, abres la herramienta porque quieres, no porque toca.

La mayor parte del pulido se fue en el drag and drop. Usé \`dnd-kit\` para que fuera fluido y predecible, y también probé la API nativa del navegador (el atributo \`draggable\` de HTML), que es más simple de entender pero más difícil de hacer que se sienta bien, sobre todo en pantallas táctiles.

## Pruébalo

Kanban cambió cómo planifico y, sobre todo, cómo termino las cosas. Construir mi propio tablero alrededor de esa idea también me hizo mejor desarrollador, porque era su usuario todos los días.

Si estás con varios proyectos a la vez, o simplemente quieres terminar lo que empiezas, prueba [Open Kanban](https://open-kanban.vercel.app/). Es gratis y está pensado alrededor de una idea: el software tiene que funcionar, y también tiene que sentirse bien al usarlo.
`,
    author: 'Sebastian Alvarez',
    tags: ['Productividad', 'Herramientas de Desarrollador', 'UI/UX', 'Proyectos Paralelos', 'Kanban', 'Código Abierto']
  }
};
