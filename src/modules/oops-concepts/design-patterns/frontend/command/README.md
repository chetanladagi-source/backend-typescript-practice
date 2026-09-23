# Command — Frontend

Full theory, the Command/Memento distinction and interview questions:
[`../../backend/command/README.md`](../../backend/command/README.md)

## Where it shows up on the frontend

- **Undo/redo** in any editor: text, canvas, form builder, spreadsheet, Figma-style tools.
- **Redux actions.** A dispatched action is a serialisable command object; the reducer applies it.
  Redux DevTools' time-travel debugging works *because* actions are commands you can replay.
- Keyboard shortcut registries mapping a key combination to an action.
- Command palettes (Cmd+K), where every entry is a named, searchable command.
- Optimistic UI: apply the command locally, and reverse it if the server rejects it.

## The frontend-specific note

The connection to Redux is the one to have ready. `{ type: "cart/add", payload: {...} }` is a
command object in data form rather than class form, and that is exactly what makes action logs,
replay, and time-travel possible.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Canvas editor with undo/redo stacks |
| `example2` | A command palette plus keyboard shortcuts over one command registry |
