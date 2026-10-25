// Service worker da PWA /app (âmbito "/app"). Simples de propósito:
// - a página /app é "network-first" com cópia em cache, para o aviso de segurança
//   e os contactos funcionarem sem rede;
// - os ficheiros estáticos (/_next/static, ícones) ficam em cache à medida que são pedidos;
// - nada mais é intercetado: pedidos externos (Google Forms, webhook) passam diretos e
//   nunca são guardados.
const CACHE = "cj-app-v1";
const PRECACHE = [
  "/app",
  "/app/manifest.webmanifest",
  "/app/icon-192.png",
  "/app/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

function isAppPage(url) {
  return url.pathname === "/app" || url.pathname === "/app/";
}

function isStatic(url) {
  return url.pathname.startsWith("/_next/static/") || url.pathname.startsWith("/app/");
}

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === "navigate" && isAppPage(url)) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put("/app", copy));
          }
          return res;
        })
        .catch(() => caches.match("/app").then((r) => r || Response.error())),
    );
    return;
  }

  if (isStatic(url)) {
    event.respondWith(
      caches.match(req).then(
        (hit) =>
          hit ||
          fetch(req).then((res) => {
            if (res.ok) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          }),
      ),
    );
  }
});

// A página envia a lista dos recursos já carregados antes de o SW a controlar,
// para que a primeira visita também fique disponível offline.
self.addEventListener("message", (event) => {
  const data = event.data;
  if (!data || data.type !== "cache-urls" || !Array.isArray(data.urls)) return;
  const urls = data.urls.filter((u) => {
    try {
      const url = new URL(u, self.location.origin);
      return url.origin === self.location.origin && isStatic(url);
    } catch {
      return false;
    }
  });
  event.waitUntil(caches.open(CACHE).then((c) => Promise.all(urls.map((u) => c.add(u).catch(() => {})))));
});
