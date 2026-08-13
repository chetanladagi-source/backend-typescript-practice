// High-level policy: knows the `Database` contract and nothing about MySQL.

import { Database, UserRecord } from "./database";

export class UserService {
  constructor(private readonly db: Database) {}

  public register(id: string, email: string): UserRecord {
    const record: UserRecord = { id, email };
    this.db.insert(record);
    return record;
  }

  public describe(id: string): string {
    const found: UserRecord | undefined = this.db.findById(id);
    return found === undefined ? `${id}: not found` : `${id}: ${found.email}`;
  }

  public storedCount(): number {
    return this.db.count();
  }
}
