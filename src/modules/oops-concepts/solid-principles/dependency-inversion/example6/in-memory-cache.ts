// Process-local implementation of `Cache`, useful in tests and single-node runs.

import { Cache } from "./cache";

export class InMemoryCache<TValue> implements Cache<TValue> {
  private readonly entries: Map<string, TValue> = new Map<string, TValue>();
  private hits: number = 0;

  public get(key: string): TValue | undefined {
    const found: TValue | undefined = this.entries.get(key);
    if (found !== undefined) {
      this.hits += 1;
    }
    return found;
  }

  public set(key: string, value: TValue): void {
    this.entries.set(key, value);
  }

  public hitCount(): number {
    return this.hits;
  }

  public size(): number {
    return this.entries.size;
  }
}
