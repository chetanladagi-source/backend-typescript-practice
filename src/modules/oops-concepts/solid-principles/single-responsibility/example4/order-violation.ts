// God class for order processing, kept as the "before" picture.

export interface OrderItem {
  sku: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerPhone: string;
  items: OrderItem[];
}

// SRP violation: validation, pricing, persistence and notification are one blob.
export class OrderGod {
  private readonly placed: Order[] = [];

  public process(order: Order): boolean {
    if (order.items.length === 0) {
      console.log("[god] rejected empty order", order.id);
      return false;
    }
    for (const item of order.items) {
      if (item.quantity <= 0) {
        console.log("[god] rejected bad quantity for", item.sku);
        return false;
      }
    }

    let total: number = 0;
    for (const item of order.items) {
      total += item.price * item.quantity;
    }
    if (total > 5000) {
      total = total * 0.95;
    }

    this.placed.push(order);
    console.log("[god] saved order", order.id, "total:", total.toFixed(2));
    console.log("[god] sent SMS to", order.customerPhone);
    return true;
  }
}
