# Decorator — Frontend

Full theory, the Decorator/Proxy distinction and interview questions:
[`../../backend/decorator/README.md`](../../backend/decorator/README.md)

## Where it shows up on the frontend

- **Higher-Order Components.** `withRouter(withAuth(withTheme(Page)))` is the Decorator pattern by
  another name — each HOC takes a component and returns a component with the same contract.
- `React.memo`, `forwardRef`, and Redux's `connect()` are all decorators over a component.
- Wrapping a `fetch` client with auth headers, retries, and logging.
- Input transformers: trim, mask a card number, force uppercase.

## The frontend-specific note

Hooks largely replaced HOCs in React precisely because deep decorator stacks are hard to debug —
"wrapper hell" in the component tree, and prop collisions when two HOCs inject the same prop name.
That is a genuinely good interview answer: **the pattern is sound, but composition via hooks solved
the same problem with less indirection.** Decorators remain the right tool when you must wrap
something you do not control.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | HOC-style wrappers: loading, auth gate, error boundary |
| `example2` | Input value transformers composed into a pipeline |
