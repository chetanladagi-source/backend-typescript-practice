// Redis implementation of `Cache`; the wire protocol is simulated with logs.

import { Cache } from "./cache";

export class RedisCache<TValue> implements Cache<TValue> {
  private readonly entries: Map<string, TValue> = new Map<string, TValue>();
  private hits: number = 0;

  constructor(private readonly namespace: string) {}

  public get(key: string): TValue | undefined {
    const namespaced: string = `${this.namespace}:${key}`;
    console.log(`[redis] GET ${namespaced}`);
    const found: TValue | undefined = this.entries.get(namespaced);
    if (found !== undefined) {
      this.hits += 1;
    }
    return found;
  }

  public set(key: string, value: TValue): void {
    const namespaced: string = `${this.namespace}:${key}`;
    console.log(`[redis] SET ${namespaced}`);
    this.entries.set(namespaced, value);
  }

  public hitCount(): number {
    return this.hits;
  }
}
