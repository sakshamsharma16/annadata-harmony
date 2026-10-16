# Architecture rules

- Register deployment-chunk recovery in the application entry point; limit automatic refreshes using session storage so persistent failures cannot cause reload loops.
- Create code-split components with `lazyWithRetry` instead of bare `React.lazy`; failed chunk imports must retry and then recover with a guarded refresh.
- Keep navigation documents, scripts, styles and dev-server modules out of service-worker caches; stale copies can reference removed deployment chunks. Preserve the dedicated offline fallback.
- Register the service worker only on the live site; development and preview hosts must unregister it and clear Annadata caches.
- Limit service-worker interception and cache cleanup to same-origin requests and Annadata-owned caches; unrelated services and stored data must remain untouched.
