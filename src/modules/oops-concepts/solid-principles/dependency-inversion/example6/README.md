# Example 6 — Catalogue caching

**Scenario:** `ProductService` serves products read-through: check the cache, fall back to the
database, then populate the cache.

**Before:** the arrow pointed `ProductService -> RedisClient`. Caching *strategy* and caching
*infrastructure* were one thing, so no test could run without a server.

**After:** the service depends on `Cache<Product>`. `RedisCache` talks to a server and
`InMemoryCache` keeps a local map; the read-through logic is identical for both.

**Takeaway:** a generic interface inverts the dependency without losing type safety — the policy
keeps its `Product` types while the storage medium stays swappable.
