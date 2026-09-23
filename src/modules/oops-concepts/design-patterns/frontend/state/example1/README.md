# Example 1 — Request status as a discriminated union

**Problem:** the boolean soup. `isLoading`, `isError`, `data`, `errorMessage` as four independent
pieces of state gives sixteen combinations, most of them nonsense, and every render path needs
`data?.name` because the compiler cannot know when `data` exists.

**Pattern:** one `status` field discriminating a union. `data` exists *only* on the success member,
`error` *only* on the error member. Look at `render()` — there is not a single optional-chain or
null check in it, because each `case` narrows the type.

**Two real bugs the machine prevents, both visible in the output:**

- **Double submit.** `start()` refuses to fire while already loading. This is the bug behind
  duplicate orders and doubled analytics events.
- **The stale response race.** Each `start()` takes a ticket. The demo abandons the first request,
  succeeds on the third, and then lets the first one answer late — it is discarded, so the screen
  keeps showing the correct data. Without this guard, a slow early response overwrites a fast
  later one and the user sees the *wrong* profile. This is what React Query's query keys and
  `AbortController` exist to handle.

**One subtlety worth understanding:** the retry counter cannot be derived from the previous state.
`error → loading → error` puts a `loading` in between, and `loading` carries no `attempt`, so
reading it off the previous state would reset the counter to 1 on every retry. It lives on the
machine instead and resets on success. Not every value belongs *in* the state — some belong to the
machine that owns the states.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/state/example1/index.ts`
