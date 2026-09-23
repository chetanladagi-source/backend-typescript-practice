# Example 2 — Template Method without inheritance

**Problem:** every form submits the same way — validate, stop on errors, normalise, send, handle
success or failure. Example 1 would solve this with an abstract `FormBase` class. Modern frontend
code does not.

**Pattern:** the fixed sequence lives in a plain `submit()` function. The varying steps arrive as a
**config object**: `validate` and `send` are required (the abstract methods), `transform`,
`onSuccess` and `onError` are optional (the hook methods, with `?.()` and `??` supplying the
defaults).

**Why this version wins on the frontend:**

- No inheritance, so a form can pass through several such helpers. With a base class it gets one
  parent, forever.
- The config object is a value: you can build it at runtime, merge defaults into it, or return it
  from a factory. A subclass is fixed at authoring time.
- It is exactly the shape of the APIs you already use — `useMutation({ mutationFn, onSuccess,
  onError })` is this pattern, and saying so is a strong interview answer.

**`feedbackFlow` is the point.** It defines only the two required steps, yet still gets error
short-circuiting, the payload log, and a generic failure toast. Optional hooks mean the simple case
stays four lines.

**Same pattern, different mechanism:** inverted control either way. The framework calls your steps;
you never call the sequence yourself.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/template-method/example2/index.ts`
