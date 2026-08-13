// Production implementation of `Database`; SQL traffic is simulated with logs.

import { Database, UserRecord } from "./database";

export class MySqlDatabase implements Database {
  private readonly rows: Map<string, UserRecord> = new Map<string, UserRecord>();

  public insert(record: UserRecord): void {
    console.log(`[mysql] INSERT INTO users VALUES ('${record.id}', '${record.email}')`);
    this.rows.set(record.id, record);
  }

  public findById(id: string): UserRecord | undefined {
    console.log(`[mysql] SELECT * FROM users WHERE id = '${id}'`);
    return this.rows.get(id);
  }

  public count(): number {
    return this.rows.size;
  }
}
