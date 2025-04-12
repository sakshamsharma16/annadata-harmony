
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create a loading indicator
const showLoadingIndicator = () => {
  const loadingEl = document.createElement('div');
  loadingEl.id = 'initial-loading';
  loadingEl.innerHTML = `
    <style>
      #initial-loading {
        position: fixed;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #F2FCE2;
        z-index: 9999;
        transition: opacity 0.3s;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top: 4px solid #138808;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
        margin-bottom: 16px;
      }
      .app-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #138808;
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
      }
      .loading-text {
        color: #666;
        font-size: 0.9rem;
        opacity: 0;
        transform: translateY(10px);
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fadeUp {
        animation: fadeUp 0.3s ease-out forwards;
      }
    </style>
    <div class="spinner"></div>
    <div class="app-name fadeUp" style="animation-delay: 0.1s">ANNADATA</div>
    <p class="loading-text fadeUp" style="animation-delay: 0.2s">Loading application...</p>
  `;
  document.body.appendChild(loadingEl);
};

const removeLoadingIndicator = () => {
  const loadingEl = document.getElementById('initial-loading');
  if (loadingEl) {
    loadingEl.style.opacity = '0';
    setTimeout(() => {
      loadingEl.remove();
    }, 100);
  }
};

// Set up application cache
const setupAppCache = () => {
  if ('caches' in window) {
    caches.open('annadata-app-cache-v1').then(cache => {
      const urlsToCache = [
        '/',
        '/index.html',
        '/src/index.css',
        '/src/App.tsx',
        '/src/main.tsx'
      ];
      return cache.addAll(urlsToCache);
    }).catch(error => {
      console.warn('Caching failed:', error);
    });
  }
};

// Show loading indicator
showLoadingIndicator();

// Setup caching
setupAppCache();

// Preload resources function
const preloadResources = () => {
  const resources = [];
  
  const checkCacheAndLoad = (url) => {
    if ('caches' in window) {
      return caches.match(url).then(response => {
        if (response) {
          return response;
        }
        return fetch(url, { cache: 'force-cache' }).then(res => {
          if (res.ok) {
            const cloneRes = res.clone();
            caches.open('annadata-app-cache-v1').then(cache => {
              cache.put(url, cloneRes);
            });
          }
          return res;
        });
      });
    } else {
      return fetch(url, { cache: 'force-cache' });
    }
  };
  
  const fontPreloadLinks = [
    { href: '/fonts/font1.woff2', type: 'font/woff2', crossOrigin: 'anonymous' },
    { href: '/fonts/font2.woff2', type: 'font/woff2', crossOrigin: 'anonymous' }
  ];

  fontPreloadLinks.forEach(font => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = font.href;
    link.type = font.type;
    link.crossOrigin = font.crossOrigin;
    document.head.appendChild(link);
    
    resources.push(new Promise(resolve => {
      link.onload = resolve;
      link.onerror = resolve;
    }));
  });
  
  const preloadImages = [
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8',
    'https://img.icons8.com/fluency/48/shop.png'
  ];
  
  preloadImages.forEach(url => {
    const img = new Image();
    resources.push(new Promise(resolve => {
      img.onload = resolve;
      img.onerror = resolve;
      img.src = url;
    }));
    
    checkCacheAndLoad(url);
  });
  
  // Fix for mapboxgl UMD global reference
  if (typeof window.mapboxgl !== 'undefined') {
    resources.push(
      checkCacheAndLoad('https://api.mapbox.com/mapbox-gl-js/v3.10.0/mapbox-gl.js')
    );
  }
  
  return Promise.all(resources);
};

// Mount app with optimized performance
const mountApp = async () => {
  const startTime = performance.now();
  
  try {
    const preloadPromise = preloadResources();
    
    const rootElement = document.getElementById("root")!;
    
    rootElement.style.setProperty('transform', 'translateZ(0)');
    rootElement.style.setProperty('backface-visibility', 'hidden');
    rootElement.style.setProperty('will-change', 'transform');
    
    const root = createRoot(rootElement);
    
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    
    if (window.localStorage) {
      const CACHE_EXPIRATION = 24 * 60 * 60 * 1000; 
      
      window.addEventListener('beforeunload', () => {
        localStorage.setItem('annadata-cache-timestamp', Date.now().toString());
      });
      
      const timestamp = localStorage.getItem('annadata-cache-timestamp');
      if (timestamp && (Date.now() - parseInt(timestamp, 10)) > CACHE_EXPIRATION) {
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('annadata-cache-')) {
            localStorage.removeItem(key);
          }
        });
      }
    }
    
    Promise.race([
      preloadPromise,
      new Promise(resolve => setTimeout(resolve, 600))
    ]).then(() => {
      requestAnimationFrame(() => {
        removeLoadingIndicator();
      });
    });
    
    const renderTime = performance.now() - startTime;
    console.log(`App render time: ${renderTime.toFixed(2)}ms`);
    
  } catch (error) {
    console.error('Error mounting app:', error);
    removeLoadingIndicator();
  }
};

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

requestAnimationFrame(() => {
  mountApp();
});
