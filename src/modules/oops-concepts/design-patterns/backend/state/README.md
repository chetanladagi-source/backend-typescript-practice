# State (Behavioral)

**Intent:** let an object change its behaviour when its internal state changes. The object appears
to change class.

## The smell it removes

```ts
ship() {
  if (this.status === "pending") throw new Error("not paid");
  if (this.status === "cancelled") throw new Error("cancelled");
  if (this.status === "shipped") throw new Error("already shipped");
  ...
}
```

Every method repeats the same status checks, and adding a status means auditing all of them. With
State, each status is a class that implements only what it allows.

## Structure

1. **Context** — holds a reference to the current state object and delegates to it.
2. **State** — an interface with one method per action.
3. **Concrete states** — implement the actions they permit and reject the rest; each one decides
   which state comes next.

## Why it beats a status enum

- Illegal transitions become impossible rather than being caught by scattered guards.
- The rules for a status live in one class, so "what can happen to a shipped order?" has one
  answer in one file.
- Adding a status is a new class, not an edit to ten methods.

## Cost

More classes, and the transition graph is spread across them rather than visible in one table.
For three simple statuses an enum really is fine — say so rather than over-applying it.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Order lifecycle: pending → paid → shipped → delivered |
| `example2` | Circuit breaker: closed → open → half-open |
| `example3` | Document review workflow: draft → review → published |

## Interview questions

- **State vs Strategy?** Same structure, different intent. A Strategy is chosen by the *client* and
  strategies are unaware of each other. A State is chosen by the *states themselves* — each one
  knows its valid successors — and it changes over the object's lifetime.
- **Who triggers the transition?** Either the state (used here, most common) or the context. Being
  aware there is a choice is the point.
- **Is this a state machine?** Yes, this is the object-oriented way to implement one. The
  alternative is a transition table, which is more compact and easier to visualise but harder to
  attach behaviour to.
