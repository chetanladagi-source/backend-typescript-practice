# Example 2 — Form autosave with capped history

**Problem:** a long application form should autosave, and the user should be able to jump back to
an earlier draft — but keeping every keystroke forever is a memory leak.

**Pattern:** `ApplicationForm.save(label)` snapshots the fields; `AutoSaver` keeps at most three and
evicts the oldest.

**Two things this example is really about:**

- **The cap.** "How do you stop the history growing unbounded?" is the standard follow-up. Capping
  is the simplest answer; storing deltas instead of full snapshots is the other.
- **Deep copying, twice.** `save()` does `new Map(this.fields)` and `getFields()` returns another
  copy. Skip either one and the snapshot shares a reference with the live form, so it silently
  mutates along with it — the same shallow-copy trap as in Prototype.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/memento/example2/index.ts`
