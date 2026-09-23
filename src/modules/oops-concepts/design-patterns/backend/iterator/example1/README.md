# Example 1 — Playlist with three traversal orders

**Problem:** forward, reverse, and shuffle playback over the same list. Putting all three in the
collection means three index fields and three sets of state tangled together.

**Pattern:** each traversal is its own iterator object holding its own cursor. Three playbacks can
run simultaneously without interfering, which a single `currentIndex` on `Playlist` could never do.

**The part to actually take away:** the file shows the textbook `hasNext()`/`next()` interface
*and* `[Symbol.iterator]()` side by side. The second one is the same pattern in JavaScript's native
vocabulary — implement it and your class immediately works with `for...of`, spread, and
`Array.from`. Showing you know the GoF form maps onto a language protocol you already use is worth
more than reciting the interface.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/iterator/example1/index.ts`
