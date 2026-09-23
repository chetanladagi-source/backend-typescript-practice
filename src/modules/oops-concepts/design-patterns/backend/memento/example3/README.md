# Example 3 — Config deploy with rollback

**Problem:** a bad config change should not require a human to remember and re-enter the previous
values at 3am.

**Pattern:** `DeployManager` snapshots before applying, runs a health check, and calls
`rollbackTo(before)` if the service is unhealthy. Deploy 3 in the demo sets a broken timeout and is
reverted automatically — while the feature flag added in deploy 2 survives, because the snapshot
was taken *after* it.

**Why this example is worth having:** Memento is usually taught with text editors, which makes it
feel like a UI pattern. It is not. Transaction rollback, config rollback, and database savepoints
are all this pattern, and that framing is much more useful in a backend interview.

**Compare with `../../command/example3`**, which solves rollback with Command instead: there, each
step knows how to *invert itself*. Here, the state is *restored wholesale*. Inverting is cheaper on
memory; restoring is simpler and harder to get wrong.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/memento/example3/index.ts`
