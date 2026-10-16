import { lazy, type ComponentType } from 'react';

const RELOAD_KEY = 'annadata-lazy-reload';
const RELOAD_WINDOW_MS = 60_000;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * React.lazy with recovery for "Failed to fetch dynamically imported module".
 * Retries the import, then refreshes the page once (guarded by sessionStorage)
 * so a tab holding an outdated page can pick up the newest files.
 */
export function lazyWithRetry<T extends ComponentType<any>>(
  factory: () => Promise<{ default: T }>,
  retries = 2,
) {
  return lazy(async () => {
    let lastError: unknown;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const mod = await factory();
        return mod;
      } catch (error) {
        lastError = error;
        if (attempt < retries) await wait(400 * (attempt + 1));
      }
    }

    try {
      const last = Number(sessionStorage.getItem(RELOAD_KEY));
      if (navigator.onLine && Date.now() - last > RELOAD_WINDOW_MS) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(
            names.filter((n) => n.startsWith('annadata-')).map((n) => caches.delete(n)),
          );
        }
        window.location.reload();
        // Keep suspense fallback visible while the page refreshes.
        return new Promise<{ default: T }>(() => {});
      }
    } catch {
      // Fall through and surface the original error.
    }
    throw lastError;
  });
}
