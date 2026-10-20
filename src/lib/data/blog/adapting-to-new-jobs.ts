import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const adaptingToNewJobs: Record<Locale, BlogPost> = {
  en: {
    slug: 'adapting-to-new-jobs',
    title: 'Adapting to New Jobs: From Well-Structured Teams to Chaotic Startups',
    date: 'February 10, 2026',
    excerpt: 'I have joined teams with great processes and teams in total chaos. How to spot the difference in the interview, what to do in the first two weeks, and how to improve things without burning out.',
    imageUrl: '/blog/adapting-to-new-jobs.webp',
    imageAiHint: 'split screen showing two contrasting developer work environments: left side shows organized modern office with clear processes, documentation, structured meetings, clean code reviews, automated pipelines; right side shows chaotic startup with scattered notes, endless meetings, micromanagement, manual deployments, confusion; developer in center navigating between both worlds, professional illustration',
    content: `
## Same job, very different companies

I've worked at companies on both ends of the spectrum. Some had well-documented processes, clear roles, automated deploys and structured sprints. Others had documentation scattered across Slack threads, leads who micromanaged, back-to-back meetings and no tests at all.

What surprised me is that the technical work was often pretty similar. What changed was everything around it: the culture, the processes, how people talk to each other and how decisions get made.

This post is what I've learned about spotting those differences before you sign, adapting fast once you're in, and improving things without burning out. Adapting to a new job isn't only learning the codebase. It's figuring out how the company actually works, and where you fit in it.

## Two first months

Picture day one at two different places.

At the structured one, there's an onboarding doc that's actually up to date. Your tech lead has time to show you around. Roles are clear, CI/CD is automated, code reviews are there to help and not to gatekeep, meetings have an agenda, tests are expected, infrastructure lives in code and important decisions are written down in ADRs. You can focus on building. You're contributing in week two and productive by week four.

At the chaotic one, onboarding is "ask someone if you get stuck". The tech lead is buried in meetings. Everyone does a bit of everything. Deploys are manual and stressful, code reviews are either missing or brutally nitpicky, meetings never end, testing is "nice to have", nobody fully knows how the infrastructure works, and decisions are made in Slack and forgotten the next day. Week one is confusing, week two is frustrating, and by week four you're wondering if you should leave.

Both could be building the exact same product. Working there feels completely different.

## Red flags in the interview

The good news is you can usually see this coming before you accept the offer.

**A vague job description.** "A full-stack developer who can wear many hats" often means nobody has defined the role. Companies that know what they need write specific descriptions. Ask: "What does a normal day look like in this role?"

**An interview that asks for too much.** Building a full project, debugging something from their production, and a complex system design, all in one round. That isn't measuring skill, it's testing how desperate you are. If the process feels disorganized or keeps growing, the job will feel the same.

**Vague answers about process.** Ask how they deploy and how they test, and listen closely. "Automated pipelines, every PR needs tests and a review, staging first and then production" is a good sign. "We deploy when it's ready, testing is important but we're always in a hurry" tells you plenty.

**A tech lead who's clearly overwhelmed.** If the person interviewing you can barely focus on the conversation, they won't have time to help you later either.

**Different people, different answers.** If two interviewers describe the same thing in different ways, nobody agrees on how things work.

## The first two weeks: watch before you act

You took the job. Now what?

In week one, your job is to gather information, not to be productive. Read the documentation (or notice there isn't any), sit in meetings and listen to how decisions get made, ask a lot of questions and don't try to fix anything yet. Pay attention to who actually decides things. It's often not who the org chart says.

By week two you'll start seeing the real process, not the official one. Is the documentation current? Do people follow the process or work around it? Where do things get stuck? Who has influence, regardless of title?

## If you landed somewhere structured

Your job is easy: follow the process and contribute. Read the docs properly, respect the review process (it's there for a reason), ask for help (people have time) and suggest improvements gradually. The real risk here is getting too comfortable and stopping growing. Watch out for that.

## If you landed in chaos

This is the hard one. A few things that have worked for me, in this order.

**Don't try to fix everything.** Your instinct will be to improve things right away. Hold off. You don't have the full context yet.

**Understand why it's chaotic.** There's usually a reason. An early startup that's been moving too fast to build process. Leadership that doesn't value process. A team so understaffed everyone is in survival mode. Years of shipping fast that are now catching up. The cause changes how you should respond.

**Set your own boundaries.** In chaotic places everyone pulls you in every direction, so protect your focus. Ask whether you really need to be in a meeting. Check Slack at set times instead of all day. Ask your manager exactly what you're responsible for. And when a task is unclear, ask what "done" looks like before starting.

**Improve gradually, and with buy-in.** Something like: "I noticed the payments module has no automated tests, and that worries me. Could I spend a few hours this week setting up a basic suite?" You're showing you understand the problem, you're offering a fix instead of a complaint, you're asking instead of imposing, and you're taking initiative.

**Write things down.** In chaotic companies the documentation usually doesn't exist. Start it yourself: how to set up the environment, how deploys work, architecture decisions, the usual gotchas. It helps whoever comes next, and it makes you very hard to replace.

## Communication works everywhere

In a structured company, use the channels that exist, ask in the right place, document your decisions and keep reviews constructive.

In a chaotic one, communicate more than feels necessary. Because there's no process, you have to be explicit. Write things in documents, not only in Slack. Confirm expectations ("so, to be sure: I own X, Y and Z, right?"). And bring proposals, not just problems: "we don't have a deployment process, here's what I suggest".

## Figuring out how the company really works

Every company has its own way of operating, and understanding it tells you how to move. A few questions I ask myself:

- How are decisions made? By the CEO, by consensus, or by whoever shouts loudest?
- What matters most here: speed, quality, stability, innovation?
- How do people communicate: formal meetings, Slack, hallway chats?
- What happens when someone disagrees: healthy debate, avoidance, or the hierarchy wins?
- How are failures handled: something to learn from, a career problem, or ignored?

## Proactivity is what gets you to senior

In a structured company you can be productive just by following the process. In a chaotic one, you have to create the structure. That's exactly where a mid-level engineer starts acting like a senior.

The difference is in how you say it:

- Instead of "the code is a mess and nobody documents anything": "I'll spend a few hours this week documenting the architecture, this is what I plan to cover. Would that help?"
- Instead of "we have no tests and deploys are scary": "the critical paths have no automated tests. Can I set up a basic suite for payments? About four hours."
- Instead of "there are too many meetings": "we have 15 meetings a week. Can we review which ones we actually need? Happy to help organize it."

Same problems, but you go from complaining to proposing.

## When to stay and when to leave

Sometimes no amount of adapting is enough, and it's worth knowing when.

It's worth staying if the chaos is temporary (a startup that's growing into its processes), if leadership is open to improving, if the work is interesting, if you're learning a lot, or if the pay justifies the stress.

It's worth leaving if leadership actively resists improving things, if you're burning out, if the work is boring and you've stopped learning, if the pay doesn't make up for the stress, or if your mental health is taking the hit.

There's nothing wrong with leaving. Sometimes a company just isn't a fit.

## What I'd keep from all this

Your career is long and you'll go through many companies. Some will be great, some terrible, most somewhere in between. The skill isn't finding the perfect one. It's adapting to whichever one you're in while you protect your own growth and wellbeing.

Read the place before you act, communicate clearly (especially when there's chaos), bring solutions instead of complaints, don't burn yourself out trying to fix everything, and know when it's time to go.
`,
    author: 'Sebastian Alvarez',
    tags: ['Career', 'Company Culture', 'Onboarding', 'Communication', 'Adaptation', 'Seniority']
  },
  es: {
    slug: 'adapting-to-new-jobs',
    title: 'Adaptarte a un trabajo nuevo: de equipos ordenados a startups caóticas',
    date: 'February 10, 2026',
    excerpt: 'He entrado a equipos con procesos impecables y a equipos en caos total. Cómo notar la diferencia en la entrevista, qué hacer las dos primeras semanas y cómo mejorar las cosas sin quemarte.',
    imageUrl: '/blog/adapting-to-new-jobs.webp',
    imageAiHint: 'split screen showing two contrasting developer work environments: left side shows organized modern office with clear processes, documentation, structured meetings, clean code reviews, automated pipelines; right side shows chaotic startup with scattered notes, endless meetings, micromanagement, manual deployments, confusion; developer in center navigating between both worlds, professional illustration',
    content: `
## El mismo trabajo, empresas muy distintas

He trabajado en empresas de los dos extremos. Algunas tenían procesos bien documentados, roles claros, despliegues automatizados y sprints ordenados. Otras tenían la documentación regada en hilos de Slack, líderes que hacían micromanagement, reuniones una tras otra y cero pruebas.

Lo que me sorprendió es que el trabajo técnico muchas veces era bastante parecido. Lo que cambiaba era todo lo de alrededor: la cultura, los procesos, cómo se habla la gente y cómo se toman las decisiones.

Este post va de lo que he aprendido para detectar esas diferencias antes de firmar, adaptarte rápido una vez adentro y mejorar las cosas sin quemarte. Adaptarte a un trabajo nuevo no es solo aprender el código. Es entender cómo funciona de verdad la empresa y dónde encajas tú.

## Dos primeros meses

Imagina el primer día en dos lugares distintos.

En la empresa ordenada hay un documento de onboarding que de verdad está al día. Tu tech lead tiene tiempo para mostrarte cómo funciona todo. Los roles están claros, el CI/CD es automático, los code reviews están para ayudar y no para poner trabas, las reuniones tienen agenda, se espera que escribas pruebas, la infraestructura vive en código y las decisiones importantes quedan escritas en ADRs. Puedes enfocarte en construir. En la segunda semana ya aportas y en la cuarta eres productivo.

En la caótica, el onboarding es "pregunta si te trabas". El tech lead está enterrado en reuniones. Todos hacen un poco de todo. Los despliegues son manuales y estresantes, los code reviews o no existen o son quisquillosos a muerte, las reuniones no se acaban, las pruebas son "deseables", nadie sabe del todo cómo funciona la infraestructura y las decisiones se toman en Slack y se olvidan al día siguiente. La primera semana es confusa, la segunda frustrante y en la cuarta ya te estás preguntando si deberías irte.

Las dos podrían estar construyendo exactamente el mismo producto. Trabajar ahí se siente completamente distinto.

## Señales de alerta en la entrevista

La buena noticia es que normalmente se ve venir antes de aceptar la oferta.

**Una descripción del puesto vaga.** "Un desarrollador full-stack que pueda ponerse muchos sombreros" muchas veces significa que nadie definió el rol. Las empresas que saben lo que necesitan escriben descripciones concretas. Pregunta: "¿Cómo es un día normal en este puesto?".

**Una entrevista que te pide demasiado.** Construir un proyecto completo, depurar algo de su producción y un diseño de sistemas complejo, todo en una sola ronda. Eso no mide habilidad, mide qué tan desesperado estás. Si el proceso se siente desordenado o no para de crecer, el trabajo se va a sentir igual.

**Respuestas vagas sobre el proceso.** Pregunta cómo despliegan y cómo prueban, y escucha con atención. "Pipelines automatizados, cada PR lleva pruebas y revisión, primero staging y después producción" es buena señal. "Desplegamos cuando está listo, las pruebas son importantes pero siempre andamos apurados" te dice mucho.

**Un tech lead claramente desbordado.** Si quien te entrevista casi no puede concentrarse en la conversación, tampoco va a tener tiempo para ayudarte después.

**Distinta gente, distintas respuestas.** Si dos entrevistadores describen lo mismo de forma diferente, nadie está de acuerdo en cómo funcionan las cosas.

## Las dos primeras semanas: mirar antes de actuar

Aceptaste el trabajo. ¿Y ahora?

En la primera semana tu trabajo es recoger información, no ser productivo. Lee la documentación (o date cuenta de que no hay), métete en las reuniones y escucha cómo se deciden las cosas, pregunta mucho y no intentes arreglar nada todavía. Fíjate en quién decide de verdad. Muchas veces no es quien dice el organigrama.

En la segunda semana empiezas a ver el proceso real, no el oficial. ¿La documentación está al día? ¿La gente sigue el proceso o le da la vuelta? ¿Dónde se traban las cosas? ¿Quién tiene influencia, más allá del cargo?

## Si caíste en un lugar ordenado

Tu trabajo es fácil: sigue el proceso y aporta. Lee bien la documentación, respeta el proceso de revisión (está ahí por algo), pide ayuda (la gente tiene tiempo) y sugiere mejoras de a poco. El riesgo real aquí es acomodarte demasiado y dejar de crecer. Cuídate de eso.

## Si caíste en el caos

Este es el difícil. Algunas cosas que me han funcionado, en este orden.

**No intentes arreglarlo todo.** Tu instinto va a ser mejorar las cosas ya. Aguanta. Todavía no tienes el contexto completo.

**Entiende por qué hay caos.** Casi siempre hay una razón. Una startup temprana que ha ido demasiado rápido para armar procesos. Un liderazgo que no valora los procesos. Un equipo tan corto de gente que todos están en modo supervivencia. Años de sacar cosas rápido que ahora pasan factura. La causa cambia cómo deberías responder.

**Pon tus propios límites.** En lugares caóticos todos te jalan para todos lados, así que protege tu foco. Pregunta si de verdad tienes que estar en una reunión. Revisa Slack a horas fijas y no todo el día. Pregúntale a tu jefe exactamente de qué eres responsable. Y cuando una tarea no esté clara, pregunta cómo se ve "terminado" antes de empezar.

**Mejora de a poco y con apoyo.** Algo como: "Vi que el módulo de pagos no tiene pruebas automatizadas y eso me preocupa. ¿Podría dedicar unas horas esta semana a armar una suite básica?". Muestras que entiendes el problema, ofreces una solución en vez de una queja, pides en vez de imponer y tomas la iniciativa.

**Escribe las cosas.** En las empresas caóticas la documentación normalmente no existe. Empiézala tú: cómo montar el entorno, cómo funcionan los despliegues, las decisiones de arquitectura, las trampas de siempre. Le sirve a quien venga después, y te vuelve muy difícil de reemplazar.

## Comunicar funciona en todos lados

En una empresa ordenada, usa los canales que existen, pregunta en el lugar correcto, documenta tus decisiones y mantén las revisiones constructivas.

En una caótica, comunica más de lo que parece necesario. Como no hay proceso, tienes que ser explícito. Deja las cosas en documentos, no solo en Slack. Confirma expectativas ("para estar seguro: yo me encargo de X, Y y Z, ¿cierto?"). Y lleva propuestas, no solo problemas: "no tenemos un proceso de despliegue, esto es lo que propongo".

## Entender cómo funciona de verdad la empresa

Cada empresa tiene su propia forma de operar, y entenderla te dice cómo moverte. Algunas preguntas que me hago:

- ¿Cómo se toman las decisiones? ¿El CEO, por consenso o quien grita más fuerte?
- ¿Qué importa más aquí: velocidad, calidad, estabilidad, innovación?
- ¿Cómo se comunica la gente: reuniones formales, Slack, conversaciones de pasillo?
- ¿Qué pasa cuando alguien no está de acuerdo: debate sano, se evita el tema o gana la jerarquía?
- ¿Cómo se manejan los errores: algo de lo que aprender, un problema para tu carrera o se ignoran?

## La proactividad es lo que te lleva a senior

En una empresa ordenada puedes ser productivo solo siguiendo el proceso. En una caótica, tienes que crear la estructura. Ahí es justamente donde un mid empieza a comportarse como senior.

La diferencia está en cómo lo dices:

- En vez de "el código es un desastre y nadie documenta nada": "voy a dedicar unas horas esta semana a documentar la arquitectura, esto es lo que pienso cubrir. ¿Les sirve?"
- En vez de "no tenemos pruebas y desplegar da miedo": "los flujos críticos no tienen pruebas automatizadas. ¿Puedo armar una suite básica para pagos? Son unas cuatro horas."
- En vez de "hay demasiadas reuniones": "tenemos 15 reuniones a la semana. ¿Revisamos cuáles necesitamos de verdad? Feliz de ayudar a organizarlo."

Los mismos problemas, pero pasas de quejarte a proponer.

## Cuándo quedarte y cuándo irte

A veces no hay forma de adaptarse lo suficiente, y vale la pena saber cuándo.

Vale la pena quedarte si el caos es temporal (una startup que está creciendo hacia sus procesos), si el liderazgo está abierto a mejorar, si el trabajo es interesante, si estás aprendiendo mucho o si el sueldo justifica el estrés.

Vale la pena irte si el liderazgo se resiste activamente a mejorar, si te estás quemando, si el trabajo es aburrido y dejaste de aprender, si el sueldo no compensa el estrés o si tu salud mental lo está pagando.

No tiene nada de malo irse. A veces una empresa simplemente no es para ti.

## Con qué me quedo

Tu carrera es larga y vas a pasar por muchas empresas. Algunas van a ser buenísimas, otras terribles, y la mayoría algo intermedio. La habilidad no es encontrar la perfecta. Es adaptarte a la que te toque mientras cuidas tu propio crecimiento y tu bienestar.

Lee el lugar antes de actuar, comunica con claridad (sobre todo cuando hay caos), lleva soluciones en vez de quejas, no te quemes intentando arreglarlo todo y aprende a reconocer cuándo es momento de irte.
`,
    author: 'Sebastian Alvarez',
    tags: ['Carrera', 'Cultura Empresarial', 'Onboarding', 'Comunicación', 'Adaptación', 'Seniority']
  }
};
