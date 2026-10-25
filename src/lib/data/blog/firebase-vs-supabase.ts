import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const firebaseVsSupabase: Record<Locale, BlogPost> = {
  en: {
    slug: 'firebase-vs-supabase',
    title: 'Firebase vs Supabase: Documents, Tables and Why I Still Lean Firebase',
    date: 'March 10, 2026',
    excerpt: 'A technical comparison of Firebase and Supabase: NoSQL vs SQL, auth, storage, functions, realtime and pricing, plus why Firebase is still my default even though Supabase keeps impressing me.',
    imageUrl: '/blog/firebase-vs-supabase.webp',
    imageAiHint: 'split technical comparison illustration: left side shows Firebase with NoSQL document structure, Google Cloud integration, realtime sync icons, orange/yellow Firebase colors; right side shows Supabase with PostgreSQL database tables, open source symbols, green Supabase branding; center shows vs symbol with code snippets, architecture diagrams, performance metrics; modern professional tech style with clean data visualization elements',
    content: `
I've been building with Firebase for years. It's the backend behind something like 90% of my personal projects, from weekend MVPs to apps with real users: Auth, Firestore, Cloud Functions, Storage. It all fits with the Google tooling I already know, and it mostly just works.

Lately I've been spending time with Supabase, and it's impressed me. I like PostgreSQL a lot, so a BaaS built entirely on Postgres was always going to get my attention. The developer experience is clean, performance is solid, and the SQL-first approach feels right for a certain kind of project.

I still reach for Firebase more often, though. Not because Supabase falls short, but because Firebase fits my workflow and the kind of apps I usually build. This post is my attempt at a fair technical comparison: NoSQL versus SQL, the core features side by side, pricing, and why I end up where I do.

## The real difference is the data model

Everything else follows from this. Firebase gives you a document database; Supabase gives you Postgres.

### Firestore: documents and collections

Firestore stores JSON-like documents grouped into collections:

\`\`\`javascript
// Users collection
users/{userId} {
  name: "Sebastian",
  email: "sebastian@example.com",
  createdAt: timestamp,
  settings: {
    theme: "dark",
    notifications: true
  }
}

// Posts subcollection
users/{userId}/posts/{postId} {
  title: "My First Post",
  content: "...",
  tags: ["tech", "firebase"],
  likes: 42
}
\`\`\`

There's no fixed schema, so you add fields whenever you need them. You denormalize a lot to avoid joins, documents can nest maps and arrays, and collection group queries let you search across every subcollection with the same name.

Querying used to be Firestore's weak spot. In January 2026 Google announced pipeline operations for the new Firestore Enterprise edition: over a hundred new query capabilities, including aggregations, unnesting arrays and regex matching, plus indexes that are optional instead of mandatory. It launched in preview and went generally available at Cloud Next in April 2026. This is the kind of thing that's now possible:

\`\`\`javascript
// Top 10 tags across all recipes
const snapshot = await db.pipeline()
  .collection("recipes")
  .select("tags")
  .unnest(field("tags").as("tagName"))
  .aggregate({
    accumulators: [countAll().as("tagCount")],
    groups: ["tagName"]
  })
  .sort(field("tagCount").descending())
  .limit(10)
  .execute();
\`\`\`

It doesn't turn Firestore into a relational database, but it closes a lot of the gap with other NoSQL databases.

### Supabase: plain PostgreSQL

Supabase is Postgres with a lot of tooling around it. You define your schema up front:

\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table with a foreign key
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[],
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
\`\`\`

You get normalized data with foreign keys and joins, ACID transactions, the whole SQL language (CTEs, window functions and so on) and Postgres extensions like PostGIS for geo data or pgvector for embeddings.

### When documents make more sense

Firestore shines when you want to prototype without designing a schema, when your data is naturally hierarchical (a user profile with nested settings), when the shape changes often, when the app is mobile-first and needs to work offline, and for real-time things like chat, presence or live cursors.

A social feed is a good example:

\`\`\`javascript
// Post with embedded author and comments (denormalized)
posts/{postId} {
  author: { id: "...", name: "...", avatar: "..." },
  content: "...",
  comments: [
    { userId: "...", text: "...", timestamp: ... },
    { userId: "...", text: "...", timestamp: ... }
  ],
  likes: ["userId1", "userId2", "userId3"]
}
\`\`\`

You copy the author's data into every post, and in exchange a single document read gives you everything you need to render it. The price shows up later, when that author changes their avatar and you have to update every copy.

### When tables make more sense

Postgres wins when the data has lots of relationships (products, orders, inventory), when integrity really matters (anything with money), when you need reporting and aggregations, when your team already knows SQL, and whenever duplicating data would cause more problems than it solves.

\`\`\`sql
SELECT
  o.id AS order_id,
  u.name AS customer_name,
  p.name AS product_name,
  oi.quantity,
  oi.price,
  (oi.quantity * oi.price) AS total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed'
  AND o.created_at > NOW() - INTERVAL '30 days';
\`\`\`

In Firestore this means several reads and stitching the results together on the client. In Postgres it's just a query.

## Feature by feature

### Authentication

Firebase Auth supports email and password, Google, Facebook, X, GitHub, Apple, phone, anonymous sign-in and custom tokens. It has drop-in UI for web and mobile and ties straight into Firestore security rules. SAML and OIDC need the upgrade to Identity Platform.

\`\`\`javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
\`\`\`

Supabase Auth covers email and password, magic links, OAuth providers and phone. Users live in an \`auth.users\` table, SAML SSO is available on the paid plans without a separate product, and access control is done with Row Level Security policies in Postgres.

\`\`\`javascript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});
\`\`\`

I'd call this one a tie. Firebase's SDKs and UI pieces are more polished; RLS is a really powerful way to express complicated authorization rules.

### Database

Firestore is managed and scales automatically, has offline support with automatic sync built in, and lets you subscribe to documents, collections and queries in real time.

Supabase gives you Postgres with dozens of available extensions (PostGIS, pgvector, pg_cron and more), auto-generated REST and GraphQL APIs from your schema, and real-time change events through Postgres logical replication. You scale it vertically, with read replicas on the paid plans.

Which one wins depends entirely on the app: Firestore for mobile with offline needs, Supabase for relational data and heavy queries.

### Storage

Cloud Storage for Firebase sits on top of Google Cloud Storage, uses Firebase Auth and security rules for access, and handles resumable uploads for large files. You pay separately for storage, bandwidth and operations.

Supabase Storage is S3-backed, keeps file metadata in Postgres so RLS policies apply to files too, supports resumable uploads (TUS), and offers on-the-fly image transformations on the paid plans. The upload limit is 50 MB per file on the free plan and up to 500 GB on Pro.

Both are good here. Firebase has the longer track record with heavy media apps; Supabase's RLS integration is the more elegant model.

### Functions

Cloud Functions for Firebase run Node.js (or Python), triggered by HTTP, Firestore, Auth, Storage, Pub/Sub or a schedule. They're deeply wired into the rest of Firebase. Cold starts can hurt, though the second generation is better. You pay per invocation plus compute time.

\`\`\`javascript
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

export const onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data.data();
  await sendEmail(userData.email, 'Welcome!');
});
\`\`\`

Supabase Edge Functions run on Deno with TypeScript, deploy globally close to your users and talk to Postgres directly. Cold starts are typically faster than traditional serverless, and the Pro plan includes 2 million invocations a month.

\`\`\`typescript
import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );

  const { data } = await supabase.from('users').select('*');
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
});
\`\`\`

Firebase wins on ecosystem; Supabase on edge latency. And I like Deno, so that's a point in its favor for me.

### Real-time

Firestore (and the older Realtime Database) let you listen to documents, collections and queries. Changes made offline get queued and synced when the connection comes back, and presence is easy to build.

\`\`\`javascript
import { doc, onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(doc(db, 'posts', postId), (snap) => {
  console.log('Current data:', snap.data());
});
\`\`\`

Supabase Realtime has three pieces: Postgres Changes (listen to inserts, updates and deletes on a table), Broadcast (pub/sub for ephemeral messages) and Presence. The free plan allows 200 concurrent connections, Pro 500.

\`\`\`javascript
const channel = supabase
  .channel('posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe();
\`\`\`

Firebase wins this one for me. Supabase Realtime is solid, but it doesn't cache offline, and for mobile apps Firestore's offline sync is hard to beat.

## When I pick each one

### Firebase

Mobile-first apps that need to work offline: notes, messaging, anything where the connection is unreliable. MVPs I want to ship in a weekend without designing a schema. Projects already using Google Cloud, Analytics or Workspace APIs. And real-time collaboration, where Firestore listeners make presence and live updates almost trivial.

A real-time chat is a good example of how little code it takes:

\`\`\`javascript
const messagesRef = collection(db, 'rooms', roomId, 'messages');
const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));

onSnapshot(q, (snapshot) => {
  const messages = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
  setMessages(messages);
});
\`\`\`

It works offline, syncs on its own, and there's no backend for you to run.

### Supabase

Relational data with lots of joins: e-commerce, SaaS dashboards, CRMs. Analytics and reports where you want real SQL. AI work with pgvector for semantic search, embeddings or RAG. And sometimes I just want Postgres, and Supabase gives it to me with a nice developer experience.

Semantic search, for example, is one query:

\`\`\`sql
-- Semantic search with pgvector
SELECT
  id,
  title,
  content,
  1 - (embedding <=> query_embedding) AS similarity
FROM documents
WHERE 1 - (embedding <=> query_embedding) > 0.7
ORDER BY similarity DESC
LIMIT 10;
\`\`\`

Firestore does have vector search now, but having it next to the rest of your relational data, in the same query language, is what makes it nice in Postgres.

## Performance

Firestore scales automatically to a huge number of concurrent users, replicates across regions and serves reads instantly from the local cache when offline. Its weak points are the ones you'd expect: complex queries are still its hardest case, joins happen on the client, and keeping denormalized copies in sync costs writes.

Postgres is fast when you index properly (B-tree, GiST, GIN), joins are native, and the connection pooler handles lots of clients. On the other hand there's no offline mode, you'll eventually need read replicas, and connection setup isn't free.

In practice, simple reads feel comparable on both. Where Postgres pulls clearly ahead is joins and aggregations, which is exactly where Firestore makes you do work on the client.

## Pricing

Numbers as of this writing; check the pricing pages before you budget anything.

### Firebase

The free Spark plan gives you 1 GiB of Firestore storage, 50,000 reads, 20,000 writes and 20,000 deletes per day, and 10 GiB of egress a month.

On the pay-as-you-go Blaze plan, Firestore Standard in us-central1 costs about $0.03 per 100,000 reads, $0.09 per 100,000 writes and $0.01 per 100,000 deletes, with egress at $0.12/GiB after the free 10 GiB. Cloud Functions are $0.40 per million invocations plus compute.

The catch: you pay per operation, so a listener on a busy collection or a sudden spike in traffic can show up on the bill in ways you didn't expect.

### Supabase

The free plan includes a 500 MB database, 1 GB of file storage, 5 GB of egress, 50,000 monthly active users and 200 realtime connections.

Pro starts at $25 a month with an 8 GB database, 100 GB of storage, 250 GB of egress, 100,000 MAU, 500 realtime connections and daily backups, with usage-based charges above that. Team starts at $599 a month.

The catch: the database size limits can get tight for data-heavy apps.

For small projects both free tiers are generous. At scale, I find Supabase easier to predict, because you're paying for resources instead of every single read and write.

## Why I still lean Firebase

I'll admit it: I'm biased. A few reasons.

I've used Google Cloud for years. I know the console, IAM, the monitoring tools, and Firebase slots right into that.

Almost all my personal projects use Firebase for auth, data or storage, so the muscle memory is real.

A lot of what I build is mobile or needs to work offline, and Firestore's automatic sync is something I can't easily replace.

And I already use Analytics, Cloud Run and Pub/Sub. Having everything in one place makes billing, monitoring and debugging simpler.

That said, Supabase has won me over for specific things: projects where I want SQL, AI work with pgvector, open source projects where self-hosting matters, and anything analytics-heavy. Seeing Postgres packaged as a BaaS with this good a developer experience is exciting.

## So which one?

Go with Firebase if the app is mobile-first and needs offline, if you want to prototype without designing a schema, if you already live in Google's ecosystem, if you need real-time collaboration, or if you're comfortable with NoSQL and denormalized data.

Go with Supabase if your data is relational and complex, you need serious SQL, you want open source and the option to self-host, you're building AI features with pgvector, or you simply prefer Postgres and normalized data.

Or use both. Nothing stops you from letting Firebase handle auth and real-time while Supabase handles relational data and analytics, each doing what it's best at.

Neither is "better" in general. It's about your use case, what your team knows and how your architecture looks. For me, Firebase stays the default because of familiarity, ecosystem and the kind of apps I make. Supabase has earned a lot of respect, especially for anything Postgres-heavy and for AI work.

Try both, build something small with each, and keep the one that fits.

---

*Have you used both? Switched from one to the other? I'd like to hear what pushed you either way.*
`,
    author: 'Sebastian Alvarez',
    tags: ['Firebase', 'Supabase', 'NoSQL', 'PostgreSQL', 'Backend', 'BaaS']
  },
  es: {
    slug: 'firebase-vs-supabase',
    title: 'Firebase vs Supabase: documentos, tablas y por qué sigo con Firebase',
    date: 'March 10, 2026',
    excerpt: 'Una comparación técnica entre Firebase y Supabase: NoSQL contra SQL, auth, storage, funciones, tiempo real y precios, y por qué Firebase sigue siendo mi opción por defecto aunque Supabase me sigue sorprendiendo.',
    imageUrl: '/blog/firebase-vs-supabase.es.webp',
    imageAiHint: 'split technical comparison illustration: left side shows Firebase with NoSQL document structure, Google Cloud integration, realtime sync icons, orange/yellow Firebase colors; right side shows Supabase with PostgreSQL database tables, open source symbols, green Supabase branding; center shows vs symbol with code snippets, architecture diagrams, performance metrics; modern professional tech style with clean data visualization elements',
    content: `
Llevo años construyendo con Firebase. Es el backend de más o menos el 90% de mis proyectos personales, desde MVPs de fin de semana hasta apps con usuarios reales: Auth, Firestore, Cloud Functions, Storage. Todo calza con las herramientas de Google que ya conozco y, casi siempre, simplemente funciona.

Últimamente he estado jugando con Supabase y me ha impresionado. PostgreSQL me gusta mucho, así que un BaaS montado completo sobre Postgres iba a llamarme la atención sí o sí. La experiencia de desarrollo es limpia, el rendimiento es sólido y el enfoque SQL primero se siente correcto para cierto tipo de proyectos.

Aun así, sigo eligiendo Firebase más seguido. No porque Supabase se quede corto, sino porque Firebase encaja con mi forma de trabajar y con el tipo de apps que suelo hacer. Este post es mi intento de una comparación técnica justa: NoSQL contra SQL, las funcionalidades principales lado a lado, precios, y por qué termino donde termino.

## La diferencia real es el modelo de datos

Todo lo demás sale de aquí. Firebase te da una base de datos de documentos; Supabase te da Postgres.

### Firestore: documentos y colecciones

Firestore guarda documentos tipo JSON agrupados en colecciones:

\`\`\`javascript
// Users collection
users/{userId} {
  name: "Sebastian",
  email: "sebastian@example.com",
  createdAt: timestamp,
  settings: {
    theme: "dark",
    notifications: true
  }
}

// Posts subcollection
users/{userId}/posts/{postId} {
  title: "My First Post",
  content: "...",
  tags: ["tech", "firebase"],
  likes: 42
}
\`\`\`

No hay esquema fijo, así que agregas campos cuando los necesitas. Desnormalizas harto para evitar joins, los documentos pueden anidar mapas y arrays, y las consultas de grupo de colecciones te dejan buscar en todas las subcolecciones que se llamen igual.

Consultar era el punto débil de Firestore. En enero de 2026 Google anunció las pipeline operations para la nueva Enterprise edition de Firestore: más de cien capacidades de consulta nuevas, entre ellas agregaciones, desanidar arrays y regex, además de índices opcionales en vez de obligatorios. Salió en preview y pasó a disponibilidad general en Cloud Next, en abril de 2026. Esto es lo que ahora se puede hacer:

\`\`\`javascript
// Top 10 tags across all recipes
const snapshot = await db.pipeline()
  .collection("recipes")
  .select("tags")
  .unnest(field("tags").as("tagName"))
  .aggregate({
    accumulators: [countAll().as("tagCount")],
    groups: ["tagName"]
  })
  .sort(field("tagCount").descending())
  .limit(10)
  .execute();
\`\`\`

No convierte a Firestore en una base relacional, pero acorta bastante la distancia con otras bases NoSQL.

### Supabase: PostgreSQL a secas

Supabase es Postgres con mucha herramienta alrededor. El esquema lo defines de entrada:

\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table with a foreign key
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[],
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_posts_user_id ON posts(user_id);
\`\`\`

Tienes datos normalizados con llaves foráneas y joins, transacciones ACID, todo el lenguaje SQL (CTEs, funciones de ventana, etc.) y extensiones de Postgres como PostGIS para datos geográficos o pgvector para embeddings.

### Cuándo conviene usar documentos

Firestore brilla cuando quieres prototipar sin diseñar un esquema, cuando tus datos son jerárquicos por naturaleza (un perfil de usuario con configuraciones anidadas), cuando la forma cambia seguido, cuando la app es mobile-first y tiene que funcionar offline, y para cosas en tiempo real como chat, presencia o cursores en vivo.

Un feed social es un buen ejemplo:

\`\`\`javascript
// Post with embedded author and comments (denormalized)
posts/{postId} {
  author: { id: "...", name: "...", avatar: "..." },
  content: "...",
  comments: [
    { userId: "...", text: "...", timestamp: ... },
    { userId: "...", text: "...", timestamp: ... }
  ],
  likes: ["userId1", "userId2", "userId3"]
}
\`\`\`

Copias los datos del autor en cada post y, a cambio, una sola lectura de documento te da todo lo que necesitas para mostrarlo. El costo aparece después, cuando ese autor cambia su avatar y tienes que actualizar todas las copias.

### Cuándo conviene usar tablas

Postgres gana cuando los datos tienen muchas relaciones (productos, órdenes, inventario), cuando la integridad importa de verdad (cualquier cosa con plata), cuando necesitas reportes y agregaciones, cuando tu equipo ya sabe SQL y cada vez que duplicar datos te traería más problemas que soluciones.

\`\`\`sql
SELECT
  o.id AS order_id,
  u.name AS customer_name,
  p.name AS product_name,
  oi.quantity,
  oi.price,
  (oi.quantity * oi.price) AS total
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON oi.product_id = p.id
WHERE o.status = 'completed'
  AND o.created_at > NOW() - INTERVAL '30 days';
\`\`\`

En Firestore esto significa varias lecturas y armar el resultado en el cliente. En Postgres es una consulta y ya.

## Funcionalidad por funcionalidad

### Autenticación

Firebase Auth soporta correo y contraseña, Google, Facebook, X, GitHub, Apple, teléfono, login anónimo y tokens personalizados. Trae UI lista para web y móvil y se conecta directo con las reglas de seguridad de Firestore. Para SAML y OIDC tienes que pasarte a Identity Platform.

\`\`\`javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
\`\`\`

Supabase Auth cubre correo y contraseña, magic links, proveedores OAuth y teléfono. Los usuarios viven en una tabla \`auth.users\`, SAML SSO viene en los planes pagados sin un producto aparte, y el control de acceso se hace con políticas de Row Level Security en Postgres.

\`\`\`javascript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});
\`\`\`

Para mí es empate. Los SDKs y componentes de UI de Firebase están más pulidos; RLS es una forma muy potente de expresar reglas de autorización complicadas.

### Base de datos

Firestore es administrada y escala sola, tiene soporte offline con sincronización automática y te deja suscribirte en tiempo real a documentos, colecciones y consultas.

Supabase te da Postgres con decenas de extensiones disponibles (PostGIS, pgvector, pg_cron y más), APIs REST y GraphQL generadas automáticamente desde tu esquema, y eventos de cambios en tiempo real usando la replicación lógica de Postgres. Escala verticalmente, con réplicas de lectura en los planes pagados.

Quién gana depende completamente de la app: Firestore para móvil con necesidades offline, Supabase para datos relacionales y consultas pesadas.

### Storage

Cloud Storage for Firebase corre sobre Google Cloud Storage, usa Firebase Auth y reglas de seguridad para el acceso y maneja subidas reanudables para archivos grandes. Pagas aparte el almacenamiento, el ancho de banda y las operaciones.

Supabase Storage usa S3 por debajo, guarda la metadata de los archivos en Postgres para que las políticas RLS apliquen también a los archivos, soporta subidas reanudables (TUS) y ofrece transformación de imágenes al vuelo en los planes pagados. El límite es de 50 MB por archivo en el plan gratis y hasta 500 GB en Pro.

Los dos andan bien aquí. Firebase tiene más historia con apps cargadas de multimedia; la integración con RLS de Supabase es el modelo más elegante.

### Funciones

Cloud Functions for Firebase corre Node.js (o Python) y se dispara por HTTP, Firestore, Auth, Storage, Pub/Sub o un horario. Está muy metida en el resto de Firebase. Los cold starts pueden doler, aunque la segunda generación mejoró. Pagas por invocación más tiempo de cómputo.

\`\`\`javascript
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

export const onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data.data();
  await sendEmail(userData.email, 'Welcome!');
});
\`\`\`

Las Edge Functions de Supabase corren en Deno con TypeScript, se despliegan cerca de tus usuarios y hablan directo con Postgres. Los cold starts suelen ser más rápidos que en el serverless tradicional, y el plan Pro incluye 2 millones de invocaciones al mes.

\`\`\`typescript
import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async (req) => {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_ANON_KEY')!
  );

  const { data } = await supabase.from('users').select('*');
  return new Response(JSON.stringify(data), {
    headers: { 'Content-Type': 'application/json' }
  });
});
\`\`\`

Firebase gana en ecosistema; Supabase en latencia en el edge. Y a mí Deno me gusta, así que suma puntos.

### Tiempo real

Firestore (y la antigua Realtime Database) te dejan escuchar documentos, colecciones y consultas. Los cambios hechos sin conexión quedan en cola y se sincronizan cuando vuelve la red, y armar presencia es fácil.

\`\`\`javascript
import { doc, onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(doc(db, 'posts', postId), (snap) => {
  console.log('Current data:', snap.data());
});
\`\`\`

Supabase Realtime tiene tres piezas: Postgres Changes (escuchar inserts, updates y deletes en una tabla), Broadcast (pub/sub para mensajes efímeros) y Presence. El plan gratis permite 200 conexiones simultáneas y Pro 500.

\`\`\`javascript
const channel = supabase
  .channel('posts')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe();
\`\`\`

Aquí para mí gana Firebase. Supabase Realtime es sólido, pero no guarda caché offline, y para apps móviles la sincronización offline de Firestore es difícil de superar.

## Cuándo elijo cada uno

### Firebase

Apps mobile-first que tienen que funcionar offline: notas, mensajería, cualquier cosa donde la conexión no es confiable. MVPs que quiero sacar en un fin de semana sin diseñar esquema. Proyectos que ya usan Google Cloud, Analytics o APIs de Workspace. Y colaboración en tiempo real, donde los listeners de Firestore hacen que la presencia y las actualizaciones en vivo sean casi triviales.

Un chat en tiempo real es buen ejemplo de lo poco código que necesitas:

\`\`\`javascript
const messagesRef = collection(db, 'rooms', roomId, 'messages');
const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));

onSnapshot(q, (snapshot) => {
  const messages = snapshot.docs.map((d) => ({
    id: d.id,
    ...d.data()
  }));
  setMessages(messages);
});
\`\`\`

Funciona offline, se sincroniza solo y no hay backend que tengas que mantener.

### Supabase

Datos relacionales con muchos joins: e-commerce, dashboards SaaS, CRMs. Analítica y reportes donde quieres SQL de verdad. Trabajo con IA usando pgvector para búsqueda semántica, embeddings o RAG. Y a veces simplemente quiero Postgres, y Supabase me lo da con una muy buena experiencia de desarrollo.

La búsqueda semántica, por ejemplo, es una sola consulta:

\`\`\`sql
-- Semantic search with pgvector
SELECT
  id,
  title,
  content,
  1 - (embedding <=> query_embedding) AS similarity
FROM documents
WHERE 1 - (embedding <=> query_embedding) > 0.7
ORDER BY similarity DESC
LIMIT 10;
\`\`\`

Firestore ya tiene búsqueda vectorial, pero tenerla junto al resto de tus datos relacionales, en el mismo lenguaje de consultas, es lo que la hace cómoda en Postgres.

## Rendimiento

Firestore escala solo a una cantidad enorme de usuarios concurrentes, replica entre regiones y sirve lecturas al instante desde la caché local cuando no hay conexión. Sus puntos débiles son los esperables: las consultas complejas siguen siendo su caso más difícil, los joins se hacen en el cliente y mantener sincronizadas las copias desnormalizadas cuesta escrituras.

Postgres es rápido cuando indexas bien (B-tree, GiST, GIN), los joins son nativos y el pooler de conexiones aguanta muchos clientes. Por otro lado no tiene modo offline, tarde o temprano vas a necesitar réplicas de lectura y abrir conexiones no es gratis.

En la práctica, las lecturas simples se sienten parecidas en los dos. Donde Postgres saca ventaja clara es en joins y agregaciones, que es justo donde Firestore te obliga a hacer trabajo en el cliente.

## Precios

Cifras a la fecha en que escribo esto; revisa las páginas de precios antes de presupuestar nada.

### Firebase

El plan gratis Spark te da 1 GiB de almacenamiento en Firestore, 50.000 lecturas, 20.000 escrituras y 20.000 borrados al día, y 10 GiB de salida de datos al mes.

En el plan Blaze, de pago por uso, Firestore Standard en us-central1 cuesta alrededor de USD 0,03 por cada 100.000 lecturas, USD 0,09 por cada 100.000 escrituras y USD 0,01 por cada 100.000 borrados, con la salida de datos a USD 0,12/GiB después de los 10 GiB gratis. Cloud Functions cuesta USD 0,40 por millón de invocaciones más el cómputo.

Ojo con esto: pagas por operación, así que un listener sobre una colección muy movida o un peak de tráfico pueden aparecer en la cuenta de formas que no esperabas.

### Supabase

El plan gratis incluye una base de 500 MB, 1 GB de archivos, 5 GB de salida de datos, 50.000 usuarios activos al mes y 200 conexiones de realtime.

Pro parte en USD 25 al mes con una base de 8 GB, 100 GB de almacenamiento, 250 GB de salida, 100.000 MAU, 500 conexiones de realtime y backups diarios, con cobro por uso por encima de eso. Team parte en USD 599 al mes.

Ojo con esto: los límites de tamaño de la base pueden quedarte chicos en apps con muchos datos.

Para proyectos chicos, los dos planes gratis son generosos. A escala, Supabase me resulta más fácil de predecir, porque pagas por recursos y no por cada lectura y escritura.

## Por qué sigo inclinándome por Firebase

Lo admito: tengo un sesgo. Por varias razones.

Uso Google Cloud hace años. Conozco la consola, IAM y las herramientas de monitoreo, y Firebase encaja justo ahí.

Casi todos mis proyectos personales usan Firebase para auth, datos o storage, así que la memoria muscular pesa.

Mucho de lo que construyo es móvil o tiene que funcionar offline, y la sincronización automática de Firestore no es algo que pueda reemplazar fácil.

Y ya uso Analytics, Cloud Run y Pub/Sub. Tener todo en un mismo lugar simplifica la facturación, el monitoreo y el debugging.

Dicho eso, Supabase me conquistó para cosas puntuales: proyectos donde quiero SQL, trabajo de IA con pgvector, proyectos open source donde importa poder hostearlo uno mismo y cualquier cosa cargada a la analítica. Ver Postgres empaquetado como BaaS con una experiencia de desarrollo así de buena me entusiasma.

## Entonces, ¿cuál?

Anda por Firebase si la app es mobile-first y necesita offline, si quieres prototipar sin diseñar esquema, si ya vives en el ecosistema de Google, si necesitas colaboración en tiempo real o si te acomoda NoSQL con datos desnormalizados.

Anda por Supabase si tus datos son relacionales y complejos, necesitas SQL en serio, quieres open source y la opción de hostearlo tú, estás construyendo funcionalidades de IA con pgvector o simplemente prefieres Postgres y datos normalizados.

O usa los dos. Nada te impide dejar que Firebase se encargue de auth y tiempo real mientras Supabase maneja los datos relacionales y la analítica, cada uno haciendo lo que mejor sabe hacer.

Ninguno es "mejor" en general. Depende de tu caso, de lo que sabe tu equipo y de cómo es tu arquitectura. Para mí, Firebase sigue siendo la opción por defecto por familiaridad, ecosistema y el tipo de apps que hago. Supabase se ganó mucho respeto, sobre todo para cualquier cosa pesada en Postgres y para trabajo con IA.

Prueba los dos, arma algo chico con cada uno y quédate con el que te acomode.

---

*¿Has usado los dos? ¿Te cambiaste de uno al otro? Me interesa saber qué te hizo decidir.*
`,
    author: 'Sebastian Alvarez',
    tags: ['Firebase', 'Supabase', 'NoSQL', 'PostgreSQL', 'Backend', 'BaaS']
  }
};
