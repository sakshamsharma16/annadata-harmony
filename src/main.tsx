
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add performance monitoring
const reportWebVitals = () => {
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Record core web vitals
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry) {
      // Log key metrics
      console.log(`Time to Interactive: ${navEntry.domInteractive}ms`);
      console.log(`DOM Content Loaded: ${navEntry.domContentLoadedEventEnd}ms`);
      console.log(`Load Complete: ${navEntry.loadEventEnd}ms`);
    }
  }
};

createRoot(document.getElementById("root")!).render(<App />);

// Report web vitals after the app loads
window.addEventListener('load', reportWebVitals);
