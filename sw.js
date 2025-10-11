const cacheName = 'portfolio-cache-v2';
const precacheAssets = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/css/responsive.css',
  '/css/base.css',
  '/css/lightdark.css',
  '/js/function.js',
  '/js/customItemAnimations.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(cacheName).then((cache) => cache.addAll(precacheAssets)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => (k !== cacheName ? caches.delete(k) : Promise.resolve())))).then(
      () => self.clients.claim()
    )
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Only handle same-origin GET requests
  if (req.method !== 'GET' || url.origin !== location.origin) return;

  // Don't cache portrait images to allow dynamic switching
  if (url.pathname.includes('/assets/me.webp') || url.pathname.includes('/assets/melight.webp')) {
    // Always fetch portrait images from network to allow dynamic switching
    event.respondWith(fetch(req));
    return;
  }

  const accept = req.headers.get('accept') || '';
  const isAsset =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/css/') ||
    url.pathname.startsWith('/js/') ||
    accept.includes('image/') ||
    accept.includes('text/css') ||
    accept.includes('application/javascript');

  if (!isAsset) return; // fall through to network for HTML navigations etc.

  event.respondWith(
    caches.open(cacheName).then(async (cache) => {
      const cached = await cache.match(req);
      const fetchPromise = fetch(req)
        .then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            cache.put(req, networkRes.clone());
          }
          return networkRes;
        })
        .catch(() => cached);

      // Return cached if available immediately, otherwise wait for network
      return cached || fetchPromise;
    })
  );
});
