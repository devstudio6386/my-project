self.addEventListener("install", () => {
    self.skipWaiting();
});

self.addEventListener("activate", event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", event => {
    // Network First - hamesha fresh data aayega
    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // Sirf tab cache use hoga jab internet na ho
                return caches.match(event.request);
            })
    );
});