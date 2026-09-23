# Strategy (Behavioral)

**Intent:** define a family of interchangeable algorithms, put each in its own class, and let the
algorithm be swapped at runtime.

## The smell it removes

```ts
if (type === "percentage") { ... }
else if (type === "flat") { ... }
else if (type === "bogo") { ... }
```

Every new rule edits that function, which means re-testing all the old branches. Strategy turns
each branch into its own class that can be tested in isolation.

## Structure

1. **Strategy** — the interface (`DiscountStrategy`).
2. **Concrete strategies** — one per algorithm.
3. **Context** — holds a strategy and delegates, without knowing which one it has.

## When to use

- Several ways to do the same job: pricing, sorting, compression, auth, retry, routing.
- The choice depends on config, user input, or an A/B test.
- A method has grown a long conditional on a "type" field.

## When NOT to use

- Two branches that will never grow. A conditional is clearer than two files.
- The strategies need wildly different inputs. If the interface becomes
  `execute(a?, b?, c?)`, the abstraction is wrong.

## In TypeScript

A strategy interface with a single method is just a function type. `type Discount = (total:
number) => number` is often better than a class, and a `Record<string, Discount>` replaces the
factory. Example 3 uses that form — mentioning it in an interview shows you know patterns adapt to
the language.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Discount strategies at checkout (classic class form) |
| `example2` | Authentication strategies: JWT, API key, basic |
| `example3` | Retry backoff strategies as plain functions |

## Interview questions

- **Strategy vs State?** Identical structure. Strategy is chosen *from outside* and the strategies
  do not know about each other; State transitions *itself* and states know their successors.
- **Strategy vs Bridge?** Same mechanism; Bridge is a larger structural decision across two
  hierarchies, Strategy swaps one algorithm.
- **Strategy vs Template Method?** Composition vs inheritance; swap the whole algorithm vs override
  some steps of a fixed one.
