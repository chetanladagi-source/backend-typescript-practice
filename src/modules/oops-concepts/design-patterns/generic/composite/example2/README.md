# Example 2 — Coffee combos

**Problem:** a breakfast combo is a latte plus a muffin minus Rs.30. An office tray is that combo
plus two espressos. Pricing code that special-cases "is this a combo?" breaks the moment combos
nest.

**Pattern:** `Drink` (leaf) and `Combo` (composite) both implement `MenuItem`. `price()` and
`print()` recurse. A combo of combos is free.

**Same Composite as the org chart**, with a discount on the composite — a small extra that still
fits the pattern because the discount lives on the combo, not on the caller.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/composite/example2/index.ts`
