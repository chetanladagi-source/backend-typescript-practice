# Example 1 — Cloud kit (AWS vs GCP)

**Problem:** the app uses object storage and a message queue. Swapping cloud provider should be
one line, and it must be impossible to end up with S3 storage talking to a Pub/Sub queue.

**Pattern:** `CloudFactory` declares `createStorage()` and `createQueue()`. `AwsFactory` returns the
AWS pair, `GcpFactory` the GCP pair. `processUpload` only ever sees `Storage` and `Queue`.

**Takeaway:** this is the clearest illustration of "family" — the guarantee of *consistency between
products* is what separates Abstract Factory from a couple of independent factories.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/abstract-factory/example1/index.ts`
