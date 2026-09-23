# Builder — Frontend

Full theory, trade-offs and interview questions: [`../../backend/builder/README.md`](../../backend/builder/README.md)

## Where it shows up on the frontend

- Form schema / validation builders (Zod, Yup: `z.string().min(3).email()`).
- Query-string and filter builders for URL state.
- Chart and table column configuration (`createColumnHelper()` in TanStack Table).
- Test-data builders in component tests: `aUser().withRole("admin").build()`.

## The frontend-specific note

Zod and Yup are the builders every frontend developer already uses daily. `z.string().min(3)`
returns a new schema object each call and `.parse()` is the terminal operation — if you can point
at that in an interview, you have shown the pattern is not academic.

Note that Zod chains are **immutable**: each call returns a *new* builder rather than mutating
`this`. Example 1 uses the mutable form (simpler, the classic GoF shape); the trade-off is that a
mutable builder cannot be safely shared as a base for two different variants.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A form schema builder with per-field validation chains |
| `example2` | A URL filter builder for shareable, bookmarkable list pages |
