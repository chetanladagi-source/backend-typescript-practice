# Example 2 — Circuit breaker

**Problem:** when a downstream service is down, hammering it with requests makes recovery slower
and ties up your own threads. You want to fail fast, then probe cautiously.

**Pattern:** three states. **Closed** passes calls through and counts failures. **Open** rejects
immediately without touching the service. **Half-open** lets exactly one probe through and either
closes (recovered) or re-opens (still broken).

**Why this is the best State example for a backend interview:** it is a real resilience pattern
you would name in a system design round *and* a textbook state machine. Two answers for the price
of one.

**Note the state-local data:** the failure counter lives on `ClosedState` and the trip timestamp
lives on `OpenState`. Because transitioning creates a fresh state object, that bookkeeping resets
automatically — no manual cleanup, which an enum-based version always needs.

The demo injects a clock offset so it can skip the 5-second cooldown instantly.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/state/example2/index.ts`
