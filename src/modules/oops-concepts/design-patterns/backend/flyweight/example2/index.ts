// Flyweight — Example 2: product catalogue metadata.
// 100k products, but only a handful of (category, brand, warranty) combinations.

export class ProductMeta {
  constructor(
    public readonly category: string,
    public readonly brand: string,
    public readonly warrantyMonths: number,
    public readonly taxPercent: number,
  ) {}

  public describe(): string {
    return `${this.brand} ${this.category} (${this.warrantyMonths}mo, ${this.taxPercent}% GST)`;
  }
}

class ProductMetaFactory {
  private readonly pool: Map<string, ProductMeta> = new Map<string, ProductMeta>();
  public creations: number = 0;

  public get(category: string, brand: string, warrantyMonths: number, taxPercent: number): ProductMeta {
    // The cache key must cover every intrinsic field, or you will hand back the wrong object.
    const key: string = `${category}|${brand}|${warrantyMonths}|${taxPercent}`;
    const cached: ProductMeta | undefined = this.pool.get(key);
    if (cached !== undefined) {
      return cached;
    }
    this.creations++;
    const meta: ProductMeta = new ProductMeta(category, brand, warrantyMonths, taxPercent);
    this.pool.set(key, meta);
    return meta;
  }

  public poolSize(): number {
    return this.pool.size;
  }
}

// Extrinsic state lives here: sku, price, and stock are unique per product.
class Product {
  constructor(
    public readonly sku: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly meta: ProductMeta,
  ) {}

  public priceWithTax(): number {
    return Math.round(this.price * (1 + this.meta.taxPercent / 100));
  }
}

// ---- Demo ----

const factory: ProductMetaFactory = new ProductMetaFactory();
const variants: [string, string, number, number][] = [
  ["Keyboard", "Keychron", 12, 18],
  ["Monitor", "Dell", 36, 18],
  ["Cable", "Anker", 6, 12],
];

const catalogue: Product[] = Array.from({ length: 100_000 }, (_: unknown, i: number): Product => {
  const [category, brand, warranty, tax] = variants[i % variants.length];
  return new Product(`sku-${i}`, 999 + (i % 50) * 100, i % 7, factory.get(category, brand, warranty, tax));
});

console.log("products:", catalogue.length);
console.log("ProductMeta objects actually created:", factory.creations);
console.log("pool size:", factory.poolSize());

console.log("sample:", catalogue[0].sku, catalogue[0].meta.describe(), "=> Rs." + catalogue[0].priceWithTax());
console.log("metadata shared?", catalogue[0].meta === catalogue[3].meta); // true
console.log("prices still unique?", catalogue[0].price !== catalogue[1].price); // true
