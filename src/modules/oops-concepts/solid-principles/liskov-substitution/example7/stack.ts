// LIFO abstraction kept separate from Queue.

export interface Stack<T> {
  push(item: T): void;
  pop(): T | undefined;
  size(): number;
}
