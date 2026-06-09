const CACHE_NAME = 'multiplication-fox-game-v4';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './favicon.png',
  './icon-192.png',
  './icon-512.png',
  './game_bg_forest.png',
  './chapter-mult.webp',
  './chapter-addsub.webp',
  './chapter-div.webp',
  './fox_idle.png',
  './fox_correct.png',
  './fox_excited.png',
  './fox_wrong.png',
  './fox_celebrate.png',
  './fox_cheer.png',
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
