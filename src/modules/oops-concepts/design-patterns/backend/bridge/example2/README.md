# Example 2 — Report types × renderers

**Problem:** "which data to gather" and "which format to emit" change for completely different
reasons and on different schedules, but inheritance forces them into one hierarchy.

**Pattern:** `Report` subclasses supply `title()` and `rows()`. `Renderer` implementations decide
formatting. Any report works with any renderer.

**Spotting it:** the giveaway sentence is "we have N kinds of report and M output formats". Two
independent axes of variation is always the Bridge signal.

**Note the overlap with Template Method:** `Report.output()` is a fixed algorithm calling abstract
steps. Real code mixes patterns constantly, and pointing that out is a good sign in an interview
rather than a mistake.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/bridge/example2/index.ts`
