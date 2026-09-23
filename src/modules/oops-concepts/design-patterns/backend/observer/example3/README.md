# Example 3 — Upload progress and self-removing listeners

**Problem:** some listeners care about the whole stream (a progress bar) and some care about a
single moment (a "done" notification). Leaving the one-shot ones attached is how listener lists
grow unbounded.

**Pattern:** `onProgress` returns an unsubscribe function, and the one-shot listeners call their
own unsubscribe from inside the callback — which is why each is declared as a `const` the closure
can reference.

**The subtle part:** `run()` notifies over `[...this.listeners]`, a copy of the `Set`. A listener
removing itself mid-notification mutates the live collection, and iterating that directly is how
you get skipped listeners. The count at the end (3 before, 1 after) shows the cleanup worked.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/observer/example3/index.ts`
