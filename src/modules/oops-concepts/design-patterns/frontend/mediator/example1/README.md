# Example 1 — A form mediator for interdependent fields

**Problem:** the country field has to reload the state dropdown, clear it, lock the postcode, and
show or hide the GSTIN field. If the country component does all that itself, it now imports four
siblings and no field can be moved or reused.

**Pattern:** every field reports `changed(name, value)` to one `FormMediator`. All the
cross-field rules live there. Fields know nothing about each other.

**The last block of the demo is the bug this prevents.** The user fills the whole Indian address,
then switches to US. Watch the output: the state options swap to `[CA,NY]`, the selected state and
postcode are **cleared**, GSTIN disappears, and the submit button flips back to disabled. Without a
mediator, the usual result is `country=US, state=KA, postcode=560001` — a valid-looking form that
fails server-side validation.

**Two other behaviours the output shows:**

- The first line rejects a change to `postcode` because it is still disabled. Disabled state is
  enforced by the mediator, not only by a visual attribute a script could bypass.
- `sameAsBilling: yes` fills *and* locks the shipping line, then a later change re-enables it. One
  rule, one place.

**The React framing:** this is "lift state up". The parent component *is* the mediator. Recognising
that the advice you have followed for years is a named pattern is exactly the connection
interviewers are listening for.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/mediator/example1/index.ts`
