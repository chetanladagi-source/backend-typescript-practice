// State — Example 1: the order lifecycle.
// Each state class only implements what it actually permits.

export interface OrderState {
  readonly name: string;
  pay(order: Order): void;
  ship(order: Order): void;
  cancel(order: Order): void;
}

// Shared default: reject everything, and let each state override what it allows.
abstract class BaseState implements OrderState {
  public abstract readonly name: string;

  public pay(_order: Order): void {
    this.reject("pay");
  }
  public ship(_order: Order): void {
    this.reject("ship");
  }
  public cancel(_order: Order): void {
    this.reject("cancel");
  }

  protected reject(action: string): void {
    console.log(`  cannot ${action} an order that is ${this.name}`);
  }
}

class Pending extends BaseState {
  public readonly name: string = "pending";

  public pay(order: Order): void {
    console.log("  payment captured");
    order.transitionTo(new Paid());
  }

  public cancel(order: Order): void {
    console.log("  order cancelled before payment");
    order.transitionTo(new Cancelled());
  }
}

class Paid extends BaseState {
  public readonly name: string = "paid";

  public ship(order: Order): void {
    console.log("  handed to courier");
    order.transitionTo(new Shipped());
  }

  public cancel(order: Order): void {
    console.log("  cancelled, refund issued");
    order.transitionTo(new Cancelled());
  }
}

class Shipped extends BaseState {
  public readonly name: string = "shipped";

  // Once shipped, cancelling is a return, not a cancellation — so it is rejected here.
}

class Cancelled extends BaseState {
  public readonly name: string = "cancelled";
}

// Context
export class Order {
  private state: OrderState = new Pending();

  constructor(public readonly id: string) {}

  public transitionTo(state: OrderState): void {
    console.log(`  [${this.id}] ${this.state.name} -> ${state.name}`);
    this.state = state;
  }

  public status(): string {
    return this.state.name;
  }

  // The context delegates; it contains no status conditionals at all.
  public pay(): void {
    this.state.pay(this);
  }
  public ship(): void {
    this.state.ship(this);
  }
  public cancel(): void {
    this.state.cancel(this);
  }
}

// ---- Demo ----

const happy: Order = new Order("ORD-1");
console.log("happy path:");
happy.pay();
happy.ship();
happy.cancel(); // rejected: already shipped
console.log("final:", happy.status());

console.log("illegal transition:");
const bad: Order = new Order("ORD-2");
bad.ship(); // rejected: not paid yet
console.log("final:", bad.status());

console.log("cancellation after payment:");
const refunded: Order = new Order("ORD-3");
refunded.pay();
refunded.cancel();
refunded.pay(); // rejected: cancelled
console.log("final:", refunded.status());
