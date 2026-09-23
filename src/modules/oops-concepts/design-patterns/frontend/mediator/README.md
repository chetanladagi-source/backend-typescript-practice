# Mediator — Frontend

Full theory, the god-object warning and interview questions:
[`../../backend/mediator/README.md`](../../backend/mediator/README.md)

## Where it shows up on the frontend

- **Complex forms** where fields depend on each other: picking a country reloads the state
  dropdown and clears the postcode; "same as billing address" disables six inputs.
- Modal / toast / drawer managers deciding what may be open at once.
- Parent components coordinating siblings — the standard React answer of "lift state up" *is*
  Mediator, with the parent as the mediator.
- Redux stores, viewed from a distance: components talk to the store, never to each other.

## The frontend-specific note

The alternative is components calling each other's setters directly. With five interdependent
fields that is up to twenty connections, and each one is a place where two components must agree
about ordering. Route it all through one object and you have five connections.

The counter-argument is the one to raise yourself: the mediator absorbs all that complexity, so it
can grow into a god-object. The fix is one mediator per *feature* (this form, this dialog stack),
never one per app.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A form mediator handling interdependent fields |
| `example2` | A dialog manager coordinating modals, drawers and toasts |
