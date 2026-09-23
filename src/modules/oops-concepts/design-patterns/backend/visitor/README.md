# Visitor (Behavioral)

**Intent:** separate an algorithm from the object structure it runs on, so you can add new
operations without modifying the classes.

## The trade-off (this is the whole pattern)

|  | Add a new **operation** | Add a new **element type** |
| --- | --- | --- |
| **Without Visitor** (methods on each class) | Edit every class | Easy — one new class |
| **With Visitor** | Easy — one new visitor | Edit every visitor |

Visitor is the right choice when your set of element types is **stable** but operations keep being
added. Wrong choice when new element types arrive constantly.

## Structure and double dispatch

1. Each element has `accept(visitor)`.
2. `accept` calls back `visitor.visitConcreteType(this)`.
3. The visitor has one method per element type.

That bounce is called **double dispatch**: the method that runs depends on *both* the element type
and the visitor type. Languages without method overloading on runtime types (like JavaScript) need
this trick — it is the single most likely follow-up question.

## When to use

- An AST or document tree with many operations: evaluate, pretty-print, type-check, optimise.
- Reporting over a fixed domain model: totals, tax, export, validation.

## Criticism

- Verbose, and the double dispatch confuses readers.
- Visitors often need access to element internals, which weakens encapsulation.
- In TypeScript, a discriminated union plus a `switch` gives you the same exhaustiveness checking
  with far less ceremony. Example 3 shows that alternative deliberately.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Expression AST: evaluate and pretty-print |
| `example2` | Cart items: tax calculation and invoice rendering |
| `example3` | The same idea via a discriminated union, and why you might prefer it |

## Interview questions

- **What is double dispatch?** Above.
- **When would you not use it?** When element types change often, or when a union + `switch` is
  clearer — which in TypeScript is most of the time.
- **Where is it used?** Compilers and linters (`typescript-eslint` rules visit AST nodes), Babel
  plugins, ORM query-builder walkers.
