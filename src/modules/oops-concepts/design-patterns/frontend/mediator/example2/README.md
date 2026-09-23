# Example 2 — Overlay manager for modals, drawers and toasts

**Problem:** each overlay component manages its own `isOpen` state, and the result is a drawer
sitting behind a modal with both trying to trap focus, Escape closing the wrong thing, and
`body { overflow: hidden }` left on after the last dialog closes because two components both toggled
it.

**Pattern:** one `OverlayMediator` owns the whole overlay world. Components ask it to open things;
it decides what that means for everyone else.

**The rules it encodes — all of which are cross-component and belong to nobody in particular:**

- Opening a second **drawer** closes the first; opening a **modal** closes the drawer; **toasts**
  never displace anything, because they do not block interaction.
- Modals **stack**, so Escape must reach the topmost one. `payment` is marked non-dismissible, and
  the demo shows Escape being refused rather than closing a half-finished payment.
- When nothing is open, Escape falls through to the page. That is the detail most hand-rolled
  implementations get wrong in one direction or the other: either the modal swallows every
  keystroke and kills the Cmd+K palette, or the page handler fires while a dialog is open.

**`sync()` is where the pattern pays off.** Scroll lock and focus target are *derived* from the full
overlay state, computed in one place, and logged only when they actually change. Compare that with
three components each calling `document.body.style.overflow` and hoping the last writer is right.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/mediator/example2/index.ts`
