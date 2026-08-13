// Read-only implementation that never advertises add().

import { ReadableList } from "./readable-list";

export class FrozenList<T> implements ReadableList<T> {
  private readonly items: ReadonlyArray<T>;

  public constructor(seed: ReadonlyArray<T>) {
    this.items = [...seed];
  }

  public size(): number {
    return this.items.length;
  }

  public toArray(): T[] {
    return [...this.items];
  }
}
