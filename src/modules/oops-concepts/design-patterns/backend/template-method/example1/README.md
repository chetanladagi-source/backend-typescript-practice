# Example 1 — Data import pipeline

**Problem:** the CSV importer and the JSON importer were copy-pasted. Both parse, filter, insert,
and report — only the parsing really differs, but a fix to the loading step had to be made twice.

**Pattern:** `DataImporter.run()` is the template method holding the sequence. `parse()` is
abstract; `isValid()` and `onFinished()` are hooks with defaults; `load()` is shared outright.

**This example is here to show all three step kinds at once:**

| Step | Kind | Why |
| --- | --- | --- |
| `parse` | abstract | no sensible default exists |
| `isValid` | hook | a default works; `CsvImporter` tightens it |
| `load` | concrete | identical everywhere |

Both subclasses call `super` inside their overrides rather than replacing the default wholesale —
usually what you want, since it extends the base behaviour instead of discarding it.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/template-method/example1/index.ts`
