# Adapter (Structural)

**Intent:** convert the interface of an existing class into the interface your code expects, so two
things that were never designed to work together can.

Also called **Wrapper**. It is the "power plug converter" pattern.

## When to use

- Integrating a third-party SDK or legacy class you cannot edit.
- Several vendors do the same job with wildly different method names and shapes.
- Migrating off an old API: adapt the old implementation to the new interface, switch call sites
  gradually, delete the adapter last.

## Structure

1. **Target** — the interface your code wants (`PaymentProcessor`).
2. **Adaptee** — the awkward existing class (`LegacyPaymentSdk`).
3. **Adapter** — implements Target, holds an Adaptee, translates each call.

## Adapter vs its neighbours

| Pattern | Changes the interface? | Purpose |
| --- | --- | --- |
| **Adapter** | Yes | Make an incompatible thing fit |
| **Decorator** | No | Add behaviour, same interface |
| **Facade** | Yes (simplifies) | Hide a whole subsystem behind one door |
| **Proxy** | No | Control access to the same interface |

That table is the most commonly asked structural-pattern question.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | A legacy payment SDK adapted to a modern interface |
| `example2` | Three SMS vendors with three different APIs |
| `example3` | An XML-only user API adapted to a JSON repository interface |

## Interview questions

- **Object adapter vs class adapter?** Object adapter holds the adaptee as a field (composition) —
  the only option in TypeScript, since there is no multiple inheritance. Class adapter inherits
  from the adaptee, possible in C++.
- **Two-way adapter?** One class implementing both interfaces, so it can be used as either.
- **Where do you see it?** Any `*-adapter` npm package, ORM drivers, `winston` transports,
  Passport strategies.
