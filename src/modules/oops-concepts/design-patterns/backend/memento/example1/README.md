# Example 1 — Text editor undo

**Problem:** undo needs the editor's content *and* cursor position saved, but making those fields
public so a history class can read them destroys the editor's encapsulation.

**Pattern:** `Editor.save()` returns an `EditorMemento` — an interface exposing only a `label`. The
concrete `EditorSnapshot` holds the real state privately, and only `Editor` (which does the
`instanceof` narrowing) can read it back.

**This is the detail most write-ups skip.** Look at the commented line in `History.push`: calling
`memento.getContent()` is a *compile error*, because the caretaker only ever sees the narrow
interface. The caretaker can store and return snapshots but cannot inspect or forge them. That
enforced opacity is what separates Memento from "just copy the fields somewhere".

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/memento/example1/index.ts`
