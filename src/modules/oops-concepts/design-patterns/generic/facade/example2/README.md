# Example 2 — Hire facade

**Problem:** hiring someone means a background check, a payroll record, a badge and a welcome
email, in that order, with a rollback if a later step fails. Every caller remembering that
sequence is how you get an employee in payroll with no badge.

**Pattern:** `HireFacade.hire(name, salary)` is the only method HR callers use. Compensating
actions live in the facade.

**Same idea as `placeOrder()`**, applied to people instead of SKUs. A failed background check
never creates a payroll id — the facade owns that ordering.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/facade/example2/index.ts`
