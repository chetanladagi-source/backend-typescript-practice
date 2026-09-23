# Example 2 — Paginated API iterator

**Problem:** every caller that wants "all users" writes the same `while (hasMore) { page++ }` loop,
and the page-size and cursor bookkeeping leaks everywhere.

**Pattern:** `PaginatedUsers` implements `Iterable<ApiUser>`. The iterator buffers one page and
fetches the next only when the buffer runs dry. Callers just write `for (const user of ...)`.

**The demo makes the real argument:** consuming everything costs 3 HTTP requests, but breaking
after 3 users costs **1**. Laziness is not a micro-optimisation here — an eager `fetchAllUsers()`
helper would always pay for every page.

**This is also why database cursors and streaming APIs exist.** Same pattern, applied to data that
does not fit in memory.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/iterator/example2/index.ts`
