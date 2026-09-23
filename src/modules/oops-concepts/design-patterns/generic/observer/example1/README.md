# Example 1 — Parking-lot occupancy Observer

**Problem:** three different things need to react when the lot's occupancy changes — the display
board, the mobile app, and an analytics service. Written directly, the lot has to import each of
them, and every new listener is a change to the lot.

**Pattern:** `ParkingLot` (the subject) keeps a set of `OccupancyObserver`s. On change it notifies
them all. The lot depends only on the interface; individual listeners come and go without the lot
knowing anything about them.

**Two production-grade details worth pointing out:**

- **Copy the set before iterating.** An observer might unsubscribe during its own callback (a
  "remove me after one notification" listener is a common request). Mutating the same set you are
  iterating skips items or throws; iterating a snapshot does not.
- **Error isolation.** `BrokenAnalytics` throws every time. Wrap each observer's call in
  `try/catch` and the demo shows the display and mobile app still receiving the event. Without
  this, one broken listener silently kills every listener after it in the loop, and the failure
  mode is invisible in code review.

**`subscribe()` returns an unsubscribe function.** This is the idiomatic JavaScript shape (Node
events, RxJS, Zustand, `useEffect` cleanup). It saves callers from holding a reference to the
observer just to remove it later. The demo uses it to detach the display board and then proves the
display no longer reacts.

**Observer vs Mediator — the exam question:** Observer is one-way and one-to-many (subject
notifies). Mediator is many-to-many with two-way messages. If a subject starts calling back into
its subscribers, or subscribers know about each other through the subject, you are drifting
towards Mediator.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/observer/example1/index.ts`
