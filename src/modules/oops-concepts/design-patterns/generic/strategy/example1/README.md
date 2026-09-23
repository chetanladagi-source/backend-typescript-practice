# Example 1 — Payment strategies at checkout

**Problem:** checkout supports Card, UPI and Wallet. Written as `if (method === "card")` inside
`pay()`, every new method edits the same function, and the fee / decline rules for each method
leak into the cart.

**Pattern:** each method is a `PaymentStrategy` with `pay(amount)`. `Checkout` holds one and can
swap it at runtime with `setStrategy()`. The cart never names a concrete class.

**What the demo proves:**

- Same `checkout.pay(1500)` produces a card charge with a fee, then a UPI instant settlement,
  then a wallet decline — because the *object* changed, not the call site.
- Wallet carries its own balance. That state belongs on the strategy, not on Checkout, which
  is why a second `pay(500)` succeeds after the declined 1500.

**Strategy vs State:** the objects look the same. The difference is who chooses. Checkout's
caller picks the strategy and it does not change itself. A State object swaps *itself* for the
next state. Strategies do not know each other exist.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/strategy/example1/index.ts`
