// Mutable implementation that fully honours the write contract.

import { WritableList } from "./writable-list";

export class ArrayList<T> implements WritableList<T> {
  private readonly items: T[] = [];

  public add(item: T): void {
    this.items.push(item);
  }

  public size(): number {
    return this.items.length;
  }

  public toArray(): T[] {
    return [...this.items];
  }
}
