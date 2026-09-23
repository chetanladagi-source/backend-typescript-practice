# Example 1 — Data-table sorting

**Problem:** clicking a column header sorts the table. A `switch (column)` inside the sort handler
grows with every column, and multi-column sorting turns it into a nested mess.

**Pattern:** `type Comparator<T> = (a: T, b: T) => number`. Each column is one small function, and
a `Record<string, Comparator<Row>>` maps the clicked header to its strategy.

**The part that makes this better than a `switch`:** `descending()` and `thenBy()` are
**combinators** — strategies that take strategies and return new ones. "In-stock first, then
highest rated, then cheapest" is composed from three existing comparators without writing a new
one. A switch statement cannot compose like that.

**Two things to note:** `sortRows` copies with `[...rows]` because `sort` mutates in place, and
mutating a prop array is a classic React bug. And `byAvailability` coerces booleans with
`Number()`, since subtracting booleans is not valid TypeScript.

**Interview shortcut:** `Array.prototype.sort(compareFn)` *is* Strategy built into the language.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/strategy/example1/index.ts`
