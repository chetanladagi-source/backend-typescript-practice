# Memento (Behavioral)

**Intent:** capture an object's internal state so it can be restored later — **without violating
encapsulation**.

That last clause is the entire point. Anyone can save state by making all the fields public. The
pattern is about saving it while keeping them private.

## The three roles

| Role | Job |
| --- | --- |
| **Originator** | The object with state. Creates mementos (`save()`) and restores from them (`restore(m)`) |
| **Memento** | An opaque snapshot. The caretaker can hold it but not read it |
| **Caretaker** | Stores mementos (a history stack). Never looks inside |

Only the originator understands a memento's contents. In TypeScript you enforce that by having the
caretaker see a narrow public interface while the originator uses the full class.

## When to use

- Undo/redo, checkpoints, transaction rollback, draft autosave, game saves.
- Any "restore to how it was" requirement.

## Cost

Memory. A snapshot per change adds up fast, so real implementations either cap the history,
store **deltas** instead of full copies, or snapshot periodically. Mentioning that unprompted is a
good sign.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Text editor undo, with encapsulation actually enforced |
| `example2` | Form draft autosave and restore by label |
| `example3` | Config deploy with rollback on a failed health check |

## Interview questions

- **Memento vs Command?** Command captures *the action* (and can undo by inverting it). Memento
  captures *the state* (and undoes by restoring it). They are frequently combined — see
  `../command/example1`, where each command snapshots the old value.
- **How do you avoid breaking encapsulation?** Give the caretaker a narrow interface with no
  accessors, as example 1 does.
- **Deep or shallow copy?** Deep, otherwise the "snapshot" changes when the original does. Same
  trap as Prototype.
- **How do you keep memory under control?** Cap the history, or store diffs rather than full
  snapshots.
