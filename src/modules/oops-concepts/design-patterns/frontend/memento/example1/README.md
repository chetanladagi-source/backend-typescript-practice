# Example 1 — Snapshot undo with a bounded history

**Problem:** undo for a canvas. Every edit must be reversible, and the user will make thousands of
them in a session.

**Pattern:** before each edit, `doc.save(label)` produces a `CanvasMemento` holding a deep copy of
the shapes. `History` (the caretaker) stacks them; undo pops one and hands it back to the document
to restore. The three roles are explicit: **originator** (`CanvasDocument`), **memento**, and
**caretaker** (`History`).

**The deep copy is not optional, and this is the most likely follow-up question.**
`new CanvasMemento(this.shapes)` without `structuredClone` stores a reference to the same array of
the same objects. `move()` then mutates the shape the memento is holding, so every snapshot in the
stack tracks the live document and undo restores the *current* state — history that quietly does
nothing. Memento requires a value, not a reference.

**The caretaker is deliberately blind.** `History` only ever reads `label`; `restoreInto()` exists
for the document. That encapsulation is the difference between Memento and "keep a copy of the
state in an array" — the document's internals never leak to the thing storing them.

**The bounded history is the real-world part.** With a limit of 3, the demo makes five edits and
the output shows the oldest snapshots being dropped, then undo running out before reaching the
beginning. Every editor makes this trade; the only question is where the limit sits.

**When to prefer Command instead:** snapshotting a 5 MB document 50 times is 250 MB. Command stores
only the delta. The usual production answer is commands for undo plus a periodic memento so old
history can be truncated safely.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/memento/example1/index.ts`
