import { render, SITE, type Email } from './layout';

/**
 * Every email the site sends, in English and Spanish, built on the Lumen layout. Each returns
 * `{ subject, html, text }`, ready for resend.emails.send.
 */

type Lang = 'en' | 'es';
const pick = <T,>(lang: Lang, en: T, es: T) => (lang === 'es' ? es : en);

function build(subject: string, email: Email) {
  return { subject, ...render(email) };
}

/** Double opt-in: sent when someone subscribes. Nothing happens until they confirm. */
export function confirmSubscriptionEmail({ lang, confirmUrl, days }: { lang: Lang; confirmUrl: string; days: number }) {
  return build(pick(lang, 'Confirm your subscription', 'Confirma tu suscripción'), {
    lang,
    preheader: pick(lang, 'One click and new posts reach your inbox.', 'Un clic y los posts nuevos llegarán a tu correo.'),
    eyebrow: 'Newsletter',
    title: pick(lang, 'Confirm your subscription', 'Confirma tu suscripción'),
    blocks: [
      {
        type: 'text',
        text: pick(
          lang,
          'Someone, hopefully you, asked to get new posts from listerineh.dev at this address. Confirm and you are in.',
          'Alguien, ojalá tú, pidió recibir los posts nuevos de listerineh.dev en esta dirección. Confirma y listo.',
        ),
      },
      { type: 'action', label: pick(lang, 'Confirm subscription', 'Confirmar suscripción'), href: confirmUrl },
      {
        type: 'text',
        text: pick(lang, `The link works for ${days} days.`, `El enlace funciona durante ${days} días.`),
      },
    ],
    footer: {
      reason: pick(
        lang,
        "If you didn't ask for this, ignore this email: you won't be added to anything.",
        'Si no lo pediste, ignora este correo: no se te añadirá a nada.',
      ),
    },
  });
}

/** After confirming: what to expect, and the way out. */
export function welcomeEmail({ lang, unsubscribeUrl }: { lang: Lang; unsubscribeUrl?: string }) {
  return build(pick(lang, "You're subscribed", 'Ya estás suscrito'), {
    lang,
    preheader: pick(lang, 'New posts will land here. No spam, ever.', 'Los posts nuevos llegarán aquí. Nunca spam.'),
    eyebrow: 'Newsletter',
    title: pick(lang, "You're in. Thanks for subscribing.", 'Ya estás dentro. Gracias por suscribirte.'),
    blocks: [
      {
        type: 'text',
        text: pick(
          lang,
          "When I publish something new, it lands here. Practical notes from building software, in English and Spanish:",
          'Cuando publique algo nuevo, llegará aquí. Notas prácticas de construir software, en español e inglés:',
        ),
      },
      {
        type: 'list',
        items: pick(
          lang,
          ['Software engineering and architecture', 'Cloud, infrastructure and DevOps', 'Applied AI and agents', 'Career and working in tech'],
          ['Ingeniería y arquitectura de software', 'Cloud, infraestructura y DevOps', 'IA aplicada y agentes', 'Carrera y trabajo en tecnología'],
        ),
      },
      { type: 'action', label: pick(lang, 'Read the blog', 'Leer el blog'), href: `${SITE}/blog` },
    ],
    footer: {
      reason: pick(lang, 'You get this because you confirmed your subscription at listerineh.dev.', 'Recibes esto porque confirmaste tu suscripción en listerineh.dev.'),
      unsubscribe: unsubscribeUrl ? { label: pick(lang, 'Unsubscribe', 'Darse de baja'), href: unsubscribeUrl } : undefined,
    },
  });
}

/** Asked for from /unsubscribe without a link: proof that the request comes from the mailbox. */
export function unsubscribeLinkEmail({ lang, unsubscribeUrl }: { lang: Lang; unsubscribeUrl: string }) {
  return build(pick(lang, 'Confirm you want to unsubscribe', 'Confirma tu baja del newsletter'), {
    lang,
    preheader: pick(lang, 'One click and you stop getting new posts.', 'Un clic y dejarás de recibir los posts.'),
    eyebrow: 'Newsletter',
    title: pick(lang, 'Leaving the newsletter?', '¿Dejas el newsletter?'),
    blocks: [
      {
        type: 'text',
        text: pick(
          lang,
          'Someone asked to remove this address from the listerineh.dev newsletter. If it was you, confirm below.',
          'Alguien pidió dar de baja esta dirección del newsletter de listerineh.dev. Si fuiste tú, confirma abajo.',
        ),
      },
      { type: 'action', label: pick(lang, 'Confirm unsubscribe', 'Confirmar baja'), href: unsubscribeUrl },
    ],
    footer: {
      reason: pick(lang, "If it wasn't you, ignore this email and nothing changes.", 'Si no fuiste tú, ignora este correo y nada cambia.'),
    },
  });
}

/**
 * A new post, to every subscriber. Contacts carry no language, so it is bilingual: English first, Spanish after a
 * divider, one link each.
 */
