# Example 2 — Clone a coffee recipe

**Problem:** "Duplicate this latte and add vanilla" must not change the house recipe. A shallow
copy shares `shot` and `toppings`.

**Pattern:** `clone()` rebuilds the nested `Shot` and copies the toppings array. `cloneShallow()`
is shown next to it so the bug is visible.

**Same shallow-vs-deep lesson as the employee template.** Arrays are the easy miss: `perks` there,
`toppings` here.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/prototype/example2/index.ts`
