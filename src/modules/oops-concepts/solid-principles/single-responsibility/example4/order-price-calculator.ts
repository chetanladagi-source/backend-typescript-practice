// Only computes the payable amount for an order.

import { OrderItem } from "./order-violation";

export class OrderPriceCalculator {
  public constructor(
    private readonly bulkThreshold: number,
    private readonly bulkDiscountRate: number
  ) {}

  public total(items: OrderItem[]): number {
    const gross: number = items.reduce(
      (sum: number, item: OrderItem) => sum + item.price * item.quantity,
      0
    );
    return gross > this.bulkThreshold ? gross * (1 - this.bulkDiscountRate) : gross;
  }
}
