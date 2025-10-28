// public/sw.js
const CACHE_NAME = 'dms-v1'
const urlsToCache = [
  '/',
  '/manifest.json',
  '/offline.html'
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response
        }
        return fetch(event.request)
          .catch(() => caches.match('/offline.html'))
      })
  )
})
