// Abstraction owned by the high-level policy, not by any storage engine.

export interface UserRecord {
  id: string;
  email: string;
}

export interface Database {
  insert(record: UserRecord): void;
  findById(id: string): UserRecord | undefined;
  count(): number;
}
