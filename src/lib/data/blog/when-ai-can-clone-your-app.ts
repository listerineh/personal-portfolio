import type { BlogPost } from "@/types";
import type { Locale } from "@/i18n/config";

const enContent = `## Thirteen apps on a Sunday

A few days ago I opened [getartcraft.com/apps](https://getartcraft.com/apps) and spent a good while just scrolling. Thirteen apps: an image editor, a vector tool, video, photography, PDFs, motion graphics, page layout, interface design, word processing, audio, presentations, CAD and spreadsheets. Native for macOS, Windows and Linux, most of them also running in the browser. All open source. All free.

My first reaction was pure excitement. I've been a fan of free software for as long as I've been writing code, and here was something that looked like a complete creative suite that anyone, anywhere, could download without a credit card.

My second reaction took a few minutes longer to arrive, and it hasn't left since. This post is about that second reaction.

## What ArtCraft is, and what it isn't

It's worth being precise here, because the details matter.

On October 7, Phoronix covered the project with a headline that sums it up: AI makes "open-source, clean room" implementations of Adobe Photoshop and Premiere. The ArtCraft team describes PhotoCraft, FilmCraft and LightCraft as clean-room reimplementations of Photoshop, Premiere and Lightroom, written from scratch in Rust. According to Phoronix's coverage, they were built mostly with Claude Code and AI agents.

This isn't a pirated copy. There's no leaked Adobe code in those repositories. The apps reproduce the experience: in the project's own words, "layouts, tools and shortcuts that working professionals already know, so there's nothing to relearn". Every app can also be driven by an AI agent through a command line, a JSON channel or an MCP server.

They're also honest about where they stand. PhotoCraft's README says it's in early alpha and "is not yet a Photoshop replacement for daily professional work". It's missing generative features, a handful of tools, depth in typography and plugin compatibility. And yet every Photoshop menu item is already wired to a command.

That last sentence is the one that kept me up. Not because it's finished, but because of how far it got, how fast, and how it got there.

## The protection that never really was

For decades, a lot of us lived with a comfortable assumption: if you ship a compiled binary, an installer, an app in the store, your code is reasonably safe. Nobody's going to rebuild your product from a \`.exe\`.

That was never quite true. Reverse engineering is as old as software. In the early eighties, Compaq built an IBM-compatible BIOS using a clean room: one team studied how the original behaved and wrote a specification, and a separate team that had never seen the code wrote a new implementation from that document. Phoenix later sold clean-room BIOSes to anyone who wanted to build a PC. In 1992, a US court ruled in Sega v. Accolade that disassembling code to achieve compatibility could be fair use. In 2021, the US Supreme Court ruled in Google's favor for reimplementing the Java APIs. In Europe, the Software Directive explicitly allows decompiling a program, without the owner's permission, when it's indispensable to achieve interoperability.

So what actually protected companies wasn't the binary. It was the cost. Rebuilding something like Photoshop took years, specialized people and a lot of money. The obfuscation was a speed bump; the real wall was time.

AI is tearing that wall down.

Tools like [REA](https://rea.tools/) (open source, MIT license) connect a coding agent to the same decompilers and debuggers security researchers have used for years: Ghidra, IDA, Hopper, JEB. You ask your agent how a feature of an app works, and it inspects the binary or the shipped code to answer. Their demo takes a version of Chrome's offline dinosaur game, recovers the exact acceleration rule from the code and rebuilds it in a small playable example. Their project includes an [agent skill](https://github.com/morluto/rea/blob/main/.agents/skills/reverse-engineer-anything/SKILL.md) that covers native binaries, Electron apps, Android packages, firmware and web applications.

To be fair to REA: its documentation says it's for lawful research, education, interoperability, software preservation and analysis of software you own or are authorized to examine, and it explicitly rejects cracked tools and license bypassing. Most of the people who use this kind of tool are studying malware, keeping old software alive or making things work together. That's legitimate and valuable work.

But a tool doesn't choose who uses it. What used to take a team of specialists months now fits in a conversation with an agent. Research on LLM-based decompilation keeps improving year after year, and every new model is better at reading code it was never meant to read.

## The two halves of my head

This is where I get stuck.

The half of me that believes in free software sees something wonderful. A student in Quito who can't afford a creative suite subscription gets professional tools. A small organization stops depending on a vendor. Knowledge that was locked inside a few companies becomes shared. For years I've argued that software should be something we build together, not something rented to us.

The other half of me looks at the numbers. According to its latest annual report, Adobe has 31,360 employees. That's 31,360 people with rent, kids, mortgages and careers built over decades. And that's just one company, the one that happens to be in this headline. Behind every product that an agent can now reimplement in a few weeks, there are teams of people who spent years designing, testing, supporting and improving it.

It's not that I want to defend a corporation. It's that I can't pretend the work of all those people is worth nothing just because a machine can now imitate the result.

## It doesn't only happen to the big ones

What surprised me most is that the same machinery cuts in the other direction too.

In March of this year, the maintainer of chardet, a Python library downloaded millions of times, released version 7.0 as a complete rewrite made with Claude Code, from a design document, in an empty repository. With the rewrite, the license changed from LGPL to MIT. The original author of the project objected: in his view, it was an explicit violation of the LGPL, because the maintainer had known the original code for years, so it couldn't be a real clean room. No court has ruled on it.

Think about what that means. The same technique that allows rebuilding Photoshop without Adobe's code also allows "washing" the license of an open-source project. Copyleft, the tool free software has used for decades to protect the commons, depends on the code being recognized as a derivative work. If an agent can produce something functionally equivalent that doesn't count as a copy, that protection gets weaker too.

And there's another layer. In March, the US Supreme Court declined to hear the appeal over whether a work generated by AI can have copyright, which leaves in place the rule that it needs human authorship. So we're in a strange situation: code written mostly by an agent may not be protected by anyone, and code written by people can be imitated by an agent in a way that might not count as copying.

## The question I keep asking myself

As a developer who has thought about building products, my question is very concrete: does it still make sense to have a good idea and launch an app?

Because if I spend two years building something good, and in a few weeks an agent can clone the experience, publish it for free and take away the reason anyone would pay for mine, what was the point?

The market has been asking itself the same thing. In February, software stocks went through what analysts called the "SaaSpocalypse": depending on the measure, around a trillion dollars in market value disappeared in a matter of days over the fear that AI agents would replace entire categories of software. Part of it recovered later, but the fear didn't go away.

I don't have an answer, but I do have some hunches about what still seems hard to copy:

- **What never leaves your servers.** If the valuable part of your product runs in your infrastructure, there's no binary to decompile. That's probably part of why so much software already lives behind an API.
- **Data and network effects.** You can clone an interface. It's much harder to clone ten years of data, or a community where everyone's already there.
- **Trust.** Support, security, stability, someone to call when something breaks. Companies don't only buy features, they buy someone who answers.
- **Speed.** If you can clone it in weeks, maybe the advantage is in being weeks ahead all the time, and in knowing your users better than anyone.

Even so, I'm not sure about any of this. All of those advantages are also being tested by the same tools.

## What we don't know yet

The honest part is that there are more questions than answers:

- Is something truly a clean room when the model that wrote it was trained on half the internet, maybe including the code it's imitating?
- Can a law written for human teams in the eighties keep up with an agent that reimplements an app in a few weeks?
- If the license of an open-source project can be "washed" with a rewrite, what's left of copyleft?
- What happens to the people whose work was to build what can now be replicated?
- And on the other side: what happens to the people who never had access to these tools and now do?

## Neither for nor against

I didn't write this to defend Adobe or to attack ArtCraft. I think what that project achieved is impressive, and I suspect it's just the first of many. I also think the companies and people who make software are facing something they had never faced before.

What I feel is closer to worry than to a stance. Worry about the present, because this is already happening and most of us are still assuming that shipping a binary protects us. And worry about the future, because I don't know what a good idea will be worth when copying it costs almost nothing.

Maybe the answer ends up being that what can't be copied was never the code. Maybe it's the people, the relationships and the judgment behind each decision. I'd like to believe that. But for now it's a hope, not a certainty.

If you've thought about this too, from either side, I'd really like to read you.

## References and further reading

- **Crafting Apps, the ArtCraft suite.** [getartcraft.com/apps](https://getartcraft.com/apps)
- **Phoronix, "AI Makes 'Open-Source, Clean Room' Implementations Of Adobe Photoshop & Premier In Rust" (October 7, 2026).** [phoronix.com](https://www.phoronix.com/news/Photocraft-Filmcraft-AI)
- **PhotoCraft, repository and project status.** [github.com/storytold/photocraft](https://github.com/storytold/photocraft)
- **REA, reverse engineering for coding agents.** [rea.tools](https://rea.tools/) · [github.com/morluto/rea](https://github.com/morluto/rea)
- **LWN, "The relicensing of chardet".** [lwn.net](https://lwn.net/Articles/1061534/)
- **Adobe, Form 10-K for fiscal year 2025 (headcount).** [sec.gov](https://www.sec.gov/Archives/edgar/data/796343/000079634326000003/adbe-20251128.htm)
- **Forbes, "SaaSpocalypse Now? AI Is Disrupting SaaS, But Not All Software Is Doomed" (February 2026).** [forbes.com](https://www.forbes.com/sites/petercohan/2026/02/06/saaspocalypse-now-ai-is-disrupting-saas---but-not-all-software-is-doomed/)
- **Directive 2009/24/EC, Article 6: decompilation for interoperability.** [legislation.gov.uk](https://www.legislation.gov.uk/eudr/2009/24/article/6)
- **LLM4Decompile: decompiling binary code with large language models.** [arxiv.org](https://arxiv.org/abs/2403.05286)
`;

