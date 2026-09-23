# Example 1 — Cloning an Employee template

**Problem:** every new hire starts from the same offer template — same contract, same benefits, same
office address. Rebuilding all that from scratch per hire is duplication, but *sharing* it is
worse: one hire edits their perks and every future hire inherits the change.

**Pattern:** the template is an ordinary `Employee`. `clone()` produces an independent copy that
callers can mutate freely.

**The demo is deliberately two versions side by side, and the contrast is the whole lesson:**

- **`clone()` rebuilds every nested object.** `ada` moves to Mysuru and gains a relocation bonus;
  the template is unchanged.
- **`cloneShallow()` uses `{ ...this }`.** `grace` moves to Chennai and *so does the template*, and
  every future clone starts life in Chennai. The final two lines prove why:
  `grace.address === template.address` is `true`.

Spread and `Object.assign` copy one level only. This bug hides in code review because the
top-level object *is* new, so `grace !== template`, and casual testing misses it.

**`structuredClone` is the modern one-liner** for the deep-copy case, but it discards the class
prototype (`instanceof Employee` becomes `false`) and throws on functions. That is why cloning
belongs *inside* the class: only the class knows how to rebuild itself correctly.

**Where Prototype earns its keep over a factory:** when the "template" is easier to describe by
example than by a construction recipe. A partly-configured object with fifteen fields is trivial to
clone; writing a factory method that produces the same object with fifteen arguments is not.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/prototype/example1/index.ts`
