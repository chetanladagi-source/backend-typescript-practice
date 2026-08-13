// God shopping cart, kept as the "before" picture.

export interface CartItem {
  name: string;
  price: number;
  quantity: number;
}

// SRP violation: item math, discount policy and payment all live in the cart.
export class CartGod {
  private readonly items: CartItem[] = [];

  public add(item: CartItem): void {
    this.items.push(item);
  }

  public checkout(couponCode: string): boolean {
    let total: number = 0;
    for (const item of this.items) {
      total += item.price * item.quantity;
    }

    if (couponCode === "SAVE10") {
      total = total * 0.9;
    } else if (couponCode === "FLAT100" && total > 100) {
      total = total - 100;
    }

    if (total <= 0) {
      console.log("[god] nothing to charge");
      return false;
    }
    console.log("[god] charged card for", total.toFixed(2));
    return true;
  }
}
