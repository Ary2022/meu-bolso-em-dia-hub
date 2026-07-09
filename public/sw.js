// Service worker do Meu Bolso em Dia IA — cache mínimo do app shell.
// Guarda: nunca registrado em preview/iframe/lovable/dev (o guard está no cliente).
const CACHE = "mbed-shell-v1";
const SHELL = ["/", "/app", "/manifest.webmanifest", "/icons/icon-192.png", "/icons/icon-512.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // NetworkFirst para navegações (HTML)
  if (req.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const res = await fetch(req);
          const cache = await caches.open(CACHE);
          cache.put(req, res.clone()).catch(() => {});
          return res;
        } catch {
          const cached = await caches.match(req);
          return cached || caches.match("/app") || Response.error();
        }
      })(),
    );
    return;
  }

  // CacheFirst para assets estáticos (imagens/ícones/fontes)
  if (/\.(png|jpg|jpeg|svg|webp|woff2?|ttf|otf|ico)$/i.test(url.pathname)) {
    event.respondWith(
      caches.match(req).then(
        (cached) =>
          cached ||
          fetch(req).then((res) => {
            const clone = res.clone();
            caches.open(CACHE).then((c) => c.put(req, clone)).catch(() => {});
            return res;
          }),
      ),
    );
  }
});
