// Only stores placed orders.

import { Order } from "./order-violation";

export class OrderRepository {
  private readonly rows: Array<{ order: Order; total: number }> = [];

  public save(order: Order, total: number): void {
    this.rows.push({ order, total });
    console.log("[repository] saved order", order.id, "total:", total.toFixed(2));
  }

  public count(): number {
    return this.rows.length;
  }
}
