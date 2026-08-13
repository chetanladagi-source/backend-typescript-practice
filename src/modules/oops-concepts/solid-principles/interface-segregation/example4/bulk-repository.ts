// Optional batch contract for stores that support it.

export interface BulkRepository<T> {
  bulkCreate(entities: T[]): void;
  bulkDelete(ids: string[]): void;
}
