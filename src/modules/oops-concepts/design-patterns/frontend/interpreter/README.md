# Interpreter — Frontend

Full theory, the grammar vocabulary and interview questions:
[`../../backend/interpreter/README.md`](../../backend/interpreter/README.md)

## Where it shows up on the frontend

- **Validation rule strings**: `"required|min:8|email"` in Laravel-style validators, VeeValidate,
  and most schema-driven form builders.
- **Conditional field visibility** in form builders: show this field when
  `country == "IN" && amount > 50000`. The rule comes from a CMS, so it cannot be code.
- Search and filter syntax: `is:open label:bug author:me`, the GitHub search bar.
- Template languages, CSS selector engines, and feature-flag targeting rules.

## The frontend-specific note

Interpreter earns its place when the rules come from **outside your bundle** — a CMS, an admin
panel, a feature-flag service. If a non-developer must be able to change a rule without a deploy,
the rule has to be data, and data needs an interpreter.

The trade-off, which is also the security answer: the obvious shortcut is `eval()` or
`new Function()`. An interpreter over a tiny grammar can only do what its node types allow, so a
malicious rule from the server cannot read cookies or call `fetch`. Sandboxing by construction is
the strongest argument for the pattern.

The limit is equally clear: a grammar past a handful of node types wants a real parser
(Chevrotain, PEG.js), not hand-written recursive descent.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A `"required\|min:8\|email"` validation rule DSL |
| `example2` | Boolean expressions driving conditional field visibility |
