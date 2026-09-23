# Example 1 — Undo/redo for record edits

**Problem:** the admin panel needs undo. A direct `user.set("role", "admin")` throws away the
information needed to reverse it.

**Pattern:** each edit becomes a `SetFieldCommand` that captures the previous value in `execute()`,
so `undo()` can restore it. `EditHistory` keeps two stacks.

**Two details that come up:**

- Undo is implemented by *snapshotting the old value*, not by computing an inverse. That is
  Command and Memento used together, which is the usual real-world combination.
- Running a new command clears the redo stack. Every editor behaves this way, and forgetting it is
  the classic bug — you would otherwise redo into a branch of history that no longer exists.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/command/example1/index.ts`
