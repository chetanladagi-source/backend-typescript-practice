# Example 3 — Support ticket triage

**Problem:** tickets route by tag, subject keywords, and customer tier, and the routing policy
changes often.

**Pattern:** the same chain, written **functionally**. A handler is
`(ticket, next) => string`, and `buildChain` composes an array of them. No classes, no `setNext`
wiring — this is how Koa and Express actually implement middleware internally.

**Two things worth taking away:**

- The **chain order is the policy**. The last demo block reorders two handlers and changes routing
  behaviour without editing a single handler — the clearest demonstration of why this pattern is
  worth the indirection.
- `fallbackHandler` never calls `next`, so it terminates the chain and guarantees every ticket gets
  routed. An explicit catch-all beats relying on a default deep inside the runner.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/chain-of-responsibility/example3/index.ts`
