# Example 2 — Parking-spot iterators

**Problem:** callers should not index into the lot's array. They want "every spot", "free spots"
and "free EV spots", and they want to stop after the first match.

**Pattern:** `Garage` implements `Symbol.iterator`. `free()` and `evOnly()` are extra generators
that compose. Early `break` never walks the rest.

**Same protocol as the org-chart walk**, over a flat list. Two independent traversals over one
collection — the textbook Iterator claim.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/iterator/example2/index.ts`
