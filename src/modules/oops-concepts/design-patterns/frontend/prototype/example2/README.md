# Example 2 — Duplicate a canvas layer

**Problem:** duplicating a Figma-style layer means copying a whole subtree, including a `Map` of
styles and a `Date`, and the copy must be fully independent.

**Pattern:** `structuredClone()` for the deep copy, then a recursive `reassignIds` walk.

**Two things this example is really teaching:**

- **`structuredClone` vs the JSON trick.** The last two lines run
  `JSON.parse(JSON.stringify(card))` on the same object and print the damage: the `Map` becomes
  `{}` and the `Date` becomes a string. `structuredClone` (Node 17+, all modern browsers) handles
  `Map`, `Set`, `Date`, and cycles. It does *not* preserve class prototypes or functions, which is
  the one caveat to state.
- **Fresh ids are part of cloning.** A duplicated subtree with duplicated ids breaks selection,
  React `key` props, and drag-and-drop — you get two nodes the app cannot tell apart. Cloning
  identity-bearing data almost always needs an id-reassignment pass.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/prototype/example2/index.ts`
