# Example 2 — SQL query builder

**Problem:** SQL clauses must appear in a fixed order (`SELECT ... FROM ... WHERE ... ORDER BY ...
LIMIT`), but callers want to add them in whatever order reads naturally.

**Pattern:** the builder accumulates clauses into separate fields and `build()` assembles them in
the correct order. The second query in the demo calls `limit()` before `where()` and still
produces valid SQL.

**Bonus:** values go into a `params` array rather than into the string, so the output is
parameterised and injection-safe. This is exactly how Knex and Prisma's query layer work.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/builder/example2/index.ts`
