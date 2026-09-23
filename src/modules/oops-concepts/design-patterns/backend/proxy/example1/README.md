# Example 1 — Virtual proxy (lazy loading)

**Problem:** `RealReportEngine` loads a year of data in its constructor. Most requests never
generate a report, so that cost is wasted on every boot.

**Pattern:** `LazyReportEngine` implements the same interface but holds `real?: RealReportEngine`
and constructs it inside `generate()` on first call.

**Why this is Proxy and not Decorator:** the proxy *creates* its subject and may never create it
at all. A decorator is handed a subject it must already have. If you only remember one
distinguishing detail between the two, make it this one.

**Real-world version:** ORM lazy relations (`user.posts` issuing a query on first access) are
exactly this — and the source of N+1 query problems.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/proxy/example1/index.ts`
