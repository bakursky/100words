// public/sw.js

self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  clients.claim();
});

// Optional: very simple offline-first cache
const CACHE_NAME = "100words-cache-v1";
const MANIFEST_URLS = ['/manifest.webmanifest', '/manifest.json']; // Add manifest patterns

self.addEventListener("fetch", event => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== "GET") return;

  // ✅ DON'T cache the manifest - let Next.js handle it
  if (url.pathname.includes('manifest')) {
    return; // Let browser handle manifest requests directly
  }

  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        // Don't cache manifest responses
        if (url.pathname.includes('manifest')) {
          return response;
        }
        
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone);
        });
        return response;
      }).catch(() => cached);
    })
  );
});