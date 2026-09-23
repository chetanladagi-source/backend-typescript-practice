# Example 1 — Coffee order with undo

**Problem:** customising a complex order — milk, sugar, three syrups — and letting the customer
step backwards through the changes. Storing "the inverse of add-a-syrup" per change works but is
fiddly; storing the whole snapshot is trivially correct.

**Pattern:** three roles, each doing one thing.

| Role | Class | Responsibility |
| --- | --- | --- |
| Originator | `CoffeeOrder` | knows how to save and restore itself |
| Memento | `OrderMemento` | the opaque snapshot — a value, not a reference |
| Caretaker | `History` | keeps mementos, does not look inside them |

**The deep copy is the whole trick.** `structuredClone(this.state)` in `save()` is not decoration:
without it, the memento would hold a reference to the live state, and every later `addSyrup(...)`
would silently rewrite the history you meant to preserve. Undo would then restore the *current*
state, which is history that does nothing.

**Why the caretaker is deliberately blind.** `History` only touches `label`; the state stays
private to the memento, and only `CoffeeOrder.restore()` can consume it via `restoreInto()`. That
encapsulation is the difference between Memento and "keep a copy of the state in an array" — the
originator's internals never leak to the thing that stores them.

**Memento vs Command for undo:**

- **Memento** stores the *whole state*. Trivially correct, but a big object × 50 history entries
  = a lot of memory.
- **Command** stores the *operation*. Memory is proportional to the delta, but every command has
  to implement a correct `undo()`.

Real editors use both — commands for undo, plus a periodic memento so old history can be truncated
without corrupting the timeline.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/memento/example1/index.ts`
