# Example 1 — Fluent CoffeeBuilder

**Problem:** a coffee order has one required part (the base drink) and half a dozen optionals.
Written as one constructor it becomes `new Coffee("latte", "large", "oat", 1, "vanilla", true, ...)`
— seven positional arguments no reader can decode without the class definition open, and swapping
two of them silently produces a wrong order.

**Pattern:** a `CoffeeBuilder` that takes the required `base` in its constructor, exposes each
optional as a chainable `withX()` method, and returns the finished product from `build()`. Every
step is named, every optional has a default, and the object is immutable after `build()` returns.

**Three details worth pointing out:**

- **Required-in-the-constructor, optional-in-methods.** `new CoffeeBuilder("latte")` compiles;
  `new CoffeeBuilder()` does not. The type system enforces what a comment cannot.
- **`return this`.** That one line is what makes the chain work. It is trivial and it is the
  entire syntactic reason builders read the way they do.
- **Cross-field validation lives in `build()`.** "Americano is not served with milk" cannot be
  checked when `withMilk` runs, because the base could change later. `build()` is the first place
  where every field is known, so it is the only place that combined rules can be enforced. The
  demo's final block proves it.

**Builder vs an options object:** `new Coffee({ base: "latte", milk: "oat", sugars: 1 })` is often
enough. Reach for a builder when there are validation rules to run at construction time, when
multiple products share steps, or when the fluent API genuinely reads better than an object literal.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/builder/example1/index.ts`
