# Example 1 — App config

**Problem:** config is read from the environment in a dozen places, and each read re-parses and
can disagree with the others.

**Pattern:** `AppConfig` has a private constructor plus `getInstance()`. The first call parses the
environment, every later call returns the cached object.

**Takeaway:** the giveaway that it worked is `fromServer === fromMailer` printing `true`, and the
`[config] parsing environment` line appearing exactly once.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/singleton/example1/index.ts`
