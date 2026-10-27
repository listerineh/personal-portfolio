// Inline scripts the root layout writes into every page. Kept here so the owner routes' Content Security Policy can
// allow them by hash (src/lib/csp.ts): those routes use a nonce, which doesn't reach statically rendered markup.

/** Before first paint: restore the saved theme (cookie or localStorage) and opt into reveal states. Without JS or with
 * reduced motion, content stays visible. */
export const PRE_PAINT_SCRIPT = `try{var d=document.documentElement,m=document.cookie.match(/(?:^|; )theme=(light|dark)/),t=(m&&m[1])||localStorage.getItem('theme');if(t==='dark')d.classList.add('dark');if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches)d.classList.add('js-motion')}catch(e){}`;

/** 'sha256-…' source for an inline script, as CSP expects it. Web Crypto, so it runs in the middleware too. */
export async function scriptHash(source: string): Promise<string> {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(source),
  );
  return `'sha256-${btoa(String.fromCharCode(...new Uint8Array(digest)))}'`;
}
