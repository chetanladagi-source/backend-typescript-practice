# Example 3 — Retry backoff as functions

**Problem:** four backoff algorithms. Four classes each with one `calculate()` method would be pure
ceremony.

**Pattern:** `type BackoffStrategy = (attempt: number) => number`. When a strategy interface has
one method, it *is* a function type in TypeScript. Each factory (`fixed`, `linear`, ...) is a
closure capturing its configuration, and `Record<string, BackoffStrategy>` replaces the factory
class.

**Say this in an interview:** "in TypeScript I'd use function types rather than classes for
single-method strategies". It shows you apply patterns idiomatically instead of transliterating
Java.

**Domain bonus:** `exponentialWithJitter` is what you actually want in production — without jitter,
every client that failed at the same moment retries at the same moment and re-creates the outage.
The `random` parameter is injected so the demo output stays stable.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/strategy/example3/index.ts`
