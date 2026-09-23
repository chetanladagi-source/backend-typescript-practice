# Factory Method (Creational)

**Intent:** define an interface for creating an object, but let subclasses (or a factory function)
decide which concrete class to instantiate. The caller codes against the product interface and
never says `new ConcreteThing()`.

## How it works

1. A **product** interface (`Notifier`, `PaymentGateway`, ...).
2. Several **concrete products** implementing it.
3. A **creator** with a `createX()` method. Subclasses override it to return their own product,
   or a single `switch` in a static factory picks for you.

## When to use

- You have a family of interchangeable implementations chosen at runtime by a string, config
  value, or user input.
- You want the `switch` on type to live in exactly one place instead of being copy-pasted.
- Construction is more than `new`: it needs credentials, retries, defaults wired in.

## When NOT to use

- One implementation and no plans for a second. `new Thing()` is fine.
- The factory grows a giant `switch` that changes every sprint. Consider a registry/map of
  `type -> constructor` so adding a product means registering, not editing.

## Factory Method vs Abstract Factory

Factory Method creates **one** product. Abstract Factory creates a **family** of related products
that must be used together (see the `abstract-factory` folder).

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Notification channel: email / SMS / push |
| `example2` | Payment gateway: Stripe / Razorpay / PayPal |
| `example3` | Upload parser: CSV / JSON / XML, via a registry instead of a `switch` |

## Interview questions

- **Factory Method vs Simple Factory?** "Simple factory" (one static method with a `switch`) is
  not a GoF pattern but is what most codebases mean. True Factory Method uses inheritance: the
  creator subclass overrides the factory method.
- **How does it help the Open/Closed Principle?** Adding a product means adding a class, not
  editing every call site. With a registry, you do not even edit the factory.
- **Where does it show up in real life?** `document.createElement`, logger transports,
  `Array.from`, ORM `createConnection(type)`, and almost every SDK client builder.
