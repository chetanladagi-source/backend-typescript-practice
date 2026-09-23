# Proxy — Frontend

Full theory, the four proxy kinds and interview questions:
[`../../backend/proxy/README.md`](../../backend/proxy/README.md)

## Where it shows up on the frontend

- **JavaScript's built-in `Proxy`.** This is the one place where the pattern is a *language
  feature*, and Vue 3's reactivity is built entirely on it — `reactive(obj)` returns a `Proxy`
  whose `get` trap tracks dependencies and whose `set` trap triggers re-renders. MobX and Immer use
  it too.
- Lazy loading: `React.lazy`, intersection-observer image loading, deferred heavy components.
- Protection: a route guard or a permission-checked API surface.
- Caching: a memoised selector or a client-side request cache.

## The frontend-specific note

`new Proxy(target, handler)` is worth knowing properly, because "how does Vue 3 reactivity work?"
is a common interview question and the honest answer is "the Proxy pattern, implemented with the
`Proxy` object". The traps that matter are `get` (track what was read) and `set` (notify what
changed).

Vue 2 used `Object.defineProperty` instead, which could not detect property *addition* or array
index assignment — that is exactly why `Vue.set` existed, and why `Proxy` replaced it.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Vue-style reactivity built with the native `Proxy` |
| `example2` | A virtual proxy for lazily loading a heavy component |
