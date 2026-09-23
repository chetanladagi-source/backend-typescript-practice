# Interpreter (Behavioral)

**Intent:** given a language, define a representation for its grammar plus an interpreter that uses
that representation to evaluate sentences in the language.

In plain terms: **model each grammar rule as a class, then evaluate the resulting tree.**

## Structure

1. **Abstract expression** — declares `interpret(context)`.
2. **Terminal expressions** — leaves: literals, variable lookups.
3. **Non-terminal expressions** — compose other expressions: AND, OR, `+`, comparisons.
4. **Context** — the data the expression is evaluated against.

The result is a tree, and evaluation is a recursive walk — which is why Interpreter is essentially
Composite with an `interpret()` method.

## When to use

- A simple, stable grammar that end users or config files need to express: permission rules,
  discount conditions, feature-flag targeting, search filters, alert thresholds.
- The rules change more often than you want to deploy.

## When NOT to use

- A real programming language. Interpreter gets unmanageable past a modest grammar — use a proper
  parser generator (ANTLR, nearley) or a parser combinator library.
- One or two conditions. Just write the `if`.

Interpreter is the least-used GoF pattern in practice, and saying so is fine — what interviewers
want is that you recognise a rules engine when you see one.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Arithmetic expressions with variables |
| `example2` | A boolean rule engine for feature-flag targeting |
| `example3` | A search filter DSL, parsed from a string |

## Interview questions

- **Interpreter vs Visitor?** Interpreter puts `interpret()` *on the nodes*. Visitor pulls
  operations *out* so you can add new ones. Real compilers parse into an AST (Interpreter's
  structure) then run Visitor passes over it.
- **Interpreter vs Composite?** Structurally the same tree. Interpreter is Composite specialised
  for evaluating a grammar.
- **Where does parsing fit?** Strictly, the pattern only covers *evaluation*; building the tree
  from text is the parser's job. Example 3 includes a small parser because that is what makes a DSL
  actually useful.
