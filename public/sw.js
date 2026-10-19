const CACHE_NAME = 'listerineh-portfolio-2026-10-18T08-22-51';
const urlsToCache = [
  '/offline.html',
  '/manifest.json',
  '/favicon.svg',
];
// The pages offline.html lists under "Saved for offline". Best effort: a failure here never blocks the install.
const pagesToCache = ['/', '/blog', '/about'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).then(() =>
        Promise.allSettled(pagesToCache.map((page) => cache.add(page)))
      );
    }).then(() => {
      return caches.keys().then((names) => {
        return Promise.all(
          names.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      });
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);
  
  const isHTMLPage = event.request.mode === 'navigate' || event.request.headers.get('accept')?.includes('text/html');

  // Pages: always the network first. Each page that loads is kept, so the pages already visited still open offline
  // (with the assets they used, cached below); anything else falls back to offline.html.
  if (isHTMLPage) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok && response.type === 'basic' && url.origin === self.location.origin) {
            const copy = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(url.pathname, copy));
          }
          return response;
        })
        .catch(() =>
          caches.match(url.pathname, { ignoreSearch: true, ignoreVary: true })
            .then((cached) => cached || caches.match('/offline.html'))
        )
    );
    return;
  }

  // Cache-first strategy for static assets only
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Only cache static assets (images, fonts, etc.)
        const shouldCache = url.pathname.match(/\.(jpg|jpeg|png|gif|webp|svg|woff|woff2|ttf|eot|ico|css|js)$/);
        
        if (shouldCache) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }

        return response;
      });
    }).catch(() => {
      return caches.match('/offline.html');
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
