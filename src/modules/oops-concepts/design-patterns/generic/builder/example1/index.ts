// Builder (generic) — Example 1: a fluent coffee order builder.

type Base = "espresso" | "americano" | "latte";
type Milk = "whole" | "skim" | "oat" | "almond";
type Size = "small" | "medium" | "large";

export interface Coffee {
  readonly base: Base;
  readonly size: Size;
  readonly milk?: Milk;
  readonly sugars: number;
  readonly syrup?: string;
  readonly extraShot: boolean;
  price: number;
  describe(): string;
}

export class CoffeeBuilder {
  // Required parts arrive in the constructor — the compiler will not let you skip them.
  // Optional parts default and are set through the chainable methods.
  private size: Size = "medium";
  private milk?: Milk;
  private sugars: number = 0;
  private syrup?: string;
  private extraShot: boolean = false;

  constructor(private readonly base: Base) {}

  public withSize(size: Size): this {
    this.size = size;
    return this; // returning `this` is what makes the chain work
  }

  public withMilk(milk: Milk): this {
    this.milk = milk;
    return this;
  }

  public withSugars(count: number): this {
    if (count < 0 || count > 5) {
      throw new Error(`sugars must be 0..5, got ${count}`);
    }
    this.sugars = count;
    return this;
  }

  public withSyrup(name: string): this {
    this.syrup = name;
    return this;
  }

  public withExtraShot(): this {
    this.extraShot = true;
    return this;
  }

  public build(): Coffee {
    // Cross-field rules live in build(), where all values are known at once.
    if (this.base === "americano" && this.milk !== undefined) {
      throw new Error("americano is not served with milk");
    }
    const price: number = priceOf(this.base, this.size, this.milk, this.syrup, this.extraShot);
    const parts: (readonly [string, unknown])[] = [
      ["base", this.base],
      ["size", this.size],
      ["milk", this.milk ?? "-"],
      ["sugars", this.sugars],
      ["syrup", this.syrup ?? "-"],
      ["extra shot", this.extraShot],
    ];
    return {
      base: this.base,
      size: this.size,
      milk: this.milk,
      sugars: this.sugars,
      syrup: this.syrup,
      extraShot: this.extraShot,
      price,
      describe: (): string => `${parts.map(([k, v]): string => `${k}=${v}`).join(", ")}  price=Rs.${price}`,
    };
  }
}

function priceOf(base: Base, size: Size, milk: Milk | undefined, syrup: string | undefined, extraShot: boolean): number {
  const basePrice: number = { espresso: 100, americano: 120, latte: 150 }[base];
  const sizeMultiplier: number = { small: 1, medium: 1.2, large: 1.5 }[size];
  const milkPrice: number = milk === "oat" || milk === "almond" ? 30 : 0;
  const syrupPrice: number = syrup === undefined ? 0 : 25;
  const shotPrice: number = extraShot ? 40 : 0;
  return Math.round(basePrice * sizeMultiplier + milkPrice + syrupPrice + shotPrice);
}

// ---- Demo ----

const simple: Coffee = new CoffeeBuilder("espresso").build();
console.log("plain espresso:", simple.describe());

const fancy: Coffee = new CoffeeBuilder("latte")
  .withSize("large")
  .withMilk("oat")
  .withSyrup("vanilla")
  .withSugars(1)
  .withExtraShot()
  .build();
console.log("customer order:", fancy.describe());

// The invariant is enforced at build time, not by a comment on the constructor.
try {
  new CoffeeBuilder("americano").withMilk("whole").build();
} catch (err) {
  console.log("invalid combo rejected:", (err as Error).message);
}
