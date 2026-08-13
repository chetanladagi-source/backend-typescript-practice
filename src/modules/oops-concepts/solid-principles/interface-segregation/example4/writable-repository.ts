// Write-side persistence contract.

export interface WritableRepository<T> {
  create(entity: T): void;
  update(id: string, entity: T): void;
  delete(id: string): void;
}
