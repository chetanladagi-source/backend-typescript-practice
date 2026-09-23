# Example 2 — Product catalogue metadata

**Problem:** 100,000 products each storing category, brand, warranty, and tax rate — when only a
few dozen distinct combinations exist across the whole catalogue.

**Pattern:** `ProductMetaFactory` pools `ProductMeta` by a composite key. Three metadata objects
back 100,000 products.

**The detail that bites people:** the cache key must include **every** intrinsic field. Key on
category alone and two brands in the same category would silently share the wrong warranty and tax
rate — a data-corruption bug, not a performance one.

**Notice the split:** `price` and `stock` are extrinsic and stay per-product, which is why the demo
checks that prices are still unique while metadata is shared.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/flyweight/example2/index.ts`
