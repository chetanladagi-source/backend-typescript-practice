// LSP violation: Stack extends Queue and reverses the removal order.

export class Queue {
  protected readonly items: string[] = [];

  public put(item: string): void {
    this.items.push(item);
  }

  public take(): string | undefined {
    return this.items.shift();
  }

  public size(): number {
    return this.items.length;
  }
}

// Violation: Queue.take() promises first-in-first-out; Stack returns the newest item instead.
export class Stack extends Queue {
  public override take(): string | undefined {
    return this.items.pop();
  }
}

export function drainInArrivalOrder(queue: Queue): string[] {
  queue.put("ticket-1");
  queue.put("ticket-2");
  queue.put("ticket-3");

  const drained: string[] = [];
  while (queue.size() > 0) {
    const item: string | undefined = queue.take();
    if (item !== undefined) {
      drained.push(item);
    }
  }

  if (drained[0] !== "ticket-1") {
    throw new Error(`Broken contract: expected ticket-1 first but drained ${drained.join(", ")}`);
  }
  return drained;
}
