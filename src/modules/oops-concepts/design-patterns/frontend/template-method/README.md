# Template Method — Frontend

Full theory, the hook-method vocabulary and interview questions:
[`../../backend/template-method/README.md`](../../backend/template-method/README.md)

## Where it shows up on the frontend

- **Component lifecycles.** `componentDidMount` / `render` / `componentWillUnmount` is a template
  method: React owns the sequence, your subclass fills in the steps.
- Page layout base classes, wizard steps, and "render a list view" abstractions where the
  loading/empty/error/data skeleton is fixed and only the row markup varies.
- Form submit flows: validate → serialise → send → handle result, with each form overriding one
  or two steps.

## The frontend-specific note

Modern React replaced most of this with **composition over inheritance** — custom hooks and render
props instead of base classes. That is the trade-off to raise unprompted: Template Method uses
inheritance, so a component can only have one parent, and the base class can grow into a
god-object. A custom hook composes freely and a component can use five of them.

Example 1 shows the inheritance version so you can speak to it; example 2 shows the same idea
expressed as a config object with optional hooks, which is how libraries actually ship it.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A list-view base class fixing the loading/error/empty/data skeleton |
| `example2` | A form submit flow, as a hook-object instead of a subclass |
