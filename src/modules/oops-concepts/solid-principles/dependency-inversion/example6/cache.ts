// Abstraction the catalogue policy depends on.

export interface Cache<TValue> {
  get(key: string): TValue | undefined;
  set(key: string, value: TValue): void;
  hitCount(): number;
}
