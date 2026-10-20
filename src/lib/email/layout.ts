import { escapeHtml } from '@/lib/server/security';

/**
 * The one email layout, in Lumen: a white card on the light tint, the site mark, an amber eyebrow, a heading that
 * tightens like the site's, muted body text and one amber pill as the action. Tables and inline styles only, so it
 * holds up in Gmail, Outlook and Apple Mail; every email also gets a plain-text version from the same content.
 *
 * Text passed in is plain: the layout escapes it. Only `html` blocks are inserted as they are.
 */

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://listerineh.dev';
export const FROM = 'Sebastian Alvarez <hello@listerineh.dev>';

const C = {
  tint: '#F5F5F7',
  card: '#FFFFFF',
  ink: '#1D1D1F',
  muted: '#6E6E73',
  hairline: '#E5E5EA',
  amber: '#D97706',
  amberInk: '#A84B0A',
  panel: '#F5F5F7',
};
const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";

export type EmailBlock =
  | { type: 'text'; text: string }
  /** Small label above a value, e.g. "From" / "Ana <ana@example.com>". */
  | { type: 'fields'; fields: { label: string; value: string }[] }
  /** A quoted message on a grey panel, line breaks kept. */
  | { type: 'quote'; text: string }
  /** A short list with amber arrows. */
  | { type: 'list'; items: string[] }
  /** An image that links somewhere (a post's share card). */
  | { type: 'image'; src: string; alt: string; href: string; width: number; height: number }
  /** The one amber pill. */
  | { type: 'action'; label: string; href: string }
  | { type: 'divider' };

export interface Email {
  lang: 'en' | 'es';
  /** Shown by inboxes after the subject. */
  preheader: string;
  eyebrow: string;
  title: string;
  blocks: EmailBlock[];
  /** Why they get it, and how to stop. */
  footer: { reason: string; unsubscribe?: { label: string; href: string } };
}

const paragraph = (inner: string, extra = '') =>
  `<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:${C.muted};${extra}">${inner}</p>`;

function block(b: EmailBlock): string {
  switch (b.type) {
    case 'text':
      return paragraph(escapeHtml(b.text));
    case 'fields':
      return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;">${b.fields
        .map(
          (f) => `<tr><td style="padding:0 0 12px;">
            <div style="font-size:12px;font-weight:600;color:${C.muted};">${escapeHtml(f.label)}</div>
            <div style="font-size:15px;color:${C.ink};word-break:break-word;">${escapeHtml(f.value)}</div>
          </td></tr>`,
        )
        .join('')}</table>`;
    case 'quote':
      return `<div style="margin:0 0 24px;padding:18px 20px;border-radius:14px;background:${C.panel};font-size:15px;line-height:1.6;color:${C.ink};white-space:pre-wrap;word-break:break-word;">${escapeHtml(b.text)}</div>`;
    case 'list':
      return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 24px;">${b.items
        .map(
          (item) =>
            `<tr><td style="padding:4px 10px 4px 0;vertical-align:top;color:${C.amber};font-size:15px;">&rarr;</td><td style="padding:4px 0;font-size:15px;line-height:1.5;color:${C.ink};">${escapeHtml(item)}</td></tr>`,
        )
        .join('')}</table>`;
    case 'image':
      return `<a href="${escapeHtml(b.href)}" style="display:block;margin:0 0 24px;"><img src="${escapeHtml(b.src)}" alt="${escapeHtml(b.alt)}" width="${b.width}" height="${b.height}" style="display:block;width:100%;max-width:${b.width}px;height:auto;border:0;border-radius:14px;"></a>`;
    case 'action':
      return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:4px 0 24px;"><tr><td style="border-radius:999px;background:${C.amber};">
        <a href="${escapeHtml(b.href)}" style="display:inline-block;padding:13px 26px;border-radius:999px;font-size:15px;font-weight:600;color:${C.ink};text-decoration:none;">${escapeHtml(b.label)}</a>
      </td></tr></table>`;
    case 'divider':
      return `<div style="height:1px;margin:8px 0 28px;background:${C.hairline};line-height:1px;font-size:0;">&nbsp;</div>`;
  }
}

export function renderHtml(email: Email): string {
  const { footer } = email;
  return `<!DOCTYPE html>
<html lang="${email.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>${escapeHtml(email.title)}</title>
</head>
<body style="margin:0;padding:0;background:${C.tint};font-family:${FONT};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:${C.tint};">${escapeHtml(email.preheader)}&#8203;&nbsp;&#8203;&nbsp;&#8203;&nbsp;</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.tint};">
<tr><td align="center" style="padding:40px 16px;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">
    <tr><td style="padding:0 8px 20px;">
      <a href="${SITE}" style="text-decoration:none;color:${C.ink};font-size:15px;font-weight:600;">
        <img src="${SITE}/icons/icon-192.png" alt="" width="28" height="28" style="display:inline-block;vertical-align:middle;border:0;border-radius:999px;">
        <span style="vertical-align:middle;margin-left:8px;">listerineh.dev</span>
      </a>
    </td></tr>
    <tr><td style="background:${C.card};border-radius:22px;padding:36px 32px 12px;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:600;color:${C.amberInk};">${escapeHtml(email.eyebrow)}</p>
      <h1 style="margin:0 0 20px;font-size:26px;line-height:1.15;font-weight:700;letter-spacing:-0.5px;color:${C.ink};">${escapeHtml(email.title)}</h1>
      ${email.blocks.map(block).join('\n      ')}
    </td></tr>
    <tr><td style="padding:24px 8px 0;font-size:12px;line-height:1.6;color:${C.muted};">
      ${escapeHtml(footer.reason)}<br>
      ${footer.unsubscribe ? `<a href="${escapeHtml(footer.unsubscribe.href)}" style="color:${C.muted};text-decoration:underline;">${escapeHtml(footer.unsubscribe.label)}</a> · ` : ''}Sebastian Alvarez · Quito, Ecuador
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

/** The same content as plain text (better deliverability, and what some clients show). */
export function renderText(email: Email): string {
  const lines: string[] = [email.title, ''];
  for (const b of email.blocks) {
    if (b.type === 'text') lines.push(b.text, '');
    if (b.type === 'fields') lines.push(...b.fields.map((f) => `${f.label}: ${f.value}`), '');
    if (b.type === 'quote') lines.push(b.text.replace(/^/gm, '> '), '');
    if (b.type === 'list') lines.push(...b.items.map((item) => `- ${item}`), '');
    if (b.type === 'image') lines.push(`${b.alt}: ${b.href}`, '');
    if (b.type === 'action') lines.push(`${b.label}: ${b.href}`, '');
    if (b.type === 'divider') lines.push('---', '');
  }
  lines.push('--', email.footer.reason);
  if (email.footer.unsubscribe) lines.push(`${email.footer.unsubscribe.label}: ${email.footer.unsubscribe.href}`);
  lines.push('Sebastian Alvarez · listerineh.dev');
  return lines.join('\n');
}

export function render(email: Email) {
  return { html: renderHtml(email), text: renderText(email) };
}
