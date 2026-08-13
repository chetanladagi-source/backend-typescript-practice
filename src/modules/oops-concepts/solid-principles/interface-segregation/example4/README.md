# Example 4 — Repositories

**Scenario:** One `Repository<T>` interface covers `create`, `read`, `update`, `delete` plus bulk
operations, so an append-only audit-log store has to satisfy the whole CRUD surface.

**Dead weight:** `create`, `update`, `delete`, `bulkCreate` and `bulkDelete` on
`AuditLogRepositoryViolation` — five throwing stubs guarding an immutable table.

**Fix:** Split into `ReadableRepository`, `WritableRepository` and `BulkRepository`.
`AuditLogRepository` implements only the read contract; `UserRepository` implements all three.

**Takeaway:** Segregated persistence contracts make "read-only" enforceable by the compiler, and
services that only query can accept the narrow read interface.