export function newPostEmail({
  title,
  slug,
  excerpt,
  excerptEs,
  imageUrl,
  unsubscribeUrl,
}: {
  title: string;
  slug: string;
  excerpt?: string;
  excerptEs?: string;
  /** The post's share card or cover (absolute https). */
  imageUrl?: string;
  unsubscribeUrl?: string;
}) {
  const href = `${SITE}/blog/${slug}`;
  return build(`New post: ${title}`, {
    lang: 'en',
    preheader: excerpt || 'A new article is up on listerineh.dev.',
    eyebrow: 'New post · Nuevo post',
    title,
    blocks: [
      ...(imageUrl ? [{ type: 'image' as const, src: imageUrl, alt: title, href, width: 496, height: 260 }] : []),
      { type: 'text', text: excerpt || 'I just published a new article. Here it is.' },
      { type: 'action', label: 'Read the article', href },
      ...(excerptEs
        ? [
            { type: 'divider' as const },
            { type: 'text' as const, text: excerptEs },
            { type: 'action' as const, label: 'Leer el artículo', href },
          ]
        : []),
    ],
    footer: {
      reason: "You get this because you subscribed at listerineh.dev. / Lo recibes porque te suscribiste en listerineh.dev.",
      unsubscribe: unsubscribeUrl ? { label: 'Unsubscribe / Darse de baja', href: unsubscribeUrl } : undefined,
    },
  });
}

/** The contact form, to the owner. Reply goes straight to the sender (replyTo). */
export function contactMessageEmail({ name, email, message }: { name: string; email: string; message: string }) {
  return build(`New message from ${name}`, {
    lang: 'en',
    preheader: message.slice(0, 120),
    eyebrow: 'Contact form',
    title: `${name} wrote to you`,
    blocks: [
      { type: 'fields', fields: [{ label: 'From', value: `${name} <${email}>` }] },
      { type: 'quote', text: message },
      { type: 'action', label: `Reply to ${name.split(/\s+/)[0]}`, href: `mailto:${email}` },
    ],
    footer: { reason: 'Sent from the contact form at listerineh.dev. Replying answers the sender directly.' },
  });
}

/** Three days after confirming: the most-read posts, so a new subscriber has something to start with. */
export function startHereEmail({
  lang,
  posts,
  unsubscribeUrl,
}: {
  lang: Lang;
  posts: { slug: string; title: string; excerpt: string }[];
  unsubscribeUrl?: string;
}) {
  return build(pick(lang, 'Three posts to start with', 'Tres posts para empezar'), {
    lang,
    preheader: pick(lang, 'The ones people read the most.', 'Los que más se han leído.'),
    eyebrow: 'Newsletter',
    title: pick(lang, 'Three posts to start with', 'Tres posts para empezar'),
    blocks: [
      {
        type: 'text',
        text: pick(
          lang,
          "While the next one is on its way, these are the posts readers have spent the most time with:",
          'Mientras llega el próximo, estos son los posts con los que más tiempo han pasado los lectores:',
        ),
      },
      { type: 'posts', posts: posts.map((post) => ({ title: post.title, excerpt: post.excerpt, href: `${SITE}/blog/${post.slug}` })) },
      { type: 'action', label: pick(lang, 'See every post', 'Ver todos los posts'), href: `${SITE}/blog` },
    ],
    footer: {
      reason: pick(lang, 'You get this because you subscribed at listerineh.dev.', 'Recibes esto porque te suscribiste en listerineh.dev.'),
      unsubscribe: unsubscribeUrl ? { label: pick(lang, 'Unsubscribe', 'Darse de baja'), href: unsubscribeUrl } : undefined,
    },
  });
}

export interface WeeklyDigest {
  /** "Oct 12 – Oct 18, 2026" */
  range: string;
  subscribers: { total: number | null; joined: number; left: number };
  contactMessages: number;
  /** null on the first run (no earlier snapshot to compare with). */
  views: { total: number; top: { slug: string; title: string; views: number }[] } | null;
  reactions: number | null;
  csp: { total: number; top: { label: string; count: number }[] };
}

/** Monday morning, to the owner: the week on the site in one email. */
export function weeklyDigestEmail(d: WeeklyDigest) {
  const n = (value: number | null) => (value === null ? '–' : value.toLocaleString('en-US'));
  return build(`Weekly digest · ${d.range}`, {
    lang: 'en',
    preheader: `${n(d.views?.total ?? null)} views · ${d.subscribers.joined} new subscribers · ${d.contactMessages} messages`,
    eyebrow: 'Weekly digest',
    title: d.range,
    blocks: [
      { type: 'heading', text: 'Newsletter' },
      {
        type: 'stats',
        stats: [
          { value: n(d.subscribers.total), label: 'subscribers' },
          { value: `+${d.subscribers.joined}`, label: 'joined' },
          { value: `−${d.subscribers.left}`, label: 'left' },
        ],
      },
      { type: 'heading', text: 'Blog' },
      {
        type: 'stats',
        stats: [
          { value: n(d.views?.total ?? null), label: 'views' },
          { value: n(d.reactions), label: 'reactions' },
          { value: String(d.contactMessages), label: 'contact messages' },
        ],
      },
      ...(d.views === null
        ? [{ type: 'text' as const, text: 'First digest: totals are saved now, so next week shows what changed.' }]
        : d.views.top.length
          ? [{ type: 'list' as const, items: d.views.top.map((post) => `${post.title}: ${post.views.toLocaleString('en-US')} views`) }]
          : []),
      { type: 'heading', text: 'Content Security Policy' },
      d.csp.total === 0
        ? { type: 'text', text: 'No violations reported this week.' }
        : { type: 'list', items: [`${d.csp.total} reports`, ...d.csp.top.map((entry) => `${entry.label} (${entry.count})`)] },
      { type: 'action', label: 'Open the site', href: SITE },
    ],
    footer: { reason: 'Sent every Monday by the weekly-digest cron on listerineh.dev.' },
  });
}
