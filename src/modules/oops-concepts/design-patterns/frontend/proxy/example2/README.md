# Example 2 — Lazy-loaded heavy component

**Problem:** a dashboard has four charts below the fold, each pulling in a large charting library.
Loading all of them on first paint wrecks Time to Interactive for widgets the user may never scroll
to.

**Pattern:** `LazyChart` implements the same `Renderable` interface but holds `real?: HeavyChart`
and constructs it on the first `render()`. It also exposes a `placeholder()` for the skeleton state.

**The numbers in the demo are the argument:** four charts mounted, `loadedCount()` is 0. After
scrolling to two of them it is 2, and re-visiting one does not reload it. Two libraries never
downloaded.

**Why this is Proxy and not Decorator:** the proxy *creates* its subject and may never create it at
all. A decorator is handed a subject that already exists — it could not skip construction even if
it wanted to.

**Real equivalents:** `React.lazy(() => import("./Chart"))` plus `<Suspense>` for the placeholder,
usually triggered by an `IntersectionObserver`. Same pattern, framework-provided.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/proxy/example2/index.ts`
