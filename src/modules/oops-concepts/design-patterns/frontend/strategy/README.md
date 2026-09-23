# Strategy — Frontend

Full theory, the Strategy/State distinction and interview questions:
[`../../backend/strategy/README.md`](../../backend/strategy/README.md)

## Where it shows up on the frontend

- Form field validators, swapped per field.
- Data-table sorting and filtering, chosen by the column the user clicked.
- Image upload processing: resize, crop, compress.
- Animation easing functions — `easeIn`, `easeOut`, `linear` are strategies.
- Date/number/currency formatters chosen by locale.

## The frontend-specific note

In TypeScript a single-method strategy should usually be a **function type**, not a class:

```ts
type Comparator<T> = (a: T, b: T) => number;
```

`Array.prototype.sort(compareFn)` is the Strategy pattern built into the language — the array is
the context and the comparator is the injected algorithm. Pointing at that is a quick, convincing
answer.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Data-table sorting strategies, including a multi-column comparator |
| `example2` | Animation easing functions driving the same tween |
