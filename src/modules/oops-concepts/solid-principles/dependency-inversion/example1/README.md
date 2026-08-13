# Example 1 — User storage

**Scenario:** `UserService` registers users and reads them back.

**Before:** the arrow pointed `UserService -> MySqlDriver`. High-level policy depended on a
low-level detail it created itself, so swapping engines meant editing the service.

**After:** both sides point at the `Database` interface. `MySqlDatabase` and `InMemoryDatabase`
implement it, and `index.ts` chooses which one the service receives.

**Takeaway:** own the contract at the policy layer and inject the detail. The moment a test can
run against an in-memory store, the inversion has paid for itself.
