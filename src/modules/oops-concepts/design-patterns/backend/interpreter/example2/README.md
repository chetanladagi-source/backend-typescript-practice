# Example 2 — Feature-flag rule engine

**Problem:** targeting rules like "staff, or paying Indian users older than 30 days, but never
anyone who opted out" change weekly. Hard-coding them means a deploy every time.

**Pattern:** `Equals`, `GreaterThan`, and `OneOf` are terminals; `And`, `Or`, and `Not` compose
them. Because the rule is a tree of objects, it can be built from a JSON config at runtime.

**Why this is the most useful Interpreter example for backend work:** this is exactly how
LaunchDarkly, Unleash, and every internal flag system model targeting. If you have ever written a
"rules engine", you have written this pattern.

**The `describe()` method matters more than it looks.** Rules assembled from config are opaque
otherwise, and being able to print the rule back as readable text is what makes them debuggable and
auditable in an admin UI. Adding a `describe`/`explain` alongside `evaluate` is a good instinct to
show.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/interpreter/example2/index.ts`
