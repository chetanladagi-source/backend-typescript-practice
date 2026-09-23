# Iterator — Frontend

Full theory, laziness and interview questions:
[`../../backend/iterator/README.md`](../../backend/iterator/README.md)

## Where it shows up on the frontend

- **The language itself.** `for...of`, spread, and destructuring all work through
  `Symbol.iterator`. Arrays, `Map`, `Set`, `NodeList` and strings are all iterables, which is why
  `[...document.querySelectorAll("a")]` works.
- Walking a component or DOM tree: `TreeWalker`, recursive `children` traversal, finding all focusable
  elements inside a modal for a focus trap.
- Carousels and paginated lists, where "next" wraps around rather than running off the end.
- Async iteration over paginated APIs or a streamed response body.

## The frontend-specific note

The frontend value of Iterator is **generators**. `function*` turns a recursive tree walk into
something you can `for...of` over, pause, and abandon halfway — which matters when the tree has ten
thousand nodes and you only need the first match. You get the lazy behaviour without hand-writing
`next()` and a stack.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A carousel iterator that wraps around, over a collection that hides its storage |
| `example2` | Walking a component tree with generators, including early exit |
