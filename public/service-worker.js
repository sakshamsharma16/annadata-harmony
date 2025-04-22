// Cache names with versioning for easy updates
const STATIC_CACHE_NAME = 'annadata-static-cache-v1';
const DYNAMIC_CACHE_NAME = 'annadata-dynamic-cache-v1';
const IMAGE_CACHE_NAME = 'annadata-image-cache-v1';
const API_CACHE_NAME = 'annadata-api-cache-v1';

// Resources that should be pre-cached
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/manifest.json',
  '/favicon.ico',
  '/offline.html', // Fallback page for offline experience
  // Add other critical static assets here
];

// Install event: Pre-cache static assets
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  
  // Skip waiting to ensure new service worker activates immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Pre-caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(error => {
        console.error('[Service Worker] Pre-caching failed:', error);
      })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  
  // Take control of all clients immediately
  self.clients.claim();
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // Delete outdated caches
          if (
            cacheName !== STATIC_CACHE_NAME && 
            cacheName !== DYNAMIC_CACHE_NAME &&
            cacheName !== IMAGE_CACHE_NAME &&
            cacheName !== API_CACHE_NAME
          ) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Helper function to determine cache strategy based on request
const getCacheStrategy = (request) => {
  const url = new URL(request.url);
  
  // For API requests, use network-first strategy
  if (url.pathname.includes('/api/')) {
    return 'network-first';
  }
  
  // For images, use cache-first strategy
  if (request.destination === 'image' || 
      url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|avif)$/)) {
    return 'cache-first';
  }
  
  // For HTML navigation requests, use network-first
  if (request.mode === 'navigate') {
    return 'network-first';
  }
  
  // For JS/CSS assets, use stale-while-revalidate
  if (url.pathname.match(/\.(js|css)$/)) {
    return 'stale-while-revalidate';
  }
  
  // Default to network-first
  return 'network-first';
};

// Network-first strategy implementation
const networkFirst = async (request, cacheName) => {
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // If successful, clone and cache the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // If not in cache, return offline fallback for HTML
    if (request.mode === 'navigate') {
      return caches.match('/offline.html');
    }
    
    // For images, return a placeholder
    if (request.destination === 'image') {
      return caches.match('/placeholder.svg');
    }
    
    // Otherwise, throw error
    throw error;
  }
};

// Cache-first strategy implementation
const cacheFirst = async (request, cacheName) => {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    // If in cache, return it but also update cache in background
    fetch(request)
      .then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const cache = caches.open(cacheName);
          return cache.then(c => c.put(request, networkResponse));
        }
      })
      .catch(() => console.log('[Service Worker] Refresh cache failed, but user has offline version'));
    
    return cachedResponse;
  }
  
  // If not in cache, fetch from network and cache
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Provide fallbacks for specific content types
    if (request.destination === 'image') {
      return caches.match('/placeholder.svg');
    }
    
    throw error;
  }
};

// Stale-while-revalidate strategy implementation
const staleWhileRevalidate = async (request, cacheName) => {
  // First, check cache
  const cachedResponse = await caches.match(request);
  
  // Fetch from network and update cache in background
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse && networkResponse.status === 200) {
      const cache = caches.open(cacheName);
      return cache.then(c => {
        c.put(request, networkResponse.clone());
        return networkResponse;
      });
    }
    return networkResponse;
  }).catch(error => {
    console.error('[Service Worker] Fetch failed:', error);
    throw error;
  });
  
  // Return cached response immediately if available, otherwise wait for fetch
  return cachedResponse || fetchPromise;
};

