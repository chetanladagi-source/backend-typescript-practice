// Fat persistence contract that every store must satisfy.

export interface AuditEntry {
  id: string;
  action: string;
}

export interface Repository<T> {
  create(entity: T): void;
  read(id: string): T | undefined;
  update(id: string, entity: T): void;
  delete(id: string): void;
  bulkCreate(entities: T[]): void;
  bulkDelete(ids: string[]): void;
}

// ISP violation: an append-only audit log must implement four mutating methods it forbids.
export class AuditLogRepositoryViolation implements Repository<AuditEntry> {
  private readonly entries: AuditEntry[] = [
    { id: "a-1", action: "user.login" },
    { id: "a-2", action: "user.logout" }
  ];

  public read(id: string): AuditEntry | undefined {
    const found: AuditEntry | undefined = this.entries.find((entry) => entry.id === id);
    console.log("[violation-audit] read", id, "->", found?.action ?? "not found");
    return found;
  }

  public create(entity: AuditEntry): void {
    throw new Error(`Audit log is read-only, cannot create ${entity.id}`);
  }

  public update(id: string, entity: AuditEntry): void {
    throw new Error(`Audit log is immutable, cannot update ${id} to ${entity.action}`);
  }

  public delete(id: string): void {
    throw new Error(`Audit log is immutable, cannot delete ${id}`);
  }

  public bulkCreate(entities: AuditEntry[]): void {
    throw new Error(`Audit log is read-only, cannot insert ${entities.length} rows`);
  }

  public bulkDelete(ids: string[]): void {
    throw new Error(`Audit log is immutable, cannot delete ${ids.length} rows`);
  }
}
