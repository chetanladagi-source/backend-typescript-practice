# Example 2 — Job queue

**Problem:** work needs to happen later, be retried on failure, and land in a dead-letter queue if
it never succeeds. A plain function call can do none of that.

**Pattern:** each unit of work is a command object carrying its own arguments and its own
`maxAttempts`. `JobQueue` stores, runs, and retries them without knowing what any of them do.

**The insight:** this *is* how BullMQ, Sidekiq, and Celery work. Their "job" is a command object,
which is exactly why they can serialise it, ship it to another process, and retry it there.
Recognising that named connection is a strong interview answer.

**Watch the output:** the invoice job fails twice then succeeds; the resize job exhausts its two
attempts and is dead-lettered. Retry policy lives with the command, dispatch lives with the queue.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/command/example2/index.ts`
