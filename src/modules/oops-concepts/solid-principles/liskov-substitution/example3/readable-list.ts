// Read side of the abstraction: safe for every list implementation.

export interface ReadableList<T> {
  size(): number;
  toArray(): T[];
}
