// Only decides whether an order is well formed.

import { Order, OrderItem } from "./order-violation";

export class OrderValidator {
  public validate(order: Order): string[] {
    const errors: string[] = [];
    if (order.items.length === 0) {
      errors.push("order has no items");
    }
    for (const item of order.items) {
      if (item.quantity <= 0) {
        errors.push("quantity must be positive for " + item.sku);
      }
    }
    return errors;
  }

  public hasPriceableItems(items: OrderItem[]): boolean {
    return items.some((item: OrderItem) => item.price > 0);
  }
}
