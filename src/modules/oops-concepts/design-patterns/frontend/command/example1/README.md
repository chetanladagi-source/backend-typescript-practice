# Example 1 — Canvas editor undo/redo

**Problem:** every edit — add, move, recolour — must be reversible, and Cmd+Z has to work across
all of them uniformly.

**Pattern:** each edit is a command with `execute()` and `undo()`. `Editor` keeps an undo stack and
a redo stack and knows nothing about shapes.

**Three details that come up in interviews:**

- **Undo captures the previous value** (`this.previous ??= shape.x`) rather than computing an
  inverse. That is Command combined with Memento, and it is what most real editors do.
- **`??=` matters for redo.** If `execute()` overwrote `previous` every time, redoing a move would
  record the *moved* position as the "original", and the next undo would do nothing. The demo's
  redo sequence exercises exactly this.
- **A new action clears the redo stack.** The last block proves it: undo, then a fresh recolour,
  then redo does nothing. Every editor behaves this way, because redoing into a branch of history
  that no longer exists would corrupt the document.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/command/example1/index.ts`
