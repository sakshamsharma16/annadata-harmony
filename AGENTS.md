# Architecture rules

- Register deployment-chunk recovery in the application entry point; limit automatic refreshes using session storage so persistent failures cannot cause reload loops.
- Keep navigation documents out of service-worker caches and fetch them without HTTP cache; old HTML can reference removed deployment chunks. Preserve the dedicated offline fallback.
- Limit service-worker interception and cache cleanup to same-origin requests and Annadata-owned caches; unrelated services and stored data must remain untouched.