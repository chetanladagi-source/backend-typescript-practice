# Example 2 — Vendor parking-barrier SDK

**Problem:** the lot wants `gate.open(plate)` / `gate.close()`. The hardware vendor exposes
`setAngle(degrees)` and returns `{ code, msg }`. You cannot change the SDK.

**Pattern:** `VendorBarrierAdapter` implements `Gate` and holds the SDK. The rest of the lot —
including a software-only lane with no physical arm — talks to `Gate`.

**Same anti-corruption idea as the legacy payment adapter.** Here the mismatch is verbs and
units (degrees vs open/close), not currency subunits.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/adapter/example2/index.ts`
