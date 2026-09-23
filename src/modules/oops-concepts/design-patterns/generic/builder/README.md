# Builder — Generic

Full theory and interview questions:
[`../../backend/builder/README.md`](../../backend/builder/README.md)

The classic framing: a custom coffee order has one required piece (the base drink) and a dozen
optional pieces (milk, sugar, syrup, size, extras). A telescoping constructor is the smell that
says a builder is due.

| Example | Scenario |
| --- | --- |
| `example1` | A fluent `CoffeeBuilder` with a required base and optional add-ons |
| `example2` | An `OfferBuilder` for employee offers, rejecting remote + joining bonus |
