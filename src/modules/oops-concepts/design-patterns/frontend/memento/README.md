# Memento — Frontend

Full theory, the Command/Memento distinction and interview questions:
[`../../backend/memento/README.md`](../../backend/memento/README.md)

## Where it shows up on the frontend

- **Undo in editors** that snapshot rather than invert: canvas tools, form builders, anything
  where computing the reverse of an operation is harder than keeping a copy.
- Draft autosave and crash recovery: the same snapshot written to `localStorage`.
- Multi-step wizards where Back must restore exactly what you typed, including the fields a later
  step invalidated.
- Optimistic UI: snapshot before the optimistic write, restore if the server rejects it.

## The frontend-specific note

The question you will be asked is **Memento or Command for undo?**

- **Command** stores the *operation* and reverses it. Memory is proportional to the change, so it
  scales to large documents, but every command has to implement a correct `undo()`.
- **Memento** stores the *whole state*. Trivially correct, and it survives a reload if you persist
  it, but a 5 MB document × 50 history entries is 250 MB.

Real editors use both: commands for undo, plus a periodic memento so history can be truncated.
Snapshot cost is why structural sharing (Immer, Immutable.js) exists — an unchanged subtree is
shared by reference rather than copied.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A canvas editor with snapshot undo and a bounded history |
| `example2` | A wizard where Back restores each step exactly, including autosave |
