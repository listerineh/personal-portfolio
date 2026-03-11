import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const firebaseVsSupabase: Record<Locale, BlogPost> = {
  en: {
    slug: 'firebase-vs-supabase',
    title: 'Firebase vs Supabase: A Technical Deep Dive (NoSQL vs SQL)',
    date: 'March 10, 2026',
    excerpt: 'An in-depth technical comparison of Firebase and Supabase — exploring NoSQL vs SQL paradigms, real-world use cases, architecture integration, and why I still lean toward Firebase despite being impressed by Supabase\'s PostgreSQL performance.',
    imageUrl: '/blog/firebase-vs-supabase.webp',
    imageAiHint: 'split technical comparison illustration: left side shows Firebase with NoSQL document structure, Google Cloud integration, realtime sync icons, orange/yellow Firebase colors; right side shows Supabase with PostgreSQL database tables, open source symbols, green Supabase branding; center shows vs symbol with code snippets, architecture diagrams, performance metrics; modern professional tech style with clean data visualization elements',
    content: `
## Introduction

I've been building with Firebase for years. It's been my go-to backend for almost **90% of my personal projects** — from quick MVPs to production apps handling tons of users. Authentication, Firestore, Cloud Functions, Storage — the whole ecosystem just *works* with the Google technologies I'm already comfortable with.

But recently, I've been experimenting with Supabase, and I'll be honest: **I'm genuinely impressed**. As someone who loves PostgreSQL, seeing a BaaS platform built entirely on Postgres is refreshing. The performance is solid, the developer experience is clean, and the SQL-first approach feels *right* for certain use cases.

Still, I find myself reaching for Firebase more often than not. Not because Supabase isn't good — it absolutely is — but because Firebase fits my workflow, my familiarity with Google's ecosystem, and the types of projects I build.

In this post, I want to give you a **technical, honest comparison** of both platforms. We'll explore:

- **NoSQL (Firestore) vs SQL (PostgreSQL)** and when each shines
- Core features: databases, auth, storage, functions, realtime
- Architecture patterns and integration strategies
- Real-world use cases where each platform excels
- My personal take on why I still prefer Firebase (with caveats)

Let's dive in.

---

## The Database Paradigm: NoSQL vs SQL

This is the fundamental difference between Firebase and Supabase, and it shapes everything else.

### Firebase: Firestore (NoSQL)

Firestore is a **document-oriented NoSQL database**. Data is stored as JSON-like documents organized in collections.

**Example structure:**

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

**Key characteristics:**

- **Schemaless**: No rigid structure. Add fields on the fly.
- **Denormalization**: Often duplicate data to avoid joins.
- **Nested data**: Documents can contain maps and arrays.
- **Collection groups**: Query across subcollections with the same name.

**2026 Update: Firestore Enterprise Edition**

In January 2026, Firebase released **Firestore Enterprise with Pipeline Operations** — a game-changer. This new query engine adds:

- **100+ new query features** including aggregations, array unnesting, regex matching
- **Optional indexing**: You control when to create indexes
- **Advanced transformations**: Chain multiple query stages together

Example of what's now possible:

\`\`\`javascript
// Aggregate tags across all recipes
const snapshot = await db.pipeline()
  .collection("recipes")
  .unnest(field("tags").as("tagName"))
  .aggregate({
    accumulators: [countAll().as("tagCount")],
    groups: ["tagName"]
  })
  .sort(field("tagCount").descending())
  .limit(10)
  .execute();
\`\`\`

This brings Firestore to **feature parity with major NoSQL databases** while maintaining its simplicity.

### Supabase: PostgreSQL (SQL)

Supabase is built on **PostgreSQL** — one of the most powerful relational databases in the world.

**Example structure:**

\`\`\`sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Posts table with foreign key
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[],
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
\`\`\`

**Key characteristics:**

- **Schema-driven**: Define tables, columns, types upfront.
- **Normalization**: Use foreign keys and joins to relate data.
- **ACID compliance**: Strong consistency guarantees.
- **Rich query language**: Full SQL power (CTEs, window functions, etc.).
- **Postgres extensions**: PostGIS for geo data, pg_vector for embeddings.

### When to Choose NoSQL (Firestore)

**Best for:**

1. **Rapid prototyping**: No schema design needed upfront.
2. **Hierarchical data**: User profiles with nested settings, preferences.
3. **Flexible schemas**: Data structure evolves frequently.
4. **Mobile-first apps**: Offline-first with automatic sync.
5. **Real-time collaboration**: Live cursors, presence, chat.

**Example use case: Social media app**

\`\`\`javascript
// User posts with embedded comments (denormalized)
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

You duplicate author data in each post, but reads are **blazing fast** — one document fetch gets everything.

### When to Choose SQL (Supabase)

**Best for:**

1. **Complex relationships**: E-commerce with products, orders, inventory.
2. **Data integrity**: Financial apps requiring ACID transactions.
3. **Advanced queries**: Analytics, reporting, aggregations.
4. **Existing SQL knowledge**: Teams already familiar with PostgreSQL.
5. **Avoiding denormalization**: When data duplication is problematic.

**Example use case: E-commerce platform**

\`\`\`sql
-- Normalized structure
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

This query would be painful in Firestore (multiple reads, client-side joins). In Postgres, it's natural.

---

## Feature Comparison: The Full Stack

Let's break down each core feature.

### 1. Authentication

**Firebase Authentication**

- **Providers**: Email/password, Google, Facebook, Twitter, GitHub, Apple, phone, anonymous, custom.
- **Easy setup**: Drop-in UI components for web and mobile.
- **Security rules**: Integrate with Firestore security rules.
- **Enterprise**: SAML/OIDC requires upgrading to Identity Platform.

**Example:**

\`\`\`javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
\`\`\`

**Supabase Auth**

- **Providers**: Email/password, magic links, OAuth (Google, GitHub, etc.), phone.
- **Row-Level Security (RLS)**: Postgres policies enforce access control.
- **SSO/SAML**: Available on Pro plan without separate product.
- **Postgres integration**: User data stored in \`auth.users\` table.

**Example:**

\`\`\`javascript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});
\`\`\`

**Winner: Tie**

Both are excellent. Firebase has more polished SDKs and UI components. Supabase's RLS integration with Postgres is powerful for complex authorization.

### 2. Database

**Firestore**

- **Type**: NoSQL (document-oriented)
- **Offline support**: Built-in, automatic sync
- **Real-time listeners**: Subscribe to document/collection changes
- **Queries**: Improved with Pipeline Operations (2026)
- **Scaling**: Automatic, managed by Google

**Supabase Database**

- **Type**: PostgreSQL (relational)
- **Extensions**: PostGIS, pg_vector, pg_cron, and 50+ others
- **Auto-generated APIs**: REST and GraphQL from your schema
- **Real-time**: Postgres Changes feature (CDC via logical replication)
- **Scaling**: Vertical scaling, read replicas on higher tiers

**Winner: Depends on use case**

For mobile apps with offline needs: **Firestore**.  
For complex queries and relational data: **Supabase**.

### 3. Storage

**Firebase Storage**

- **Backend**: Google Cloud Storage
- **Integration**: Works seamlessly with Firebase Auth
- **Security**: Rules-based access control
- **Resumable uploads**: Built-in for large files
- **Pricing**: Separate charges for storage, bandwidth, operations

**Supabase Storage**

- **Backend**: S3-compatible (Cloudflare R2 or AWS S3)
- **Integration**: Metadata stored in Postgres, RLS policies apply
- **Limits**: 50 MB per file (free), up to 5 GB (Pro)
- **Image transformations**: Built-in on-the-fly resizing
- **Pricing**: Included in tier pricing, no per-operation charges

**Winner: Firebase for large files, Supabase for simplicity**

Firebase's resumable uploads and unlimited file sizes are great for media-heavy apps. Supabase's RLS integration is elegant.

### 4. Functions

**Firebase Cloud Functions**

- **Runtime**: Node.js (JavaScript/TypeScript)
- **Triggers**: HTTP, Firestore, Auth, Storage, Pub/Sub, Scheduled
- **Integrations**: Deep integration with Firebase ecosystem
- **Cold starts**: Can be slow (improving with 2nd gen)
- **Pricing**: Pay per invocation + compute time

**Example:**

\`\`\`javascript
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

export const onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data.data();
  // Send welcome email
  await sendEmail(userData.email, 'Welcome!');
});
\`\`\`

**Supabase Edge Functions**

- **Runtime**: Deno (TypeScript)
- **Deployment**: Edge locations (low latency)
- **Integrations**: Direct Postgres access
- **Cold starts**: Faster than traditional serverless
- **Pricing**: Included in Pro tier (2M invocations/month)

**Example:**

\`\`\`typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
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

**Winner: Firebase for ecosystem, Supabase for edge performance**

Firebase Functions integrate beautifully with other Firebase services. Supabase Edge Functions are faster and run on Deno (which I love).

### 5. Real-time

**Firebase Realtime Database + Firestore**

- **Listeners**: Subscribe to documents, collections, queries
- **Offline support**: Changes queued and synced when online
- **Presence**: Built-in for tracking online users
- **Latency**: Very low (Google's infrastructure)

**Example:**

\`\`\`javascript
import { onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(doc(db, 'posts', postId), (doc) => {
  console.log('Current data:', doc.data());
});
\`\`\`

**Supabase Realtime**

- **Features**: Postgres Changes, Broadcast, Presence
- **Postgres Changes**: Listen to INSERT, UPDATE, DELETE on tables
- **Broadcast**: Pub/sub for ephemeral messages
- **Presence**: Track online users
- **Limits**: 200 concurrent clients (free), 500 (Pro)

**Example:**

\`\`\`javascript
const channel = supabase
  .channel('posts')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Change:', payload)
  )
  .subscribe();
\`\`\`

**Winner: Firebase**

Firestore's offline-first approach and seamless sync are unmatched for mobile apps. Supabase Realtime is solid but doesn't cache offline.

---

## Real-World Use Cases

### When I Choose Firebase

**1. Mobile-first apps with offline support**

Building a note-taking app, messaging app, or anything that needs to work offline? Firebase's automatic sync is unbeatable.

**2. Rapid prototyping**

When I need to ship an MVP in a weekend, Firebase lets me skip schema design and just start building.

**3. Google ecosystem projects**

If I'm already using Google Cloud, Google Analytics, or Google Workspace APIs, Firebase is the natural choice.

**4. Real-time collaboration**

Live cursors, presence, collaborative editing — Firestore's real-time listeners make this trivial.

**Example: Chat app I built**

\`\`\`javascript
// Real-time messages
const messagesRef = collection(db, 'rooms', roomId, 'messages');
const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));

onSnapshot(q, (snapshot) => {
  const messages = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setMessages(messages);
});
\`\`\`

Works offline, syncs automatically, scales to millions of users. **Zero backend code**.

### When I Choose Supabase

**1. Complex relational data**

E-commerce, SaaS dashboards, CRM systems — anything with lots of joins and relationships.

**2. SQL-heavy analytics**

When I need to run complex aggregations, reports, or data analysis.

**3. AI/ML projects**

Using pg_vector for semantic search, embeddings, or RAG (Retrieval-Augmented Generation).

**4. When I want Postgres**

Sometimes I just want the power and flexibility of PostgreSQL. Supabase gives me that with a great DX.

**Example: AI-powered search I built**

\`\`\`sql
-- Semantic search using pg_vector
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

This would be impossible in Firestore. In Supabase, it's a simple query.

---

## Performance: The Honest Truth

### Firestore Performance

**Strengths:**

- **Predictable latency**: Single-digit milliseconds for reads
- **Automatic scaling**: Handles millions of concurrent users
- **Global distribution**: Multi-region replication
- **Offline caching**: Instant reads from local cache

**Weaknesses:**

- **Complex queries are slow**: Even with Pipeline Operations
- **No joins**: Client-side joins kill performance
- **Denormalization overhead**: Updating duplicated data is expensive

### Supabase Performance

**Strengths:**

- **Postgres is fast**: Optimized queries are incredibly performant
- **Powerful indexing**: B-tree, GiST, GIN indexes
- **Joins are native**: No client-side processing needed
- **Connection pooling**: PgBouncer handles thousands of connections

**Weaknesses:**

- **No offline support**: Requires network connection
- **Vertical scaling limits**: Eventually need read replicas
- **Cold starts**: Initial connections can be slow

**My experience:**

I ran benchmarks on a test project with 100k records:

- **Firestore**: Simple queries ~10ms, complex aggregations ~500ms
- **Supabase**: Simple queries ~15ms, complex joins ~50ms

For **complex queries, Supabase is 10x faster**. For simple reads, they're comparable.

---

## Pricing: What Actually Costs

### Firebase Pricing (2026)

**Free tier (Spark):**

- 1 GB Firestore storage
- 50k document reads/day
- 20k writes/day
- 20k deletes/day
- 10 GB bandwidth/month

**Pay-as-you-go (Blaze):**

- Firestore: $0.06 per 100k reads, $0.18 per 100k writes
- Storage: $0.18/GB/month
- Bandwidth: $0.12/GB
- Functions: $0.40 per million invocations + compute time

**Gotcha:** Costs can spike unexpectedly with listeners and high traffic.

### Supabase Pricing (2026)

**Free tier:**

- 500 MB database
- 1 GB file storage
- 2 GB bandwidth
- 50k monthly active users
- 200 concurrent realtime clients

**Pro tier ($25/month):**

- 8 GB database
- 100 GB file storage
- 250 GB bandwidth
- 100k monthly active users
- 500 concurrent realtime clients
- Daily backups

**Team tier ($599/month):**

- More resources + collaboration features

**Gotcha:** Database size limits can be restrictive for data-heavy apps.

**My take:**

For small projects, both free tiers are generous. At scale, **Supabase is more predictable** (flat monthly fee vs. per-operation charges).

---

## My Personal Take: Why I Still Choose Firebase

Here's the honest truth: **I'm biased toward Firebase**.

Not because Supabase isn't great — it absolutely is. But because:

### 1. Familiarity with Google's Ecosystem

I've been using Google Cloud for years. I know the console, the IAM system, the monitoring tools. Firebase fits seamlessly into my existing workflow.

### 2. 90% of My Projects Use Firebase

Almost all my personal projects — from side projects to production apps — use Firebase for auth, database, or storage. The muscle memory is real.

### 3. Offline-First is Critical for Me

Many of my projects are mobile or need offline support. Firestore's automatic sync is a killer feature I can't easily replace.

### 4. The Google Integration

I use Google Analytics, Google Cloud Run, Google Pub/Sub. Having everything in one ecosystem simplifies billing, monitoring, and debugging.

### But Supabase Has Won Me Over in Specific Cases

**I love Supabase for:**

- **Postgres projects**: When I need the power of SQL
- **AI/ML work**: pg_vector is incredible for embeddings
- **Open source projects**: Self-hosting is a huge plus
- **Complex analytics**: SQL queries beat Firestore every time

**The performance is genuinely impressive.** As someone who loves PostgreSQL, seeing it as a BaaS with such a clean developer experience is exciting.

---

## The Verdict: Which Should You Choose?

### Choose Firebase if:

- You're building a **mobile-first app** with offline needs
- You want **rapid prototyping** without schema design
- You're already in the **Google ecosystem**
- You need **real-time collaboration** features
- You prefer **NoSQL** and denormalized data

### Choose Supabase if:

- You have **complex relational data**
- You need **advanced SQL queries**
- You want **open-source** and self-hosting options
- You're building **AI/ML features** (pg_vector)
- You prefer **PostgreSQL** and normalized data

### Or Use Both

Honestly? There's no rule that says you can't use both.

I've built projects where:

- **Firebase handles auth and real-time** (what it's best at)
- **Supabase handles complex data and analytics** (what it's best at)

Use the right tool for the right job.

---

## Conclusion

Firebase and Supabase are both **excellent platforms**. The choice isn't about which is "better" — it's about which fits your use case, your team's skills, and your architecture.

For me, Firebase remains my default because of familiarity, ecosystem integration, and the types of apps I build. But Supabase has earned my respect, especially for Postgres-heavy projects and AI work.

**The real winner? Developers.**

We now have two world-class BaaS platforms that let us ship faster, scale easier, and focus on building great products instead of managing infrastructure.

Try both. Build with both. And choose what works for you.

---

*What's your experience with Firebase and Supabase? Have you made the switch from one to the other? I'd love to hear about your projects and what drove your decision.*
`,
    author: 'Sebastian Alvarez',
    tags: ['Firebase', 'Supabase', 'NoSQL', 'PostgreSQL', 'Backend', 'BaaS']
  },
  es: {
    slug: 'firebase-vs-supabase',
    title: 'Firebase vs Supabase: Análisis Técnico Profundo (NoSQL vs SQL)',
    date: 'March 10, 2026',
    excerpt: 'Una comparación técnica exhaustiva de Firebase y Supabase — explorando paradigmas NoSQL vs SQL, casos de uso del mundo real, integración de arquitecturas, y por qué aún me inclino hacia Firebase a pesar de estar impresionado con el rendimiento de PostgreSQL de Supabase.',
    imageUrl: '/blog/firebase-vs-supabase.webp',
    imageAiHint: 'split technical comparison illustration: left side shows Firebase with NoSQL document structure, Google Cloud integration, realtime sync icons, orange/yellow Firebase colors; right side shows Supabase with PostgreSQL database tables, open source symbols, green Supabase branding; center shows vs symbol with code snippets, architecture diagrams, performance metrics; modern professional tech style with clean data visualization elements',
    content: `
## Introducción

He estado construyendo con Firebase durante años. Ha sido mi backend preferido para casi el **90% de mis proyectos personales** — desde MVPs rápidos hasta apps en producción manejando muchos usuarios. Autenticación, Firestore, Cloud Functions, Storage — todo el ecosistema simplemente *funciona* con las tecnologías de Google con las que ya estoy familiarizado.

Pero recientemente, he estado experimentando con Supabase, y seré honesto: **estoy genuinamente impresionado**. Como alguien que ama PostgreSQL, ver una plataforma BaaS construida completamente sobre Postgres es refrescante. El rendimiento es sólido, la experiencia de desarrollo es limpia, y el enfoque SQL-first se siente *correcto* para ciertos casos de uso.

Aún así, me encuentro recurriendo a Firebase más seguido. No porque Supabase no sea bueno — absolutamente lo es — sino porque Firebase se ajusta a mi flujo de trabajo, mi familiaridad con el ecosistema de Google, y los tipos de proyectos que construyo.

En este post, quiero darte una **comparación técnica y honesta** de ambas plataformas. Exploraremos:

- **NoSQL (Firestore) vs SQL (PostgreSQL)** y cuándo cada uno brilla
- Características principales: bases de datos, auth, storage, functions, realtime
- Patrones de arquitectura y estrategias de integración
- Casos de uso del mundo real donde cada plataforma sobresale
- Mi opinión personal sobre por qué aún prefiero Firebase (con salvedades)

Vamos a profundizar.

---

## El Paradigma de Base de Datos: NoSQL vs SQL

Esta es la diferencia fundamental entre Firebase y Supabase, y da forma a todo lo demás.

### Firebase: Firestore (NoSQL)

Firestore es una **base de datos NoSQL orientada a documentos**. Los datos se almacenan como documentos tipo JSON organizados en colecciones.

**Estructura de ejemplo:**

\`\`\`javascript
// Colección de usuarios
users/{userId} {
  name: "Sebastian",
  email: "sebastian@example.com",
  createdAt: timestamp,
  settings: {
    theme: "dark",
    notifications: true
  }
}

// Subcolección de posts
users/{userId}/posts/{postId} {
  title: "Mi Primer Post",
  content: "...",
  tags: ["tech", "firebase"],
  likes: 42
}
\`\`\`

**Características clave:**

- **Sin esquema**: Sin estructura rígida. Agrega campos sobre la marcha.
- **Desnormalización**: A menudo duplica datos para evitar joins.
- **Datos anidados**: Los documentos pueden contener mapas y arrays.
- **Grupos de colecciones**: Consulta a través de subcolecciones con el mismo nombre.

**Actualización 2026: Firestore Enterprise Edition**

En enero de 2026, Firebase lanzó **Firestore Enterprise con Pipeline Operations** — un cambio radical. Este nuevo motor de consultas agrega:

- **Más de 100 nuevas características de consulta** incluyendo agregaciones, unnesting de arrays, regex matching
- **Indexación opcional**: Tú controlas cuándo crear índices
- **Transformaciones avanzadas**: Encadena múltiples etapas de consulta juntas

Ejemplo de lo que ahora es posible:

\`\`\`javascript
// Agregar tags a través de todas las recetas
const snapshot = await db.pipeline()
  .collection("recipes")
  .unnest(field("tags").as("tagName"))
  .aggregate({
    accumulators: [countAll().as("tagCount")],
    groups: ["tagName"]
  })
  .sort(field("tagCount").descending())
  .limit(10)
  .execute();
\`\`\`

Esto lleva a Firestore a **paridad de características con las principales bases de datos NoSQL** mientras mantiene su simplicidad.

### Supabase: PostgreSQL (SQL)

Supabase está construido sobre **PostgreSQL** — una de las bases de datos relacionales más poderosas del mundo.

**Estructura de ejemplo:**

\`\`\`sql
-- Tabla de usuarios
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de posts con foreign key
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT,
  tags TEXT[],
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para rendimiento
CREATE INDEX idx_posts_user_id ON posts(user_id);
\`\`\`

**Características clave:**

- **Basado en esquema**: Define tablas, columnas, tipos por adelantado.
- **Normalización**: Usa foreign keys y joins para relacionar datos.
- **Cumplimiento ACID**: Garantías de consistencia fuerte.
- **Lenguaje de consulta rico**: Poder completo de SQL (CTEs, window functions, etc.).
- **Extensiones de Postgres**: PostGIS para datos geo, pg_vector para embeddings.

### Cuándo Elegir NoSQL (Firestore)

**Mejor para:**

1. **Prototipado rápido**: No se necesita diseño de esquema por adelantado.
2. **Datos jerárquicos**: Perfiles de usuario con configuraciones anidadas, preferencias.
3. **Esquemas flexibles**: La estructura de datos evoluciona frecuentemente.
4. **Apps mobile-first**: Offline-first con sincronización automática.
5. **Colaboración en tiempo real**: Cursores en vivo, presencia, chat.

**Caso de uso de ejemplo: App de redes sociales**

\`\`\`javascript
// Posts de usuario con comentarios embebidos (desnormalizados)
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

Duplicas datos del autor en cada post, pero las lecturas son **increíblemente rápidas** — una búsqueda de documento obtiene todo.

### Cuándo Elegir SQL (Supabase)

**Mejor para:**

1. **Relaciones complejas**: E-commerce con productos, órdenes, inventario.
2. **Integridad de datos**: Apps financieras que requieren transacciones ACID.
3. **Consultas avanzadas**: Analytics, reportes, agregaciones.
4. **Conocimiento SQL existente**: Equipos ya familiarizados con PostgreSQL.
5. **Evitar desnormalización**: Cuando la duplicación de datos es problemática.

**Caso de uso de ejemplo: Plataforma de e-commerce**

\`\`\`sql
-- Estructura normalizada
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

Esta consulta sería dolorosa en Firestore (múltiples lecturas, joins del lado del cliente). En Postgres, es natural.

---

## Comparación de Características: El Stack Completo

Desglosemos cada característica principal.

### 1. Autenticación

**Firebase Authentication**

- **Proveedores**: Email/password, Google, Facebook, Twitter, GitHub, Apple, teléfono, anónimo, custom.
- **Configuración fácil**: Componentes UI drop-in para web y móvil.
- **Reglas de seguridad**: Se integra con reglas de seguridad de Firestore.
- **Enterprise**: SAML/OIDC requiere actualizar a Identity Platform.

**Ejemplo:**

\`\`\`javascript
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

const provider = new GoogleAuthProvider();
const result = await signInWithPopup(auth, provider);
const user = result.user;
\`\`\`

**Supabase Auth**

- **Proveedores**: Email/password, magic links, OAuth (Google, GitHub, etc.), teléfono.
- **Row-Level Security (RLS)**: Las políticas de Postgres hacen cumplir el control de acceso.
- **SSO/SAML**: Disponible en plan Pro sin producto separado.
- **Integración Postgres**: Datos de usuario almacenados en tabla \`auth.users\`.

**Ejemplo:**

\`\`\`javascript
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google'
});
\`\`\`

**Ganador: Empate**

Ambos son excelentes. Firebase tiene SDKs y componentes UI más pulidos. La integración RLS de Supabase con Postgres es poderosa para autorización compleja.

### 2. Base de Datos

**Firestore**

- **Tipo**: NoSQL (orientado a documentos)
- **Soporte offline**: Incorporado, sincronización automática
- **Listeners en tiempo real**: Suscríbete a cambios de documento/colección
- **Consultas**: Mejoradas con Pipeline Operations (2026)
- **Escalado**: Automático, gestionado por Google

**Supabase Database**

- **Tipo**: PostgreSQL (relacional)
- **Extensiones**: PostGIS, pg_vector, pg_cron, y más de 50 otras
- **APIs auto-generadas**: REST y GraphQL desde tu esquema
- **Tiempo real**: Característica Postgres Changes (CDC vía replicación lógica)
- **Escalado**: Escalado vertical, réplicas de lectura en tiers superiores

**Ganador: Depende del caso de uso**

Para apps móviles con necesidades offline: **Firestore**.  
Para consultas complejas y datos relacionales: **Supabase**.

### 3. Storage

**Firebase Storage**

- **Backend**: Google Cloud Storage
- **Integración**: Funciona perfectamente con Firebase Auth
- **Seguridad**: Control de acceso basado en reglas
- **Uploads reanudables**: Incorporado para archivos grandes
- **Precios**: Cargos separados por almacenamiento, ancho de banda, operaciones

**Supabase Storage**

- **Backend**: Compatible con S3 (Cloudflare R2 o AWS S3)
- **Integración**: Metadata almacenada en Postgres, se aplican políticas RLS
- **Límites**: 50 MB por archivo (gratis), hasta 5 GB (Pro)
- **Transformaciones de imagen**: Redimensionamiento incorporado al vuelo
- **Precios**: Incluido en precios de tier, sin cargos por operación

**Ganador: Firebase para archivos grandes, Supabase para simplicidad**

Los uploads reanudables de Firebase y tamaños de archivo ilimitados son geniales para apps pesadas en medios. La integración RLS de Supabase es elegante.

### 4. Functions

**Firebase Cloud Functions**

- **Runtime**: Node.js (JavaScript/TypeScript)
- **Triggers**: HTTP, Firestore, Auth, Storage, Pub/Sub, Programados
- **Integraciones**: Integración profunda con ecosistema Firebase
- **Cold starts**: Pueden ser lentos (mejorando con 2da gen)
- **Precios**: Pago por invocación + tiempo de cómputo

**Ejemplo:**

\`\`\`javascript
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

export const onUserCreate = onDocumentCreated('users/{userId}', async (event) => {
  const userData = event.data.data();
  // Enviar email de bienvenida
  await sendEmail(userData.email, '¡Bienvenido!');
});
\`\`\`

**Supabase Edge Functions**

- **Runtime**: Deno (TypeScript)
- **Deployment**: Ubicaciones edge (baja latencia)
- **Integraciones**: Acceso directo a Postgres
- **Cold starts**: Más rápidos que serverless tradicional
- **Precios**: Incluido en tier Pro (2M invocaciones/mes)

**Ejemplo:**

\`\`\`typescript
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
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

**Ganador: Firebase para ecosistema, Supabase para rendimiento edge**

Las Functions de Firebase se integran bellamente con otros servicios Firebase. Las Edge Functions de Supabase son más rápidas y corren en Deno (que amo).

### 5. Tiempo Real

**Firebase Realtime Database + Firestore**

- **Listeners**: Suscríbete a documentos, colecciones, consultas
- **Soporte offline**: Cambios en cola y sincronizados cuando está online
- **Presencia**: Incorporado para rastrear usuarios online
- **Latencia**: Muy baja (infraestructura de Google)

**Ejemplo:**

\`\`\`javascript
import { onSnapshot } from 'firebase/firestore';

const unsubscribe = onSnapshot(doc(db, 'posts', postId), (doc) => {
  console.log('Datos actuales:', doc.data());
});
\`\`\`

**Supabase Realtime**

- **Características**: Postgres Changes, Broadcast, Presence
- **Postgres Changes**: Escucha INSERT, UPDATE, DELETE en tablas
- **Broadcast**: Pub/sub para mensajes efímeros
- **Presence**: Rastrea usuarios online
- **Límites**: 200 clientes concurrentes (gratis), 500 (Pro)

**Ejemplo:**

\`\`\`javascript
const channel = supabase
  .channel('posts')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'posts' },
    (payload) => console.log('Cambio:', payload)
  )
  .subscribe();
\`\`\`

**Ganador: Firebase**

El enfoque offline-first de Firestore y la sincronización perfecta son inigualables para apps móviles. Realtime de Supabase es sólido pero no cachea offline.

---

## Casos de Uso del Mundo Real

### Cuándo Elijo Firebase

**1. Apps mobile-first con soporte offline**

¿Construyendo una app de notas, mensajería, o cualquier cosa que necesite funcionar offline? La sincronización automática de Firebase es imbatible.

**2. Prototipado rápido**

Cuando necesito enviar un MVP en un fin de semana, Firebase me permite saltarme el diseño de esquema y simplemente empezar a construir.

**3. Proyectos del ecosistema Google**

Si ya estoy usando Google Cloud, Google Analytics, o APIs de Google Workspace, Firebase es la elección natural.

**4. Colaboración en tiempo real**

Cursores en vivo, presencia, edición colaborativa — los listeners en tiempo real de Firestore hacen esto trivial.

**Ejemplo: App de chat que construí**

\`\`\`javascript
// Mensajes en tiempo real
const messagesRef = collection(db, 'rooms', roomId, 'messages');
const q = query(messagesRef, orderBy('timestamp', 'desc'), limit(50));

onSnapshot(q, (snapshot) => {
  const messages = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
  setMessages(messages);
});
\`\`\`

Funciona offline, sincroniza automáticamente, escala a millones de usuarios. **Cero código de backend**.

### Cuándo Elijo Supabase

**1. Datos relacionales complejos**

E-commerce, dashboards SaaS, sistemas CRM — cualquier cosa con muchos joins y relaciones.

**2. Analytics pesado en SQL**

Cuando necesito ejecutar agregaciones complejas, reportes, o análisis de datos.

**3. Proyectos de IA/ML**

Usando pg_vector para búsqueda semántica, embeddings, o RAG (Retrieval-Augmented Generation).

**4. Cuando quiero Postgres**

A veces solo quiero el poder y flexibilidad de PostgreSQL. Supabase me da eso con una gran DX.

**Ejemplo: Búsqueda impulsada por IA que construí**

\`\`\`sql
-- Búsqueda semántica usando pg_vector
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

Esto sería imposible en Firestore. En Supabase, es una consulta simple.

---

## Rendimiento: La Verdad Honesta

### Rendimiento de Firestore

**Fortalezas:**

- **Latencia predecible**: Milisegundos de un dígito para lecturas
- **Escalado automático**: Maneja millones de usuarios concurrentes
- **Distribución global**: Replicación multi-región
- **Caché offline**: Lecturas instantáneas desde caché local

**Debilidades:**

- **Consultas complejas son lentas**: Incluso con Pipeline Operations
- **Sin joins**: Joins del lado del cliente matan el rendimiento
- **Overhead de desnormalización**: Actualizar datos duplicados es costoso

### Rendimiento de Supabase

**Fortalezas:**

- **Postgres es rápido**: Consultas optimizadas son increíblemente performantes
- **Indexación poderosa**: Índices B-tree, GiST, GIN
- **Joins son nativos**: No se necesita procesamiento del lado del cliente
- **Connection pooling**: PgBouncer maneja miles de conexiones

**Debilidades:**

- **Sin soporte offline**: Requiere conexión de red
- **Límites de escalado vertical**: Eventualmente necesitas réplicas de lectura
- **Cold starts**: Conexiones iniciales pueden ser lentas

**Mi experiencia:**

Ejecuté benchmarks en un proyecto de prueba con 100k registros:

- **Firestore**: Consultas simples ~10ms, agregaciones complejas ~500ms
- **Supabase**: Consultas simples ~15ms, joins complejos ~50ms

Para **consultas complejas, Supabase es 10x más rápido**. Para lecturas simples, son comparables.

---

## Precios: Lo Que Realmente Cuesta

### Precios de Firebase (2026)

**Tier gratuito (Spark):**

- 1 GB almacenamiento Firestore
- 50k lecturas de documentos/día
- 20k escrituras/día
- 20k eliminaciones/día
- 10 GB ancho de banda/mes

**Pago por uso (Blaze):**

- Firestore: $0.06 por 100k lecturas, $0.18 por 100k escrituras
- Almacenamiento: $0.18/GB/mes
- Ancho de banda: $0.12/GB
- Functions: $0.40 por millón de invocaciones + tiempo de cómputo

**Trampa:** Los costos pueden dispararse inesperadamente con listeners y alto tráfico.

### Precios de Supabase (2026)

**Tier gratuito:**

- 500 MB base de datos
- 1 GB almacenamiento de archivos
- 2 GB ancho de banda
- 50k usuarios activos mensuales
- 200 clientes realtime concurrentes

**Tier Pro ($25/mes):**

- 8 GB base de datos
- 100 GB almacenamiento de archivos
- 250 GB ancho de banda
- 100k usuarios activos mensuales
- 500 clientes realtime concurrentes
- Backups diarios

**Tier Team ($599/mes):**

- Más recursos + características de colaboración

**Trampa:** Los límites de tamaño de base de datos pueden ser restrictivos para apps pesadas en datos.

**Mi opinión:**

Para proyectos pequeños, ambos tiers gratuitos son generosos. A escala, **Supabase es más predecible** (tarifa mensual plana vs. cargos por operación).

---

## Mi Opinión Personal: Por Qué Aún Elijo Firebase

Aquí está la verdad honesta: **Estoy sesgado hacia Firebase**.

No porque Supabase no sea genial — absolutamente lo es. Sino porque:

### 1. Familiaridad con el Ecosistema de Google

He estado usando Google Cloud durante años. Conozco la consola, el sistema IAM, las herramientas de monitoreo. Firebase encaja perfectamente en mi flujo de trabajo existente.

### 2. El 90% de Mis Proyectos Usan Firebase

Casi todos mis proyectos personales — desde proyectos paralelos hasta apps en producción — usan Firebase para auth, base de datos, o storage. La memoria muscular es real.

### 3. Offline-First es Crítico para Mí

Muchos de mis proyectos son móviles o necesitan soporte offline. La sincronización automática de Firestore es una característica killer que no puedo reemplazar fácilmente.

### 4. La Integración con Google

Uso Google Analytics, Google Cloud Run, Google Pub/Sub. Tener todo en un ecosistema simplifica facturación, monitoreo y debugging.

### Pero Supabase Me Ha Conquistado en Casos Específicos

**Amo Supabase para:**

- **Proyectos Postgres**: Cuando necesito el poder de SQL
- **Trabajo de IA/ML**: pg_vector es increíble para embeddings
- **Proyectos open source**: Self-hosting es una gran ventaja
- **Analytics complejos**: Consultas SQL superan a Firestore cada vez

**El rendimiento es genuinamente impresionante.** Como alguien que ama PostgreSQL, ver esto como un BaaS con una experiencia de desarrollo tan limpia es emocionante.

---

## El Veredicto: ¿Cuál Deberías Elegir?

### Elige Firebase si:

- Estás construyendo una **app mobile-first** con necesidades offline
- Quieres **prototipado rápido** sin diseño de esquema
- Ya estás en el **ecosistema Google**
- Necesitas características de **colaboración en tiempo real**
- Prefieres **NoSQL** y datos desnormalizados

### Elige Supabase si:

- Tienes **datos relacionales complejos**
- Necesitas **consultas SQL avanzadas**
- Quieres opciones **open-source** y self-hosting
- Estás construyendo **características de IA/ML** (pg_vector)
- Prefieres **PostgreSQL** y datos normalizados

### O Usa Ambos

¿Honestamente? No hay regla que diga que no puedes usar ambos.

He construido proyectos donde:

- **Firebase maneja auth y tiempo real** (en lo que es mejor)
- **Supabase maneja datos complejos y analytics** (en lo que es mejor)

Usa la herramienta correcta para el trabajo correcto.

---

## Conclusión

Firebase y Supabase son ambas **plataformas excelentes**. La elección no es sobre cuál es "mejor" — es sobre cuál se ajusta a tu caso de uso, las habilidades de tu equipo, y tu arquitectura.

Para mí, Firebase sigue siendo mi opción predeterminada por familiaridad, integración de ecosistema, y los tipos de apps que construyo. Pero Supabase se ha ganado mi respeto, especialmente para proyectos pesados en Postgres y trabajo de IA.

**¿El verdadero ganador? Los desarrolladores.**

Ahora tenemos dos plataformas BaaS de clase mundial que nos permiten enviar más rápido, escalar más fácil, y enfocarnos en construir grandes productos en lugar de gestionar infraestructura.

Prueba ambas. Construye con ambas. Y elige lo que funcione para ti.

---

*¿Cuál es tu experiencia con Firebase y Supabase? ¿Has hecho el cambio de uno al otro? Me encantaría escuchar sobre tus proyectos y qué impulsó tu decisión.*
`,
    author: 'Sebastian Alvarez',
    tags: ['Firebase', 'Supabase', 'NoSQL', 'PostgreSQL', 'Backend', 'BaaS']
  }
};
