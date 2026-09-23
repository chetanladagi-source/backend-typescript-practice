// Composite (generic) — Example 2: a coffee menu where a combo is just another item.

export interface MenuItem {
  readonly name: string;
  price(): number;
  print(indent?: string): void;
}

class Drink implements MenuItem {
  constructor(public readonly name: string, private readonly amount: number) {}
  public price(): number {
    return this.amount;
  }
  public print(indent: string = ""): void {
    console.log(`${indent}- ${this.name}  Rs.${this.amount}`);
  }
}

class Combo implements MenuItem {
  private readonly items: MenuItem[] = [];

  constructor(public readonly name: string, private readonly discount: number = 0) {}

  public add(item: MenuItem): this {
    this.items.push(item);
    return this;
  }

  public price(): number {
    const raw: number = this.items.reduce((sum: number, i: MenuItem): number => sum + i.price(), 0);
    return raw - this.discount;
  }

  public print(indent: string = ""): void {
    console.log(`${indent}+ ${this.name}  Rs.${this.price()}${this.discount > 0 ? ` (save Rs.${this.discount})` : ""}`);
    this.items.forEach((i: MenuItem): void => {
      i.print(indent + "  ");
    });
  }
}

// ---- Demo ----

const breakfast: Combo = new Combo("Breakfast combo", 30)
  .add(new Drink("latte", 150))
  .add(new Drink("muffin", 80));

const office: Combo = new Combo("Office tray", 50)
  .add(breakfast) // combo inside a combo
  .add(new Drink("espresso", 100))
  .add(new Drink("espresso", 100));

office.print();
console.log("\ncart total Rs." + office.price());
