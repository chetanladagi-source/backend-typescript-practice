# Example 2 — Tree walking with generators

**Problem:** a focus trap needs every focusable element inside a modal, in document order, skipping
disabled ones. Written by hand that is an explicit stack, a `next()` method, and a visited pointer.

**Pattern:** `function* walk()` with `yield*` for the recursion. Four lines, and the result is a
real iterator you can `for...of`, spread, or stop early.

**Generators compose.** `focusable()` consumes `walk()` and filters it. Neither builds an
intermediate array — the filter pulls one node at a time from the walk. This is the same shape as
chaining `.filter().map()`, except nothing is materialised in between.

**The `visited` counter is the whole lesson.** Look at the last two lines of output:

- Breaking out of the `for...of` after the first match visits **4** nodes. The generator is
  suspended at its `yield` and simply never resumed.
- Spreading into an array first and taking `[0]` visits all **16**, because spread drains the
  generator before the indexing happens.

Same result, and on a tree this small the same wall-clock time — but on a ten-thousand node tree
that is the difference between instant and janky. Laziness is the reason to reach for a generator.

**Where you have already used this:** React's own reconciler walks the fibre tree this way, and
`document.createTreeWalker` is the browser's version of the same idea.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/iterator/example2/index.ts`
