// Decorator — Example 2: caching and metrics around a repository.
// The service layer keeps depending on ProductRepository and never learns about either.

export interface ProductRepository {
  findById(id: string): string | undefined;
}

class SqlProductRepository implements ProductRepository {
  private readonly rows: Map<string, string> = new Map<string, string>([
    ["p1", "Mechanical keyboard"],
    ["p2", "27-inch monitor"],
  ]);

  public findById(id: string): string | undefined {
    console.log(`  [sql] SELECT * FROM products WHERE id = '${id}'`);
    return this.rows.get(id);
  }
}

class CachedProductRepository implements ProductRepository {
  private readonly cache: Map<string, string | undefined> = new Map<string, string | undefined>();

  constructor(private readonly inner: ProductRepository) {}

  public findById(id: string): string | undefined {
    if (this.cache.has(id)) {
      console.log(`  [cache] hit for ${id}`);
      return this.cache.get(id);
    }
    const value: string | undefined = this.inner.findById(id);
    this.cache.set(id, value); // negative caching too: `undefined` is a real answer
    return value;
  }
}

class MeasuredProductRepository implements ProductRepository {
  public callCount: number = 0;

  constructor(private readonly inner: ProductRepository) {}

  public findById(id: string): string | undefined {
    this.callCount++;
    const start: number = Date.now();
    const value: string | undefined = this.inner.findById(id);
    console.log(`  [metrics] findById took ${Date.now() - start}ms (call #${this.callCount})`);
    return value;
  }
}

// ---- Demo ----

const metrics: MeasuredProductRepository = new MeasuredProductRepository(
  new CachedProductRepository(new SqlProductRepository()),
);

console.log("p1 (cold):", metrics.findById("p1"));
console.log("p1 (warm):", metrics.findById("p1"));
console.log("p9 (missing, cached as undefined):", metrics.findById("p9"));
console.log("p9 again:", metrics.findById("p9"));

// Metrics is outermost, so it counted all four calls even though SQL only ran twice.
console.log("total repository calls seen by metrics:", metrics.callCount);
