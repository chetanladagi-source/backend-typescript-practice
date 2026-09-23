// Interpreter — Example 3: a search filter DSL, parsed from a string.
// Strictly the pattern is only the evaluation half; the parser is what makes it usable.

export interface Product {
  name: string;
  price: number;
  category: string;
  inStock: boolean;
}

export interface Filter {
  matches(product: Product): boolean;
}

// --- Terminals ---

class FieldComparison implements Filter {
  constructor(
    private readonly field: keyof Product,
    private readonly op: string,
    private readonly value: string,
  ) {}

  public matches(product: Product): boolean {
    const actual: string | number | boolean = product[this.field];
    switch (this.op) {
      case ">":
        return Number(actual) > Number(this.value);
      case "<":
        return Number(actual) < Number(this.value);
      case ":":
        return String(actual).toLowerCase() === this.value.toLowerCase();
      default:
        throw new Error(`unsupported operator "${this.op}"`);
    }
  }
}

// --- Non-terminal ---

class AllOf implements Filter {
  constructor(private readonly filters: Filter[]) {}

  public matches(product: Product): boolean {
    return this.filters.every((f: Filter): boolean => f.matches(product));
  }
}

// --- The parser: turns "price>1000 category:audio" into a Filter tree ---

const validFields: Set<string> = new Set<string>(["name", "price", "category", "inStock"]);

function parse(query: string): Filter {
  const terms: string[] = query.trim().split(/\s+/).filter((t: string): boolean => t !== "");

  const filters: Filter[] = terms.map((term: string): Filter => {
    const match: RegExpMatchArray | null = term.match(/^(\w+)([:<>])(.+)$/);
    if (match === null) {
      throw new Error(`cannot parse term "${term}"`);
    }
    const [, field, op, value] = match;
    if (!validFields.has(field)) {
      throw new Error(`unknown field "${field}"`);
    }
    return new FieldComparison(field as keyof Product, op, value);
  });

  return new AllOf(filters);
}

// ---- Demo ----

const catalogue: Product[] = [
  { name: "Mechanical keyboard", price: 6499, category: "peripherals", inStock: true },
  { name: "Studio headphones", price: 12999, category: "audio", inStock: true },
  { name: "USB microphone", price: 4999, category: "audio", inStock: false },
  { name: "Desk mat", price: 1299, category: "peripherals", inStock: true },
];

const run = (query: string): void => {
  try {
    const filter: Filter = parse(query);
    const hits: string[] = catalogue.filter((p: Product): boolean => filter.matches(p)).map((p: Product): string => p.name);
    console.log(`"${query}"\n  => ${hits.length > 0 ? hits.join(", ") : "(no matches)"}`);
  } catch (err) {
    console.log(`"${query}"\n  => error: ${(err as Error).message}`);
  }
};

run("category:audio");
run("category:audio inStock:true");
run("price>5000");
run("price>1000 price<7000 category:peripherals");
run("colour:red");
run("price!!9");
