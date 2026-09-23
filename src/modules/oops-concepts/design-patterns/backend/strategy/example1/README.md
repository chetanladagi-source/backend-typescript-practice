# Example 1 — Checkout discounts

**Problem:** `calculateTotal` had grown into a chain of `if (discountType === ...)` branches, and
every new campaign meant editing and re-testing the whole function.

**Pattern:** each rule is a `DiscountStrategy`. `Cart` holds one and delegates.

**Two things this buys you:** each rule is unit-testable in isolation, and strategies can be
*parameterised* — `new FlatDiscount(500, 3000)` and `new FlatDiscount(500, 9000)` are the same
class configured differently, which a hard-coded `if` branch cannot do without another flag.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/strategy/example1/index.ts`
