# Observer (Behavioral)

**Intent:** define a one-to-many dependency so that when one object changes state, all its
dependents are notified automatically.

Also known as **publish/subscribe** (though strictly, pub/sub usually implies a broker in the
middle and no direct reference between publisher and subscriber).

## Why it matters

Without it, `OrderService.markPaid()` has to call the mailer, the inventory service, the analytics
client, and the warehouse — so it depends on all four and must be edited whenever a fifth is added.
With Observer it emits `order.paid` and stops caring who listens.

## Structure

1. **Subject** — keeps a list of observers, offers `subscribe` / `unsubscribe` / `notify`.
2. **Observer** — an interface with an `update(event)` method (or just a callback).
3. Concrete observers react independently.

## The traps (these are the interview questions)

- **Memory leaks.** An observer that never unsubscribes is never garbage collected. Always return
  an unsubscribe function — example 1 does.
- **One observer throwing** kills the notification loop for everyone after it. Wrap each call in
  `try/catch` — example 2 does.
- **Notification order** is an implementation detail. Do not let observers depend on it.
- **Cascading updates.** An observer that mutates the subject can trigger another notification,
  and it is very hard to trace.
- **Synchronous by default.** A slow observer blocks the publisher.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Order events fanning out to email, inventory, and analytics |
| `example2` | A typed event emitter with error isolation |
| `example3` | Upload progress with observers that unsubscribe themselves |

## Interview questions

- **Observer vs Pub/Sub?** Observer: the subject holds direct references to its observers.
  Pub/Sub: a broker sits in between and neither side knows the other. Observer is in-process;
  pub/sub is usually cross-process (Kafka, Redis, SNS).
- **Push vs pull?** Push sends the data with the notification (used here). Pull sends only "I
  changed" and observers query the subject for details.
- **Where is it in Node?** `EventEmitter` is the Observer pattern, as is every `addEventListener`,
  RxJS, and React's `useEffect` subscription cleanup.
