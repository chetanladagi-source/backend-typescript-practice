# Example 1 — Place order

**Problem:** the checkout controller was calling inventory, payment, shipping, and notifications in
a specific order, with a refund on failure. That sequence got copy-pasted into the mobile API and
the admin panel, and the three copies drifted.

**Pattern:** `OrderFacade.placeOrder(...)` is the single entry point. Callers pass data and get a
boolean.

**The detail that matters:** the compensating refund lives in the facade. Sequencing *and* failure
handling are exactly the knowledge a facade exists to hold — leave them at the call site and every
caller has to remember them.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/facade/example1/index.ts`
