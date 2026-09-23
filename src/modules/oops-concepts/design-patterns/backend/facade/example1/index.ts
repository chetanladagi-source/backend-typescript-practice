// Facade — Example 1: one placeOrder() call over four subsystems.

// --- The subsystem: each class is useful on its own and knows nothing about the facade ---

class InventoryService {
  private readonly stock: Map<string, number> = new Map<string, number>([["p1", 4]]);

  public isAvailable(sku: string, qty: number): boolean {
    return (this.stock.get(sku) ?? 0) >= qty;
  }

  public reserve(sku: string, qty: number): void {
    this.stock.set(sku, (this.stock.get(sku) ?? 0) - qty);
    console.log(`  [inventory] reserved ${qty} x ${sku}`);
  }
}

class PaymentService {
  public charge(customerId: string, amount: number): string {
    console.log(`  [payment] charged ${customerId} Rs.${amount}`);
    return `pay_${Date.now()}`;
  }

  public refund(paymentId: string): void {
    console.log(`  [payment] refunded ${paymentId}`);
  }
}

class ShippingService {
  public schedule(sku: string, address: string): string {
    console.log(`  [shipping] pickup booked for ${sku} to ${address}`);
    return "AWB-55512";
  }
}

class NotificationService {
  public orderConfirmed(customerId: string, awb: string): void {
    console.log(`  [notify] emailed ${customerId}: your order ships, track ${awb}`);
  }
}

// --- The facade: knows the order of operations, and how to undo a half-done order ---
export class OrderFacade {
  constructor(
    private readonly inventory: InventoryService = new InventoryService(),
    private readonly payment: PaymentService = new PaymentService(),
    private readonly shipping: ShippingService = new ShippingService(),
    private readonly notifications: NotificationService = new NotificationService(),
  ) {}

  public placeOrder(customerId: string, sku: string, qty: number, amount: number, address: string): boolean {
    if (!this.inventory.isAvailable(sku, qty)) {
      console.log("  [order] rejected: out of stock");
      return false;
    }

    this.inventory.reserve(sku, qty);
    const paymentId: string = this.payment.charge(customerId, amount);

    try {
      const awb: string = this.shipping.schedule(sku, address);
      this.notifications.orderConfirmed(customerId, awb);
      return true;
    } catch {
      // Compensating action lives in the facade, not in every controller.
      this.payment.refund(paymentId);
      return false;
    }
  }
}

// ---- Demo ----

const orders: OrderFacade = new OrderFacade();

console.log("order 1:");
console.log("=>", orders.placeOrder("c1", "p1", 2, 4999, "Bengaluru"));

console.log("order 2:");
console.log("=>", orders.placeOrder("c2", "p1", 3, 7499, "Pune")); // only 2 left
