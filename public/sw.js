// Simple service worker for caching static assets
const CACHE_NAME = "mekong-border-run-v1";
const urlsToCache = [
  "/",
  "/our-services",
  "/contact",
  "/customers",
  "/image/home/other3.jpg",
  "/image/home/other1.jpg",
  "/image/home/other2.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});
