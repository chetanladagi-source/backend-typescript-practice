# Example 2 — Headless select

**Problem:** keyboard navigation, wrap-around highlighting, open/close state, and ARIA attributes
are genuinely hard to get right. Reimplementing all of it for the dropdown, the radio group, and
the chip picker means three chances to ship a broken keyboard experience.

**Pattern:** `HeadlessSelect` owns the behaviour and holds a `SelectView` that owns the markup. The
demo drives all three presentations through the *identical* key sequence and each renders correctly.

**This is what "headless UI" means.** Radix, Headless UI, and TanStack Table are this pattern at
library scale: `useSelect()` hands you state and event handlers, you supply the markup. Naming that
connection is a strong interview answer, because it shows Bridge is not academic — it is the
dominant architecture in modern component libraries.

**Why not Strategy?** Same mechanism, but here both sides are real hierarchies meant to grow
independently, and the split is an up-front architectural decision rather than a swappable
algorithm. That distinction is the honest answer if an interviewer pushes.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/bridge/example2/index.ts`
