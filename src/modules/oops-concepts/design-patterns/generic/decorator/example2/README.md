# Example 2 — Stackable payment fees

**Problem:** a charge can pick up GST, a convenience fee and an FX markup in any combination.
Subclassing (`PlanWithGstAndFx`) explodes.

**Pattern:** each fee is a `Charge` that wraps a `Charge`. Same two-hat trick as milk/sugar on
coffee, applied to money.

**The extra lesson:** decorator **order changes the total** when fees are percentages. The demo
prints FX-then-GST vs GST-then-FX. Interviewers ask this. The outermost decorator runs last in
this wrapping (it applies its % to the already-decorated inner total).

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/decorator/example2/index.ts`
