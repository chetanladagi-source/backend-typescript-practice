// Only holds the items a shopper picked.

import { CartItem } from "./cart-violation";

export class ShoppingCart {
  private readonly items: CartItem[] = [];

  public add(item: CartItem): void {
    this.items.push(item);
  }

  public lines(): CartItem[] {
    return [...this.items];
  }
}
