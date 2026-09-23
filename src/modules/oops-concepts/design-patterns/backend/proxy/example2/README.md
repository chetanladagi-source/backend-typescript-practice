# Example 2 — Protection proxy

**Problem:** `deleteUser` must be admin-only, but scattering role checks through the service mixes
authorisation with business logic and makes the service hard to reuse in contexts with different
rules.

**Pattern:** `ProtectedAdminService` implements `AdminService`, holds a session, and checks roles
before delegating. `RealAdminService` stays permission-free and trivially testable.

**Takeaway:** each caller gets their own proxy with their own session, but all proxies wrap the
*same* subject — which is why the final line shows the admin's deletion is visible to the viewer.
Audit logging naturally belongs here too, since the proxy is the one layer that knows *who* is
calling.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/proxy/example2/index.ts`
