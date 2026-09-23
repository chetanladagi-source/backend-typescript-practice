# Example 2 — Order workflow

**Problem:** inventory needs to trigger payment, payment needs to trigger shipping, and a declined
payment needs to release the reservation. Wiring those directly means each service imports the
next and the whole thing becomes impossible to reorder or test.

**Pattern:** every component reports what happened via `notify(sender, event, payload)` and never
calls another component. `OrderWorkflow` decides what happens next.

**Read this one against `../../facade/example1`, which uses the same domain on purpose:**

- The **facade** calls down into services; the services do not know it exists. One direction.
- The **mediator** is called *by* the components, and it calls back into them. Bidirectional — each
  component holds a mediator reference.

That side-by-side comparison is the cleanest way to answer "what's the difference between Facade
and Mediator?".

**Also note:** the compensating release on a declined payment lives in the mediator. Sequencing and
rollback are exactly the interaction knowledge this pattern is meant to hold.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/mediator/example2/index.ts`
