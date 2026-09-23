# Example 1 — The Starbucks example

**Problem:** a menu with an espresso, a house blend, and half a dozen add-ons quickly turns into
`EspressoWithMilk`, `EspressoWithMilkAndSugar`, `EspressoWithMilkAndSugarAndVanilla`, ... — a
subclass for every combination. Two bases and three add-ons is *sixteen* classes, and the count
doubles with every new add-on.

**Pattern:** each add-on is a decorator that wraps a `Beverage` and *is* itself a `Beverage`. That
two-hats trick — implements the interface, holds one of the same interface — is the mechanic to be
able to describe. Stack them in any depth: `new Syrup(new Sugar(new Milk(new Espresso()), 2),
"vanilla")`.

**Adding "caramel" is one class.** No edits to `Espresso`, `Milk`, `Sugar`, `Syrup`, or the menu
loop. That is the pattern's whole promise, and the reason to reach for it is precisely when the
combinations grow multiplicatively.

**Reading a stack:** the OUTERMOST decorator's method runs FIRST, then delegates inward. This is
the same rule as HTTP middleware chains, higher-order React components, and Python function
decorators. If a decorator's order matters (say, log-then-encrypt vs encrypt-then-log), the outer
one wins on entry and the inner one wins on exit.

**Where you have already used this pattern:** `readable.pipe(gzip).pipe(fs.createWriteStream(...))`,
`app.use(cors).use(bodyParser).use(logger)` in Express, `withRouter(withAuth(withLogger(App)))` in
React. The vocabulary is the same, the mechanism is decorator-around-decorator, all the way down.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/decorator/example1/index.ts`
