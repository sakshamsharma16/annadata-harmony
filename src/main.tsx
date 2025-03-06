
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

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
        transition: opacity 0.5s;
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 4px solid rgba(0, 0, 0, 0.1);
        border-top: 4px solid #138808;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin-bottom: 16px;
      }
      .app-name {
        font-size: 1.5rem;
        font-weight: bold;
        color: #138808;
        margin-bottom: 8px;
      }
      .loading-text {
        color: #666;
        font-size: 0.9rem;
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
        animation: fadeUp 0.5s ease-out forwards;
      }
    </style>
    <div class="spinner"></div>
    <div class="app-name fadeUp" style="animation-delay: 0.2s">ANNADATA</div>
    <p class="loading-text fadeUp" style="animation-delay: 0.4s">Loading application...</p>
  `;
  document.body.appendChild(loadingEl);
};

const removeLoadingIndicator = () => {
  const loadingEl = document.getElementById('initial-loading');
  if (loadingEl) {
    loadingEl.style.opacity = '0';
    setTimeout(() => {
      loadingEl.remove();
    }, 500);
  }
};

// Show loading indicator
showLoadingIndicator();

// Pre-load critical resources
const preloadResources = async () => {
  // Add any critical resources that need to be preloaded here
  const preloadImages = [
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8'
  ];
  
  const preloadPromises = preloadImages.map(url => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve; // Don't block if image fails
      img.src = url;
    });
  });
  
  // Use Promise.allSettled so we don't block on individual image failures
  return Promise.allSettled(preloadPromises);
};

// Add performance monitoring
const reportWebVitals = () => {
  // Capture initial load timing
  const loadTime = window.performance?.timing?.loadEventEnd - window.performance?.timing?.navigationStart;
  console.log(`Initial page load: ${loadTime}ms`);
  
  // Report Core Web Vitals if available
  if ('performance' in window && 'getEntriesByType' in performance) {
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      // Log key metrics
      console.log(`Time to Interactive: ${navEntry.domInteractive}ms`);
      console.log(`DOM Content Loaded: ${navEntry.domContentLoadedEventEnd}ms`);
      console.log(`Load Complete: ${navEntry.loadEventEnd}ms`);
    }
    
    // Report Largest Contentful Paint
    const observer = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1] as PerformanceEntry;
      console.log(`Largest Contentful Paint: ${lastEntry.startTime}ms`);
    });
    
    observer.observe({ type: 'largest-contentful-paint', buffered: true });
  }
};

// Mount app with performance measuring
const mountApp = async () => {
  const startTime = performance.now();
  
  try {
    // Preload resources in parallel with app initialization
    const preloadPromise = preloadResources();
    
    // Create root with an optimized approach
    const rootElement = document.getElementById("root")!;
    rootElement.className = 'hardware-accelerated'; // Add GPU acceleration
    const root = createRoot(rootElement);
    
    // Render app
    root.render(<App />);
    
    // Ensure preloading completes
    await preloadPromise;
    
    // Log rendering time
    const renderTime = performance.now() - startTime;
    console.log(`App render time: ${renderTime.toFixed(2)}ms`);
    
    // Remove loading indicator with a slight delay to ensure UI is painted
    const removeLoader = () => {
      setTimeout(removeLoadingIndicator, 300);
    };
    
    // Remove loading indicator when content is fully loaded
    if (document.readyState === 'complete') {
      removeLoader();
    } else {
      window.addEventListener('load', removeLoader);
    }
    
    // Report web vitals after the app loads
    window.addEventListener('load', reportWebVitals);
    
  } catch (error) {
    console.error('Error mounting app:', error);
    removeLoadingIndicator();
  }
};

// Start mounting the app
mountApp();
