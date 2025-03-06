
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
    }, 300); // Reduced from 500ms to 300ms for faster transition
  }
};

// Show loading indicator
showLoadingIndicator();

// Optimize font loading
const preloadFonts = () => {
  // Add preload links for critical fonts
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
  });
};

// Pre-load critical resources with higher concurrency
const preloadResources = async () => {
  // Add any critical resources that need to be preloaded here
  const preloadImages = [
    'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    'https://images.unsplash.com/photo-1523741543316-beb7fc7023d8'
  ];
  
  // Use Promise.all for concurrent loading instead of sequential
  const preloadPromises = preloadImages.map(url => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve; // Don't block if image fails
      img.src = url;
    });
  });
  
  // Preload fonts in parallel with images
  preloadFonts();
  
  // Return a promise that resolves when all resources are loaded
  return Promise.all(preloadPromises);
};

// Add performance monitoring with more detailed metrics
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

// Mount app with optimized performance
const mountApp = async () => {
  const startTime = performance.now();
  
  try {
    // Preload resources in parallel with app initialization
    const preloadPromise = preloadResources();
    
    // Create root with performance optimizations
    const rootElement = document.getElementById("root")!;
    
    // Apply GPU acceleration and content-visibility
    rootElement.className = 'hardware-accelerated';
    rootElement.style.setProperty('content-visibility', 'auto');
    
    // Create root with concurrent mode 
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
      // Reduced timeout from 300ms to 100ms for faster display
      setTimeout(removeLoadingIndicator, 100);
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

// Start mounting the app with requestIdleCallback if available for better performance
if ('requestIdleCallback' in window) {
  // @ts-ignore - TypeScript doesn't recognize requestIdleCallback
  window.requestIdleCallback(() => mountApp());
} else {
  // Fallback to setTimeout if requestIdleCallback is not available
  setTimeout(mountApp, 1);
}
