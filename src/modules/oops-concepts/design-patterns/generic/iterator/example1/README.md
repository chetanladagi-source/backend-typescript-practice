# Example 1 — Iterating an org chart

**Problem:** every reporting feature — headcount, payroll, search — needs to walk the org tree.
Each of them re-implements the same recursive walk, and there is no way to plug the tree into
built-in features like `for...of` or spread.

**Pattern:** `OrgChart implements Iterable<Person>` and returns a generator from
`[Symbol.iterator]()`. The traversal itself is four lines because `yield*` handles the recursion.

**Implementing `Symbol.iterator` buys you the whole language.** `for...of`, spread, `Array.from`,
destructuring and `Set`/`Map` constructors all start cooperating with no additional code. This is
the single most useful thing to know about Iterator in JavaScript: it is not a pattern you *add*,
it is a protocol you *implement*.

**Two traversals, one collection.** `for...of` walks everyone; `leaves()` walks only individual
contributors. Both use the same protocol, so they compose — `leaves()` is itself defined in terms
of `for...of this`. Adding a "managers only" or "level order" traversal is one more generator, and
none of the callers change.

**Laziness is why you want a generator over building an array.** Break out of the loop early and
the remaining subtree is *never* visited. On a tree of 10,000 people that is the difference
between "find first engineer" running instantly versus building the entire array and taking `[0]`.

**Frontend cousin:** `document.createTreeWalker` and React's own reconciler walk their trees this
way, and `[...document.querySelectorAll("a")]` works precisely because `NodeList` implements the
iterator protocol.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/iterator/example1/index.ts`
