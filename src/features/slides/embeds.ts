/**
 * Embeds a slide may frame. Links are normalized to each site's embed form (the editor does it as you paste), and
 * the schema accepts only these hosts, which the CSP's frame-src also lists (src/lib/csp.ts).
 */

export const EMBED_HOSTS = [
  'www.youtube-nocookie.com',
  'www.youtube.com',
  'player.vimeo.com',
  'www.loom.com',
  'codesandbox.io',
  'stackblitz.com',
  'www.figma.com',
] as const;

export const EMBED_ORIGINS = EMBED_HOSTS.map((host) => `https://${host}`);

const YOUTUBE_ID = /^[\w-]{11}$/;

function youtube(url: URL): string | null {
  const host = url.hostname.replace(/^(www\.|m\.)/, '');
  let id: string | null = null;
  if (host === 'youtu.be') id = url.pathname.slice(1);
  else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (url.pathname === '/watch') id = url.searchParams.get('v');
    else id = url.pathname.match(/^\/(?:embed|shorts|live)\/([\w-]+)/)?.[1] ?? null;
  }
  if (!id || !YOUTUBE_ID.test(id)) return null;
  // Privacy-enhanced mode: no cookies until the viewer presses play.
  const embed = new URL(`https://www.youtube-nocookie.com/embed/${id}`);
  const start = url.searchParams.get('t') ?? url.searchParams.get('start');
  const seconds = start ? Number.parseInt(start, 10) : Number.NaN;
  if (Number.isFinite(seconds) && seconds > 0) embed.searchParams.set('start', String(seconds));
  return embed.toString();
}

/** A pasted link in its embeddable form, or null when the site isn't supported. */
export function toEmbedUrl(input: string): string | null {
  let url: URL;
  try {
    url = new URL(input.trim());
  } catch {
    return null;
  }
  if (url.protocol !== 'https:') return null;
  const host = url.hostname.replace(/^www\./, '');

  if (['youtube.com', 'm.youtube.com', 'youtu.be', 'youtube-nocookie.com'].includes(host)) return youtube(url);
  if (host === 'vimeo.com' || host === 'player.vimeo.com') {
    const id = url.pathname.match(/(\d{6,})/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }
  if (host === 'loom.com') {
    const id = url.pathname.match(/^\/(?:share|embed)\/([\w-]+)/)?.[1];
    return id ? `https://www.loom.com/embed/${id}` : null;
  }
  if (host === 'codesandbox.io') {
    const id = url.pathname.match(/^\/(?:s|p\/sandbox|p\/devbox|embed)\/([\w-]+)/)?.[1];
    return id ? `https://codesandbox.io/embed/${id}` : null;
  }
  if (host === 'stackblitz.com') {
    const path = url.pathname.match(/^\/(?:edit|github)\/[\w./-]+/)?.[0];
    return path ? `https://stackblitz.com${path}?embed=1` : null;
  }
  if (host === 'figma.com') {
    if (url.pathname === '/embed') return url.toString();
    if (!/^\/(?:file|design|proto|board|slides)\//.test(url.pathname)) return null;
    return `https://www.figma.com/embed?embed_host=listerineh&url=${encodeURIComponent(url.toString())}`;
  }
  return null;
}

/** True for URLs already in embed form on an allowed host (what a stored deck may contain). */
export function isEmbedUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && (EMBED_HOSTS as readonly string[]).includes(url.hostname) && toEmbedUrl(value) !== null;
  } catch {
    return false;
  }
}

const PROVIDERS: Record<string, string> = {
  'www.youtube-nocookie.com': 'YouTube',
  'www.youtube.com': 'YouTube',
  'player.vimeo.com': 'Vimeo',
  'www.loom.com': 'Loom',
  'codesandbox.io': 'CodeSandbox',
  'stackblitz.com': 'StackBlitz',
  'www.figma.com': 'Figma',
};

/** "YouTube", "Figma"… for an embed URL; undefined when it isn't one. */
export function embedProvider(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return PROVIDERS[new URL(value).hostname];
  } catch {
    return undefined;
  }
}
