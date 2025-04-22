
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Define the root element to use for mounting the app
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Create loading indicator
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
    }, 300);
  }
};

// Show loading indicator
showLoadingIndicator();

// Setup PWA assets
const setupPwa = () => {
  // Add PWA manifest link if not already present
  if (!document.querySelector('link[rel="manifest"]')) {
    const manifestLink = document.createElement('link');
    manifestLink.rel = 'manifest';
    manifestLink.href = '/manifest.json';
    document.head.appendChild(manifestLink);
  }
};

// Setup service worker
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
      
      // Check if service worker needs updating
      if (registration.installing) {
        console.log('Service worker installing');
      } else if (registration.waiting) {
        console.log('Service worker installed but waiting');
        // Notify user about update
        showUpdateNotification();
      } else if (registration.active) {
        console.log('Service worker active');
      }
      
      // Handle updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              // New service worker available
              showUpdateNotification();
            }
          });
        }
      });
    } catch (error) {
      console.error('Service worker registration failed:', error);
    }
  }
};

// Show update notification
const showUpdateNotification = () => {
  // Only show if not already showing
  if (document.getElementById('sw-update-notification')) return;
  
  const notificationEl = document.createElement('div');
  notificationEl.id = 'sw-update-notification';
  notificationEl.innerHTML = `
    <style>
      #sw-update-notification {
        position: fixed;
        bottom: 16px;
        left: 16px;
        right: 16px;
        background: #138808;
        color: white;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        z-index: 9999;
        animation: slideUp 0.3s ease-out;
      }
      #sw-update-notification button {
        background: white;
        color: #138808;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      }
      @keyframes slideUp {
        from { transform: translateY(100px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
    </style>
    <div>A new version of Annadata is available!</div>
    <button id="sw-update-button">Update Now</button>
  `;
  document.body.appendChild(notificationEl);
  
  // Add event listener to update button
  document.getElementById('sw-update-button')?.addEventListener('click', () => {
    // Send message to service worker to skip waiting
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'SKIP_WAITING' });
    }
    
    // Remove notification
    notificationEl.remove();
    
    // Reload page
    window.location.reload();
  });
};

// Setup caching
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

// Setup performance monitoring
const setupPerformanceMonitoring = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Monitor page load performance
    window.addEventListener('load', () => {
      setTimeout(() => {
        // Cast to specific performance entry types to access properties
        const navEntries = performance.getEntriesByType('navigation');
        const perfData = navEntries[0] as PerformanceNavigationTiming;
        
        const elementEntries = performance.getEntriesByType('element');
        const lcpElement = elementEntries[0]; // This may be undefined if no LCP element is tracked
        
        const paintEntries = performance.getEntriesByType('paint');
        
        const metrics = {
          // Navigation Timing API - using proper type
          loadTime: perfData ? perfData.duration : undefined,
          domContentLoaded: perfData ? 
            perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart : 
            undefined,
          firstByte: perfData ? 
            perfData.responseStart - perfData.requestStart : 
            undefined,
          
          // Paint Timing API
          firstPaint: paintEntries.find(entry => entry.name === 'first-paint')?.startTime,
          firstContentfulPaint: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
          
          // Largest Contentful Paint with proper type checking
          largestContentfulPaint: lcpElement ? 
            (lcpElement as any).renderTime || (lcpElement as any).loadTime : 
            undefined
        };
        
        console.log('Performance metrics:', metrics);
        
        // Send metrics to analytics (can be implemented when analytics is set up)
        // sendToAnalytics(metrics);
      }, 0);
    });
  }
};

// Initialize app
const initApp = async () => {
  setupPwa();
  await registerServiceWorker();
  setupAppCache();
  setupPerformanceMonitoring();
  
  // Create React root and render app
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  // Remove loading indicator after the app has rendered
  setTimeout(() => {
    removeLoadingIndicator();
  }, 500);
};

// Start initialization
initApp().catch(error => {
  console.error('Application initialization failed:', error);
  // Show error in loading indicator
  const loadingTextEl = document.querySelector('.loading-text');
  if (loadingTextEl) {
    (loadingTextEl as HTMLElement).textContent = 'Failed to load application. Please refresh the page.';
    (loadingTextEl as HTMLElement).style.color = 'red';
  }
});

// Add event listeners for online/offline status
window.addEventListener('online', () => {
  document.body.classList.remove('offline');
  console.log('Application is online');
});

window.addEventListener('offline', () => {
  document.body.classList.add('offline');
  console.log('Application is offline');
});
