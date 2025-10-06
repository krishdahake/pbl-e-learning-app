// Service Worker for offline capability - 7+ days offline access
const CACHE_NAME = 'elearning-v1';
const STATIC_CACHE = 'elearning-static-v1';

// Files to cache for offline access
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  // Add your character images and other assets
  '/src/assets/math-character.png',
  '/src/assets/science-character.png',
  '/src/assets/language-character.png',
  '/src/assets/environment-character.png'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Caching essential files for offline access');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName !== STATIC_CACHE) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // If not in cache and online, fetch and cache
        return fetch(event.request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch(() => {
          // If both cache and network fail, return offline page
          if (event.request.destination === 'document') {
            return caches.match('/');
          }
        });
      })
  );
});

// Background sync for when connection returns
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('Background sync triggered');
    // Sync user progress when connection returns
    event.waitUntil(syncUserProgress());
  }
});

// Function to sync user progress
async function syncUserProgress() {
  try {
    // Get stored progress from IndexedDB
    const progress = await getStoredProgress();
    if (progress && progress.length > 0) {
      // Send to server when online
      await fetch('/api/sync-progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progress)
      });
      // Clear local storage after successful sync
      await clearStoredProgress();
    }
  } catch (error) {
    console.log('Sync failed, will retry later:', error);
  }
}

// Helper functions for IndexedDB operations
async function getStoredProgress() {
  // Implementation would use IndexedDB to store/retrieve progress
  return JSON.parse(localStorage.getItem('offline-progress') || '[]');
}

async function clearStoredProgress() {
  localStorage.removeItem('offline-progress');
}