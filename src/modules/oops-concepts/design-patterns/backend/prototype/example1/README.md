# Example 1 — Config templates (shallow vs deep)

**Problem:** every environment needs the same service config with two fields changed.

**Pattern:** a `clone()` method on the config. Callers copy the base and tweak.

**The lesson:** the demo runs a correct deep `clone()` *and* a `shallowClone()` back to back. After
the shallow one, mutating the copy's `retry.attempts` silently corrupts the original, because both
objects point at the same nested `retry`. If an interviewer asks one follow-up about Prototype,
this is it.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/prototype/example1/index.ts`
