# Example 1 — Protection proxy around payments

**Problem:** every place that charges a card has to first check who the user is and whether they
are within their daily limit. Do it inline in every caller and one of them will forget. Do it inside
`RealPayment` and the payment class now knows about roles, sessions and rate limits — none of
which are its job.

**Pattern:** `AuthorizedPayment implements Payment` and holds a `RealPayment` privately. It runs
authentication, limit checks and audit logging, then delegates to the real object. Callers depend on
the `Payment` interface, so the proxy is a drop-in replacement — nobody upstream knows they are
talking to a proxy.

**The four proxy kinds, in one table:**

| Kind | Guards for | Example |
| --- | --- | --- |
| **Protection** (this one) | authorization / auth | `AuthorizedPayment` |
| **Virtual** | deferring an expensive create until first use | a chart component that fetches its dataset only when scrolled into view |
| **Remote** | a stand-in for an object on another machine | a gRPC stub |
| **Caching** | avoiding repeat work for the same input | a memoized fetch |

**Proxy vs Decorator — the exam question that always comes up:** the mechanism is the same
(implement the interface, hold the inner). The intent is different.

- Decorator **adds behaviour that is orthogonal** — logging, formatting, milk in your coffee. It is
  meant to be stackable.
- Proxy **controls access to** the real object — it may refuse, cache, or defer entirely. It is
  usually solitary.

If you catch yourself stacking proxies to combine features, you are back to Decorator; if the
"decorator" refuses to call `inner`, it is a Proxy.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/proxy/example1/index.ts`
