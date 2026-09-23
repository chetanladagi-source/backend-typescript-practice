# Example 1 — Employee saved-search language

**Problem:** HR wants a search box that accepts `role == "manager" && salary > 100000`. Query
strings come from users, so `eval` is out. Every future filter is a code change, and there is no
way for a user to save one for later.

**Pattern:** each grammar rule is a class — `Comparison` (terminal), `And` and `Or` (non-terminals).
`parse()` builds the tree from a string. `evaluate(employee)` walks it. Adding an operator is one
new class plus one line in the parser.

**Why not `new Function("return " + query)`?** That was the one-liner shortcut. It also
lets any query the app receives read `document.cookie`, call `fetch("/api/admin/deleteAll")`, or
mine cryptocurrency in the tab. The interpreter can *only* do what its node classes allow — the
grammar **is** the sandbox. This is the single most important interview point about Interpreter.

**Precedence with zero effort.** `parse()` splits on `||` first, then `&&`. Because the OR pass
runs on the top-level split, the AND pieces end up nested inside — so `&&` binds tighter than `||`
without a precedence table. Every hand-rolled expression parser uses this same recursive-split
trick.

**`describe()` is worth having in every node.** It lets you print the parsed tree back — the demo's
`Q: (years >= 8 OR salary > 200000)` line comes from this. That gives you a rule preview in the UI
and a "why did this match?" debug line in support tickets.

**The honest limit:** this parser is naive. It would mis-handle `&&` inside a quoted string, has no
parentheses, and no `NOT`. Past a few node types, reach for a real parser generator like Chevrotain
or PEG.js. Knowing when the pattern stops paying is as valuable as knowing the pattern.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/interpreter/example1/index.ts`
