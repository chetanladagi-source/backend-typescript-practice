# Flyweight (Structural)

**Intent:** support very large numbers of fine-grained objects efficiently by **sharing** the parts
they have in common.

This is the one pattern that exists purely for memory, not for design elegance.

## The key vocabulary

| Term | Meaning |
| --- | --- |
| **Intrinsic state** | Shared, immutable, identical across many objects (a role's permission list, a product category, an emoji's image data) |
| **Extrinsic state** | Unique per object, passed in as a parameter instead of stored (a user's id, a message's timestamp, a particle's position) |

The whole pattern is: **pull the intrinsic state out into a shared object, pass the extrinsic state
as arguments.**

## How it works

1. Identify the fields that repeat across thousands of instances.
2. Move them into an immutable flyweight class.
3. A factory hands out flyweights from a cache, returning the *same instance* for the same key.
4. The remaining unique fields stay on the context object, or become method parameters.

## When to use

- You have tens of thousands of similar objects and memory is a real constraint.
- Profiling shows duplication. **Do not apply this speculatively** — it trades clarity for bytes,
  and you should be able to state the measurement that justified it.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | One shared `Role` object for thousands of users |
| `example2` | Shared product category/brand metadata across a catalogue |
| `example3` | Shared emoji assets across chat messages |

## Interview questions

- **Intrinsic vs extrinsic state?** The definitions above — this is the question.
- **Why must flyweights be immutable?** Because they are shared. One mutation silently changes
  behaviour for every holder.
- **Flyweight vs Singleton?** Singleton is one instance globally. Flyweight is one instance *per
  unique value*, typically many instances in a pool.
- **Is JavaScript string interning a flyweight?** Effectively yes — identical string literals share
  one object. So is `Symbol.for()`, which is a literal flyweight factory with a global pool.
