# Example 1 — A barista command queue

**Problem:** a customer's order is really a sequence of small actions on the espresso machine —
grind, brew, steam milk. If the customer changes their mind mid-order, you need to undo the last
few actions. Written as inline method calls, undo means writing the *inverse* of each action every
time.

**Pattern:** each action is a `Command` with `execute()` and `undo()`. The `Barista` (invoker)
just runs commands and keeps a history. Undo is `history.pop()?.undo()` — one line, works for
every command.

**Three roles worth naming out loud:**

| Role | Class here |
| --- | --- |
| Command | `GrindCommand`, `BrewCommand`, `SteamMilkCommand` |
| Invoker | `Barista` — schedules and undoes, does not know what a command actually does |
| Receiver | `EspressoMachine` — the object that actually performs the work |

**The invoker is deliberately dumb.** It never branches on command type. That is what lets the same
`Barista` accept a `GrindCommand` today and a `PourCoolWaterCommand` tomorrow with zero changes.

**Command vs Memento — the interview question:** both give you undo. The difference:

- **Command** stores the *operation*; undo replays its inverse. Memory is proportional to the
  change (a single number here).
- **Memento** stores the *whole state*; undo restores it. Trivially correct, expensive for big
  documents.

Real editors use both — commands for undo, plus a periodic memento so old history can be truncated
without corrupting the timeline.

**Same shape shows up everywhere:** Redux actions, macro recorders, keyboard-shortcut registries,
Cmd+K palettes, and `git`'s commit graph.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/command/example1/index.ts`
