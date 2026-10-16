const RECOVERY_KEY = 'annadata-module-recovery';
const RECOVERY_WINDOW_MS = 60_000;

// A deployment can remove a chunk still referenced by an already-open tab.
// Refresh the document once, without turning persistent network failures into a loop.
export function setupModuleLoadRecovery() {
  window.addEventListener('vite:preloadError', (event) => {
    if (!navigator.onLine) return;

    try {
      const lastAttempt = Number(sessionStorage.getItem(RECOVERY_KEY));
      if (Date.now() - lastAttempt < RECOVERY_WINDOW_MS) return;
      sessionStorage.setItem(RECOVERY_KEY, String(Date.now()));
    } catch {
      // Without a durable reload guard, leave the original error visible.
      return;
    }

    event.preventDefault();
    void (async () => {
      try {
        if ('caches' in window) {
          const names = await caches.keys();
          await Promise.all(
            names.filter((name) => name.startsWith('annadata-'))
              .map((name) => caches.delete(name)),
          );
        }
      } catch {
        // Storage restrictions must not prevent the recovery refresh.
      } finally {
        window.location.reload();
      }
    })();
  });
}