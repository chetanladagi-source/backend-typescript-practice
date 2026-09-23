# Example 1 — Order events

**Problem:** `markPaid()` called the mailer, inventory, and analytics directly, so it depended on
all three and grew a line every time a new side effect was needed.

**Pattern:** `OrderService` is the subject; each side effect is an observer. Adding a fraud check
is now a `subscribe()` call in the wiring code, with no edit to `OrderService`.

**Two implementation details worth copying:**

- `subscribe()` returns an unsubscribe function. Without one, observers live as long as the subject
  and you have a memory leak.
- `markPaid` iterates `[...this.observers]`, a copy. If an observer unsubscribes *during* the loop,
  mutating the live array would shift the indices and silently skip the next listener.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/observer/example1/index.ts`
