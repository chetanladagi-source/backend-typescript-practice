// Visitor — Example 2: operations over cart line items.
// Tax rules, invoice rendering and shipping weight are three separate concerns
// that should not all live on the item classes.

export interface ItemVisitor<T> {
  visitPhysical(item: PhysicalItem): T;
  visitDigital(item: DigitalItem): T;
  visitService(item: ServiceItem): T;
}

export interface LineItem {
  accept<T>(visitor: ItemVisitor<T>): T;
}

class PhysicalItem implements LineItem {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly weightKg: number,
  ) {}
  public accept<T>(visitor: ItemVisitor<T>): T {
    return visitor.visitPhysical(this);
  }
}

class DigitalItem implements LineItem {
  constructor(
    public readonly name: string,
    public readonly price: number,
    public readonly sizeMb: number,
  ) {}
  public accept<T>(visitor: ItemVisitor<T>): T {
    return visitor.visitDigital(this);
  }
}

class ServiceItem implements LineItem {
  constructor(
    public readonly name: string,
    public readonly hourlyRate: number,
    public readonly hours: number,
  ) {}
  public accept<T>(visitor: ItemVisitor<T>): T {
    return visitor.visitService(this);
  }
}

// --- Visitor 1: tax, which differs by item type ---
class TaxVisitor implements ItemVisitor<number> {
  public visitPhysical(item: PhysicalItem): number {
    return Math.round(item.price * 0.18); // 18% GST
  }
  public visitDigital(item: DigitalItem): number {
    return Math.round(item.price * 0.18);
  }
  public visitService(item: ServiceItem): number {
    return Math.round(item.hourlyRate * item.hours * 0.09); // reduced rate
  }
}

// --- Visitor 2: invoice lines ---
class InvoiceVisitor implements ItemVisitor<string> {
  public visitPhysical(item: PhysicalItem): string {
    return `${item.name.padEnd(20)} Rs.${item.price} (ships ${item.weightKg}kg)`;
  }
  public visitDigital(item: DigitalItem): string {
    return `${item.name.padEnd(20)} Rs.${item.price} (download ${item.sizeMb}MB)`;
  }
  public visitService(item: ServiceItem): string {
    return `${item.name.padEnd(20)} Rs.${item.hourlyRate * item.hours} (${item.hours}h @ Rs.${item.hourlyRate})`;
  }
}

// --- Visitor 3: shipping weight. Only physical items count. ---
class ShippingWeightVisitor implements ItemVisitor<number> {
  public visitPhysical(item: PhysicalItem): number {
    return item.weightKg;
  }
  public visitDigital(): number {
    return 0;
  }
  public visitService(): number {
    return 0;
  }
}

// ---- Demo ----

const cart: LineItem[] = [
  new PhysicalItem("Mechanical keyboard", 6499, 1.2),
  new DigitalItem("Design course", 2999, 4200),
  new ServiceItem("Setup consulting", 2500, 3),
];

const invoice: InvoiceVisitor = new InvoiceVisitor();
const tax: TaxVisitor = new TaxVisitor();
const weight: ShippingWeightVisitor = new ShippingWeightVisitor();

cart.forEach((item: LineItem): void => {
  console.log(`${item.accept(invoice)}  [tax Rs.${item.accept(tax)}]`);
});

const sum = (visitor: ItemVisitor<number>): number =>
  cart.reduce((total: number, item: LineItem): number => total + item.accept(visitor), 0);

console.log("total tax     : Rs." + sum(tax));
console.log("shipping weight:", sum(weight) + "kg");
