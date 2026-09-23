# Example 3 — Caching proxy with TTL

**Problem:** the currency API is slow and rate-limited, and the same pair is requested hundreds of
times a minute.

**Pattern:** `CachingRateApi` implements `RateApi`, stores `{ value, expiresAt }` per key, and only
delegates on a miss or an expiry.

**Two things worth stealing:** entries store an expiry rather than relying on a timer, and the
clock is injected as `now: () => number`. That injection is what lets the demo jump 61 seconds
forward instantly — and it is the same trick that makes time-dependent code testable without
`setTimeout` in your test suite.

**Caching proxy vs caching decorator:** genuinely blurry. Call it a proxy when the intent is
"protect the expensive subject from traffic", a decorator when it is "one of several stackable
behaviours".

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/proxy/example3/index.ts`
