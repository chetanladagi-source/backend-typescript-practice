# Builder (Creational)

**Intent:** construct a complex object step by step, so the same construction process can produce
different representations — and so you never write a constructor with nine optional parameters.

## The problem it kills

```ts
new HttpRequest("GET", url, undefined, undefined, 3000, true, undefined, "gzip");
```

Nobody can read that. Swap two `undefined`s and it still compiles.

## How it works

1. A **builder** holds partial state and exposes one method per field.
2. Each method returns `this`, which is what makes chaining work.
3. A terminal `build()` validates the accumulated state and returns the finished immutable object.

## When to use

- Many optional parameters, or several valid combinations of them.
- The object should be immutable once built, but needs lots of setup first.
- Construction has validation rules that span multiple fields ("a POST must have a body").

## When NOT to use

- Two or three parameters. Use the constructor, or an options object — in TypeScript a plain
  `{ }` options argument with optional properties covers most of what Builder does in Java.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Fluent HTTP request builder |
| `example2` | SQL `SELECT` query builder |
| `example3` | Email message builder with a Director for reusable recipes |

## Interview questions

- **Builder vs a plain options object?** In TypeScript the options object is usually enough. Reach
  for Builder when steps must happen in order, when you want step-by-step validation, or when a
  Director should encapsulate common recipes.
- **What is the Director?** An optional class that knows a fixed sequence of builder calls, so
  "build me a standard welcome email" lives in one place. Example 3 shows it.
- **Why return `this`?** It is what enables method chaining. In TypeScript, typing the return as
  `this` (not the class name) also keeps chaining working in subclasses.
- **Where do you see it?** Query builders (Knex, Prisma), `fetch` wrappers, `supertest`,
  `StringBuilder` in Java.
