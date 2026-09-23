# Example 3 — Generators

**Problem:** hand-writing `next()` with explicit cursor state is verbose, and for a recursive
structure like a tree it means maintaining your own stack.

**Pattern:** `function*` generates the iterator. Three cases worth knowing:

- **Tree traversal** — `yield*` delegates to a recursive call, so in-order and pre-order walks are
  four lines each. Compare that to the manual stack you would otherwise write.
- **Chunking** — processes an iterable in batches without materialising it. Note the trailing
  `yield batch` for the final partial group, which is the bug everyone writes first.
- **Infinite sequences** — `while (true) yield` is fine because nothing is computed until
  requested. An array cannot express this at all.

**One gotcha shown at the end:** a generator is one-shot. `ids.next()` resumes where it left off
rather than restarting, and once exhausted it stays done. If you need to iterate twice, call the
generator function again.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/iterator/example3/index.ts`
