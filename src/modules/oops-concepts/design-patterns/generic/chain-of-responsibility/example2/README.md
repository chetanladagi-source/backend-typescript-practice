# Example 2 — Leave-approval chain

**Problem:** 1–2 days is a manager call, up to 10 days needs a director, longer goes to HR, and HR
can still reject. Nested `if`s in one function mix routing with policy.

**Pattern:** `Manager → Director → HR`. Each handler approves, rejects, or passes. The chain
stops the moment someone claims the request.

**Order is the design**, same as the payment pipeline. A manager who approved 20-day sabbaticals
would hide HR's freeze. Cheap/local decisions sit first.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/chain-of-responsibility/example2/index.ts`
