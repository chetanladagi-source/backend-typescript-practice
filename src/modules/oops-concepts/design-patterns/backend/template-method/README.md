# Template Method (Behavioral)

**Intent:** define the skeleton of an algorithm in a base class, deferring some steps to
subclasses. Subclasses change *parts* of the algorithm without changing its structure.

## The shape

```ts
abstract class Importer {
  public run(): void {        // the template method — usually final
    this.extract();
    this.transform();
    this.load();
    this.notify();            // a hook with a default
  }
  protected abstract extract(): void;   // subclasses MUST supply
  protected notify(): void {}           // hook: subclasses MAY override
}
```

The template method is `public`; the steps are `protected`. That is deliberate — callers invoke the
whole algorithm, subclasses fill in parts.

## Abstract steps vs hooks

- **Abstract step** — no default, the subclass must implement it.
- **Hook** — has an empty or sensible default, the subclass may override it.

Knowing this distinction by name is worth easy marks in an interview.

## When to use

- Several variants share an identical sequence but differ in a few steps.
- You keep copy-pasting a workflow and changing two lines in the middle.

## The trade-off vs Strategy

Template Method uses **inheritance**: the algorithm is fixed at compile time, and you get exactly
one variant per subclass. Strategy uses **composition**: swappable at runtime and more flexible,
but more wiring. Template Method is the simpler tool when the variation is genuinely a fixed set.

It also invites a Liskov violation: a subclass that overrides a step and breaks the base class's
assumptions is a classic LSP bug. (See `../../../solid-principles/liskov-substitution`.)

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Data import pipeline: CSV and JSON importers |
| `example2` | Report generation with hooks for headers and footers |
| `example3` | HTTP request lifecycle: validate, authorize, execute, respond |

## Interview questions

- **Template Method vs Strategy?** Inheritance and compile-time vs composition and runtime.
- **What is a hook?** Above.
- **The Hollywood Principle?** "Don't call us, we'll call you" — the base class calls the
  subclass's steps, not the reverse. Template Method is its canonical example.
- **Where do you see it?** Test frameworks (`beforeEach`/`afterEach`), `Array.prototype.sort` with
  a comparator, servlet `doGet`/`doPost`, most ETL and middleware base classes.
