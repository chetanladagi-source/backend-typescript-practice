# Example 1 — Shared cell styles in a large table

**Problem:** a 12,500-row table gives every cell its own style object. That is 50,000 objects
describing about four distinct visual treatments.

**Pattern:** `CellStyleFactory` pools by a composite key. The demo prints 50,000 cells backed by
**4** style objects.

**Two details:**

- `Object.freeze(this)` in the constructor. The style is shared by 12,500 cells, so a single
  mutation would restyle all of them at once — the demo attempts exactly that and shows the value
  is unchanged. Immutability is not optional for a flyweight.
- The pool key includes every intrinsic field. Key on `align` alone and the price and id columns
  would wrongly share a style.

**The React angle worth mentioning:** stable shared references also make `React.memo` and `useMemo`
comparisons succeed. Writing `style={{ color: "red" }}` inline creates a new object every render,
so memoisation always misses — the same idea, framed as the performance bug people actually hit.

**But be honest about scope:** for a table this size the *real* fix is virtualisation — render the
30 visible rows, not all 12,500. Flyweight is for when you genuinely must hold the objects.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/flyweight/example1/index.ts`
