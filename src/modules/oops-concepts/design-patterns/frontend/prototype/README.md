# Prototype — Frontend

Full theory, the shallow-vs-deep copy table and interview questions:
[`../../backend/prototype/README.md`](../../backend/prototype/README.md)

## Where it shows up on the frontend

- "Duplicate" buttons: duplicating a dashboard widget, a Figma layer, a Notion block, an email
  template, a form section in a repeatable fieldset.
- Copying default props / initial form state for a new item in a list.
- Test fixtures: a base object cloned and tweaked per test case.

## The frontend-specific gotcha

Shallow copies cause **state bugs that look like React bugs**. If you "duplicate" a widget with
`{ ...widget }`, the copy shares the same nested `config` object — so editing the copy mutates the
original, and because the top-level reference changed, React re-renders and shows the corruption
immediately. People blame the framework; it is a shallow clone.

The same applies to `useState`: mutating nested state in place means the reference never changes
and the component does **not** re-render. Cloning correctly is a frontend survival skill.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Duplicating a dashboard widget, with the shallow-copy bug shown |
| `example2` | A design-canvas layer duplicated with `structuredClone` |
