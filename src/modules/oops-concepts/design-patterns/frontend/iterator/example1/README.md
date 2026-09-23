# Example 1 — Carousel with two traversals

**Problem:** the slide array is not the thing you want to expose. Some slides are hidden, so indices
into the raw array are wrong, and the arrows need wrap-around while an accessibility summary needs a
plain finite list.

**Pattern:** `Carousel` implements `Symbol.iterator`, and separately hands out a `CarouselCursor`.
Same collection, **two independent traversals**, neither of which leaks the array.

**Implementing `Symbol.iterator` buys you the whole language.** `for...of`, spread,
`Array.from`, and destructuring all start working with no extra code — the demo's first two lines
prove it. This is the single most useful thing to know about Iterator in JavaScript: it is not a
pattern you *add*, it is a protocol you *implement*.

**Two details that come up:**

- **Multiple cursors are independent.** Each call to `cycle()` returns a fresh object with its own
  position, so two carousels on a page do not fight. Position lives on the iterator, never on the
  collection — that is the rule the pattern exists to enforce.
- **`(this.position - 1 + length) % length`.** The `+ length` is not decoration: in JavaScript
  `-1 % 3` is `-1`, not `2`, so the naive version crashes on the first backwards click. Worth
  knowing by heart.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/iterator/example1/index.ts`
