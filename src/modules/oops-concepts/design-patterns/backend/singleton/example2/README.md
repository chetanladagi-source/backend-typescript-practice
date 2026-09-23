# Example 2 — Database connection pool

**Problem:** every repository creating its own pool means N × maxConnections sockets against the
database, which is how you exhaust `max_connections` in production.

**Pattern:** one lazily created `ConnectionPool`. The shared `queryCount` proves both repositories
hit the same object.

**Extra:** `static reset()` exists purely for tests. It is the standard answer to "singletons are
untestable" — though injecting the pool is still the cleaner fix.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/singleton/example2/index.ts`
