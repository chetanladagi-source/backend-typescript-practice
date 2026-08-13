// Runnable entry point contrasting the Redis-bound catalogue with the injected one.

import { InMemoryCache } from "./in-memory-cache";
import { Product, ProductService } from "./product-service";
import { ProductServiceViolation } from "./product-service-violation";
import { RedisCache } from "./redis-cache";

console.log("=== Violation ===");
const hardWired: ProductServiceViolation = new ProductServiceViolation();
hardWired.find("sku-1");
console.log("[violation] second lookup:", hardWired.find("sku-1"));

console.log("=== DIP applied ===");
const production: ProductService = new ProductService(new RedisCache<Product>("catalogue"));
production.find("sku-1");
production.find("sku-1");
console.log("[production] database reads:", production.databaseReads());

const localCache: InMemoryCache<Product> = new InMemoryCache<Product>();
const underTest: ProductService = new ProductService(localCache);
underTest.find("sku-2");
underTest.find("sku-2");
console.log("[test] cached keys:", localCache.size(), "hits:", localCache.hitCount());
console.log("[test] missing sku:", underTest.find("sku-404"));
