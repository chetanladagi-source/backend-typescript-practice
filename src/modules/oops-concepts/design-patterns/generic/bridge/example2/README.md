# Example 2 — Drink × brewer

**Problem:** espresso / filter / batch each need to run on a machine, a kettle or a press.
`EspressoOnMachine`, `EspressoOnKettle`, ... is nine classes and a tenth when AeroPress arrives.

**Pattern:** `Drink` holds a `Brewer`. The reference is the bridge. Growth is M+N.

**Same split as payment kind × gateway.** Abstraction = what you are serving. Implementation =
how it is extracted.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/bridge/example2/index.ts`
