const CACHE_NAME = 'multiplication-fox-game-v32';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './homepage-fox.webp',
  './game_bg_forest.webp',
  './chapter-mult.webp',
  './chapter-addsub.webp',
  './chapter-div.webp',
  './fox_idle.webp',
  './fox_correct.webp',
  './fox_excited.webp',
  './fox_wrong.webp',
  './fox_celebrate.webp',
  './fox_cheer.webp',
  './correct.wav',
  './combo.wav',
  './wrong.wav',
  './tick.wav',
  './win.wav',
  './lose.wav'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
