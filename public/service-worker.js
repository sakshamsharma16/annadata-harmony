
// Cache name for the application
const CACHE_NAME = 'annadata-app-cache-v2';
const DYNAMIC_CACHE = 'annadata-dynamic-cache-v1';

// List of assets to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/App.tsx',
  '/src/main.tsx',
  '/favicon.ico'
];

// Install the service worker and cache assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Opened cache');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: All resources cached');
        return self.skipWaiting();
      })
  );
});

// Intercept fetch requests and serve from cache when possible
self.addEventListener('fetch', (event) => {
  // Only cache GET requests
  if (event.request.method !== 'GET') return;
  
  // Don't cache API requests
  if (event.request.url.includes('/api/')) return;
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          console.log('Service Worker: Resource fetched from cache');
          
          // Fetch the resource in the background to update cache
          fetch(event.request)
            .then(newResponse => {
              // Only cache successful responses
              if (newResponse && newResponse.status === 200) {
                caches.open(CACHE_NAME)
                  .then(cache => cache.put(event.request, newResponse));
              }
            })
            .catch(err => console.error('Error updating cache:', err));
            
          return response;
        }
        
        // Not in cache - fetch and cache
        return fetch(event.request)
          .then(response => {
            // Clone the response since it can only be consumed once
            const responseToCache = response.clone();
            
            // Check if we received a valid response
            if (!response || response.status !== 200) {
              console.log('Service Worker: Invalid response from fetch');
              return response;
            }
            
            // Cache the fetched resource
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Resource fetched and cached');
              })
              .catch(err => console.error('Error caching new resource:', err));
              
            return response;
          })
          .catch(error => {
            console.error('Service Worker: Fetch failed; returning offline page instead.', error);
            
            // Check if request is for an image
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/)) {
              return caches.match('/placeholder.svg');
            }
            
            // Return a fallback HTML page
            return caches.match('/index.html');
          });
      })
  );
});

// Clean up old caches when a new service worker is activated
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  const cacheWhitelist = [CACHE_NAME, DYNAMIC_CACHE];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Delete old caches
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service Worker: Claiming clients');
      return self.clients.claim();
    })
  );
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Handle cache update message
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    const { url, value } = event.data;
    if (url && value) {
      caches.open(DYNAMIC_CACHE)
        .then(cache => {
          const response = new Response(JSON.stringify(value), {
            headers: {'Content-Type': 'application/json'}
          });
          cache.put(new Request(url), response);
          console.log('Service Worker: Cache updated programmatically', url);
        })
        .catch(err => console.error('Error updating cache programmatically:', err));
    }
  }
  
  // Handle cache clearing
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.open(DYNAMIC_CACHE)
      .then(cache => {
        cache.keys().then(keys => {
          keys.forEach(request => {
            cache.delete(request);
          });
        });
        console.log('Service Worker: Dynamic cache cleared');
      })
      .catch(err => console.error('Error clearing cache:', err));
  }
});

// Background sync for offline operations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Process any pending offline operations
      console.log('Service Worker: Performing background sync')
    );
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/'
    }
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
