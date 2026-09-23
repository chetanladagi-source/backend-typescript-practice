# Example 2 — Repository with caching and metrics

**Problem:** you want a cache in front of the database and timing around every query, without
touching `SqlProductRepository` or the services that use it.

**Pattern:** two decorators implementing `ProductRepository`. Wiring happens once at the
composition root.

**Two details worth noticing:** the cache uses `has()` rather than a truthiness check so that
`undefined` (a genuine "not found") is cached instead of causing a re-query every time. And because
metrics is the outer layer, it counts four calls while SQL only ran twice — measure at the layer
you actually care about.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/decorator/example2/index.ts`
