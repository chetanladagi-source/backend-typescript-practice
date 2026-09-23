# Example 2 — Report generation with hooks

**Problem:** every report has a header, body, and footer, but some need a confidentiality banner,
some need a totals line, and most need neither.

**Pattern:** `generate()` fixes the order. `beforeBody` and `afterBody` are **empty hooks** —
extension points that cost nothing when unused.

**Why three subclasses:** `SalesReport` uses one hook, `AuditReport` uses the other plus overrides a
concrete step, and `MinimalReport` overrides nothing beyond the two required members. That last one
is the real argument for the pattern: the common case stays tiny.

**Compare with Decorator:** you could add a banner by wrapping instead. Template Method is the right
call when the variation points are *known and fixed* by the base algorithm; Decorator wins when
behaviour should compose in arbitrary combinations at runtime.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/template-method/example2/index.ts`
