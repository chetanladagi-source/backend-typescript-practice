// Write side of the abstraction: only mutable implementations declare it.

import { ReadableList } from "./readable-list";

export interface WritableList<T> extends ReadableList<T> {
  add(item: T): void;
}
