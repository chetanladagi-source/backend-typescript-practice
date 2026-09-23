# Example 2 — Shared coffee blends

**Problem:** 10,000 cups should not each carry their own `{ name, origin, roast }` copy. The blend
is identical for every house coffee.

**Pattern:** `BlendRegistry` hands out three frozen `BeanBlend` flyweights. Ticket number and size
stay extrinsic on each cup.

**Same split as vehicle types in the parking lot.** Intrinsic = blend. Extrinsic = this cup's
ticket and size.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/flyweight/example2/index.ts`
