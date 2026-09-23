# Example 1 — Global theme store

**Problem:** the header, sidebar, and every other component must agree on the current theme and
re-render when it changes.

**Pattern:** one `ThemeStore` with `getInstance()`, `subscribe()`, and `set()`. This is Singleton
plus Observer, which is exactly what Zustand and Redux are.

**The part worth remembering:** the second half of the demo shows the **SSR leak**. On the server,
a module is cached per *process*, so a singleton holding `userName` serves request 2 with request
1's data. The output literally prints Ada's name for the second visitor.

Global *config* (theme, feature flags) is usually safe as a singleton. Anything **user-specific**
must be request-scoped instead — React context, `AsyncLocalStorage`, or a per-request container.
Saying that unprompted is a strong signal in a frontend interview.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/singleton/example1/index.ts`
