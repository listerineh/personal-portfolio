import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const fromJuniorToSenior: Record<Locale, BlogPost> = {
  en: {
    slug: 'from-junior-to-senior-engineer',
    title: 'From Junior to Senior: The Shift Nobody Tells You About',
    date: 'December 21, 2025',
    excerpt: "Becoming senior wasn't about writing better code. It was about deciding instead of executing, leading without the title, and interviews that turned into conversations about judgment.",
    imageUrl: '/blog/from-junior-to-senior-engineer.webp',
    imageAiHint: 'career progression visualization: engineer climbing upward path from junior to senior level; left side shows junior developer at desk coding alone; middle shows mid-level engineer in code review; right side shows senior engineer mentoring team, making architectural decisions, leading discussions; growth arrows and skill badges (communication, leadership, decision-making) appearing along the path; professional tech illustration with warm colors',
    content: `
## It wasn't the title

I remember the moment I realized I'd become a senior engineer, and it had nothing to do with my title changing.

We were in a technical discussion and I caught myself not pushing for my solution. I was asking questions to understand the problem better, thinking about trade-offs, the team's pace and who would maintain this in a year, instead of which stack would be the most fun.

Going from "how do I solve this?" to "should we even solve this?" is, for me, the real line between mid-level and senior. This post is about what changed on the other side of it: the kind of decisions you make, the skills that suddenly matter, and how different senior interviews turned out to be.

## From doing to deciding

As a junior or mid-level engineer, most of the job is execution. Take a ticket, build it well, get it reviewed, ship it.

As a senior, more of the job is deciding. Which approach, what you give up with it, and what it will cost you months from now. A small example I've seen many times:

> "Let's use GraphQL, it's modern and I want to learn it."

versus

> "Do we actually need GraphQL's flexibility, or is REST easier to maintain here? Has anyone on the team used it? Is the learning curve worth what we get?"

The second person doesn't necessarily know more GraphQL. They know more about the context. Every technical decision trades something: performance against maintainability, speed now against debt later, trying something new against keeping things stable. At some point you stop choosing what's interesting and start choosing what has the most impact.

## Leading without being the boss

Nobody told me this early on: seniors lead, with or without the title. Some of the best technical leadership I've seen came from people with no formal authority at all.

In practice it looks like mentoring juniors (teaching them how to think about a problem, not just handing them answers), pushing technical decisions forward and getting people to agree on them, unblocking the team when something is stuck even if it isn't strictly yours, and setting the standards everyone else follows: docs, templates, conventions.

I got this wrong at first. I thought leading meant telling people what to do. It's closer to the opposite: making it easier for others to do good work. When a junior brings you a problem, the answer is usually a couple of good questions, not the solution. That's how your impact grows beyond what you can type yourself.

## The skills that start mattering more than code

Technical skills get you in the door. The rest is what gets you promoted. As a senior I spend more time communicating than coding, reviewing than writing, and planning than executing. The skills that turned out to matter most:

**Communication.** Explaining a technical decision to someone non-technical, writing docs people actually read, giving feedback that helps instead of hurts.

**Empathy.** Noticing when a teammate is stuck or overwhelmed, and knowing when to push and when to back them up.

**Pragmatism.** Knowing when good enough really is enough. Perfect is the enemy of shipped.

**Seeing the bigger picture.** Asking "why are we building this?" before "how do we build it?".

None of these are extras. I've seen brilliant engineers stall for years because they couldn't get their ideas across or work well with others.

## Senior interviews are a different game

This one surprised me the most. Junior and mid-level interviews were mostly LeetCode-style exercises: implement this algorithm, fast, with clean syntax.

Senior interviews were conversations. System design, architecture decisions and their trade-offs, talks with CTOs and engineering leads, "tell me about a hard technical decision you made". They assume you can code. What they want to see is how you handle an ambiguous problem, what you've built and what went wrong, how you influence people without authority, and whether you can explain complex things clearly.

I've had interviews where I barely wrote code. I spent an hour drawing a system on a whiteboard, discussing trade-offs and explaining why I'd pick Postgres over MongoDB for that particular case. It was deep and technical, but it was about judgment, not syntax.

## What actually helped me make the jump

**Own outcomes, not tickets.** If you see a problem, propose a fix. If something is unclear, clarify it for everyone, not only for you.

**Mentor someone.** Explaining things forces you to understand them properly, and it's the cheapest way to practice leading.

**Make decisions and write them down.** Even small ones. ADRs (Architecture Decision Records) are great practice for explaining why you picked one option over another.

**Communicate more.** Write more, speak up in meetings, give the occasional talk. The clearer you are, the more your work counts.

**Learn the business.** Understand why you're building what you're building. Talk to product. Code is a means, not the goal.

**Know people outside your team.** A lot of a senior's value is knowing who to talk to and how to get things moving in the organization.

## The short version

Becoming senior is mostly a change in what you're trying to prove. You go from "I need to show I'm smart" to "I need the team to do well", from "I want the newest tech" to "I want the right tech", and from "I can do this alone" to "how do we do this together?".

It isn't a straight line and it looks different for everyone. If I had to put it in one sentence: senior engineers make the people around them better. Focus on impact over output, communicate more than feels necessary, lead by making others effective, and learn the business as well as the tech. The title follows.
`,
    author: 'Sebastian Alvarez',
    tags: ['Career Growth', 'Leadership', 'Senior Engineer', 'Soft Skills', 'Interviews', 'Mentorship']
  },
  es: {
    slug: 'from-junior-to-senior-engineer',
    title: 'De junior a senior: el cambio del que nadie te habla',
    date: 'December 21, 2025',
    excerpt: 'Volverme senior no fue escribir mejor código. Fue pasar de ejecutar a decidir, liderar sin el título y descubrir que las entrevistas se vuelven conversaciones sobre criterio.',
    imageUrl: '/blog/from-junior-to-senior-engineer.webp',
    imageAiHint: 'visualización de progresión de carrera: ingeniero escalando camino ascendente de nivel junior a senior; lado izquierdo muestra desarrollador junior en escritorio programando solo; medio muestra ingeniero mid-level en revisión de código; lado derecho muestra ingeniero senior mentoreando equipo, tomando decisiones arquitectónicas, liderando discusiones; flechas de crecimiento y badges de habilidades (comunicación, liderazgo, toma de decisiones) apareciendo a lo largo del camino; ilustración técnica profesional con colores cálidos',
    content: `
## No fue el título

Me acuerdo del momento en que me di cuenta de que ya era senior, y no tuvo nada que ver con que me cambiaran el cargo.

Estábamos en una discusión técnica y me pillé a mí mismo sin defender mi solución. Estaba haciendo preguntas para entender mejor el problema, pensando en trade-offs, en el ritmo del equipo y en quién iba a mantener eso en un año, en vez de en qué stack sería el más entretenido.

Pasar de "¿cómo lo resuelvo?" a "¿de verdad hay que resolver esto?" es, para mí, la línea real entre un nivel intermedio y un senior. Este post va de lo que cambió al otro lado: el tipo de decisiones que tomas, las habilidades que de repente importan y lo distintas que resultaron las entrevistas para senior.

## De hacer a decidir

Como junior o mid, la mayor parte del trabajo es ejecutar. Tomas un ticket, lo construyes bien, pasa la revisión y sale.

Como senior, cada vez más del trabajo es decidir. Qué enfoque tomar, qué sacrificas con él y cuánto te va a costar dentro de unos meses. Un ejemplo pequeño que he visto mil veces:

> "Usemos GraphQL, es moderno y quiero aprenderlo."

contra

> "¿De verdad necesitamos la flexibilidad de GraphQL o REST es más fácil de mantener aquí? ¿Alguien del equipo lo ha usado? ¿La curva de aprendizaje vale lo que ganamos?"

La segunda persona no necesariamente sabe más GraphQL. Sabe más del contexto. Toda decisión técnica cambia una cosa por otra: rendimiento contra mantenibilidad, velocidad ahora contra deuda después, probar algo nuevo contra mantener las cosas estables. En algún punto dejas de elegir lo interesante y empiezas a elegir lo que más impacto tiene.

## Liderar sin ser el jefe

Nadie me lo dijo al principio: los seniors lideran, con título o sin él. Algunos de los mejores liderazgos técnicos que he visto vinieron de gente sin ninguna autoridad formal.

En la práctica se ve así: mentorear juniors (enseñarles a pensar el problema, no solo darles la respuesta), empujar decisiones técnicas y lograr que el equipo se ponga de acuerdo, desbloquear al equipo cuando algo está trabado aunque no sea estrictamente tuyo, y poner los estándares que siguen los demás: documentación, plantillas, convenciones.

Al principio lo entendí al revés. Pensaba que liderar era decirle a la gente qué hacer. Se parece más a lo contrario: hacer que a los demás les sea más fácil hacer buen trabajo. Cuando un junior te trae un problema, la respuesta suele ser un par de buenas preguntas, no la solución. Así es como tu impacto crece más allá de lo que puedes programar tú solo.

## Las habilidades que empiezan a pesar más que el código

Lo técnico te abre la puerta. Lo demás es lo que te hace crecer. Como senior paso más tiempo comunicando que programando, revisando que escribiendo y planificando que ejecutando. Lo que más terminó importando:

**Comunicar.** Explicarle una decisión técnica a alguien que no es técnico, escribir documentación que la gente de verdad lea, dar feedback que ayude en vez de hundir.

**Empatía.** Darte cuenta de cuándo alguien del equipo está trabado o saturado, y saber cuándo presionar y cuándo respaldar.

**Pragmatismo.** Saber cuándo "suficientemente bueno" de verdad es suficiente. Lo perfecto es enemigo de lo que sale a producción.

**Ver el panorama completo.** Preguntar "¿por qué estamos construyendo esto?" antes que "¿cómo lo construimos?".

Nada de esto es un extra. He visto ingenieros brillantes estancarse años porque no lograban transmitir sus ideas o trabajar bien con otros.

## Las entrevistas para senior son otro juego

Esto fue lo que más me sorprendió. Las entrevistas de junior y mid eran casi todas ejercicios tipo LeetCode: implementa este algoritmo, rápido y con sintaxis limpia.

Las de senior fueron conversaciones. Diseño de sistemas, decisiones de arquitectura y sus trade-offs, charlas con CTOs y líderes de ingeniería, "cuéntame de una decisión técnica difícil que hayas tomado". Dan por hecho que sabes programar. Lo que quieren ver es cómo manejas un problema ambiguo, qué has construido y qué salió mal, cómo influyes en la gente sin autoridad y si puedes explicar cosas complejas con claridad.

He tenido entrevistas en las que casi no escribí código. Pasé una hora dibujando un sistema en una pizarra, discutiendo trade-offs y explicando por qué elegiría Postgres en vez de MongoDB para ese caso en particular. Fue una conversación profunda y técnica, pero sobre criterio, no sobre sintaxis.

## Lo que de verdad me ayudó a dar el salto

**Hazte cargo de resultados, no de tickets.** Si ves un problema, propone una solución. Si algo no está claro, acláralo para todos, no solo para ti.

**Mentorea a alguien.** Explicar te obliga a entender de verdad, y es la forma más barata de practicar liderazgo.

**Toma decisiones y escríbelas.** Aunque sean pequeñas. Los ADRs (Architecture Decision Records) son una gran práctica para explicar por qué elegiste una opción sobre otra.

**Comunica más.** Escribe más, habla en las reuniones, da alguna charla de vez en cuando. Mientras más claro seas, más cuenta tu trabajo.

**Aprende del negocio.** Entiende por qué construyes lo que construyes. Habla con producto. El código es un medio, no el objetivo.

**Conoce gente fuera de tu equipo.** Buena parte del valor de un senior es saber con quién hablar y cómo mover las cosas dentro de la organización.

## La versión corta

Volverse senior es sobre todo un cambio en lo que intentas demostrar. Pasas de "tengo que demostrar que soy inteligente" a "necesito que al equipo le vaya bien", de "quiero la tecnología más nueva" a "quiero la tecnología correcta" y de "puedo hacerlo solo" a "¿cómo lo hacemos juntos?".

No es una línea recta y es distinto para cada persona. Si tuviera que resumirlo en una frase: los seniors hacen mejores a los que tienen alrededor. Enfócate en el impacto más que en el volumen, comunica más de lo que crees necesario, lidera haciendo que otros rindan y aprende del negocio tanto como de la tecnología. El título llega solo.
`,
    author: 'Sebastian Alvarez',
    tags: ['Crecimiento Profesional', 'Liderazgo', 'Ingeniero Senior', 'Habilidades Blandas', 'Entrevistas', 'Mentoría']
  }
};
