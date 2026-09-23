# Example 2 — Route guard pipeline

**Problem:** before rendering a page you must check sign-in, onboarding, role, and plan. Written as
one nested `if` in the router, it becomes unreadable and every new rule touches it.

**Pattern:** an ordered array of guards, each returning `allow` or `redirect`. The loop stops at the
first redirect. Every guard is independently testable and the whole policy is one readable array.

**Order is the design, not a detail.** `auth → onboarding → role → billing`:

- Auth must run first so later guards can assume a user exists (that is why `onboardingGuard` can
  be written without re-checking sign-in).
- Billing runs last so a user who lacks the role is told *"forbidden"* rather than *"please
  upgrade"* — telling someone to pay for something they still would not be allowed to see is a
  genuinely bad flow that comes straight from mis-ordering the chain.

**The demo walks the pipeline one guard deeper each time,** so the output shows the chain stopping
at position 1, then 2, then 3, then 4, then running to completion. That progression is the whole
pattern in one screen.

**Notice the return type is data, not a thrown error.** `{ kind: "redirect", to, reason }` lets the
router decide what a redirect means (push, replace, render inline), and the `reason` field is what
makes the logs above debuggable.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/chain-of-responsibility/example2/index.ts`
