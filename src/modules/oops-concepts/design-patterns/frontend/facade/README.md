# Facade — Frontend

Full theory, the Facade/Mediator distinction and interview questions:
[`../../backend/facade/README.md`](../../backend/facade/README.md)

## Where it shows up on the frontend

- **Custom hooks.** `useCheckout()` hiding cart state, pricing, validation, and the payment SDK is
  a facade. So is `useAuth()`.
- An API client module wrapping `fetch` + auth headers + retry + error mapping + JSON parsing.
- A media/upload helper hiding `FileReader`, resizing, progress, and the upload endpoint.
- Wrapping a sprawling third-party SDK (maps, video players, payment widgets) in the three methods
  your app actually uses.

## The frontend-specific note

A custom hook is the idiomatic React facade: it exposes the small surface a component needs and
hides the wiring. The same caution applies as anywhere — when `useCheckout` grows to 400 lines and
returns 15 values, it has become a God Object and should be split.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | An API client facade over fetch, auth, retry, and error mapping |
| `example2` | A `useCheckout`-style facade over cart, pricing, and validation |