// Main fetch event handler using strategy pattern
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests or browser extensions
  if (event.request.method !== 'GET' || 
      !event.request.url.startsWith('http')) {
    return;
  }
  
  const strategy = getCacheStrategy(event.request);
  
  // Choose appropriate cache based on request type
  let cacheName = DYNAMIC_CACHE_NAME;
  if (event.request.destination === 'image') {
    cacheName = IMAGE_CACHE_NAME;
  } else if (event.request.url.includes('/api/')) {
    cacheName = API_CACHE_NAME;
  }
  
  // Apply the selected strategy
  if (strategy === 'network-first') {
    event.respondWith(networkFirst(event.request, cacheName));
  } else if (strategy === 'cache-first') {
    event.respondWith(cacheFirst(event.request, cacheName));
  } else if (strategy === 'stale-while-revalidate') {
    event.respondWith(staleWhileRevalidate(event.request, cacheName));
  }
});

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  // Handle cache update message
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    const { url, value, cacheName = DYNAMIC_CACHE_NAME } = event.data;
    if (url && value) {
      caches.open(cacheName)
        .then(cache => {
          const response = new Response(JSON.stringify(value), {
            headers: {'Content-Type': 'application/json'}
          });
          cache.put(new Request(url), response);
          console.log('[Service Worker] Cache updated programmatically:', url);
        })
        .catch(err => console.error('[Service Worker] Error updating cache programmatically:', err));
    }
  }
  
  // Handle cache clearing
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    const { cacheName = DYNAMIC_CACHE_NAME } = event.data;
    caches.open(cacheName)
      .then(cache => {
        cache.keys().then(keys => {
          keys.forEach(request => {
            cache.delete(request);
          });
        });
        console.log(`[Service Worker] Cache cleared: ${cacheName}`);
      })
      .catch(err => console.error('[Service Worker] Error clearing cache:', err));
  }
});

// Background sync for offline operations
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // Process any pending offline operations
      caches.open('offline-operations').then(cache => {
        return cache.keys().then(keys => {
          return Promise.all(keys.map(key => {
            return cache.match(key).then(response => {
              return response.json().then(operation => {
                // Process the operation
                return fetch(operation.url, {
                  method: operation.method,
                  headers: operation.headers,
                  body: JSON.stringify(operation.body)
                }).then(() => cache.delete(key))
                  .catch(error => {
                    console.error('[Service Worker] Sync operation failed:', error);
                    // Keep in cache to retry later
                    return Promise.resolve();
                  });
              });
            });
          }));
        });
      })
    );
  }
});

// Push notification handler
self.addEventListener('push', (event) => {
  if (!event.data) {
    console.log('[Service Worker] Push received but no data');
    return;
  }
  
  try {
    const data = event.data.json();
    
    const options = {
      body: data.body || 'New notification from Annadata',
      icon: data.icon || '/favicon.ico',
      badge: data.badge || '/favicon.ico',
      vibrate: data.vibrate || [100, 50, 100],
      data: {
        url: data.url || '/',
        dateOfArrival: Date.now(),
        primaryKey: data.id || 1
      },
      actions: data.actions || [
        {
          action: 'explore',
          title: 'View Details'
        },
        {
          action: 'close',
          title: 'Close'
        }
      ]
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title || 'Annadata Notification', options)
    );
  } catch (error) {
    console.error('[Service Worker] Error showing notification:', error);
    
    // Fallback to simple notification if JSON parsing fails
    const options = {
      body: 'You have a new notification from Annadata',
      icon: '/favicon.ico',
      badge: '/favicon.ico'
    };
    
    event.waitUntil(
      self.registration.showNotification('Annadata Notification', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  const notification = event.notification;
  const action = event.action;
  
  notification.close();
  
  if (action === 'close') {
    return;
  }
  
  // Default action is to open the linked page
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then(clientList => {
        const url = notification.data?.url || '/';
        
        // Check if there is already a window open with this URL
        for (let client of clientList) {
          if (client.url === url && 'focus' in client) {
            return client.focus();
          }
        }
        
        // If not, open a new window
        if (clients.openWindow) {
          return clients.openWindow(url);
        }
      })
  );
});

// Periodically clean up old cached resources to prevent storage bloat
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cleanup-caches') {
    event.waitUntil(
      caches.open(DYNAMIC_CACHE_NAME).then(cache => {
        return cache.keys().then(keys => {
          // Keep only recent items (e.g., last week)
          const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
          
          return Promise.all(
            keys.map(request => {
              return cache.match(request).then(response => {
                if (!response) return cache.delete(request);
                
                const headers = response.headers;
                const date = headers.get('date') ? new Date(headers.get('date')).getTime() : Date.now();
                
                if (date < oneWeekAgo) {
                  return cache.delete(request);
                }
                return Promise.resolve();
              });
            })
          );
        });
      })
    );
  }
});
