# Example 2 — Coffee brew recipes

**Problem:** every drink heats water, grinds, extracts, then finishes. Copying that sequence per
drink is how one recipe forgets to heat the water.

**Pattern:** `BrewRecipe.brew()` is the template. `grind` and `extract` are required; `finish` is
a hook (latte overrides it to steam milk).

**Same hook-method vocabulary as employee onboarding.** The sequence is owned by the base class so
a new drink cannot skip a step by accident.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/template-method/example2/index.ts`
