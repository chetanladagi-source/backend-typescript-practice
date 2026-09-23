# Example 1 — Event bubbling through a component tree

**Problem:** a delete button sits inside a clickable row inside a table inside a page. Each level
wants to react to clicks, but none of them should need to know about the others.

**Pattern:** the chain is the ancestor path. Each node runs its own handler and then calls
`parent.dispatch(event)` — unless a handler set `propagationStopped`.

**The three clicks in the demo are the three cases you need to be able to describe:**

- **`row-text`** has no click handler at all. The event still reaches row, table and page. A link
  missing from the chain is not an error; unhandled just means "pass it on".
- **`row-link`** handles the event *and* lets it continue. It sets `defaultPrevented` to cancel
  navigation, and the page's analytics handler still fires and can see that flag. Acting is not the
  same as claiming.
- **`delete-button`** sets `propagationStopped`, so row and table never run. Without it, deleting a
  row would also select it — the classic nested-interactive-element bug.

**Two things an interviewer may probe:**

- The chain here is **built implicitly** from the tree at dispatch time, which is the interesting
  variation. Textbook Chain of Responsibility wires `handler.setNext(...)` up front.
- Real DOM events have a **capture phase** running root-to-target before the bubble phase. Same
  chain, walked in the other direction.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/chain-of-responsibility/example1/index.ts`
