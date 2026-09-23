# Example 3 — Expensive report definition

**Problem:** building a report definition means introspecting the warehouse schema. Three report
variants should not mean three round-trips.

**Pattern:** build once via `buildFromWarehouse()`, then `clone()` for each variant. Watch the
output — the `[warehouse]` line prints exactly once for three reports.

**Why `structuredClone`:** `filters` is a `Map`. The usual `JSON.parse(JSON.stringify(x))` trick
would silently turn it into `{}`. `structuredClone` (Node 17+) handles `Map`, `Set`, `Date`, and
cycles, though it does not preserve class prototypes — which is why the class fields are copied
individually rather than cloning `this` wholesale.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/prototype/example3/index.ts`
