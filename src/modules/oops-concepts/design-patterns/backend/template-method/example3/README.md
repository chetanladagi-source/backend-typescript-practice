# Example 3 — HTTP request lifecycle

**Problem:** every controller validates, authorizes, does work, and shapes a response — and every
one of them needs a `try/catch` so a stack trace never reaches the client. Copy-pasting that is how
one endpoint ends up leaking internals.

**Pattern:** `Controller.handle()` owns the lifecycle *and* the error boundary. Subclasses supply
`execute()` and override only the hooks they care about.

**The security angle worth mentioning:** `authorize()` defaults to "must be logged in", so a new
controller is **secure by default** — `HealthController` has to deliberately opt out. A default of
`return true` would mean every forgotten override is a vulnerability. Choosing safe defaults for
hooks is a real design decision, not a detail.

`BrokenController` exists to show the shared `catch` turning an unhandled exception into a clean
500 with the real message logged rather than returned.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/template-method/example3/index.ts`
