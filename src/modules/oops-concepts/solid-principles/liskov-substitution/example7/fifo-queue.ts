// Queue implementation honouring first-in-first-out.

import { Queue } from "./queue";

export class FifoQueue<T> implements Queue<T> {
  private readonly items: T[] = [];

  public enqueue(item: T): void {
    this.items.push(item);
  }

  public dequeue(): T | undefined {
    return this.items.shift();
  }

  public size(): number {
    return this.items.length;
  }
}
