# Proxy (Structural)

**Intent:** provide a stand-in for another object to **control access** to it — same interface,
extra gatekeeping.

## The four classic kinds

| Kind | Purpose | Example here |
| --- | --- | --- |
| **Virtual** | Delay creating an expensive object until it is actually needed | `example1` |
| **Protection** | Allow or deny calls based on permissions | `example2` |
| **Caching** | Serve a stored result instead of hitting the real subject | `example3` |
| **Remote** | Make a network call look like a local method call | gRPC/RPC stubs |

Knowing these four names by heart is most of what interviewers want here.

## When to use

- The real object is expensive to create and often unused (virtual).
- Access needs authorisation the subject should not know about (protection).
- Repeated identical calls are wasteful (caching).
- Logging, rate limiting, or connection management around a subject.

## Proxy vs Decorator

This is *the* question. Both implement the same interface as their subject.

- **Decorator** adds behaviour, is usually stacked several deep, and is always *given* its
  subject by the caller.
- **Proxy** controls access, is usually a single layer, and typically *owns or creates* the
  subject — it may decide never to create it at all, which a decorator cannot do.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Virtual proxy: a heavy report engine created on first use |
| `example2` | Protection proxy: role-checked admin operations |
| `example3` | Caching proxy over a currency-rate API, with TTL |

## Interview questions

- **Proxy vs Decorator vs Adapter?** Control access / add behaviour / change interface.
- **What is JavaScript's built-in `Proxy`?** A language feature that intercepts operations
  (`get`, `set`, `has`) on any object. It is the same idea at the language level, and it is how
  Vue 3 reactivity and many ORM lazy-loaders work.
- **How does an ORM lazy-load relations?** A virtual proxy on the relation field that issues the
  query on first access. Which is also how you get N+1 queries.
