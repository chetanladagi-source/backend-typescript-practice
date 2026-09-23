# Example 1 — Coordinating a parking lot through one object

**Problem:** the entry gate has to open only if a spot is free; the display board has to update
when either gate acts; the exit gate has to free a spot and again refresh the display. Wire the
components directly and every one imports the other three — four components, up to twelve
connections, and adding a fifth (say, a mobile app) touches all of them.

**Pattern:** a `ParkingLotMediator` knows everyone. Colleagues (gates, spots, display) only know
the mediator. The mediator decides what an "entry request" means for the rest of the system.

**Read the demo output:** every arrival triggers one line from the gate and one from the display,
in the right order, with `KA-01-4444` denied because the lot is full — and none of that
coordination lives in the gate. The `EntryGate` has no `if (lotFull) ...`, no reference to the
display, no idea a spot manager exists. It publishes an intent and does what the mediator tells
it.

**The upside is the four connections instead of twelve.** Adding a mobile-app notifier is *one*
new colleague plus one line in the mediator's `requestEntry`. The gates and the display are
untouched.

**The trade-off to raise unprompted:** the mediator absorbs all the coordination, so it can grow
into a god-object. The fix is one mediator per *feature* (this parking lot, this checkout, this
form), never one mediator for the whole app. Real codebases enforce this with folder boundaries.

**Mediator vs Observer — the exam question:** Observer is one-way (subject notifies observers).
Mediator is two-way (colleagues send messages and the mediator can push back). If you find your
Observer subject listening to its own listeners, you have grown a Mediator by accident.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/mediator/example1/index.ts`
