# Example 2 — Visitor as a discriminated union

**Problem:** the same as example 1 — one tree, several operations — but written the way a
TypeScript codebase actually writes it. A form schema needs to be rendered, validated, and turned
into a default-values object.

**Pattern:** `Field` is a discriminated union and each operation is a function with an exhaustive
`switch` on `kind`. That is Visitor without classes: the union members are the node types, each
function is a visitor.

**`assertNever` is what makes this a real Visitor rather than a loose switch.** Add
`{ kind: "date" }` to the union and all three functions **fail to compile**, because `field` in the
`default` branch is no longer `never`. That is the pattern's "every visitor must handle every node"
rule, enforced at build time instead of by review. Without it you get a silent runtime fall-through.

**Which form should you use?**

| | Classes (example 1) | Union + switch (this one) |
| --- | --- | --- |
| Node types come from your code | either works | simpler, less ceremony |
| Nodes are plain JSON from an API | awkward — needs hydrating | natural, it already *is* data |
| Third parties add node types | possible | impossible; the union is closed |
| Completeness enforced | by the interface | by `assertNever` |

For frontend work the union form usually wins, because schemas and documents arrive as JSON and you
would otherwise spend code turning them into class instances just to call `accept()`.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/visitor/example2/index.ts`
