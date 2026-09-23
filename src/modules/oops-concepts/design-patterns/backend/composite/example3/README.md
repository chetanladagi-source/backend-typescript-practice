# Example 3 — Cart with nested bundles

**Problem:** a cart holds products, and bundles, and bundles that contain other bundles — each with
its own discount. Pricing that with flat loops and special cases gets ugly fast.

**Pattern:** `Product` (leaf) and `Bundle` (composite) both implement `CartItem`. A bundle's price
is its children's prices with the discount applied, so nested discounts compound naturally as the
recursion unwinds.

**Takeaway:** `checkout()` accepts a single gift card or a three-level-deep cart with identical
code. That uniformity is what you are buying.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/composite/example3/index.ts`
