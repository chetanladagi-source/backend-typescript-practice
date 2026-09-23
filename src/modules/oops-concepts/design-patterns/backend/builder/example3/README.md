# Example 3 — Email builder with a Director

**Problem:** the same ten builder calls for a "welcome email" were duplicated in three services,
and they drifted apart.

**Pattern:** `EmailBuilder` knows *how* to assemble a message; `EmailDirector` knows *which*
sequence produces a welcome email or an invoice email. Callers ask for the outcome.

**Takeaway:** the Director is the part most people forget in interviews. It is optional — note the
demo still uses the builder directly for a one-off email — but it is what stops recipes from being
copy-pasted.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/builder/example3/index.ts`
