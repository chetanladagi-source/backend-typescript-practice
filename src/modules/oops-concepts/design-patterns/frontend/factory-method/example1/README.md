# Example 1 — Schema-driven form renderer

**Problem:** the backend returns a form schema as JSON. A big `switch (field.type)` inside the
renderer means every new field type edits the shared renderer — the file every team touches.

**Pattern:** a `Map<string, () => FieldComponent>` registry. `renderForm` only knows the
`FieldComponent` interface.

**The two details that make this production-shaped:**

- `UnknownField` renders an HTML comment instead of throwing. A single unrecognised field type
  should degrade gracefully, not blank the entire form — older clients will always encounter
  schema types they do not know about.
- The demo registers `signature-pad` **at runtime** and re-renders. That is what makes the registry
  code-splittable: a rarely-used field type can be lazy-loaded and register itself on arrival.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/factory-method/example1/index.ts`
