/**
 * Storybook-only: answers the site's own /api routes with fixtures so real components render
 * without a server. Installed once from .storybook/preview.tsx.
 */
let installed = false;

const json = (body: unknown, status = 200) =>
  Promise.resolve(new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } }));

export function installMockApi() {
  if (installed || typeof window === 'undefined') return;
  installed = true;
  const original = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    const path = url.replace(window.location.origin, '');
    if (/^\/api\/blog\/[^/]+\/reactions/.test(path)) return json({ like: 12, love: 7, fire: 4, idea: 9 });
    if (/^\/api\/blog\/[^/]+\/views/.test(path)) return json({ views: 1284 });
    if (path.startsWith('/api/newsletter/subscribe')) return json({ ok: true });
    if (path.startsWith('/api/newsletter/unsubscribe')) {
      const body = JSON.parse(typeof init?.body === 'string' ? init.body : '{}') as { email?: string; token?: string };
      if (body.email?.startsWith('fail')) return json({ error: 'Failed to unsubscribe. Please try again.' }, 500);
      if (body.token === 'expired') return json({ error: 'invalid-link' }, 400);
      return json({ message: body.token ? 'unsubscribed' : 'link-sent' });
    }
    return original(input, init);
  };
}
