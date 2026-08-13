// High-level policy: read-through catalogue lookups over any `Cache`.

import { Cache } from "./cache";

export interface Product {
  sku: string;
  name: string;
  priceInCents: number;
}

const catalogue: readonly Product[] = [
  { sku: "sku-1", name: "Mechanical keyboard", priceInCents: 8_900 },
  { sku: "sku-2", name: "Standing desk", priceInCents: 42_000 }
];

export class ProductService {
  private dbReads: number = 0;

  constructor(private readonly cache: Cache<Product>) {}

  public find(sku: string): Product | undefined {
    const cached: Product | undefined = this.cache.get(sku);
    if (cached !== undefined) {
      console.log("[catalogue] cache hit", sku);
      return cached;
    }
    this.dbReads += 1;
    console.log("[catalogue] cache miss, reading database for", sku);
    const found: Product | undefined = catalogue.find((product: Product) => product.sku === sku);
    if (found !== undefined) {
      this.cache.set(sku, found);
    }
    return found;
  }

  public databaseReads(): number {
    return this.dbReads;
  }
}
