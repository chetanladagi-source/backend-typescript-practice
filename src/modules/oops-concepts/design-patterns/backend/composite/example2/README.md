# Example 2 — Org chart

**Problem:** "what does Grace's org cost per month?" requires walking an arbitrary reporting tree,
and a manager is both a node *and* a person with their own salary.

**Pattern:** `Manager` is a composite whose `monthlyCost()` seeds the reduce with its own salary and
adds every report's cost. `IndividualContributor` is the leaf.

**The insight to take to an interview:** because every node implements `Employee`, *any* node is a
valid root. Sub-org reporting required zero extra code — `findByName("Grace").monthlyCost()` just
works. Adding `findByName` also shows that new recursive operations are cheap once the tree exists.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/composite/example2/index.ts`
