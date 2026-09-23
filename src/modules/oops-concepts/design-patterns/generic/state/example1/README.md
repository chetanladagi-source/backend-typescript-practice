# Example 1 — Payment lifecycle

**Problem:** a payment moves through Initiated, Authorized, Captured, Refunded, and Failed.
Illegal transitions — capturing an initiated payment, refunding a failed one, authorizing a
captured one — must be rejected. Written as one big `if/else` in `Payment.capture()` and every
other method, the logic becomes unreadable and every new state touches every method.

**Pattern:** one class per state. `Payment` (the context) forwards every operation to its current
state object. Each state overrides only the transitions it allows; the rest fall through to the
base's `reject(action)`.

**The reject-by-default base is the whole trick.** Adding "Disputed" as a new state means writing
one class that overrides the operations it accepts — every other operation is refused automatically.
Contrast with the `switch` version where forgetting a case silently allows an illegal transition
and the bug shows up as a customer refund that succeeded on a failed payment.

**Read the demo output — each block proves one behaviour:**

- Happy path: `initiated → authorized → captured → refunded`, all four operations succeed in order.
- Second block: `capture` and `refund` are refused before authorization; a second `refund` after
  refunding is also refused.
- Third block: after `fail("bank timeout")`, everything else is rejected — `failed` is terminal.

**State vs Strategy — the classic exam question.** The class shapes look identical. The difference
is who decides:

- **Strategy** is *injected by the caller* and does not change itself.
- **State** *swaps itself* for the next state (`this.payment.setState(new CapturedState(...))`).
  States know the transition graph; strategies do not know each other exists.

**Where you have seen this:** TCP connection states, HTTP `keep-alive` state machines, DOM elements
in `readyState`, XState — the whole library — and every editor's undo/redo mode.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/state/example1/index.ts`
