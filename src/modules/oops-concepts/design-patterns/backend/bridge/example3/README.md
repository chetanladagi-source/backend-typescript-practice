# Example 3 — Payment kinds × gateways

**Problem:** one-time, subscription, and pre-auth are three different *workflows*. Stripe and
Razorpay are two different *implementations*. Modelling both with inheritance gives you six classes
and a seventh the day you add PayPal.

**Pattern:** `Payment` subclasses own the workflow (authorize-then-capture, charge-then-mandate,
authorize-only) and delegate the mechanics to a `Gateway`.

**Why this example is worth the extra lines:** unlike the other two, the abstraction side has real
logic. `SubscriptionPayment` makes three gateway calls in a specific order. That shows the
abstraction is not a thin pass-through — it is a genuine hierarchy that happens to delegate
plumbing.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/bridge/example3/index.ts`
