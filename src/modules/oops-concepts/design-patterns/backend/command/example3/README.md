# Example 3 — Deploy with rollback, and a macro command

**Problem:** a deployment is a sequence of steps. If step four fails, steps one to three must be
undone — correctly, and in the right order.

**Pattern:** every step is a command with `execute()` and `rollback()`. `Deployer` tracks what
succeeded and unwinds it on failure.

**Two things to take away:**

- **Rollback runs in reverse order.** You cannot tear down the database before the pods that use
  it. Both `Deployer` and `MacroCommand` reverse their completed list. Getting the ordering right
  is the most common mistake in this pattern.
- **`MacroCommand` is a command made of commands** — Composite applied to Command. It implements
  the same interface, so `Deployer` treats a group exactly like a single step.

**The second run** fails deliberately at the last step; the final state prints empty, showing the
full unwind worked.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/command/example3/index.ts`
