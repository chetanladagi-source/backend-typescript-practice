# Example 1 — Higher-Order Components

**Problem:** loading states, auth gating, and error boundaries are needed on dozens of pages.
Writing them inline in every component is duplication; subclassing would be a class explosion.

**Pattern:** each HOC has the signature `Component => Component`, which is *exactly* the decorator
rule (same interface in, same interface out). That is what makes
`withErrorBoundary(withAuth("member")(withLoading(ProjectList))))` legal.

**The ordering lesson is the useful part.** The last demo block deliberately nests wrong:
with `withLoading` outside `withAuth`, an unauthorised guest sees a **spinner** instead of the
permission message, because the loading check short-circuits before auth ever runs. Same three
decorators, different nesting, visibly wrong UX.

**Interview framing:** note that React moved from HOCs to hooks largely because these stacks
produce "wrapper hell" and prop-name collisions. The pattern is correct; hooks just solved the same
problem with less indirection.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/decorator/example1/index.ts`
