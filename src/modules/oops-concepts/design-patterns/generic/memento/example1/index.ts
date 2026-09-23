// Memento (generic) — Example 1: save/restore a coffee order draft.

// THE MEMENTO. Opaque to the caretaker: it holds it but does not look inside.
export class OrderMemento {
  // The internal `snapshot` is passed opaquely; only CoffeeOrder can consume it.
  constructor(private readonly snapshot: Snapshot, public readonly label: string) {}

  // package-private in spirit: only the originator is meant to call this.
  public restoreInto(): Snapshot {
    return structuredClone(this.snapshot);
  }
}

interface Snapshot {
  base: string;
  size: string;
  milk?: string;
  sugars: number;
  syrups: string[];
}

// ORIGINATOR: knows how to save and restore itself.
class CoffeeOrder {
  private state: Snapshot;

  constructor(base: string, size: string) {
    this.state = { base, size, sugars: 0, syrups: [] };
  }

  public setMilk(milk: string): void {
    this.state.milk = milk;
  }

  public addSugar(count: number): void {
    this.state.sugars += count;
  }

  public addSyrup(flavour: string): void {
    this.state.syrups.push(flavour);
  }

  // Save = deep-copy current state and hand it over labelled.
  public save(label: string): OrderMemento {
    // The deep copy is the WHOLE POINT. Without it, the memento aliases the live state,
    // and every later change silently rewrites your history.
    return new OrderMemento(structuredClone(this.state), label);
  }

  // Restore = replace state with the memento's snapshot.
  public restore(memento: OrderMemento): void {
    this.state = memento.restoreInto();
  }

  public describe(): string {
    return `${this.state.size} ${this.state.base}, milk=${this.state.milk ?? "-"}, sugars=${this.state.sugars}, syrups=[${this.state.syrups.join(", ")}]`;
  }
}

// CARETAKER: keeps mementos, never peeks inside them.
class History {
  private readonly stack: OrderMemento[] = [];

  public push(memento: OrderMemento): void {
    this.stack.push(memento);
  }

  public pop(): OrderMemento | undefined {
    return this.stack.pop();
  }

  public labels(): string {
    return this.stack.map((m: OrderMemento): string => m.label).join(" < ");
  }
}

// ---- Demo ----

const order: CoffeeOrder = new CoffeeOrder("latte", "large");
const history: History = new History();

function step(label: string, change: () => void): void {
  history.push(order.save(label)); // snapshot BEFORE the change, so undo returns to the start of it
  change();
  console.log(`${label.padEnd(28)} ${order.describe()}`);
}

step("start", (): void => {
  /* no-op: capture the initial state */
});
step("add oat milk", (): void => order.setMilk("oat"));
step("add 1 sugar", (): void => order.addSugar(1));
step("add vanilla", (): void => order.addSyrup("vanilla"));
step("add caramel", (): void => order.addSyrup("caramel"));

console.log("\nhistory:", history.labels());

console.log("\ncustomer: 'undo the last two changes'");
for (let i = 0; i < 2; i++) {
  const memento: OrderMemento | undefined = history.pop();
  if (memento === undefined) {
    break;
  }
  order.restore(memento);
  console.log(`  restored to "${memento.label}" -> ${order.describe()}`);
}
