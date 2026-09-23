# Example 2 — Employee timesheet undo

**Problem:** logging hours is easy to mistype (12h on Wednesday). Back must restore the previous
draft, including the project name, not just the last cell.

**Pattern:** `Timesheet.save()` deep-copies state into an opaque `TimesheetMemento`. `History`
holds mementos and never reads the hours.

**Same three roles as the coffee-order draft.** Snapshot-before-change means undo returns to the
start of the last edit.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/memento/example2/index.ts`
