# Decorator (Structural)

**Intent:** attach extra behaviour to an object dynamically by wrapping it in another object that
implements the **same interface**.

## The rule that defines it

A decorator **implements the same interface as the thing it wraps**. That is what lets you stack
them in any order and pass the result anywhere the original was accepted. If the interface changes,
it is an Adapter, not a Decorator.

## Why not inheritance?

Inheritance is compile-time and combinatorial. Caching + retry + logging as subclasses means
`CachedRetryingLoggingClient` and seven other classes. Decorators compose at runtime:

```ts
new Logged(new Retrying(new Cached(realClient)));
```

Three small classes cover all eight combinations.

## When to use

- Cross-cutting concerns around a call: logging, caching, retry, metrics, auth, compression.
- The combination is decided at runtime or by config.

## Trade-offs

- Deep wrapping makes stack traces and debugging harder — you see five layers before real work.
- Order matters. `Cached(Retrying(x))` caches after retries; `Retrying(Cached(x))` retries the
  cache lookup. Being able to explain that difference is the interview win.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | HTTP client wrapped with logging, retry, and caching |
| `example2` | A repository wrapped with caching and metrics |
| `example3` | A file writer wrapped with compression and encryption |

## Interview questions

- **Decorator vs Proxy?** Same interface in both. Intent differs: Decorator *adds* behaviour and
  you usually stack several; Proxy *controls access* (lazy loading, permissions, remoteness) and is
  usually one layer that also creates/owns the subject.
- **Decorator vs inheritance?** Runtime vs compile-time; avoids class explosion.
- **Real examples?** Express middleware, Node streams (`pipe` through gzip), `winston` formats,
  and TypeScript's `@decorators` (different mechanism, same idea).
