// FIFO abstraction with ordering baked into the method names.

export interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
  size(): number;
}
