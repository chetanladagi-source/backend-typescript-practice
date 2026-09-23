# Example 1 — Duplicate a dashboard widget

**Problem:** the "Duplicate" button should give the user an independent copy they can edit freely.

**Pattern:** a `duplicate()` method that rebuilds every nested object — `config`, the nested
`thresholds`, and the `gridArea` tuple.

**`duplicateShallow` uses `{ ...this }`, and the demo shows it failing in two separate ways.**

**Bug 1 — nested objects are shared.** The spread copies `config` by *reference*. The user edits the
copy's warn threshold and the original widget silently changes too:
`original.config.thresholds === broken.config.thresholds` is `true`.

This matters more on the frontend than on the server, because the spread *did* create a new
top-level object. React sees a changed reference, re-renders, and instantly paints the corrupted
original on screen. It looks like a rendering bug, which is why teams spend hours in the React
DevTools before finding the shallow clone. Spreading one level deep is not a deep copy.

**Bug 2 — the prototype is gone.** Spread copies *own enumerable properties*, and methods live on
the prototype. So `broken instanceof DashboardWidget` is `false` and `broken.describe` is
`undefined` — the object is a plain `{}` that TypeScript has been told to call a `DashboardWidget`
by the `as` cast. It crashes the first time anything calls a method on it, often far away from the
clone. This is the strongest argument for putting cloning *inside* the class: only the class can
correctly rebuild itself.

**What about `structuredClone`?** It deep-copies, which fixes bug 1, but it also discards the
prototype and throws on functions — so it does not fix bug 2 either. See example 2 for where it
does fit.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/prototype/example1/index.ts`
