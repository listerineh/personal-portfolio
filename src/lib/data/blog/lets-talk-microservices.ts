import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const letsTalkMicroservices: Record<Locale, BlogPost> = {
  en: {
    slug: 'lets-talk-microservices',
    title: "Let's Talk Microservices: Lessons Learned in the Real World",
    date: 'September 1, 2025',
    excerpt: "I have split monoliths into microservices and merged microservices back into a monolith. Using a bank as the example: when they pay off, when they don't, and what to get right.",
    imageUrl: '/blog/lets-talk-microservices.webp',
    imageAiHint: 'microservices architecture diagram: banking system with multiple independent services (transactions, user profile, notifications) as separate containers; docker containers stacked and connected; api gateway in center routing requests; databases isolated per service; communication flows between services with arrows; scaling indicators showing horizontal scaling; professional tech illustration with purple and blue tones, clean modern design',
    content: `
## I've been on both sides of this

Over the years I've worked with pretty different architectures. I've refactored legacy CMSs into custom backends that later grew into microservices. I've joined big companies where microservices were the default from day one. And I've been on a project where going microservices too early was a mistake, and we ended up migrating back to a monolith.

What all that taught me is boring but true: microservices are right or wrong depending on context. Used well, they give you flexibility, independent scaling and faster teams. Used badly, they give you a distributed monolith with extra network calls.

My rule of thumb: start with microservices only when the domain is already well defined, in an established industry where you know upfront which parts need to scale and how responsibilities split. A banking core is the classic example. For most other projects, a monolith first and splitting later is the better bet.

So I'll use a banking platform as the running example here, and go through what I look at when designing microservices: scaling, deploys, containers, data, security, standards, testing and, the one people forget, the team.

## Not every part of a bank is under the same load

Picture a digital bank. Three modules, three very different workloads:

- **Transactions** handles transfers and payments, potentially millions, in real time. It needs to scale, be closely monitored and tolerate failures.
- **User profile** stores personal data and preferences. Important, but with a fraction of the traffic.
- **Notifications** sends emails, push and alerts. It can spike, but it's mostly asynchronous.

That's exactly where microservices pay off. You can scale the transaction engine on its own without paying for capacity the profile service will never use.

## Scaling up or scaling out

There are two ways to give a service more capacity. Vertical scaling means a bigger machine: more CPU, more RAM, faster disks. It's simple, but there's a ceiling. Horizontal scaling means more instances of the same service behind a load balancer. In theory it barely has a limit, and microservices make it natural: at peak hours, you run more containers of the transactions service.

In the bank, the profile service can probably live on one decent machine for a long time. Transactions is the one that needs to scale out.

## Deploying one thing without touching the rest

One of the best arguments for microservices is deploying each service independently. Transactions might need several releases a day (fixes, compliance changes, new payment methods) while the profile service changes once a month. With separate deploys, nobody waits for anyone.

The catch: this only works with solid CI/CD, good tests and proper API versioning. Without those, independent deploys become independent ways to break production.

## Containers and orchestration

Docker gives every service the same environment from a laptop to production, dependencies included. That alone kills most "works on my machine" problems and makes onboarding easier.

Kubernetes adds the orchestration: more transaction containers when traffic grows, rolling updates, restarting what crashes, and service discovery. For the bank, that's what lets a payday or Black Friday-style spike get absorbed without anyone being paged.

## Data: one database per service

A very common mistake is having every service share the same database. It feels practical, and it couples everything: one schema change and three teams have to coordinate.

Each service should own its data. Transactions owns the transaction history, the customer service owns customer records, and nobody reads anyone else's tables. Services talk through APIs or events. That also lets each one pick the right storage: a relational database tuned for financial records in transactions, maybe something more flexible for notifications.

## Security: designed centrally, enforced everywhere

Instead of every service implementing its own authentication, the usual setup is:

- **OAuth 2.0 / OpenID Connect** for centralized authentication
- an **API gateway** that applies policies such as rate limits and IP allowlists
- **service-to-service authorization** (OPA, a service mesh) for the internal trust boundaries

In a bank this isn't optional. The notifications service should never be able to read account balances, and token scopes plus policies are what guarantee it.

## Standards, or integration hell

Independent teams only stay compatible if they agree on a few things: the same response format across APIs, endpoint naming conventions, one way of returning errors, consistent logs, and a versioning strategy so clients don't break. It's not glamorous, but it's what makes integration predictable instead of a surprise every sprint.

## Testing is where it's won or lost

With a monolith you run one test suite. With microservices you need layers:

1. **Unit tests** inside each service, for example the fee calculation in transactions.
2. **Integration tests** for how services talk to each other, often with mocks (a fake profile service while testing transactions).
3. **End-to-end tests** for real flows across services: "a user transfers money, the balance updates and a notification goes out".

For integration and E2E tests, teams usually spin up controlled environments with Docker Compose or a dedicated Kubernetes namespace. Contract testing tools like Pact help catch it when an API change would break another service.

In my experience, the teams that invested in integration and E2E tests saved months of debugging later. The ones that didn't ended up with services that worked perfectly on their own and failed together.

## The team decides the architecture

Conway's Law says your architecture ends up mirroring how your organization communicates, and it shows. If you have a transactions team, a profile team and a notifications team, microservices map onto that nicely. If you're three developers, ten microservices is ten things to deploy, monitor and keep in sync, with nobody to own them.

I've seen both ends: big organizations where microservices let hundreds of developers work in parallel, and startups where the microservices dream slowed everything down because there simply weren't enough people to run it.

## So, when?

Microservices are a tool, not a goal. They make sense when parts of the system have very different scaling needs, when independent deploys actually speed up the business, and when the team can keep up with standards, security and testing.

Between migrating CMSs, scaling enterprise systems and occasionally rolling back to a monolith, what I keep coming back to is context. In large, well-understood domains like banking, they're a great fit. For a small product that's still figuring out what it is, they're overkill.
`,
    author: 'Sebastian Alvarez',
    tags: ['Microservices', 'Architecture', 'Cloud', 'API Gateway', 'DevOps', 'Docker']
  },
  es: {
    slug: 'lets-talk-microservices',
    title: 'Hablemos de microservicios: lo que aprendí en proyectos reales',
    date: 'September 1, 2025',
    excerpt: 'He partido monolitos en microservicios y he vuelto a juntar microservicios en un monolito. Con un banco como ejemplo: cuándo valen la pena, cuándo no y qué hay que hacer bien.',
    imageUrl: '/blog/lets-talk-microservices.es.webp',
    imageAiHint: 'diagrama de arquitectura de microservicios: sistema bancario con múltiples servicios independientes (transacciones, perfil de usuario, notificaciones) como contenedores separados; contenedores docker apilados y conectados; api gateway en el centro enrutando solicitudes; bases de datos aisladas por servicio; flujos de comunicación entre servicios con flechas; indicadores de escalado mostrando escalado horizontal; ilustración técnica profesional con tonos morados y azules, diseño moderno limpio',
    content: `
## He estado de los dos lados

En estos años me ha tocado trabajar con arquitecturas bastante distintas. He refactorizado CMSs legacy a backends propios que después crecieron hasta volverse microservicios. He entrado a empresas grandes donde los microservicios eran lo normal desde el primer día. Y he estado en un proyecto donde ir a microservicios demasiado pronto fue un error y terminamos migrando de vuelta a un monolito.

Lo que me enseñó todo eso es aburrido, pero cierto: los microservicios son la decisión correcta o la equivocada según el contexto. Bien usados, te dan flexibilidad, escalado independiente y equipos más rápidos. Mal usados, te dan un monolito distribuido con llamadas de red de más.

Mi regla práctica: arrancar con microservicios solo cuando el dominio ya está bien definido, en una industria establecida donde sabes desde el inicio qué partes necesitan escalar y cómo se reparten las responsabilidades. El core de un banco es el ejemplo clásico. Para casi todo lo demás, conviene empezar con un monolito y separar después.

Así que voy a usar una plataforma bancaria como ejemplo a lo largo del post y repasar lo que miro al diseñar microservicios: escalado, despliegues, contenedores, datos, seguridad, estándares, pruebas y, lo que siempre se olvida, el equipo.

## No todo el banco recibe la misma carga

Imagina un banco digital. Tres módulos, tres cargas muy distintas:

- **Transacciones** maneja transferencias y pagos, potencialmente millones, en tiempo real. Tiene que escalar, estar muy monitoreado y tolerar fallos.
- **Perfil de usuario** guarda datos personales y preferencias. Importante, pero con una fracción del tráfico.
- **Notificaciones** envía correos, push y alertas. Puede tener picos, pero es casi todo asíncrono.

Ahí es justo donde los microservicios valen la pena. Puedes escalar el motor de transacciones por separado sin pagar capacidad que el servicio de perfiles nunca va a usar.

## Escalar hacia arriba o hacia los lados

Hay dos formas de darle más capacidad a un servicio. El escalado vertical es una máquina más grande: más CPU, más RAM, discos más rápidos. Es simple, pero tiene techo. El escalado horizontal es correr más instancias del mismo servicio detrás de un balanceador. En teoría casi no tiene límite, y los microservicios lo vuelven natural: en hora pico, levantas más contenedores del servicio de transacciones.

En el banco, el servicio de perfiles probablemente puede vivir mucho tiempo en una máquina decente. Transacciones es el que necesita escalar hacia los lados.

## Desplegar una cosa sin tocar el resto

Uno de los mejores argumentos a favor de los microservicios es poder desplegar cada servicio por separado. Transacciones puede necesitar varias versiones al día (fixes, cambios regulatorios, nuevos medios de pago) mientras perfiles cambia una vez al mes. Con despliegues separados, nadie espera a nadie.

La trampa: solo funciona con un CI/CD sólido, buenas pruebas y versionado de APIs. Sin eso, los despliegues independientes se vuelven formas independientes de romper producción.

## Contenedores y orquestación

Docker le da a cada servicio el mismo entorno desde la laptop hasta producción, con sus dependencias incluidas. Solo con eso desaparece la mayoría de los "en mi máquina funciona" y es más fácil sumar gente al equipo.

Kubernetes pone la orquestación: más contenedores de transacciones cuando crece el tráfico, actualizaciones graduales, reiniciar lo que se cae y descubrimiento de servicios. En el banco, eso es lo que permite absorber un pico de quincena o tipo Black Friday sin que despierten a nadie.

## Datos: una base por servicio

Un error muy común es que todos los servicios compartan la misma base de datos. Parece práctico y lo acopla todo: un cambio de esquema y tres equipos tienen que coordinarse.

Cada servicio debería ser dueño de sus datos. Transacciones es dueño del historial de transacciones, el servicio de clientes de los registros de clientes, y nadie lee las tablas de otro. Los servicios hablan por APIs o eventos. Eso además deja que cada uno elija el almacenamiento adecuado: una base relacional afinada para registros financieros en transacciones y quizá algo más flexible para notificaciones.

## Seguridad: diseñada en un solo lugar, aplicada en todos

En vez de que cada servicio implemente su propia autenticación, lo habitual es:

- **OAuth 2.0 / OpenID Connect** para autenticación centralizada
- un **API gateway** que aplica políticas como rate limits y listas de IPs permitidas
- **autorización entre servicios** (OPA, un service mesh) para los límites de confianza internos

En un banco esto no es opcional. El servicio de notificaciones nunca debería poder leer saldos, y los scopes de los tokens y las políticas son lo que lo garantiza.

## Estándares, o el infierno de la integración

Los equipos independientes solo siguen siendo compatibles si se ponen de acuerdo en algunas cosas: el mismo formato de respuesta en todas las APIs, convenciones para nombrar endpoints, una sola forma de devolver errores, logs consistentes y una estrategia de versionado para no romper a los clientes. No es glamoroso, pero es lo que hace que integrar sea predecible y no una sorpresa en cada sprint.

## Las pruebas son donde se gana o se pierde

Con un monolito corres una suite de pruebas. Con microservicios necesitas capas:

1. **Pruebas unitarias** dentro de cada servicio, por ejemplo el cálculo de comisiones en transacciones.
2. **Pruebas de integración** de cómo se hablan los servicios, muchas veces con mocks (un servicio de perfiles falso mientras pruebas transacciones).
3. **Pruebas end-to-end** de flujos reales entre servicios: "un usuario transfiere, se actualiza el saldo y sale la notificación".

Para integración y E2E, los equipos suelen levantar entornos controlados con Docker Compose o un namespace dedicado en Kubernetes. Herramientas de contract testing como Pact ayudan a detectar cuándo un cambio en una API rompería otro servicio.

En mi experiencia, los equipos que invirtieron en pruebas de integración y E2E se ahorraron meses de debugging después. Los que no, terminaron con servicios que funcionaban perfecto por separado y fallaban juntos.

## El equipo decide la arquitectura

La ley de Conway dice que tu arquitectura termina reflejando cómo se comunica tu organización, y se nota. Si tienes un equipo de transacciones, uno de perfiles y uno de notificaciones, los microservicios encajan bien con esa estructura. Si son tres desarrolladores, diez microservicios son diez cosas que desplegar, monitorear y mantener sincronizadas, sin nadie que se haga cargo.

He visto los dos extremos: organizaciones grandes donde los microservicios dejan trabajar en paralelo a cientos de desarrolladores, y startups donde el sueño de los microservicios lo frenó todo porque simplemente no había gente suficiente para mantenerlo.

## Entonces, ¿cuándo?

Los microservicios son una herramienta, no una meta. Tienen sentido cuando partes del sistema tienen necesidades de escalado muy distintas, cuando desplegar por separado de verdad acelera al negocio y cuando el equipo puede sostener la disciplina de estándares, seguridad y pruebas.

Entre migrar CMSs, escalar sistemas empresariales y, alguna vez, volver a un monolito, a lo que siempre regreso es al contexto. En dominios grandes y bien entendidos, como la banca, encajan muy bien. En un producto pequeño que todavía está descubriendo qué es, son matar moscas a cañonazos.
`,
    author: 'Sebastian Alvarez',
    tags: ['Microservicios', 'Arquitectura', 'Cloud', 'API Gateway', 'DevOps', 'Docker']
  }
};
