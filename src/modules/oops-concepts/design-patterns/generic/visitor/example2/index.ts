// Visitor (generic) — Example 2: a coffee menu accepted by price, calorie and allergy visitors.

export interface MenuVisitor {
  drink(item: DrinkItem): void;
  food(item: FoodItem): void;
  combo(item: ComboItem): void;
}

interface Item {
  accept(visitor: MenuVisitor): void;
}

export class DrinkItem implements Item {
  constructor(public readonly name: string, public readonly price: number, public readonly kcal: number, public readonly milk: boolean) {}
  public accept(visitor: MenuVisitor): void {
    visitor.drink(this);
  }
}

export class FoodItem implements Item {
  constructor(public readonly name: string, public readonly price: number, public readonly kcal: number, public readonly nuts: boolean) {}
  public accept(visitor: MenuVisitor): void {
    visitor.food(this);
  }
}

export class ComboItem implements Item {
  constructor(public readonly name: string, public readonly parts: Item[], public readonly discount: number) {}
  public accept(visitor: MenuVisitor): void {
    visitor.combo(this);
  }
}

class PriceVisitor implements MenuVisitor {
  public total: number = 0;
  public drink(item: DrinkItem): void {
    this.total += item.price;
  }
  public food(item: FoodItem): void {
    this.total += item.price;
  }
  public combo(item: ComboItem): void {
    item.parts.forEach((p: Item): void => {
      p.accept(this);
    });
    this.total -= item.discount;
  }
}

class CalorieVisitor implements MenuVisitor {
  public kcal: number = 0;
  public drink(item: DrinkItem): void {
    this.kcal += item.kcal;
  }
  public food(item: FoodItem): void {
    this.kcal += item.kcal;
  }
  public combo(item: ComboItem): void {
    item.parts.forEach((p: Item): void => {
      p.accept(this);
    });
  }
}

class AllergyVisitor implements MenuVisitor {
  public flags: string[] = [];
  public drink(item: DrinkItem): void {
    if (item.milk) {
      this.flags.push(`${item.name}: dairy`);
    }
  }
  public food(item: FoodItem): void {
    if (item.nuts) {
      this.flags.push(`${item.name}: nuts`);
    }
  }
  public combo(item: ComboItem): void {
    item.parts.forEach((p: Item): void => {
      p.accept(this);
    });
  }
}

// ---- Demo ----

const cart: Item[] = [
  new DrinkItem("latte", 150, 180, true),
  new FoodItem("muffin", 80, 320, true),
  new ComboItem("afternoon", [new DrinkItem("americano", 120, 15, false), new FoodItem("cookie", 60, 200, false)], 20),
];

function walk(visitor: MenuVisitor): void {
  cart.forEach((item: Item): void => {
    item.accept(visitor);
  });
}

const price: PriceVisitor = new PriceVisitor();
walk(price);
console.log("total Rs." + price.total);

const cal: CalorieVisitor = new CalorieVisitor();
walk(cal);
console.log("kcal    " + cal.kcal);

const allergy: AllergyVisitor = new AllergyVisitor();
walk(allergy);
console.log("allergens:");
allergy.flags.forEach((f: string): void => {
  console.log("  " + f);
});
