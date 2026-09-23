# Example 2 — Coffee machine states

**Problem:** `brew()` means nothing while idle, everything while heating, and is illegal while
descaling. A pile of booleans (`isHeating`, `isReady`, `isDescaling`) allows `isReady && isDescaling`.

**Pattern:** `Idle`, `Heating`, `Ready`, `Descaling` each implement `MachineState`. Illegal actions
are no-ops on the base class. The machine itself has no `if` on state.

**Same State pattern as the payment lifecycle**, different machine. States swap *themselves*
(`this.machine.setState(...)`) — that is the Strategy distinction again.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/state/example2/index.ts`
