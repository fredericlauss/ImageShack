// public/service-worker.js

self.addEventListener("install", (event) => {
  console.log("Service worker installed");
  event.waitUntil(
    caches.open("offline-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/offline", // Page que l'on affichera hors ligne
        // Ajoutez ici d'autres ressources à mettre en cache, si nécessaire
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match("/offline");
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});
