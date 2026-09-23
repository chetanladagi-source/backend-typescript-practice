# Example 3 — The TypeScript alternative: discriminated unions

**This example deliberately does not use the Visitor pattern.** It solves the same problem — many
operations over a fixed set of types — with a discriminated union and `switch`.

**What you get for free:**

- Adding an operation is adding a function. Same benefit as Visitor, none of the `accept`/`visit`
  ceremony.
- **Exhaustiveness checking.** The `const exhaustive: never = entry` in each `default` is the trick:
  if you add a `"hardlink"` variant to `FsEntry`, every switch that does not handle it fails to
  compile. That is the same safety Visitor's interface gives you, enforced by the type system
  instead of by an interface you must remember to implement.
- Elements stay plain data — serialisable, easy to build in tests, no methods to mock.

**So when is Visitor still right?** When elements must be real classes with behaviour and
encapsulated state, when you are in a language without discriminated unions, or when visitors need
to carry state across a traversal (a symbol table during a compile pass).

**Saying "in TypeScript I'd usually reach for a discriminated union, and here's the exhaustiveness
trick" is a stronger interview answer than reciting the Visitor interface** — as long as you can
also explain double dispatch when asked.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/visitor/example3/index.ts`
