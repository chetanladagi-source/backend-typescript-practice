// Test-friendly implementation of `Database` with no engine behind it.

import { Database, UserRecord } from "./database";

export class InMemoryDatabase implements Database {
  private readonly rows: Map<string, UserRecord> = new Map<string, UserRecord>();

  public insert(record: UserRecord): void {
    console.log("[memory] stored", record.id);
    this.rows.set(record.id, record);
  }

  public findById(id: string): UserRecord | undefined {
    return this.rows.get(id);
  }

  public count(): number {
    return this.rows.size;
  }
}
