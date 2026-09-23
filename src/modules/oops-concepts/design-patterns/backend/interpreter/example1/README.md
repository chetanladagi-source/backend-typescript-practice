# Example 1 — Arithmetic expressions

**Problem:** a formula like `(price * quantity) - discount` needs to be stored as data and
evaluated against many different inputs.

**Pattern:** one class per grammar rule. `Literal` and `Variable` are terminals; `Add`, `Subtract`,
and `Multiply` are non-terminals holding sub-expressions. `interpret(context)` recurses.

**The point the demo makes:** the tree is built once and evaluated against three different
contexts. An expression becomes a *value* you can store, pass around, and reuse — which a
hard-coded formula is not. The last block composes `withTax` out of the existing `total` tree,
showing expressions nest freely.

**Note the structure:** this is Composite with `interpret()` instead of `size()`. If you can see
that, you already understand the pattern's shape.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/interpreter/example1/index.ts`
