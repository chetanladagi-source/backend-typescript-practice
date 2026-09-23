# Example 3 — Search filter DSL

**Problem:** users should be able to type `price>1000 category:audio` into a search box, the way
GitHub and Jira search work.

**Pattern:** `parse()` turns the string into a `Filter` tree of `FieldComparison` terminals wrapped
in an `AllOf`; `matches()` evaluates it per product.

**The distinction worth making in an interview:** the Interpreter pattern is strictly the
*evaluation* half — the class-per-grammar-rule tree and its `interpret`/`matches` method. Turning
text into that tree is parsing, a separate job. Most write-ups blur the two; this example keeps them
in separate functions so the boundary is visible.

**Also note the validation.** `colour:red` and `price!!9` both fail with clear messages rather than
silently matching nothing. Any DSL exposed to users needs that, and a filter language that quietly
returns zero results for a typo is a support ticket waiting to happen.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/interpreter/example3/index.ts`
