// Bad design: catalogue lookups cannot run without a Redis connection.

class RedisClient {
  private readonly entries: Map<string, string> = new Map<string, string>();

  public get(key: string): string | undefined {
    console.log(`[redis] GET ${key}`);
    return this.entries.get(key);
  }

  public set(key: string, value: string): void {
    console.log(`[redis] SET ${key}`);
    this.entries.set(key, value);
  }
}

export class ProductServiceViolation {
  // VIOLATION: the service opens its own Redis client, so a unit test needs a running
  // server and a single-node deployment cannot fall back to a local map.
  private readonly redis: RedisClient = new RedisClient();

  public find(sku: string): string | undefined {
    const cached: string | undefined = this.redis.get(`catalogue:${sku}`);
    if (cached !== undefined) {
      console.log("[catalogue] cache hit", sku);
      return cached;
    }
    console.log("[catalogue] cache miss, reading database for", sku);
    const name: string | undefined = sku === "sku-1" ? "Mechanical keyboard" : undefined;
    if (name !== undefined) {
      this.redis.set(`catalogue:${sku}`, name);
    }
    return name;
  }
}
