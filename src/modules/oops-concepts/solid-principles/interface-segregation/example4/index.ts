// Runnable entry point contrasting the fat Repository contract with read/write/bulk contracts.

import { AuditEntry, AuditLogRepositoryViolation, Repository } from "./repository-violation";
import { AuditLogRepository } from "./audit-log-repository";
import { BulkRepository } from "./bulk-repository";
import { ReadableRepository } from "./readable-repository";
import { UserRecord, UserRepository } from "./user-repository";
import { WritableRepository } from "./writable-repository";

console.log("=== Violation ===");
const fatAudit: Repository<AuditEntry> = new AuditLogRepositoryViolation();
fatAudit.read("a-1");
try {
  fatAudit.create({ id: "a-3", action: "user.delete" });
} catch (error) {
  console.log("[violation] create failed:", (error as Error).message);
}
try {
  fatAudit.bulkDelete(["a-1", "a-2"]);
} catch (error) {
  console.log("[violation] bulkDelete failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const auditLog: ReadableRepository<AuditEntry> = new AuditLogRepository();
auditLog.read("a-2");
auditLog.list();

const users: UserRepository = new UserRepository();
const userWrites: WritableRepository<UserRecord> = users;
const userBulk: BulkRepository<UserRecord> = users;
userWrites.create({ id: "u-1", email: "ada@example.com" });
userBulk.bulkCreate([
  { id: "u-2", email: "grace@example.com" },
  { id: "u-3", email: "alan@example.com" }
]);
userWrites.delete("u-3");
console.log("[users] remaining:", users.list().length);
