// Facade (generic) — Example 1: one call hides four services.

interface Order {
  id: string;
  sku: string;
  amount: number;
  email: string;
  address: string;
}

// Four independent subsystems. Each is fine in isolation; combining them requires care.
class InventoryService {
  private readonly stock: Map<string, number> = new Map<string, number>([["book-1", 3], ["mug-1", 0]]);

  public reserve(sku: string): void {
    const left: number = this.stock.get(sku) ?? 0;
    if (left <= 0) {
      throw new Error(`out of stock: ${sku}`);
    }
    this.stock.set(sku, left - 1);
    console.log(`    [Inventory] reserved 1x ${sku} (${left - 1} left)`);
  }

  public release(sku: string): void {
    this.stock.set(sku, (this.stock.get(sku) ?? 0) + 1);
    console.log(`    [Inventory] released 1x ${sku}`);
  }
}

class PaymentService {
  public charge(amount: number, orderId: string): string {
    if (amount > 100000) {
      throw new Error("payment declined");
    }
    const txn: string = `txn_${orderId}`;
    console.log(`    [Payment] charged Rs.${amount} — ${txn}`);
    return txn;
  }
}

class ShippingService {
  public schedule(orderId: string, address: string): string {
    const tracking: string = `TRK_${orderId}`;
    console.log(`    [Shipping] scheduled to ${address} — ${tracking}`);
    return tracking;
  }
}

class EmailService {
  public sendConfirmation(email: string, orderId: string, tracking: string): void {
    console.log(`    [Email] confirmation to ${email} (order ${orderId}, tracking ${tracking})`);
  }
}

// THE FACADE. The rest of the app calls placeOrder() and nothing else.
export class CheckoutFacade {
  constructor(
    private readonly inventory: InventoryService,
    private readonly payments: PaymentService,
    private readonly shipping: ShippingService,
    private readonly email: EmailService,
  ) {}

  public placeOrder(order: Order): { success: boolean; tracking?: string; error?: string } {
    console.log(`  placeOrder ${order.id}`);
    this.inventory.reserve(order.sku); // may throw
    try {
      this.payments.charge(order.amount, order.id); // may throw
      const tracking: string = this.shipping.schedule(order.id, order.address);
      this.email.sendConfirmation(order.email, order.id, tracking);
      return { success: true, tracking };
    } catch (err) {
      // The compensating action lives HERE, in the facade. No caller has to remember it.
      this.inventory.release(order.sku);
      return { success: false, error: (err as Error).message };
    }
  }
}

// ---- Demo ----

const checkout: CheckoutFacade = new CheckoutFacade(
  new InventoryService(),
  new PaymentService(),
  new ShippingService(),
  new EmailService(),
);

// The caller sees ONE method. Behind it, four services do their thing in the right order.
console.log("--- happy path ---");
console.log("result:", checkout.placeOrder({
  id: "ORD-1",
  sku: "book-1",
  amount: 500,
  email: "ada@example.com",
  address: "Bengaluru",
}));

console.log("\n--- out of stock ---");
try {
  checkout.placeOrder({ id: "ORD-2", sku: "mug-1", amount: 300, email: "ada@example.com", address: "Bengaluru" });
} catch (err) {
  console.log("failed:", (err as Error).message);
}

console.log("\n--- payment declined, inventory RELEASED ---");
console.log("result:", checkout.placeOrder({
  id: "ORD-3",
  sku: "book-1",
  amount: 200000, // above the limit
  email: "grace@example.com",
  address: "Mysuru",
}));
