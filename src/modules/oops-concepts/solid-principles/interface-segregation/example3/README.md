# Example 3 — Animal movement

**Scenario:** An `Animal` interface demands `run`, `swim` and `fly`, so every species must declare
all three modes of movement regardless of anatomy.

**Dead weight:** `fly` on `DogViolation`, which throws. Code that loops over `Animal[]` and calls
`fly` compiles happily and then blows up at runtime.

**Fix:** Split into `Runner`, `Swimmer` and `Flyer`. `Dog` implements the first two; `Duck`
implements all three. The demo builds a separate list per capability.

**Takeaway:** Capability interfaces let the type system express what an object can do, so
"cannot fly" becomes a compile-time fact instead of a runtime exception.