const esContent = `## Trece apps un domingo

Hace unos días abrí [getartcraft.com/apps](https://getartcraft.com/apps) y me quedé un buen rato solo bajando. Trece apps: editor de imágenes, de vectores, de video, de fotografía, de PDF, gráficos animados, maquetación, diseño de interfaces, procesador de texto, audio, presentaciones, CAD y hojas de cálculo. Nativas para macOS, Windows y Linux, y la mayoría también corre en el navegador. Todas open source. Todas gratis.

Mi primera reacción fue pura emoción. Soy fan del software libre desde que escribo código, y aquí había algo que parecía una suite creativa completa que cualquiera, en cualquier parte del mundo, podía descargar sin tarjeta de crédito.

La segunda reacción tardó unos minutos más en llegar, y desde entonces no se ha ido. Este post es sobre esa segunda reacción.

## Qué es ArtCraft, y qué no es

Vale la pena ser preciso, porque los detalles importan.

El 7 de octubre, Phoronix cubrió el proyecto con un titular que lo resume: la IA crea implementaciones "open source y de sala limpia" de Adobe Photoshop y Premiere. El equipo de ArtCraft describe a PhotoCraft, FilmCraft y LightCraft como reimplementaciones de sala limpia (*clean room*) de Photoshop, Premiere y Lightroom, escritas desde cero en Rust. Según Phoronix, fueron construidas principalmente con Claude Code y agentes de IA.

No es una copia pirata. No hay código filtrado de Adobe en esos repositorios. Las apps reproducen la experiencia: en palabras del propio proyecto, "layouts, herramientas y atajos que los profesionales ya conocen, así que no hay nada que volver a aprender". Además, cada app se puede manejar con un agente de IA desde la terminal, un canal JSON o un servidor MCP.

También son honestos sobre dónde están. El README de PhotoCraft dice que está en alfa temprana y que "todavía no reemplaza a Photoshop para el trabajo profesional diario". Le faltan funciones generativas, varias herramientas, profundidad en tipografía y compatibilidad con plugins. Y aun así, cada opción del menú de Photoshop ya está conectada a un comando.

Esa última frase es la que me quitó el sueño. No porque esté terminado, sino por lo lejos que llegó, lo rápido que llegó y cómo llegó.

## La protección que nunca fue

Durante décadas, muchos vivimos con una suposición cómoda: si entregas un binario compilado, un instalador, una app en la tienda, tu código está más o menos a salvo. Nadie va a reconstruir tu producto a partir de un \`.exe\`.

Eso nunca fue del todo cierto. La ingeniería inversa es tan vieja como el software. A inicios de los ochenta, Compaq construyó una BIOS compatible con la de IBM usando una sala limpia: un equipo estudiaba cómo se comportaba la original y escribía una especificación, y otro equipo que nunca había visto el código escribía una implementación nueva a partir de ese documento. Después, Phoenix vendió BIOS de sala limpia a cualquiera que quisiera fabricar una PC. En 1992, una corte de Estados Unidos decidió en Sega contra Accolade que desensamblar código para lograr compatibilidad podía ser uso legítimo. En 2021, la Corte Suprema de Estados Unidos le dio la razón a Google por haber reimplementado las APIs de Java. En Europa, la directiva de programas de ordenador permite expresamente descompilar un programa, sin permiso del dueño, cuando es indispensable para lograr interoperabilidad.

Entonces, lo que realmente protegía a las empresas no era el binario. Era el costo. Reconstruir algo como Photoshop tomaba años, gente muy especializada y mucho dinero. La ofuscación era un reductor de velocidad; el muro de verdad era el tiempo.

La IA está tirando ese muro.

Herramientas como [REA](https://rea.tools/) (open source, licencia MIT) conectan un agente de programación con los mismos descompiladores y depuradores que los investigadores de seguridad usan desde hace años: Ghidra, IDA, Hopper, JEB. Le preguntas a tu agente cómo funciona una parte de una app, y él inspecciona el binario o el código distribuido para responder. Su demo toma una versión del juego del dinosaurio de Chrome, recupera del código la regla exacta de aceleración y la reconstruye en un pequeño ejemplo jugable. El proyecto incluye una [skill para agentes](https://github.com/morluto/rea/blob/main/.agents/skills/reverse-engineer-anything/SKILL.md) que cubre binarios nativos, apps de Electron, paquetes de Android, firmware y aplicaciones web.

Para ser justo con REA: su documentación dice que es para investigación legal, educación, interoperabilidad, preservación de software y análisis de software que te pertenece o que estás autorizado a examinar, y rechaza explícitamente las herramientas crackeadas y saltarse licencias. La mayoría de quienes usan este tipo de herramientas estudian malware, mantienen vivo software viejo o hacen que las cosas funcionen entre sí. Es un trabajo legítimo y valioso.

Pero una herramienta no elige quién la usa. Lo que antes le tomaba meses a un equipo de especialistas ahora cabe en una conversación con un agente. La investigación sobre descompilación con modelos de lenguaje mejora año tras año, y cada modelo nuevo lee mejor código que nunca fue pensado para ser leído.

## Las dos mitades de mi cabeza

Aquí es donde me trabo.

La mitad de mí que cree en el software libre ve algo maravilloso. Un estudiante en Quito que no puede pagar la suscripción de una suite creativa tiene herramientas profesionales. Una organización pequeña deja de depender de un proveedor. Conocimiento que estaba encerrado en pocas empresas pasa a ser compartido. Durante años he defendido que el software debería ser algo que construimos juntos, no algo que nos alquilan.

La otra mitad mira los números. Según su último reporte anual, Adobe tiene 31.360 empleados. Son 31.360 personas con arriendo, hijos, hipotecas y carreras construidas durante décadas. Y es solo una empresa, la que casualmente está en este titular. Detrás de cada producto que un agente ahora puede reimplementar en pocas semanas hay equipos de personas que pasaron años diseñándolo, probándolo, dándole soporte y mejorándolo.

No es que quiera defender a una corporación. Es que no puedo hacer como si el trabajo de toda esa gente no valiera nada solo porque ahora una máquina puede imitar el resultado.

## No solo les pasa a los grandes

Lo que más me sorprendió es que la misma maquinaria corta también en la otra dirección.

En marzo de este año, el mantenedor de chardet, una librería de Python con millones de descargas, publicó la versión 7.0 como una reescritura completa hecha con Claude Code, a partir de un documento de diseño, en un repositorio vacío. Con la reescritura, la licencia pasó de LGPL a MIT. El autor original del proyecto se opuso: para él era una violación explícita de la LGPL, porque el mantenedor conocía el código original desde hacía años, así que no podía ser una sala limpia de verdad. Ninguna corte se ha pronunciado.

Piensa en lo que eso significa. La misma técnica que permite reconstruir Photoshop sin el código de Adobe permite también "lavar" la licencia de un proyecto open source. El copyleft, la herramienta que el software libre usó durante décadas para proteger lo común, depende de que el código se reconozca como obra derivada. Si un agente puede producir algo funcionalmente equivalente que no cuenta como copia, esa protección también se debilita.

Y hay otra capa. En marzo, la Corte Suprema de Estados Unidos se negó a revisar el caso sobre si una obra generada por IA puede tener derechos de autor, y quedó en pie la regla de que se necesita autoría humana. Estamos en una situación rara: el código escrito casi todo por un agente quizá no lo proteja nadie, y el código escrito por personas puede imitarlo un agente de una forma que quizá no cuente como copia.

## La pregunta que me hago

Como desarrollador que alguna vez pensó en construir productos, mi pregunta es muy concreta: ¿sigue teniendo sentido tener una buena idea y lanzar una app?

Porque si paso dos años construyendo algo bueno, y en pocas semanas un agente puede clonar la experiencia, publicarla gratis y quitarle a la gente la razón para pagar por la mía, ¿para qué?

El mercado se ha hecho la misma pregunta. En febrero, las acciones de empresas de software pasaron por lo que los analistas llamaron el "SaaSpocalypse": según cómo se mida, alrededor de un billón de dólares en valor de mercado desapareció en cuestión de días por el miedo a que los agentes de IA reemplacen categorías enteras de software. Una parte se recuperó después, pero el miedo no se fue.

No tengo una respuesta, pero sí algunas intuiciones sobre lo que todavía parece difícil de copiar:

- **Lo que nunca sale de tus servidores.** Si la parte valiosa de tu producto corre en tu infraestructura, no hay binario que descompilar. Probablemente es parte de por qué tanto software ya vive detrás de una API.
- **Los datos y los efectos de red.** Puedes clonar una interfaz. Es mucho más difícil clonar diez años de datos, o una comunidad donde todos ya están.
- **La confianza.** Soporte, seguridad, estabilidad, alguien a quien llamar cuando algo se rompe. Las empresas no compran solo funciones, compran a alguien que responde.
- **La velocidad.** Si te pueden clonar en semanas, quizá la ventaja está en ir siempre unas semanas adelante, y en conocer a tus usuarios mejor que nadie.

Aun así, no estoy seguro de nada de esto. Todas esas ventajas también las están poniendo a prueba las mismas herramientas.

## Lo que todavía no sabemos

La parte honesta es que hay más preguntas que respuestas:

- ¿Es de verdad una sala limpia cuando el modelo que escribió el código fue entrenado con medio internet, quizá incluyendo el código que está imitando?
- ¿Puede una ley pensada para equipos humanos en los ochenta seguirle el paso a un agente que reimplementa una app en pocas semanas?
- Si la licencia de un proyecto open source se puede "lavar" con una reescritura, ¿qué queda del copyleft?
- ¿Qué pasa con las personas cuyo trabajo era construir lo que ahora se puede replicar?
- Y del otro lado: ¿qué pasa con las personas que nunca tuvieron acceso a estas herramientas y ahora sí?

## Ni a favor ni en contra

No escribí esto para defender a Adobe ni para atacar a ArtCraft. Creo que lo que logró ese proyecto es impresionante, y sospecho que es solo el primero de muchos. También creo que las empresas y las personas que hacen software están frente a algo que nunca habían enfrentado.

Lo que siento se parece más a una preocupación que a una postura. Preocupación por el presente, porque esto ya está pasando y la mayoría seguimos suponiendo que entregar un binario nos protege. Y preocupación por el futuro, porque no sé cuánto va a valer una buena idea cuando copiarla cueste casi nada.

Quizá la respuesta termine siendo que lo que no se puede copiar nunca fue el código. Quizá sean las personas, las relaciones y el criterio detrás de cada decisión. Me gustaría creerlo. Pero por ahora es una esperanza, no una certeza.

Si tú también has pensado en esto, desde cualquiera de los dos lados, me gustaría mucho leerte.

## Referencias y lecturas

- **Crafting Apps, la suite de ArtCraft.** [getartcraft.com/apps](https://getartcraft.com/apps)
- **Phoronix, "AI Makes 'Open-Source, Clean Room' Implementations Of Adobe Photoshop & Premier In Rust" (7 de octubre de 2026).** [phoronix.com](https://www.phoronix.com/news/Photocraft-Filmcraft-AI)
- **PhotoCraft, repositorio y estado del proyecto.** [github.com/storytold/photocraft](https://github.com/storytold/photocraft)
- **REA, ingeniería inversa para agentes de programación.** [rea.tools](https://rea.tools/) · [github.com/morluto/rea](https://github.com/morluto/rea)
- **LWN, "The relicensing of chardet".** [lwn.net](https://lwn.net/Articles/1061534/)
- **Adobe, Form 10-K del año fiscal 2025 (número de empleados).** [sec.gov](https://www.sec.gov/Archives/edgar/data/796343/000079634326000003/adbe-20251128.htm)
- **Forbes, "SaaSpocalypse Now? AI Is Disrupting SaaS, But Not All Software Is Doomed" (febrero de 2026).** [forbes.com](https://www.forbes.com/sites/petercohan/2026/02/06/saaspocalypse-now-ai-is-disrupting-saas---but-not-all-software-is-doomed/)
- **Directiva 2009/24/CE, artículo 6: descompilación para interoperabilidad.** [legislation.gov.uk](https://www.legislation.gov.uk/eudr/2009/24/article/6)
- **LLM4Decompile: descompilación de código binario con modelos de lenguaje.** [arxiv.org](https://arxiv.org/abs/2403.05286)
`;

