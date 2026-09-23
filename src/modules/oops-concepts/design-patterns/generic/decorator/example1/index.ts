// Decorator (generic) — Example 1: the textbook coffee shop.

export interface Beverage {
  describe(): string;
  cost(): number;
}

// The concrete "base" object.
class Espresso implements Beverage {
  public describe(): string {
    return "espresso";
  }
  public cost(): number {
    return 100;
  }
}

class HouseBlend implements Beverage {
  public describe(): string {
    return "house blend";
  }
  public cost(): number {
    return 80;
  }
}

// The BASE DECORATOR. It IS a Beverage and it HAS a Beverage — the two-hat trick
// that makes decorators stackable.
abstract class BeverageDecorator implements Beverage {
  constructor(protected readonly inner: Beverage) {}
  public abstract describe(): string;
  public abstract cost(): number;
}

class Milk extends BeverageDecorator {
  public describe(): string {
    return `${this.inner.describe()} + milk`;
  }
  public cost(): number {
    return this.inner.cost() + 20;
  }
}

class Sugar extends BeverageDecorator {
  constructor(inner: Beverage, private readonly count: number) {
    super(inner);
  }
  public describe(): string {
    return `${this.inner.describe()} + sugar x${this.count}`;
  }
  public cost(): number {
    return this.inner.cost() + this.count * 5;
  }
}

class Syrup extends BeverageDecorator {
  constructor(inner: Beverage, private readonly flavour: string) {
    super(inner);
  }
  public describe(): string {
    return `${this.inner.describe()} + ${this.flavour} syrup`;
  }
  public cost(): number {
    return this.inner.cost() + 25;
  }
}

// ---- Demo ----

function print(drink: Beverage): void {
  console.log(`  ${drink.describe().padEnd(48)} Rs.${drink.cost()}`);
}

// A plain drink.
print(new Espresso());

// Stack decorators to build any combination. Order does not affect the price here,
// but it does affect the describe() string, which is exactly what the outermost decorator wants.
print(new Milk(new Espresso()));
print(new Sugar(new Milk(new Espresso()), 2));
print(new Syrup(new Sugar(new Milk(new HouseBlend()), 1), "vanilla"));

// The point: adding "caramel" is ONE new class and ZERO edits to the existing ones.
// A subclass explosion (EspressoWithMilkAndSugarAndCaramel...) is what this pattern replaces.
