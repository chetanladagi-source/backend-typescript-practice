# Example 1 — Middleware pipeline

**Problem:** every endpoint needs auth, rate limiting, and validation before the real work, and
each concern should be independently testable and reorderable.

**Pattern:** the pipeline flavour of the chain. Each middleware either returns a response
(short-circuiting) or calls `forward(req)`.

**Three things to notice:**

- `setNext()` returns the *next* handler, which is what makes the fluent
  `a.setNext(b).setNext(c)` wiring read in order.
- Handlers can **enrich** the request — `AuthMiddleware` sets `req.user`, and the rate limiter
  downstream relies on it. That is why order is part of the design, not an afterthought.
- The chain's end returns a 404, so an unhandled request has a defined answer instead of falling
  off silently.

**Takeaway:** this is Express middleware. `next()` is `forward()`, and returning early instead of
calling `next()` is the short-circuit.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/chain-of-responsibility/example1/index.ts`
