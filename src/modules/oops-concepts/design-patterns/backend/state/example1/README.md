# Example 1 — Order lifecycle

**Problem:** `Order` had a `status` string and every method opened with the same four guard
clauses. Adding "refund pending" meant auditing all of them.

**Pattern:** one class per status. `Order` just delegates — notice it contains zero status
conditionals.

**The trick that keeps it short:** `BaseState` rejects every action by default, and each concrete
state overrides only what it permits. `Shipped` and `Cancelled` are therefore almost empty classes,
and a new state is safe-by-default — it forbids everything until you explicitly allow something.
That is the opposite of the enum approach, where a new status is *permitted* everywhere until you
remember to add a guard.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/state/example1/index.ts`
