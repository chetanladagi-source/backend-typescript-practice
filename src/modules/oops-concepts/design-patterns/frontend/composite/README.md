# Composite — Frontend

Full theory, the transparent-vs-safe variants and interview questions:
[`../../backend/composite/README.md`](../../backend/composite/README.md)

## Where it shows up on the frontend

- **The DOM itself**, and every virtual DOM. A `<div>` containing `<span>`s is Composite; that is
  why `element.textContent` works the same on a leaf and on a subtree.
- React's element tree: a component and a tree of components are both "renderable".
- Nested navigation menus, sidebars, breadcrumbs, tree views, file pickers.
- Nested form sections / repeatable field groups.

## The frontend-specific note

This is the pattern frontend developers use most and name least. If you are asked "have you used
Composite?", the honest answer is *every day* — React's whole model is that a leaf element and a
composed subtree satisfy the same contract, so `render()` is uniform and recursion handles depth.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A mini virtual DOM rendered to an HTML string |
| `example2` | A nested navigation menu with recursive permission filtering |
