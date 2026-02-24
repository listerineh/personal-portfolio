import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const whyMarkdownForBlogs: Record<Locale, BlogPost> = {
  en: {
    slug: 'why-markdown-for-blogs',
    title: 'Is Markdown the Best Format for Blogs?',
    date: 'June 15, 2025',
    excerpt: 'Explore why Markdown is a powerful and flexible format for blog content — from developer ergonomics to performance and long-term maintainability.',
    imageUrl: '/blog/markdown-basics.webp',
    imageAiHint: 'markdown writing workflow visualization: code editor showing markdown syntax with headers, lists, code blocks; markdown symbols (#, -, *, `) floating around; transformation arrow showing markdown converting to beautiful rendered blog post; git version control symbols indicating version history; comparison showing markdown simplicity vs complex JSON structure; developer typing at keyboard; clean minimalist design with monospace font aesthetic, professional tech illustration',
    content: `
## Introduction

When building a developer blog, choosing how to store and write your content matters as much as how you display it. After experimenting with JSON, WYSIWYG editors, and headless CMSes, I found Markdown to be the cleanest, most scalable solution.

In this post, I'll explain **why I use Markdown to structure my blog content**, how it's stored, how it's dynamically rendered in the frontend — and why Markdown solves problems that plain JSON couldn't.

---

## Why I Store Blog Posts in Markdown

Here's why Markdown is my go-to format:

### 1. Simple, Human-Readable Syntax

Markdown feels natural to write. Headers, lists, code blocks, and links are quick to type, with zero friction. It's like writing an email with formatting superpowers — no UI lag, no weird HTML artifacts.

### 2. Easy to Store, Version, and Track

Each post in my blog is stored as a simple JavaScript object that includes a Markdown \`content\` field. This means I can:

- Store content in Git (like code)
- Track changes over time
- Use pull requests for content reviews
- Move fast without external tooling

### 3. Dynamic and Flexible Rendering

One major pain point I faced early on was using raw JSON to structure post content. That meant manually defining paragraphs, code blocks, and titles like this:

\`\`\`json
[
  { "type": "h2", "text": "Introduction" },
  { "type": "p", "text": "This post will cover..." },
  { "type": "code", "language": "js", "text": "const x = 42;" }
]
\`\`\`

This quickly became **messy and hard to scale**. Every post had a slightly different structure, and I found myself writing a custom renderer to deal with all the variations. Markdown solved that instantly.

With Markdown, I can write naturally and let a parser like \`marked\` or \`remark\` handle the conversion to HTML, cleanly and consistently.

### 4. Developer-First Writing Experience

Since my entire blog is code-based, it makes sense that writing should happen in code too. I can write a new blog post in my code editor, commit it with Git, and deploy. No extra UIs or plugins needed.

---

## How I Use It in My Blog

Here's what a blog post structure looks like in my setup:

\`\`\`ts
{
  slug: 'mastering-async-javascript',
  title: 'Mastering Asynchronous JavaScript',
  date: 'October 26, 2023',
  excerpt: 'A deep dive into Promises, async/await...',
  content: \`## Introduction\\nAsynchronous programming is...\`,
  author: 'Sebastian Alvarez',
  tags: ['JavaScript', 'Async']
}
\`\`\`

The \`content\` is raw Markdown. In the frontend, I convert it using \`marked\`:

\`\`\`tsx
<div
  className="prose dark:prose-invert max-w-none"
  dangerouslySetInnerHTML={{ __html: marked(post.content) }}
/>
\`\`\`

This gives me the freedom of Markdown plus full control of rendering.

---

## Styling with Tailwind

To make the Markdown look good, I use Tailwind's \`@tailwindcss/typography\` plugin. It gives me a \`prose\` class that adds consistent styles to elements like \`<h1>\`, \`<p>\`, \`<pre>\`, and more.

Tailwind's utility-based customization lets me tweak the style without touching the HTML. For example:

\`\`\`css
prose-headings:text-primary
prose-a:text-accent hover:prose-a:text-primary
prose-code:font-code
prose-pre:bg-muted
\`\`\`

This means I don't have to worry about content authors messing up the layout — Markdown handles structure, and Tailwind handles appearance.

---

## Conclusion

Markdown hits the sweet spot for blogging as a developer:

- Fast to write
- Easy to maintain
- Dynamic to render
- Portable across tech stacks
- Perfect for Git-based workflows

If you're building a blog or dev-focused site, consider Markdown as your foundation — and let styling be a second step, not the first problem to solve.
`,
    author: 'Sebastian Alvarez',
    tags: ['Markdown', 'Blogging', 'Developer Tools', 'Content Creation', 'Writing']
  },
  es: {
    slug: 'why-markdown-for-blogs',
    title: '¿Es Markdown el Mejor Formato para Blogs?',
    date: 'June 15, 2025',
    excerpt: 'Explora por qué Markdown es un formato poderoso y flexible para contenido de blog — desde ergonomía para desarrolladores hasta rendimiento y mantenibilidad a largo plazo.',
    imageUrl: '/blog/markdown-basics.webp',
    imageAiHint: 'visualización de flujo de trabajo de escritura markdown: editor de código mostrando sintaxis markdown con encabezados, listas, bloques de código; símbolos markdown (#, -, *, `) flotando alrededor; flecha de transformación mostrando markdown convirtiéndose en hermoso post de blog renderizado; símbolos de control de versiones git indicando historial de versiones; comparación mostrando simplicidad de markdown vs estructura JSON compleja; desarrollador escribiendo en teclado; diseño minimalista limpio con estética de fuente monoespaciada, ilustración técnica profesional',
    content: `
## Introducción

Cuando construyes un blog de desarrollador, elegir cómo almacenar y escribir tu contenido importa tanto como cómo lo muestras. Después de experimentar con JSON, editores WYSIWYG y CMSes headless, encontré que Markdown es la solución más limpia y escalable.

En este post, explicaré **por qué uso Markdown para estructurar el contenido de mi blog**, cómo se almacena, cómo se renderiza dinámicamente en el frontend — y por qué Markdown resuelve problemas que JSON plano no podía.

---

## Por Qué Almaceno Posts de Blog en Markdown

Aquí está por qué Markdown es mi formato preferido:

### 1. Sintaxis Simple y Legible para Humanos

Markdown se siente natural de escribir. Encabezados, listas, bloques de código y enlaces son rápidos de escribir, con cero fricción. Es como escribir un email con superpoderes de formato — sin lag de UI, sin artefactos HTML extraños.

### 2. Fácil de Almacenar, Versionar y Rastrear

Cada post en mi blog se almacena como un objeto JavaScript simple que incluye un campo Markdown \`content\`. Esto significa que puedo:

- Almacenar contenido en Git (como código)
- Rastrear cambios a lo largo del tiempo
- Usar pull requests para revisiones de contenido
- Moverme rápido sin herramientas externas

### 3. Renderizado Dinámico y Flexible

Un punto de dolor importante que enfrenté temprano fue usar JSON crudo para estructurar el contenido del post. Eso significaba definir manualmente párrafos, bloques de código y títulos así:

\`\`\`json
[
  { "type": "h2", "text": "Introducción" },
  { "type": "p", "text": "Este post cubrirá..." },
  { "type": "code", "language": "js", "text": "const x = 42;" }
]
\`\`\`

Esto rápidamente se volvió **desordenado y difícil de escalar**. Cada post tenía una estructura ligeramente diferente, y me encontré escribiendo un renderizador personalizado para lidiar con todas las variaciones. Markdown resolvió eso instantáneamente.

Con Markdown, puedo escribir naturalmente y dejar que un parser como \`marked\` o \`remark\` maneje la conversión a HTML, limpia y consistentemente.

### 4. Experiencia de Escritura Enfocada en Desarrolladores

Dado que todo mi blog está basado en código, tiene sentido que la escritura también suceda en código. Puedo escribir un nuevo post de blog en mi editor de código, hacer commit con Git y desplegar. No se necesitan UIs o plugins extra.

---

## Cómo Lo Uso en Mi Blog

Aquí está cómo se ve la estructura de un post de blog en mi configuración:

\`\`\`ts
{
  slug: 'mastering-async-javascript',
  title: 'Dominando JavaScript Asíncrono',
  date: 'October 26, 2023',
  excerpt: 'Una inmersión profunda en Promises, async/await...',
  content: \`## Introducción\\nLa programación asíncrona es...\`,
  author: 'Sebastian Alvarez',
  tags: ['JavaScript', 'Async']
}
\`\`\`

El \`content\` es Markdown crudo. En el frontend, lo convierto usando \`marked\`:

\`\`\`tsx
<div
  className="prose dark:prose-invert max-w-none"
  dangerouslySetInnerHTML={{ __html: marked(post.content) }}
/>
\`\`\`

Esto me da la libertad de Markdown más control total del renderizado.

---

## Estilizado con Tailwind

Para hacer que el Markdown se vea bien, uso el plugin \`@tailwindcss/typography\` de Tailwind. Me da una clase \`prose\` que agrega estilos consistentes a elementos como \`<h1>\`, \`<p>\`, \`<pre>\`, y más.

La personalización basada en utilidades de Tailwind me permite ajustar el estilo sin tocar el HTML. Por ejemplo:

\`\`\`css
prose-headings:text-primary
prose-a:text-accent hover:prose-a:text-primary
prose-code:font-code
prose-pre:bg-muted
\`\`\`

Esto significa que no tengo que preocuparme de que los autores de contenido arruinen el layout — Markdown maneja la estructura, y Tailwind maneja la apariencia.

---

## Conclusión

Markdown alcanza el punto ideal para blogging como desarrollador:

- Rápido de escribir
- Fácil de mantener
- Dinámico de renderizar
- Portable entre stacks tecnológicos
- Perfecto para flujos de trabajo basados en Git

Si estás construyendo un blog o sitio enfocado en desarrollo, considera Markdown como tu base — y deja que el estilizado sea un segundo paso, no el primer problema a resolver.
`,
    author: 'Sebastian Alvarez',
    tags: ['Markdown', 'Blogging', 'Herramientas de Desarrollador', 'Creación de Contenido', 'Escritura']
  }
};
