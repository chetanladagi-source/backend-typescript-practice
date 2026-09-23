# Visitor — Frontend

Full theory, double dispatch and interview questions:
[`../../backend/visitor/README.md`](../../backend/visitor/README.md)

## Where it shows up on the frontend

- **Rich-text editors.** Slate, ProseMirror and Lexical all hold a document tree and need to
  serialise it to HTML, to markdown, to plain text, and to a word count. Four operations, one tree.
- ASTs everywhere in the toolchain: Babel and ESLint plugins are visitors, literally written as
  `{ Identifier(path) {...}, CallExpression(path) {...} }`.
- Form schemas: render the schema, validate against it, build default values from it, generate a
  TypeScript type from it.

## The frontend-specific note

Visitor is the answer to "I have a stable tree shape and I keep adding operations to it". The
trade-off is strict and worth stating up front: **adding an operation is easy, adding a node type is
expensive**, because every visitor must grow a method. Rich-text node kinds change rarely while
export formats keep arriving, which is exactly when the trade favours you.

In TypeScript you often get the same effect from a discriminated union plus an exhaustive `switch`,
and the compiler will fail the build when a new node kind appears. Example 2 uses that form.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A rich-text document rendered to HTML, markdown, plain text and a word count |
| `example2` | A form schema visited to render, validate, and build default values |
