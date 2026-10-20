import type { BlogPost } from '@/types';
import type { Locale } from '@/i18n/config';

export const whyMarkdownForBlogs: Record<Locale, BlogPost> = {
  en: {
    slug: 'why-markdown-for-blogs',
    title: 'Why I Write This Blog in Markdown',
    date: 'June 15, 2025',
    excerpt: 'I tried JSON, a WYSIWYG editor and a headless CMS before settling on Markdown in the repo. Here is why it stuck, and how the posts get rendered today.',
    imageUrl: '/blog/markdown-basics.webp',
    imageAiHint: 'markdown writing workflow visualization: code editor showing markdown syntax with headers, lists, code blocks; markdown symbols (#, -, *, `) floating around; transformation arrow showing markdown converting to beautiful rendered blog post; git version control symbols indicating version history; comparison showing markdown simplicity vs complex JSON structure; developer typing at keyboard; clean minimalist design with monospace font aesthetic, professional tech illustration',
    content: `
## How I got here

Before settling on Markdown I tried the usual suspects for this blog: a WYSIWYG editor, a headless CMS, and, for a while, posts stored as JSON. All of them worked. None of them felt like writing.

Markdown is what stuck, and this post is about why: how the posts are stored, how they get rendered, and the JSON experiment that convinced me.

## The JSON phase

My first version described every post as a list of blocks:

\`\`\`json
[
  { "type": "h2", "text": "Introduction" },
  { "type": "p", "text": "This post will cover..." },
  { "type": "code", "language": "js", "text": "const x = 42;" }
]
\`\`\`

It looks tidy for three blocks. By the third post it was a mess. Every post needed a slightly different block type (a quote, a list inside a list, a table), each one meant another case in a custom renderer, and writing a paragraph meant escaping quotes inside a JSON string. I was spending more time on the format than on the posts.

Switching to Markdown made all of that go away. I write the post, a parser turns it into HTML, and nobody has to invent a new block type for a table.

## Why it works for me

**It reads like text.** A heading is a \`#\`, a list is a \`-\`, code goes between backticks. Writing a post feels like writing a long, well-formatted message, not filling in a form.

**It lives in Git.** Each post is a file in the repo with its content in a Markdown string. That means history for every edit, pull requests when I want someone to review a post, and no external service that can go down or change its pricing.

**The structure is the content.** With JSON, the structure was something I had to maintain separately. With Markdown, it's just how the text is written.

**I write where I already work.** The whole site is code, so writing a post in the same editor, committing and deploying is the shortest path. No admin panel, no plugins.

## What a post looks like

A post is an object with some metadata and the body as Markdown:

\`\`\`ts
{
  slug: 'my-first-post',
  title: 'My first post',
  date: 'June 15, 2025',
  excerpt: 'A short summary for lists and share cards.',
  content: \`## Hello\\nThis is **Markdown**...\`,
  author: 'Sebastian Alvarez',
  tags: ['Markdown', 'Blogging'],
}
\`\`\`

When I first wrote this post I rendered \`content\` with \`marked\` and \`dangerouslySetInnerHTML\`. It worked, but injecting HTML like that is asking for trouble the day some content isn't fully under your control. Today the body is rendered on the server with \`react-markdown\`, and every post goes through a sanitizer before it reaches the page:

\`\`\`tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
>
  {post.content}
</ReactMarkdown>
\`\`\`

\`remark-gfm\` adds tables and task lists, \`rehype-sanitize\` strips anything that shouldn't be there (scripts, iframes), and \`rehype-highlight\` colors the code. Since it all runs on the server, none of these libraries ship to the reader's browser.

## Making it look good

For styles I use Tailwind's \`@tailwindcss/typography\`. Wrapping the content in a \`prose\` class gives sensible defaults for headings, paragraphs, lists, code and tables, and modifiers let me adjust just the pieces I care about:

\`\`\`html
<div class="prose prose-headings:tracking-tight prose-a:text-primary prose-pre:bg-muted">
\`\`\`

The nice side effect is the separation: Markdown decides the structure, the stylesheet decides how it looks, and I can't break the layout by writing a post.

## Would I recommend it?

For a developer writing their own blog, yes. It's fast to write, lives next to the code, renders the same way everywhere, and if I ever move the site to another stack, the posts come with me as plain text.

Where I'd think twice: if people who don't use Git need to write and publish, a CMS will make them happier. For a site like this one, Markdown in the repo is the simplest thing that works, and it has kept working.
`,
    author: 'Sebastian Alvarez',
    tags: ['Markdown', 'Blogging', 'Developer Tools', 'Content Creation', 'Writing']
  },
  es: {
    slug: 'why-markdown-for-blogs',
    title: 'Por qué escribo este blog en Markdown',
    date: 'June 15, 2025',
    excerpt: 'Probé JSON, un editor WYSIWYG y un CMS headless antes de quedarme con Markdown dentro del repo. Aquí cuento por qué se quedó y cómo se renderizan hoy los posts.',
    imageUrl: '/blog/markdown-basics.webp',
    imageAiHint: 'visualización de flujo de trabajo de escritura markdown: editor de código mostrando sintaxis markdown con encabezados, listas, bloques de código; símbolos markdown (#, -, *, `) flotando alrededor; flecha de transformación mostrando markdown convirtiéndose en hermoso post de blog renderizado; símbolos de control de versiones git indicando historial de versiones; comparación mostrando simplicidad de markdown vs estructura JSON compleja; desarrollador escribiendo en teclado; diseño minimalista limpio con estética de fuente monoespaciada, ilustración técnica profesional',
    content: `
## Cómo llegué aquí

Antes de quedarme con Markdown probé lo típico para este blog: un editor WYSIWYG, un CMS headless y, durante un tiempo, posts guardados como JSON. Todo funcionaba. Ninguno se sentía como escribir.

Markdown es lo que se quedó, y este post va de por qué: cómo guardo los posts, cómo se renderizan y el experimento con JSON que terminó de convencerme.

## La etapa del JSON

Mi primera versión describía cada post como una lista de bloques:

\`\`\`json
[
  { "type": "h2", "text": "Introducción" },
  { "type": "p", "text": "En este post veremos..." },
  { "type": "code", "language": "js", "text": "const x = 42;" }
]
\`\`\`

Con tres bloques se ve ordenado. Para el tercer post ya era un desastre. Cada post necesitaba un tipo de bloque un poco distinto (una cita, una lista dentro de otra, una tabla), cada uno era otro caso en un renderer hecho a mano, y escribir un párrafo implicaba escapar comillas dentro de un string de JSON. Me pasaba más tiempo peleando con el formato que escribiendo.

Cambiar a Markdown hizo desaparecer todo eso. Escribo el post, un parser lo convierte en HTML y nadie tiene que inventar un tipo de bloque nuevo para una tabla.

## Por qué me funciona

**Se lee como texto.** Un título es un \`#\`, una lista es un \`-\`, el código va entre backticks. Escribir un post se siente como escribir un mensaje largo con buen formato, no como llenar un formulario.

**Vive en Git.** Cada post es un archivo del repo con su contenido en un string de Markdown. Eso me da historial de cada cambio, pull requests cuando quiero que alguien revise un post y ningún servicio externo que se pueda caer o cambiar de precio.

**La estructura es el contenido.** Con JSON, la estructura era algo que tenía que mantener aparte. Con Markdown es simplemente cómo está escrito el texto.

**Escribo donde ya trabajo.** Todo el sitio es código, así que escribir un post en el mismo editor, hacer commit y desplegar es el camino más corto. Sin panel de administración ni plugins.

## Cómo se ve un post

Un post es un objeto con algunos metadatos y el cuerpo en Markdown:

\`\`\`ts
{
  slug: 'mi-primer-post',
  title: 'Mi primer post',
  date: 'June 15, 2025',
  excerpt: 'Un resumen corto para listas y tarjetas al compartir.',
  content: \`## Hola\\nEsto es **Markdown**...\`,
  author: 'Sebastian Alvarez',
  tags: ['Markdown', 'Blogging'],
}
\`\`\`

Cuando escribí este post por primera vez, renderizaba \`content\` con \`marked\` y \`dangerouslySetInnerHTML\`. Funcionaba, pero inyectar HTML así es buscarse problemas el día que algún contenido no esté del todo bajo tu control. Hoy el cuerpo se renderiza en el servidor con \`react-markdown\`, y cada post pasa por un sanitizador antes de llegar a la página:

\`\`\`tsx
<ReactMarkdown
  remarkPlugins={[remarkGfm]}
  rehypePlugins={[rehypeRaw, rehypeSanitize, rehypeHighlight]}
>
  {post.content}
</ReactMarkdown>
\`\`\`

\`remark-gfm\` agrega tablas y listas de tareas, \`rehype-sanitize\` quita lo que no debería estar ahí (scripts, iframes) y \`rehype-highlight\` le da color al código. Como todo corre en el servidor, ninguna de estas librerías llega al navegador de quien lee.

## Que se vea bien

Para los estilos uso \`@tailwindcss/typography\` de Tailwind. Envolver el contenido en una clase \`prose\` da estilos razonables para títulos, párrafos, listas, código y tablas, y con modificadores ajusto solo lo que me interesa:

\`\`\`html
<div class="prose prose-headings:tracking-tight prose-a:text-primary prose-pre:bg-muted">
\`\`\`

El efecto secundario que más me gusta es la separación: Markdown decide la estructura, la hoja de estilos decide cómo se ve, y no puedo romper el diseño escribiendo un post.

## ¿Lo recomiendo?

Para alguien que escribe su propio blog técnico, sí. Es rápido de escribir, vive junto al código, se renderiza igual en todos lados y, si algún día muevo el sitio a otro stack, los posts se vienen conmigo como texto plano.

Donde lo pensaría dos veces: si van a escribir y publicar personas que no usan Git, un CMS las va a hacer más felices. Para un sitio como este, Markdown en el repo es lo más simple que funciona, y ha seguido funcionando.
`,
    author: 'Sebastian Alvarez',
    tags: ['Markdown', 'Blogging', 'Herramientas de Desarrollador', 'Creación de Contenido', 'Escritura']
  }
};
