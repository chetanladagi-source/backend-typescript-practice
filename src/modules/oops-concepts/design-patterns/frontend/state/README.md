# State — Frontend

Full theory, the State/Strategy distinction and interview questions:
[`../../backend/state/README.md`](../../backend/state/README.md)

## Where it shows up on the frontend

- **Async request status.** `idle → loading → success | error`, the thing every data-fetching hook
  models. React Query's `status` field is exactly this.
- Media players, multi-step wizards, drag-and-drop interactions, form submission flows.
- XState, the library built entirely around making this explicit in UI code.

## The frontend-specific note

The alternative most codebases start with is a pile of booleans: `isLoading`, `isError`,
`hasData`, `isRefetching`. Four booleans mean sixteen combinations, and most of them are
impossible — `isLoading && isError` should never render, but nothing stops it. A state machine
makes illegal states *unrepresentable* instead of merely unlikely, which in TypeScript means a
discriminated union the compiler can narrow.

Example 1 shows that union; example 2 shows the classic class-per-state form.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Async request states as a discriminated union, with retry and stale-response guarding |
| `example2` | A media player where each state is a class |
