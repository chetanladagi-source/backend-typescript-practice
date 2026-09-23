# Example 2 — Wizard Back button and draft recovery

**Problem:** a four-step checkout. Back has to return the user to the previous step *with what they
typed still there*, and closing the tab by accident should not lose the draft.

**Pattern:** each `next()` pushes a `WizardSnapshot` — the step index plus a copy of all the data.
`back()` pops one and restores both. The same snapshot is serialised to storage on every step, so
recovery is the identical mechanism pointed at a different caretaker.

**Restoring `data`, not just `step`, is the entire difference.** A wizard that only tracks the index
takes you back to step 1 with the fields blank, or worse, with values a later step has since
modified. The snapshot makes Back mean "as it was", which is what the user expects.

**Watch the payment field in the output.** The user reaches payment, enters a card, goes back twice
to the address, changes the city, and moves forward — and the card is gone. That is correct: the
snapshot taken *before* payment did not contain a card, so restoring it removed one. Getting that
behaviour without a snapshot means writing per-field invalidation rules for every backward path.

**`{ ...this.data }` is a shallow copy** and is enough here because the values are strings. Nest an
object one level deeper and you need `structuredClone`, exactly as in example 1. Worth saying out
loud rather than leaving the interviewer to spot it.

**The recovery path is the same pattern with a persistent caretaker** — memory for undo,
`localStorage` for crash recovery. The serialisability requirement is why snapshots should be plain
data and not class instances.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/memento/example2/index.ts`
