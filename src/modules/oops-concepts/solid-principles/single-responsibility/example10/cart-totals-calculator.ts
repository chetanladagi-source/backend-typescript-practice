// Only sums the cart lines.

import { CartItem } from "./cart-violation";

export class CartTotalsCalculator {
  public subtotal(items: CartItem[]): number {
    return items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
  }
}
