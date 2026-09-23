# Example 2 — Conditional field visibility

**Problem:** a form builder lets a non-developer type *"show the GSTIN field when
`country == "IN" && isBusiness == true`"*. The rule lands in a database. The frontend has to
evaluate it.

**Pattern:** `Comparison` is the terminal expression, `And` and `Or` are non-terminals holding
children, and `parse()` builds the tree by splitting on `||` first and then `&&` — splitting in that
order is what gives `&&` the tighter binding, with no precedence table needed.

**`explain()` is the part most implementations forget.** Every node can describe itself, so the tree
prints back as readable text. That gives you a rule preview in the admin panel and a "why is this
field hidden?" debug line for support — both for one extra method per node, because the tree is
already there. A regex-based or `eval`-based implementation cannot do this at all.

**Note that `Comparison` handles a missing field gracefully:** `context[this.field]` is `undefined`,
`==` is false, the field stays hidden. A rule referencing a field that was deleted degrades to
"hidden" rather than throwing mid-render.

**The security argument, again, is the headline.** `new Function("return " + rule)` would be ten
lines shorter and would let anyone with database access run arbitrary JavaScript in every user's
browser. The interpreter can only compare fields to literals — the grammar *is* the sandbox.

**The honest limit:** this parser is naive. It would mis-handle `&&` inside a quoted string, and it
has no parentheses. Past a few node types, reach for a real parser generator. Knowing when the
pattern stops paying is as valuable as knowing the pattern.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/interpreter/example2/index.ts`
