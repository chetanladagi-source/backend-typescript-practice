// Mediator — Example 2: order workflow coordination.
// Compare with the Facade example: here the services call BACK into the mediator.

export interface WorkflowMediator {
  notify(sender: string, event: string, payload: Record<string, unknown>): void;
}

abstract class Component {
  protected mediator?: WorkflowMediator;

  public setMediator(mediator: WorkflowMediator): void {
    this.mediator = mediator;
  }
}

class Inventory extends Component {
  private stock: number = 2;

  public reserve(sku: string, qty: number): void {
    if (this.stock < qty) {
      this.mediator?.notify("inventory", "out-of-stock", { sku });
      return;
    }
    this.stock -= qty;
    console.log(`  [inventory] reserved ${qty} x ${sku}, ${this.stock} left`);
    this.mediator?.notify("inventory", "reserved", { sku, qty });
  }

  public release(sku: string, qty: number): void {
    this.stock += qty;
    console.log(`  [inventory] released ${qty} x ${sku}`);
  }
}

class Payments extends Component {
  public charge(amount: number, failOnPurpose: boolean): void {
    if (failOnPurpose) {
      console.log(`  [payment] declined Rs.${amount}`);
      this.mediator?.notify("payments", "declined", { amount });
      return;
    }
    console.log(`  [payment] captured Rs.${amount}`);
    this.mediator?.notify("payments", "captured", { amount });
  }
}

class Shipping extends Component {
  public schedule(sku: string): void {
    console.log(`  [shipping] pickup booked for ${sku}`);
    this.mediator?.notify("shipping", "scheduled", { awb: "AWB-771" });
  }
}

class Notifier extends Component {
  public tell(message: string): void {
    console.log(`  [notify] ${message}`);
  }
}

// The mediator holds the workflow rules — including what to undo when something fails.
class OrderWorkflow implements WorkflowMediator {
  constructor(
    private readonly inventory: Inventory,
    private readonly payments: Payments,
    private readonly shipping: Shipping,
    private readonly notifier: Notifier,
    private readonly order: { sku: string; qty: number; amount: number; cardWillFail: boolean },
  ) {
    [inventory, payments, shipping, notifier].forEach((c: Component): void => c.setMediator(this));
  }

  public start(): void {
    this.inventory.reserve(this.order.sku, this.order.qty);
  }

  public notify(sender: string, event: string, payload: Record<string, unknown>): void {
    const key: string = `${sender}:${event}`;
    switch (key) {
      case "inventory:reserved":
        this.payments.charge(this.order.amount, this.order.cardWillFail);
        break;
      case "inventory:out-of-stock":
        this.notifier.tell(`sorry, ${String(payload.sku)} is out of stock`);
        break;
      case "payments:captured":
        this.shipping.schedule(this.order.sku);
        break;
      case "payments:declined":
        // Compensating action: the mediator knows the reservation must be undone.
        this.inventory.release(this.order.sku, this.order.qty);
        this.notifier.tell("payment declined, your reservation was released");
        break;
      case "shipping:scheduled":
        this.notifier.tell(`on its way, track ${String(payload.awb)}`);
        break;
    }
  }
}

// ---- Demo ----

const run = (label: string, cardWillFail: boolean, qty: number): void => {
  console.log(label);
  new OrderWorkflow(new Inventory(), new Payments(), new Shipping(), new Notifier(), {
    sku: "p1",
    qty,
    amount: 4999,
    cardWillFail,
  }).start();
};

run("--- happy path ---", false, 1);
run("--- card declined ---", true, 1);
run("--- out of stock ---", false, 5);