export const whenAiCanCloneYourApp: Record<Locale, BlogPost> = {
  en: {
    slug: "when-ai-can-clone-your-app",
    title: "When AI Can Clone Your App: The Protection That Never Was",
    date: "October 25, 2026",
    excerpt:
      "Thirteen free, open-source apps that reimplement Adobe-style tools, built mostly by AI agents. As a free software fan I find it exciting, and as a developer it worries me: shipping a binary no longer protects anyone, and I don't know what a good idea will be worth when copying it costs almost nothing.",
    imageUrl: "/blog/when-ai-can-clone-your-app.webp",
    imageAiHint:
      "conceptual illustration: a glowing desktop application window being scanned by an AI agent that reconstructs an identical copy of it from code fragments and binary data on the other side; in between, a broken padlock made of binary; on one side a crowd of small human silhouettes working at desks, on the other an open-source community; split mood of excitement and worry; dark background with warm amber and cool blue light; professional editorial tech illustration, no logos",
    author: "Sebastian Alvarez",
    tags: [
      "AI",
      "Reverse Engineering",
      "Open Source",
      "Software Business",
      "Ethics",
      "Future",
    ],
    content: enContent,
  },
  es: {
    slug: "when-ai-can-clone-your-app",
    title: "Cuando la IA puede clonar tu app: la protección que nunca fue",
    date: "October 25, 2026",
    excerpt:
      "Trece apps gratis y open source que reimplementan herramientas al estilo de Adobe, construidas sobre todo por agentes de IA. Como fan del software libre me emociona, y como desarrollador me preocupa: entregar un binario ya no protege a nadie, y no sé cuánto va a valer una buena idea cuando copiarla cueste casi nada.",
    imageUrl: "/blog/when-ai-can-clone-your-app.es.webp",
    imageAiHint:
      "ilustración conceptual: una ventana de aplicación de escritorio luminosa escaneada por un agente de IA que reconstruye una copia idéntica a partir de fragmentos de código y datos binarios del otro lado; en el medio, un candado roto hecho de binario; a un lado una multitud de pequeñas siluetas humanas trabajando en escritorios, al otro una comunidad open source; mezcla de emoción y preocupación; fondo oscuro con luz ámbar cálida y azul frío; ilustración editorial tecnológica profesional, sin logotipos",
    author: "Sebastian Alvarez",
    tags: [
      "IA",
      "Ingeniería inversa",
      "Open Source",
      "Negocio del software",
      "Ética",
      "Futuro",
    ],
    content: esContent,
  },
};
