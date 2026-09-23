// Composite — Example 3: a shopping cart where bundles can contain bundles.

export interface CartItem {
  label: string;
  price(): number;
  render(indent?: string): void;
}

// Leaf
class Product implements CartItem {
  constructor(public readonly label: string, private readonly amount: number) {}

  public price(): number {
    return this.amount;
  }

  public render(indent: string = ""): void {
    console.log(`${indent}- ${this.label}: Rs.${this.amount}`);
  }
}

// Composite: a bundle is priced from its contents, minus a discount
class Bundle implements CartItem {
  private readonly items: CartItem[] = [];

  constructor(public readonly label: string, private readonly discountPercent: number = 0) {}

  public add(item: CartItem): this {
    this.items.push(item);
    return this;
  }

  public price(): number {
    const subtotal: number = this.items.reduce((sum: number, item: CartItem): number => sum + item.price(), 0);
    return Math.round(subtotal * (1 - this.discountPercent / 100));
  }

  public render(indent: string = ""): void {
    console.log(`${indent}+ ${this.label} (-${this.discountPercent}%): Rs.${this.price()}`);
    this.items.forEach((item: CartItem): void => item.render(`${indent}  `));
  }
}

// ---- Demo ----

// A "work from home" bundle that itself contains a nested "desk setup" bundle.
const cart: Bundle = new Bundle("Cart")
  .add(new Product("USB-C cable", 799))
  .add(
    new Bundle("Work From Home Kit", 10)
      .add(new Product("Mechanical keyboard", 6499))
      .add(new Product("Webcam", 3299))
      .add(new Bundle("Desk Setup", 5).add(new Product("Monitor arm", 4999)).add(new Product("Desk mat", 1299))),
  );

cart.render();
console.log("total payable: Rs." + cart.price());

// Checkout works the same on a bare product or the whole nested cart.
function checkout(item: CartItem): void {
  console.log(`charging Rs.${item.price()} for "${item.label}"`);
}

console.log("--- uniform treatment ---");
checkout(cart);
checkout(new Product("Gift card", 1000));
