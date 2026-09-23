# Example 1 — Vue-style reactivity with the native `Proxy`

**Problem:** when state changes, only the parts of the UI that actually *read* that state should
re-run. Doing this manually means wiring subscriptions by hand for every field.

**Pattern:** `reactive(obj)` returns a `Proxy`. The `get` trap records which key the currently
running effect read (`track`), and the `set` trap re-runs exactly those effects (`trigger`).

**This is not an analogy — it is how Vue 3 works.** Roughly 60 lines gets you the core of a
reactivity system, and "how does Vue 3 reactivity work?" is a common interview question. The
answer is "the Proxy pattern, implemented with the `Proxy` object, with `get`/`set` traps doing
dependency tracking".

**Three behaviours the demo proves:**

- Changing `firstName` re-runs only the header, not the age badge — dependencies are per-key.
- Writing the same value twice triggers nothing, because `set` compares against the previous value
  first. Skip that check and every assignment re-renders.
- Adding a **brand-new** property (`nickname`) is intercepted. Vue 2 used `Object.defineProperty`,
  which could not see new keys — that is precisely why `Vue.set` existed and why `Proxy` replaced
  it.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/proxy/example1/index.ts`
