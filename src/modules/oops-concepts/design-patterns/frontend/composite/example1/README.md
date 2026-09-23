# Example 1 — Mini virtual DOM

**Problem:** rendering a UI tree means walking an arbitrary mix of text and elements. Branching on
"is this a text node or an element?" at every step is exactly the code Composite removes.

**Pattern:** `TextNode` (leaf) and `ElementNode` (composite) both implement `VNode`.
`ElementNode.render()` calls `child.render()` without asking what kind of child it has.

**Why this is the example to remember:** React, Vue, and the DOM are all built this way. The `h()`
helper at the bottom is deliberately named after the hyperscript function every framework exposes —
`h("div", {}, ...)` is `React.createElement`. When an interviewer asks about Composite, "React's
element tree" is a better answer than "a file system", because you can explain *why* it must be a
composite: `render()` has to be uniform for recursion and reconciliation to work at all.

**Note the free operations:** `countNodes()` and `findByTag()` needed no new infrastructure. Once
the recursive structure exists, new tree-wide operations are a few lines each.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/composite/example1/index.ts`
