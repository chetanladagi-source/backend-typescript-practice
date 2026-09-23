# Prototype (Creational)

**Intent:** create new objects by cloning an existing instance instead of constructing from
scratch.

## When to use

- Building the object is expensive (a database read, a network call, heavy parsing) but you need
  many near-identical copies.
- You want a configured "template" object that callers tweak slightly.
- The exact class is not known at compile time — you only have an instance and want another like
  it.

## The one thing that goes wrong

**Shallow vs deep copy.** `{ ...original }` copies nested objects *by reference*, so mutating
`copy.address.city` also changes `original.address.city`. Every clone method must decide
explicitly which fields to deep-copy. This is the single most common interview follow-up.

## Copy options in JavaScript

| Technique | Deep? | Notes |
| --- | --- | --- |
| `{ ...obj }` / `Object.assign` | No | Shallow, fastest |
| `JSON.parse(JSON.stringify(obj))` | Yes | Drops `Date`, `Map`, `undefined`, functions; no cycles |
| `structuredClone(obj)` | Yes | Built into Node 17+; handles `Map`/`Set`/`Date`/cycles, but not functions or class prototypes |
| Hand-written `clone()` | Yes | Most control, preserves the class prototype |

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Config templates cloned per environment (shallow vs deep shown side by side) |
| `example2` | A prototype registry of HTTP request presets |
| `example3` | Cloning an expensive-to-build report definition |

## Interview questions

- **Shallow vs deep clone?** See the table above; example 1 demonstrates the bug.
- **Why not just `new`?** Because the prototype may already carry expensive state, or because the
  caller only has an interface reference and does not know the concrete class.
- **How does this relate to JavaScript's prototype chain?** Only by name. `Object.create(proto)`
  makes an object that *delegates* to another; the Prototype pattern *copies* state.
- **Prototype vs Builder?** Builder assembles from parts; Prototype copies an existing whole.
