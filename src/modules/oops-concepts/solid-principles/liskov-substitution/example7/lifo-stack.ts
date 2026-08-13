// Stack implementation honouring last-in-first-out.

import { Stack } from "./stack";

export class LifoStack<T> implements Stack<T> {
  private readonly items: T[] = [];

  public push(item: T): void {
    this.items.push(item);
  }

  public pop(): T | undefined {
    return this.items.pop();
  }

  public size(): number {
    return this.items.length;
  }
}
