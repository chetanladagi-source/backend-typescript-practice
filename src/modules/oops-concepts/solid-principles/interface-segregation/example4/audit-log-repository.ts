// Append-only audit log exposed as a read-only store.

import { AuditEntry } from "./repository-violation";
import { ReadableRepository } from "./readable-repository";

export class AuditLogRepository implements ReadableRepository<AuditEntry> {
  private readonly entries: AuditEntry[] = [
    { id: "a-1", action: "user.login" },
    { id: "a-2", action: "user.logout" }
  ];

  public read(id: string): AuditEntry | undefined {
    const found: AuditEntry | undefined = this.entries.find((entry) => entry.id === id);
    console.log("[audit] read", id, "->", found?.action ?? "not found");
    return found;
  }

  public list(): AuditEntry[] {
    console.log("[audit] listing", this.entries.length, "entries");
    return [...this.entries];
  }
}
