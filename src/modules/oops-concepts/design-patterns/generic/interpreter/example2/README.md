# Example 2 — Parking access policy DSL

**Problem:** ops wants to change "EV under 3 hours parks free" without a deploy. The rule arrives
as a string. `eval` would run whatever they typed.

**Pattern:** the same tiny grammar as the employee search — terminals compare fields, `And`/`Or`
combine them, `parse` splits on `||` then `&&`.

**Why not `eval`:** a policy from a dashboard is untrusted input. This interpreter can only
compare stay fields to literals.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/interpreter/example2/index.ts`
