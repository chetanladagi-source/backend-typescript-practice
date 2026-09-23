// Strategy — Example 1: checkout discounts.
// Each pricing rule is a class, so adding one never touches the cart.

export interface DiscountStrategy {
  readonly label: string;
  apply(subtotal: number): number;
}

class NoDiscount implements DiscountStrategy {
  public readonly label: string = "no discount";
  public apply(subtotal: number): number {
    return subtotal;
  }
}

class PercentageDiscount implements DiscountStrategy {
  public readonly label: string;

  constructor(private readonly percent: number) {
    this.label = `${percent}% off`;
  }

  public apply(subtotal: number): number {
    return Math.round(subtotal * (1 - this.percent / 100));
  }
}

class FlatDiscount implements DiscountStrategy {
  public readonly label: string;

  constructor(private readonly amount: number, private readonly minSpend: number) {
    this.label = `Rs.${amount} off over Rs.${minSpend}`;
  }

  public apply(subtotal: number): number {
    return subtotal >= this.minSpend ? subtotal - this.amount : subtotal;
  }
}

class CappedPercentageDiscount implements DiscountStrategy {
  public readonly label: string;

  constructor(private readonly percent: number, private readonly maxOff: number) {
    this.label = `${percent}% off, max Rs.${maxOff}`;
  }

  public apply(subtotal: number): number {
    return subtotal - Math.min(Math.round((subtotal * this.percent) / 100), this.maxOff);
  }
}

// Context: knows nothing about any concrete rule.
class Cart {
  private strategy: DiscountStrategy = new NoDiscount();

  constructor(private readonly subtotal: number) {}

  public useDiscount(strategy: DiscountStrategy): this {
    this.strategy = strategy;
    return this;
  }

  public total(): number {
    return this.strategy.apply(this.subtotal);
  }

  public summary(): string {
    return `subtotal Rs.${this.subtotal} | ${this.strategy.label} | pay Rs.${this.total()}`;
  }
}

// ---- Demo ----

const strategies: DiscountStrategy[] = [
  new NoDiscount(),
  new PercentageDiscount(20),
  new FlatDiscount(500, 3000),
  new FlatDiscount(500, 9000), // min spend not met
  new CappedPercentageDiscount(50, 1000),
];

strategies.forEach((s: DiscountStrategy): void => {
  console.log(new Cart(4000).useDiscount(s).summary());
});

// Swapping mid-flight is the point: same cart, different rule.
const cart: Cart = new Cart(10_000);
console.log(cart.useDiscount(new PercentageDiscount(10)).summary());
console.log(cart.useDiscount(new CappedPercentageDiscount(30, 1500)).summary());
