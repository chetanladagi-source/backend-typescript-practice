# Example 2 — Command palette and keyboard shortcuts

**Problem:** "Save" needs to be reachable from a menu, from Cmd+S, and from the Cmd+K palette. Wire
each surface separately and they drift — the shortcut works while the palette entry calls an old
handler, or the palette offers an action that is currently invalid.

**Pattern:** one `AppCommand` registry. The palette filters it; the keymap is *derived* from it.
Both surfaces are views over the same list, so adding a command makes it available everywhere at
once.

**The detail that makes this more than a lookup table:** `isEnabled()`. "Delete selection" is
disabled with nothing selected, and the demo shows both surfaces respecting that — the palette
renders it greyed out, and the Backspace shortcut refuses to run it. Commands carry their own
availability rules rather than each surface re-deriving them.

**The interview connection:** a Redux action is this same idea in data form —
`{ type, payload }` is a serialisable command, which is exactly why DevTools can log, replay, and
time-travel through them.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/command/example2/index.ts`
