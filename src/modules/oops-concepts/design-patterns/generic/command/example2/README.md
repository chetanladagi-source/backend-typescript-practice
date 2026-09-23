# Example 2 — Parking actions with undo

**Problem:** an attendant parks the wrong plate. Every action — park, leave — must reverse the
same way, without the desk knowing how a lot stores occupancy.

**Pattern:** `ParkCommand` / `LeaveCommand` each implement `execute` + `undo`. `Desk` stacks them
and never mentions plates.

**Same Command shape as the barista queue.** Undo of `Leave` is `park` again — the inverse is
stored on the command, not computed by the desk.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/command/example2/index.ts`
