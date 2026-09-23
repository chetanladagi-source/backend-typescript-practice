# Example 1 — Expression AST

**Problem:** an AST needs to be evaluated, printed, type-checked, optimised, and measured. Putting
five methods on every node class means every new operation edits every node.

**Pattern:** nodes expose only `accept(visitor)`. `Evaluator`, `Printer`, and `NodeCounter` are
three separate classes, and adding a fourth operation touches no node.

**The double dispatch, concretely:** `ast.accept(printer)` runs `MultiplyNode.accept`, which calls
`printer.visitMultiply(this)`. Which code runs depends on both the node type *and* the visitor
type, resolved in two hops because JavaScript cannot overload on runtime types. If you get asked
"what is double dispatch?", trace those two calls.

**Why this domain:** a compiler AST is the textbook fit — node types are fixed by the grammar while
passes multiply. That is precisely the trade-off Visitor optimises for, and it is why
`typescript-eslint` and Babel are built this way.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/visitor/example1/index.ts`
