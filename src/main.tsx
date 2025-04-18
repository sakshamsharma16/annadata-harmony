
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

setupAppCache();

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
}, 300);

// Register service worker if available
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
