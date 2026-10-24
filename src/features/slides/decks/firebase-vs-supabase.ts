import type { DeckInput } from "../schema";

/**
 * "Firebase vs Supabase", grown from the GDG Quito Firebase talk on Canva (its OpenKanban demo left out) and the
 * firebase-vs-supabase blog post, brought up to date to October 2026, in Spanish with an English translation. Ships as
 * a draft like the other talks: the first save from the editor stores it, and opening the diagram slide in each
 * language draws and saves its SVG.
 */
export const firebaseVsSupabase: DeckInput = {
  slug: "firebase-vs-supabase",
  title: "Firebase vs Supabase",
  description:
    "Documentos o tablas: qué ofrece cada plataforma en 2026, cómo se comparan función por función y cómo elegir el backend de tu próxima app.",
  lang: "es",
  status: "draft",
  accent: "#e65100",
  updatedAt: "2026-10-23T00:00:00.000Z",
  version: 1,
  slides: [
    {
      id: "cover",
      layout: "title",
      eyebrow: "GDG Quito",
      title: "Firebase vs Supabase",
      subtitle: "Documentos o tablas: cómo elegir tu backend en *2026*.",
      notes:
        "Bienvenida. Pregunta rápida: ¿quién usa Firebase? ¿Quién usa Supabase? ¿Quién ha usado los dos?",
    },
    {
      id: "speaker",
      layout: "intro",
      photo: {
        src: "/images/sebas-playing.webp",
        alt: "Sebastian Alvarez sonriendo con una guitarra eléctrica",
      },
      greeting: "Hola, soy",
      name: "Sebastian Alvarez",
      role: "Sr Full-Stack Engineer · GDG Quito Organizer",
      bio: "Construyo backends, infraestructura cloud y productos web. Firebase está detrás de casi todos mis proyectos personales, y Supabase se ganó un lugar en los que piden Postgres.",
      highlights: ["GDG Quito", "Quito, Ecuador"],
      handle: "@listerineh",
    },
    {
      id: "agenda",
      layout: "bullets",
      title: "Agenda",
      build: true,
      items: [
        "**01** ¿Qué es un BaaS?",
        "**02** Firebase",
        "**03** Supabase",
        "**04** Frente a frente",
        "**05** ¿Cuál elegir?",
      ],
    },

    // ── 01 · BaaS ─────────────────────────────────────────────
    {
      id: "part-baas",
      layout: "section",
      number: "01",
      title: "¿Qué es un BaaS?",
      subtitle: "Backend-as-a-Service: el backend que no tienes que construir.",
    },
    {
      id: "baas",
      layout: "bullets",
      title: "Backend-as-a-Service",
      build: true,
      items: [
        "Base de datos, autenticación, archivos y funciones **listos para usar**",
        "Un ecosistema para construir, lanzar y operar apps",
        "No es solo una base de datos",
        "Tu equipo escribe producto, no infraestructura",
      ],
    },
    {
      id: "promise",
      layout: "icons-grid",
      title: "La promesa",
      build: true,
      items: [
        {
          icon: "zap",
          title: "Velocidad",
          body: "Lanzar funcionalidades en días, no en semanas.",
        },
        {
          icon: "trending-up",
          title: "Escalabilidad",
          body: "El tráfico crece y tú no administras servidores.",
        },
        {
          icon: "plug",
          title: "Integración",
          body: "Auth, datos, archivos y funciones que se hablan entre sí.",
        },
        {
          icon: "shield-check",
          title: "Seguridad",
          body: "Las reglas de acceso viven junto a los datos.",
        },
      ],
    },
    {
      id: "data-model",
      layout: "statement",
      statement: "La diferencia de fondo es el ==modelo de datos==.",
      emphasis:
        "Firebase te da documentos; Supabase te da Postgres. Todo lo demás se deriva de eso.",
    },

    // ── 02 · Firebase ─────────────────────────────────────────
    {
      id: "part-firebase",
      layout: "section",
      number: "02",
      title: "Firebase",
      subtitle: "La plataforma de Google para apps.",
    },
    {
      id: "firebase-today",
      layout: "bullets",
      title: "Firebase en 2026",
      build: true,
      items: [
        "Parte de Google desde 2014, integrada con Google Cloud",
        "**Firestore**: base de documentos con tiempo real y modo offline",
        "**Authentication**, **Cloud Storage**, **Cloud Functions** y **Hosting**",
        "**Firestore Enterprise**: pipelines con agregaciones (GA en abril de 2026)",
        "**SQL Connect** (antes Data Connect): PostgreSQL gestionado en Cloud SQL",
      ],
      notes:
        "SQL Connect se anunció en Cloud Next, abril de 2026: es el antiguo Data Connect con SQL nativo, tiempo real y caché offline.",
    },
    {
      id: "firestore-model",
      layout: "code",
      title: "Firestore: documentos y colecciones",
      language: "javascript",
      code: 'users/{userId} {\n  name: "Sebastian",\n  settings: { theme: "dark", notifications: true }\n}\n\nusers/{userId}/posts/{postId} {\n  title: "Mi primer post", tags: ["tech", "firebase"], likes: 42\n}',
      caption:
        "Sin esquema fijo: los datos se anidan y se duplican para evitar joins.",
      notes:
        "Desnormalizar tiene un precio: si el autor cambia su avatar, hay que actualizar cada copia.",
    },
    {
      id: "firestore-realtime",
      layout: "code",
      title: "Tiempo real con Firestore",
      language: "javascript",
      code: 'const q = query(\n  collection(db, "rooms", roomId, "messages"),\n  orderBy("timestamp", "desc"), limit(50),\n);\n\nonSnapshot(q, (snap) => {\n  setMessages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));\n});',
      caption:
        "Un chat en tiempo real: funciona offline y se sincroniza solo al volver la conexión.",
    },
    {
      id: "firestore-pipelines",
      layout: "code",
      title: "Pipelines en Firestore Enterprise",
      language: "javascript",
      code: 'const top = await db.pipeline()\n  .collection("recipes")\n  .unnest(field("tags").as("tag"))\n  .aggregate({ accumulators: [countAll().as("n")], groups: ["tag"] })\n  .sort(field("n").descending())\n  .limit(10)\n  .execute();',
      caption:
        "Las 10 etiquetas más usadas, calculadas en el servidor: las consultas complejas eran el punto débil de Firestore.",
      notes:
        "Más de cien capacidades nuevas de consulta, con índices opcionales. No lo convierte en una base relacional, pero acorta mucho la distancia.",
    },
    {
      id: "firebase-auth",
      layout: "code",
      title: "Authentication y reglas",
      language: "javascript",
      code: "const { user } = await signInWithPopup(auth, new GoogleAuthProvider());\n\n// firestore.rules\nmatch /users/{userId} {\n  allow read, write: if request.auth.uid == userId;\n}",
      caption:
        "Email, Google, Apple, GitHub, teléfono, anónimo… y las reglas de seguridad usan la misma sesión.",
      notes: "SAML y OIDC requieren pasar a Identity Platform.",
    },

    // ── 03 · Supabase ─────────────────────────────────────────
    {
      id: "part-supabase",
      layout: "section",
      number: "03",
      title: "Supabase",
      subtitle: "Postgres con todo lo que necesita una app alrededor.",
    },
    {
      id: "supabase-today",
      layout: "bullets",
      title: "Supabase en 2026",
      build: true,
      items: [
        "Open source y construido sobre **PostgreSQL**",
        "Auth, Storage, **Edge Functions** (Deno) y Realtime alrededor de Postgres",
        "APIs REST y GraphQL generadas desde tu esquema",
        "Extensiones: **pgvector** para IA, PostGIS, pg_cron",
        "Se puede autoalojar",
      ],
    },
    {
      id: "postgres-model",
      layout: "code",
      title: "Postgres: tablas y relaciones",
      language: "sql",
      code: "create table posts (\n  id uuid primary key default gen_random_uuid(),\n  user_id uuid references users (id) on delete cascade,\n  title text not null,\n  tags text[],\n  created_at timestamptz default now()\n);",
      caption: "Esquema definido, llaves foráneas, joins y transacciones ACID.",
    },
    {
      id: "rls",
      layout: "code",
      title: "Row Level Security",
      language: "sql",
      code: 'alter table posts enable row level security;\n\ncreate policy "cada quien edita lo suyo"\n  on posts for update\n  using (auth.uid() = user_id);',
      caption:
        "La autorización vive en la base de datos y se aplica a la API, a Realtime y a Storage.",
    },
    {
      id: "supabase-realtime",
      layout: "code",
      title: "Tiempo real con Supabase",
      language: "javascript",
      code: 'supabase\n  .channel("posts")\n  .on("postgres_changes",\n    { event: "*", schema: "public", table: "posts" },\n    (payload) => console.log(payload))\n  .subscribe();',
      caption: "Cambios de Postgres, Broadcast y Presence. Sin caché offline.",
    },
    {
      id: "supabase-numbers",
      layout: "stats",
      title: "Supabase en números",
      stats: [
        { value: 13, suffix: "M+", label: "desarrolladores" },
        { value: 10.5, prefix: "$", suffix: "B", label: "de valoración" },
        { value: 70, suffix: "%", label: "de bases nuevas, creadas por IA" },
      ],
      notes:
        "Cifras de la propia Supabase al anunciar su Serie F de 500 millones (junio de 2026, CNBC). El 70 % son bases creadas por agentes o herramientas de IA: el vibe coding empuja a Postgres.",
    },

    // ── 04 · Frente a frente ──────────────────────────────────
    {
      id: "part-versus",
      layout: "section",
      number: "04",
      title: "Frente a frente",
      subtitle: "Funcionalidad por funcionalidad.",
    },
    {
      id: "model-compare",
      layout: "two-column",
      title: "Documentos vs tablas",
      columns: [
        {
          heading: "Firestore",
          items: [
            "Sin esquema: cambia cuando quieras",
            "Datos anidados y duplicados",
            "Modo offline nativo",
            "Las consultas complejas cuestan más",
          ],
        },
        {
          heading: "Postgres",
          items: [
            "Esquema y llaves foráneas",
            "Joins y transacciones ACID",
            "SQL completo y extensiones",
            "Sin modo offline",
          ],
        },
      ],
    },
    {
      id: "join",
      layout: "code",
      title: "Un join es una consulta",
      language: "sql",
      code: "select o.id, u.name, p.name as product, oi.quantity * oi.price as total\nfrom orders o\njoin users u on u.id = o.user_id\njoin order_items oi on oi.order_id = o.id\njoin products p on p.id = oi.product_id\nwhere o.status = 'completed';",
      caption:
        "En Firestore son varias lecturas y unir los datos en el cliente.",
    },
    {
      id: "features",
      layout: "bullets",
      title: "Funcionalidad por funcionalidad",
      build: true,
      items: [
        "**Auth**: empate. SDKs más pulidos en Firebase; RLS más expresivo en Supabase",
        "**Storage**: ambos sólidos; Supabase aplica RLS también a los archivos",
        "**Funciones**: Firebase gana en ecosistema; Supabase, en latencia en el edge",
        "**Tiempo real**: Firebase, por la sincronización offline",
        "**Consultas y reportes**: Supabase, con SQL completo",
        "**IA**: Supabase con pgvector; Firestore también tiene búsqueda vectorial",
      ],
    },
    {
      id: "pricing",
      layout: "two-column",
      title: "Precios",
      columns: [
        {
          heading: "Firebase",
          items: [
            "**Spark**, gratis: 50 000 lecturas y 20 000 escrituras al día",
            "**Blaze**: pagas por operación, ~$0,03 por 100 000 lecturas",
            "Ojo: un listener sobre una colección activa puede sorprender en la factura",
          ],
        },
        {
          heading: "Supabase",
          items: [
            "**Free**: 500 MB de base, 50 000 usuarios activos al mes",
            "**Pro** desde $25 al mes: 8 GB de base y 100 GB de archivos",
            "Pagas recursos, no operaciones: más fácil de predecir",
          ],
        },
      ],
      notes:
        "Precios de octubre de 2026; revisar las páginas oficiales antes de presupuestar. En Supabase Free, los proyectos se pausan tras 7 días sin uso.",
    },
    {
      id: "sql-connect",
      layout: "statement",
      statement: "Y en 2026, ==Firebase también habla Postgres==.",
      emphasis:
        "SQL Connect: Cloud SQL para PostgreSQL con tiempo real, caché offline y SQL nativo.",
      notes:
        "Data Connect pasó a llamarse SQL Connect en Cloud Next 2026. La frontera entre ambas plataformas se difumina: la pregunta ya no es solo documentos o tablas, sino qué ecosistema encaja mejor con tu equipo.",
    },

    // ── 05 · ¿Cuál elegir? ────────────────────────────────────
    {
      id: "part-choose",
      layout: "section",
      number: "05",
      title: "¿Cuál elegir?",
      subtitle: "Depende de tu app, no de la moda.",
    },
    {
      id: "choose",
      layout: "two-column",
      title: "Cuándo elijo cada uno",
      build: true,
      columns: [
        {
          heading: "Firebase",
          items: [
            "Apps móviles que deben funcionar offline",
            "MVPs sin diseñar un esquema",
            "Proyectos que ya viven en Google Cloud",
            "Colaboración en tiempo real",
          ],
        },
        {
          heading: "Supabase",
          items: [
            "Datos relacionales: e-commerce, SaaS, CRM",
            "Reportes y analítica con SQL",
            "IA con pgvector",
            "Open source y self-hosting",
          ],
        },
      ],
    },
    {
      id: "decide",
      layout: "diagram",
      title: "Una forma de decidir",
      source:
        "flowchart LR\n  a{¿Datos muy relacionales?} -->|Sí| s[Supabase]\n  a -->|No| b{¿Móvil y offline?}\n  b -->|Sí| f[Firebase]\n  b -->|No| c{¿Ya usas Google Cloud?}\n  c -->|Sí| f\n  c -->|No| d[Prueba los dos con un MVP]",
      caption: "Y nada impide combinarlos: cada uno en lo que hace mejor.",
    },
    {
      id: "verdict",
      layout: "statement",
      statement: "Ninguno es ==mejor== en general.",
      emphasis:
        "Depende de tu caso de uso, de lo que sabe tu equipo y de tu arquitectura.",
      notes:
        "Confesión: Firebase sigue siendo mi opción por defecto, por familiaridad, ecosistema y el tipo de apps que hago. Supabase se ganó mi respeto en todo lo que pide Postgres y en IA. Consejo: construyan algo pequeño con cada uno y quédense con el que encaje.",
    },
    {
      id: "thanks",
      layout: "closing",
      title: "¿Más preguntas? Conectemos",
      subtitle:
        "La comparación completa está en el blog: listerineh.dev/blog/firebase-vs-supabase.",
      links: [
        {
          label: "linkedin.com/in/listerineh",
          href: "https://www.linkedin.com/in/listerineh",
        },
        {
          label: "GDG Quito",
          href: "https://www.linkedin.com/company/gdg-quito",
        },
        {
          label: "listerineh.dev",
          href: "https://listerineh.dev",
        },
      ],
    },
  ],
  // English: the same slides, translated. Only text that differs is stored (see i18n.ts).
  translations: {
    en: {
      title: "Firebase vs Supabase",
      description:
        "Documents or tables: what each platform offers in 2026, how they compare feature by feature, and how to pick the backend for your next app.",
      slides: {
        cover: {
          subtitle: "Documents or tables: picking your backend in *2026*.",
          notes:
            "Welcome. Quick poll: who uses Firebase? Who uses Supabase? Who has used both?",
        },
        speaker: {
          photo: {
            src: "/images/sebas-playing.webp",
            alt: "Sebastian Alvarez smiling with an electric guitar",
          },
          greeting: "Hi, I'm",
          bio: "I build backends, cloud infrastructure and web products. Firebase is behind almost all my personal projects, and Supabase has earned a place in the ones that call for Postgres.",
        },
        agenda: {
          items: [
            "**01** What is a BaaS?",
            "**02** Firebase",
            "**03** Supabase",
            "**04** Head to head",
            "**05** Which one?",
          ],
        },
        "part-baas": {
          title: "What is a BaaS?",
          subtitle:
            "Backend-as-a-Service: the backend you don't have to build.",
        },
        baas: {
          items: [
            "Database, authentication, files and functions **ready to use**",
            "An ecosystem to build, ship and run apps",
            "Not just a database",
            "Your team writes product, not infrastructure",
          ],
        },
        promise: {
          title: "The promise",
          items: [
            {
              icon: "zap",
              title: "Speed",
              body: "Ship features in days, not weeks.",
            },
            {
              icon: "trending-up",
              title: "Scale",
              body: "Traffic grows and you don't run servers.",
            },
            {
              icon: "plug",
              title: "Integration",
              body: "Auth, data, files and functions that talk to each other.",
            },
            {
              icon: "shield-check",
              title: "Security",
              body: "Access rules live next to the data.",
            },
          ],
        },
        "data-model": {
          statement: "The real difference is the ==data model==.",
          emphasis:
            "Firebase gives you documents; Supabase gives you Postgres. Everything else follows from that.",
        },
        "part-firebase": { subtitle: "Google's platform for apps." },
        "firebase-today": {
          title: "Firebase in 2026",
          items: [
            "Part of Google since 2014, integrated with Google Cloud",
            "**Firestore**: a document database with real-time and offline mode",
            "**Authentication**, **Cloud Storage**, **Cloud Functions** and **Hosting**",
            "**Firestore Enterprise**: pipelines with aggregations (GA in April 2026)",
            "**SQL Connect** (formerly Data Connect): managed PostgreSQL on Cloud SQL",
          ],
          notes:
            "SQL Connect was announced at Cloud Next, April 2026: it's the former Data Connect with native SQL, real-time and offline caching.",
        },
        "firestore-model": {
          title: "Firestore: documents and collections",
          code: 'users/{userId} {\n  name: "Sebastian",\n  settings: { theme: "dark", notifications: true }\n}\n\nusers/{userId}/posts/{postId} {\n  title: "My first post", tags: ["tech", "firebase"], likes: 42\n}',
          caption:
            "No fixed schema: data is nested and duplicated to avoid joins.",
          notes:
            "Denormalizing has a price: when the author changes their avatar, every copy needs updating.",
        },
        "firestore-realtime": {
          title: "Real-time with Firestore",
          caption:
            "A real-time chat: it works offline and syncs on its own when the connection comes back.",
        },
        "firestore-pipelines": {
          title: "Pipelines in Firestore Enterprise",
          caption:
            "The 10 most used tags, computed on the server: complex queries used to be Firestore's weak spot.",
          notes:
            "Over a hundred new query capabilities, with optional indexes. It doesn't make Firestore relational, but it closes a lot of the gap.",
        },
        "firebase-auth": {
          title: "Authentication and rules",
          caption:
            "Email, Google, Apple, GitHub, phone, anonymous… and security rules use the same session.",
          notes: "SAML and OIDC need the upgrade to Identity Platform.",
        },
        "part-supabase": {
          subtitle: "Postgres with everything an app needs around it.",
        },
        "supabase-today": {
          title: "Supabase in 2026",
          items: [
            "Open source and built on **PostgreSQL**",
            "Auth, Storage, **Edge Functions** (Deno) and Realtime around Postgres",
            "REST and GraphQL APIs generated from your schema",
            "Extensions: **pgvector** for AI, PostGIS, pg_cron",
            "Can be self-hosted",
          ],
        },
        "postgres-model": {
          title: "Postgres: tables and relations",
          caption:
            "A defined schema, foreign keys, joins and ACID transactions.",
        },
        rls: {
          code: 'alter table posts enable row level security;\n\ncreate policy "everyone edits their own"\n  on posts for update\n  using (auth.uid() = user_id);',
          caption:
            "Authorization lives in the database and applies to the API, Realtime and Storage.",
        },
        "supabase-realtime": {
          title: "Real-time with Supabase",
          caption:
            "Postgres changes, Broadcast and Presence. No offline cache.",
        },
        "supabase-numbers": {
          title: "Supabase in numbers",
          stats: [
            { value: 13, suffix: "M+", label: "developers" },
            { value: 10.5, prefix: "$", suffix: "B", label: "valuation" },
            {
              value: 70,
              suffix: "%",
              label: "of new databases, created by AI",
            },
          ],
          notes:
            "Supabase's own figures when it announced its $500M Series F (June 2026, CNBC). The 70% are databases created by agents or AI tools: vibe coding is pushing people to Postgres.",
        },
        "part-versus": {
          title: "Head to head",
          subtitle: "Feature by feature.",
        },
        "model-compare": {
          title: "Documents vs tables",
          columns: [
            {
              heading: "Firestore",
              items: [
                "No schema: change it whenever you like",
                "Nested, duplicated data",
                "Native offline mode",
                "Complex queries cost more",
              ],
            },
            {
              heading: "Postgres",
              items: [
                "Schema and foreign keys",
                "Joins and ACID transactions",
                "Full SQL and extensions",
                "No offline mode",
              ],
            },
          ],
        },
        join: {
          title: "A join is one query",
          caption:
            "In Firestore it's several reads and stitching the data together on the client.",
        },
        features: {
          title: "Feature by feature",
          items: [
            "**Auth**: a tie. Firebase has more polished SDKs; Supabase's RLS is more expressive",
            "**Storage**: both solid; Supabase applies RLS to files too",
            "**Functions**: Firebase wins on ecosystem; Supabase on edge latency",
            "**Real-time**: Firebase, thanks to offline sync",
            "**Queries and reports**: Supabase, with full SQL",
            "**AI**: Supabase with pgvector; Firestore has vector search too",
          ],
        },
        pricing: {
          title: "Pricing",
          columns: [
            {
              heading: "Firebase",
              items: [
                "**Spark**, free: 50,000 reads and 20,000 writes a day",
                "**Blaze**: pay per operation, ~$0.03 per 100,000 reads",
                "Careful: a listener on a busy collection can surprise you on the bill",
              ],
            },
            {
              heading: "Supabase",
              items: [
                "**Free**: 500 MB database, 50,000 monthly active users",
                "**Pro** from $25 a month: 8 GB database and 100 GB of files",
                "You pay for resources, not operations: easier to predict",
              ],
            },
          ],
          notes:
            "Prices as of October 2026; check the official pages before budgeting. On Supabase Free, projects pause after 7 days without use.",
        },
        "sql-connect": {
          statement: "And in 2026, ==Firebase speaks Postgres too==.",
          emphasis:
            "SQL Connect: Cloud SQL for PostgreSQL with real-time, offline caching and native SQL.",
          notes:
            "Data Connect was renamed SQL Connect at Cloud Next 2026. The line between the two platforms is blurring: the question is no longer just documents or tables, but which ecosystem fits your team.",
        },
        "part-choose": {
          title: "Which one?",
          subtitle: "It depends on your app, not on hype.",
        },
        choose: {
          title: "When I pick each one",
          columns: [
            {
              heading: "Firebase",
              items: [
                "Mobile apps that must work offline",
                "MVPs without designing a schema",
                "Projects already on Google Cloud",
                "Real-time collaboration",
              ],
            },
            {
              heading: "Supabase",
              items: [
                "Relational data: e-commerce, SaaS, CRM",
                "Reports and analytics with SQL",
                "AI with pgvector",
                "Open source and self-hosting",
              ],
            },
          ],
        },
        decide: {
          title: "One way to decide",
          source:
            "flowchart LR\n  a{Highly relational data?} -->|Yes| s[Supabase]\n  a -->|No| b{Mobile and offline?}\n  b -->|Yes| f[Firebase]\n  b -->|No| c{Already on Google Cloud?}\n  c -->|Yes| f\n  c -->|No| d[Try both with an MVP]",
          caption:
            "And nothing stops you from combining them, each doing what it does best.",
        },
        verdict: {
          statement: "Neither is ==better== in general.",
          emphasis:
            "It depends on your use case, what your team knows and your architecture.",
          notes:
            "Confession: Firebase is still my default, for familiarity, ecosystem and the kind of apps I build. Supabase has earned my respect for anything Postgres-heavy and for AI. Advice: build something small with each and keep the one that fits.",
        },
        thanks: {
          title: "More questions? Let's connect",
          subtitle:
            "The full comparison is on the blog: listerineh.dev/blog/firebase-vs-supabase.",
        },
      },
    },
  },
};
