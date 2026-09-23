// Observer (generic) — Example 2: a coffee-order board notifying pickup surfaces.

interface OrderEvent {
  ticket: number;
  drink: string;
  status: "ready" | "cancelled";
}

export interface OrderObserver {
  readonly name: string;
  onOrderUpdate(event: OrderEvent): void;
}

export class OrderBoard {
  private readonly observers: Set<OrderObserver> = new Set<OrderObserver>();
  private ticket: number = 0;

  public subscribe(observer: OrderObserver): () => void {
    this.observers.add(observer);
    return (): void => {
      this.observers.delete(observer);
    };
  }

  public ready(drink: string): void {
    this.ticket += 1;
    this.notify({ ticket: this.ticket, drink, status: "ready" });
  }

  public cancel(drink: string): void {
    this.ticket += 1;
    this.notify({ ticket: this.ticket, drink, status: "cancelled" });
  }

  private notify(event: OrderEvent): void {
    [...this.observers].forEach((observer: OrderObserver): void => {
      try {
        observer.onOrderUpdate(event);
      } catch (err) {
        console.log(`  [board] ${observer.name} threw: ${(err as Error).message}`);
      }
    });
  }
}

class PickupDisplay implements OrderObserver {
  public readonly name: string = "PickupDisplay";
  public onOrderUpdate(event: OrderEvent): void {
    if (event.status === "ready") {
      console.log(`    <Display> #${event.ticket} ${event.drink} — please collect`);
    }
  }
}

class CustomerApp implements OrderObserver {
  public readonly name: string = "CustomerApp";
  public onOrderUpdate(event: OrderEvent): void {
    console.log(`    <App> push: your ${event.drink} is ${event.status}`);
  }
}

class LoyaltyTracker implements OrderObserver {
  public readonly name: string = "LoyaltyTracker";
  public onOrderUpdate(): void {
    throw new Error("points service down");
  }
}

// ---- Demo ----

const board: OrderBoard = new OrderBoard();
const stopDisplay: () => void = board.subscribe(new PickupDisplay());
board.subscribe(new CustomerApp());
board.subscribe(new LoyaltyTracker());

console.log("latte ready:");
board.ready("latte");

console.log("\nespresso cancelled:");
board.cancel("espresso");

console.log("\ndisplay unplugged:");
stopDisplay();
board.ready("americano");
