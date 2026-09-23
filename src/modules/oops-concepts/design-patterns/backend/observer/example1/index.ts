// Observer — Example 1: order events fan out to independent listeners.
// OrderService does not know email, inventory or analytics exist.

export interface OrderPaidEvent {
  orderId: string;
  customerId: string;
  sku: string;
  amount: number;
}

export interface OrderObserver {
  update(event: OrderPaidEvent): void;
}

// Subject
class OrderService {
  private readonly observers: OrderObserver[] = [];

  // Returning an unsubscribe function is the habit that prevents leaks.
  public subscribe(observer: OrderObserver): () => void {
    this.observers.push(observer);
    return (): void => {
      const index: number = this.observers.indexOf(observer);
      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  public markPaid(event: OrderPaidEvent): void {
    console.log(`[order] ${event.orderId} marked paid`);
    // Iterate a copy: an observer that unsubscribes during notify would
    // otherwise shift the array and cause a listener to be skipped.
    [...this.observers].forEach((o: OrderObserver): void => o.update(event));
  }

  public observerCount(): number {
    return this.observers.length;
  }
}

// Concrete observers, each with one job.

class EmailObserver implements OrderObserver {
  public update(event: OrderPaidEvent): void {
    console.log(`  [email] receipt for ${event.orderId} sent to ${event.customerId}`);
  }
}

class InventoryObserver implements OrderObserver {
  public update(event: OrderPaidEvent): void {
    console.log(`  [inventory] decrement ${event.sku}`);
  }
}

class AnalyticsObserver implements OrderObserver {
  private revenue: number = 0;

  public update(event: OrderPaidEvent): void {
    this.revenue += event.amount;
    console.log(`  [analytics] running revenue Rs.${this.revenue}`);
  }
}

// ---- Demo ----

const orders: OrderService = new OrderService();

orders.subscribe(new EmailObserver());
orders.subscribe(new InventoryObserver());
const stopAnalytics: () => void = orders.subscribe(new AnalyticsObserver());

orders.markPaid({ orderId: "ORD-1", customerId: "ada@example.com", sku: "p1", amount: 4999 });
orders.markPaid({ orderId: "ORD-2", customerId: "grace@example.com", sku: "p2", amount: 2599 });

console.log("--- analytics unsubscribes ---");
stopAnalytics();
console.log("observers remaining:", orders.observerCount());

orders.markPaid({ orderId: "ORD-3", customerId: "linus@example.com", sku: "p1", amount: 999 });
