// public/sw.js

self.addEventListener("install", event => {
    self.skipWaiting();
  });
  
  self.addEventListener("activate", event => {
    clients.claim();
  });
  
  // Optional: very simple offline-first cache
  const CACHE_NAME = "100words-cache-v1";
  
  self.addEventListener("fetch", event => {
    const { request } = event;
  
    // Only handle GET requests
    if (request.method !== "GET") return;
  
    event.respondWith(
      caches.match(request).then(cached => {
        if (cached) return cached;
  
        return fetch(request).then(response => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(request, responseClone);
          });
          return response;
        }).catch(() => cached);
      })
    );
  });