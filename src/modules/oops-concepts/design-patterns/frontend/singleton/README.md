# Singleton — Frontend

Full theory, trade-offs and interview questions: [`../../backend/singleton/README.md`](../../backend/singleton/README.md)

## Where it shows up on the frontend

- A global store instance (Redux, Zustand, Pinia) — one store per app.
- Theme / i18n / feature-flag providers.
- An analytics or error-reporting client (`Sentry.init` once, use everywhere).
- A WebSocket connection shared by the whole app.

## The frontend-specific gotchas

- **Module singletons are the default.** `export const store = createStore()` is already a
  singleton because bundlers cache modules. You rarely need `getInstance()`.
- **SSR leaks state between users.** On the server the module is cached *per process*, not per
  request, so a "singleton" user session would be shared across every visitor. This is the #1
  Next.js/Nuxt bug caused by this pattern, and it is a great thing to raise in an interview.
- **HMR duplicates instances.** Hot reload can re-evaluate a module and create a second instance;
  libraries work around it by stashing the instance on `globalThis`.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A global theme store, plus the SSR leak demonstrated |
| `example2` | An analytics client that buffers events until it is initialised |
