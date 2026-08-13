// Read-side persistence contract.

export interface ReadableRepository<T> {
  read(id: string): T | undefined;
  list(): T[];
}
