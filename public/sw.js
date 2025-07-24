// Advanced service worker for optimal caching and performance
const CACHE_NAME = "mekong-border-run-v2";
const STATIC_CACHE_NAME = "mekong-static-v2";
const DYNAMIC_CACHE_NAME = "mekong-dynamic-v2";

// Critical assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/contact",
  "/our-services",
  "/customers",
  "/image/logo/40028.png",
  "/image/home/other3.jpg",
  "/image/home/other1.jpg",
  "/image/home/other2.jpg",
  "/manifest.webmanifest",
  "/icon.png",
];

// API endpoints to cache
const API_CACHE_PATTERNS = [
  /^\/api\/contact-info/,
  /^\/api\/web-config/,
  /^\/api\/pickup-points/,
];

// Image cache patterns
const IMAGE_CACHE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /^https:\/\/.*\.supabase\.co\/storage\/.*\.(png|jpg|jpeg|svg|gif|webp)$/,
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Caching static assets...");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (
              cacheName !== STATIC_CACHE_NAME &&
              cacheName !== DYNAMIC_CACHE_NAME &&
              cacheName !== CACHE_NAME
            ) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        return self.clients.claim();
      })
  );
});

// Fetch event - implement advanced caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith("http")) {
    return;
  }

  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirst(request, STATIC_CACHE_NAME));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE_NAME));
  } else if (isImageRequest(request)) {
    event.respondWith(cacheFirst(request, DYNAMIC_CACHE_NAME));
  } else {
    event.respondWith(staleWhileRevalidate(request, DYNAMIC_CACHE_NAME));
  }
});

// Cache first strategy - for static assets
async function cacheFirst(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error("Cache first strategy failed:", error);
    const cachedResponse = await caches.match(request);
    return (
      cachedResponse ||
      new Response("Offline content not available", { status: 503 })
    );
  }
}

// Network first strategy - for dynamic content
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.log("Network failed, trying cache:", error);
    const cachedResponse = await caches.match(request);
    return (
      cachedResponse ||
      new Response("Content not available offline", { status: 503 })
    );
  }
}

// Stale while revalidate strategy - for frequently updated content
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);

  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      if (networkResponse.ok) {
        cache.put(request, networkResponse.clone());
      }
      return networkResponse;
    })
    .catch(() => cachedResponse);

  return cachedResponse || fetchPromise;
}

// Helper functions
function isStaticAsset(request) {
  return STATIC_ASSETS.some((asset) => request.url.includes(asset));
}

function isAPIRequest(request) {
  return API_CACHE_PATTERNS.some((pattern) => pattern.test(request.url));
}

function isImageRequest(request) {
  return IMAGE_CACHE_PATTERNS.some((pattern) => pattern.test(request.url));
}
