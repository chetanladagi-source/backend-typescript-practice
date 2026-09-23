// Template Method (frontend) — Example 1: a list-view base class.
// Every list screen needs the same loading/error/empty/data skeleton.
// The base owns the skeleton; subclasses supply only what differs.

export abstract class ListView<T> {
  // THE TEMPLATE METHOD. Final in spirit: subclasses must not override it.
  public render(): string {
    const lines: string[] = [`## ${this.title()}`];

    let items: T[];
    try {
      items = this.load();
    } catch (err) {
      return [...lines, this.renderError((err as Error).message)].join("\n");
    }

    if (items.length === 0) {
      return [...lines, this.renderEmpty()].join("\n");
    }

    // Optional hook: base provides a no-op default.
    const toolbar: string | undefined = this.renderToolbar(items.length);
    if (toolbar !== undefined) {
      lines.push(toolbar);
    }

    items.forEach((item: T): void => {
      lines.push(`  - ${this.renderItem(item)}`);
    });
    return lines.join("\n");
  }

  // Required steps.
  protected abstract title(): string;
  protected abstract load(): T[];
  protected abstract renderItem(item: T): string;

  // Hooks with sensible defaults — override only if you care.
  protected renderEmpty(): string {
    return "  (nothing here yet)";
  }
  protected renderError(message: string): string {
    return `  ! could not load: ${message}`;
  }
  protected renderToolbar(_count: number): string | undefined {
    return undefined;
  }
}

interface Order {
  id: string;
  total: number;
}

class OrderListView extends ListView<Order> {
  constructor(private readonly orders: Order[]) {
    super();
  }
  protected title(): string {
    return "Your orders";
  }
  protected load(): Order[] {
    return this.orders;
  }
  protected renderItem(order: Order): string {
    return `${order.id} — Rs.${order.total}`;
  }
  // This screen wants a summary bar; the others do not.
  protected override renderToolbar(count: number): string {
    const total: number = this.orders.reduce((sum: number, o: Order): number => sum + o.total, 0);
    return `  [${count} orders · Rs.${total} total]`;
  }
  // A tailored empty state, because "no orders" deserves a call to action.
  protected override renderEmpty(): string {
    return "  You have not ordered yet. [Browse products]";
  }
}

class NotificationListView extends ListView<string> {
  constructor(private readonly fail: boolean) {
    super();
  }
  protected title(): string {
    return "Notifications";
  }
  protected load(): string[] {
    if (this.fail) {
      throw new Error("network timeout");
    }
    return ["Your order shipped", "Price drop on a saved item"];
  }
  protected renderItem(text: string): string {
    return text;
  }
}

// ---- Demo ----

console.log(new OrderListView([{ id: "o-1", total: 1200 }, { id: "o-2", total: 450 }]).render());
console.log();
console.log(new OrderListView([]).render());
console.log();
console.log(new NotificationListView(false).render());
console.log();
console.log(new NotificationListView(true).render());
