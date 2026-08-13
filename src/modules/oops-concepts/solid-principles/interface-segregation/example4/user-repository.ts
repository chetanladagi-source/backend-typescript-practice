// Mutable store that legitimately supports reads, writes and batches.

import { BulkRepository } from "./bulk-repository";
import { ReadableRepository } from "./readable-repository";
import { WritableRepository } from "./writable-repository";

export interface UserRecord {
  id: string;
  email: string;
}

export class UserRepository
  implements
    ReadableRepository<UserRecord>,
    WritableRepository<UserRecord>,
    BulkRepository<UserRecord>
{
  private readonly rows: Map<string, UserRecord> = new Map<string, UserRecord>();

  public read(id: string): UserRecord | undefined {
    const found: UserRecord | undefined = this.rows.get(id);
    console.log("[users] read", id, "->", found?.email ?? "not found");
    return found;
  }

  public list(): UserRecord[] {
    return [...this.rows.values()];
  }

  public create(entity: UserRecord): void {
    this.rows.set(entity.id, entity);
    console.log("[users] created", entity.id);
  }

  public update(id: string, entity: UserRecord): void {
    this.rows.set(id, entity);
    console.log("[users] updated", id, "->", entity.email);
  }

  public delete(id: string): void {
    this.rows.delete(id);
    console.log("[users] deleted", id);
  }

  public bulkCreate(entities: UserRecord[]): void {
    for (const entity of entities) {
      this.rows.set(entity.id, entity);
    }
    console.log("[users] bulk created", entities.length, "rows");
  }

  public bulkDelete(ids: string[]): void {
    for (const id of ids) {
      this.rows.delete(id);
    }
    console.log("[users] bulk deleted", ids.length, "rows");
  }
}
