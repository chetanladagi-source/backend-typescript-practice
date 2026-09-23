# Flyweight — Frontend

Full theory, the intrinsic/extrinsic vocabulary and interview questions:
[`../../backend/flyweight/README.md`](../../backend/flyweight/README.md)

## Where it shows up on the frontend

- Large tables and virtualised lists: 50,000 rows sharing a handful of style and column
  definitions.
- Icon sprite sheets — one SVG symbol referenced by thousands of `<use>` elements.
- Canvas and map rendering: shared sprites for particles, markers, tiles.
- Shared theme token objects instead of a style object literal per element.

## The frontend-specific note

Two important caveats specific to the browser:

- **Virtualisation usually beats flyweight.** If you are rendering 50,000 rows, the real fix is to
  render only the ~30 that are visible. Reach for flyweight when you genuinely must hold many
  objects in memory, not as a substitute for windowing.
- **Shared objects help React.** A memoised, shared style object keeps its reference stable across
  renders, so `React.memo` and `useMemo` comparisons actually hit. Creating `{ color: "red" }`
  inline in JSX makes a new object every render and defeats memoisation — the same fix, framed as a
  performance bug people hit constantly.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Shared cell-style objects across a large table |
| `example2` | An icon sprite registry shared by every list row |
