# Example 1 — CheckoutFacade

**Problem:** "place an order" needs to reserve inventory, charge the card, schedule shipping, and
send a confirmation email — in that order, with rollback on failure. Written in every controller
that sells anything, that recipe is copy-pasted, and the *nth* copy inevitably forgets one of the
steps.

**Pattern:** one `CheckoutFacade.placeOrder(order)`. The four subsystems still exist; the facade
just orchestrates them so nobody upstream has to.

**The compensation logic is the part interviewers listen for.** The demo's last block spells it
out: payment fails, so the facade *releases* the inventory it had reserved. If that unwind lived in
the caller, the *nth* controller would forget it and the shop would slowly lose stock to declined
orders. Facade is the natural home for cross-service invariants.

**Facade vs Adapter — the exam question:**

| | Facade | Adapter |
| --- | --- | --- |
| Purpose | simpler interface over a complicated subsystem | make an existing object satisfy a specific interface |
| Cardinality | one facade, many services behind | one-to-one wrapper |
| Reason to add | reduce coupling and hide orchestration | integrate a third party you cannot change |

**A facade does not forbid direct access.** A power user (an admin console, a background job) can
still talk to `InventoryService` directly if it has a good reason. Facade is a *convenience layer*,
not an access gate — for that you want Proxy.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/facade/example1/index.ts`
