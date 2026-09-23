# Abstract Factory (Creational)

**Intent:** provide an interface for creating **families of related objects** without naming their
concrete classes — and guarantee the products you get actually work together.

## The key idea

Factory Method makes **one** product. Abstract Factory makes **a matched set**. The value is the
guarantee: if you ask the AWS factory for storage and a queue, you cannot accidentally end up with
S3 storage and a Google Pub/Sub queue.

## Structure

1. An abstract product interface per product type (`Storage`, `Queue`).
2. Concrete products per family (`S3Storage` + `SqsQueue`; `GcsStorage` + `PubSubQueue`).
3. An abstract factory interface declaring one creator method per product type.
4. One concrete factory per family.

## When to use

- The app must run against several interchangeable ecosystems: cloud providers, database engines,
  environments (dev/prod), platform themes.
- Mixing products from different families would be a bug.

## When NOT to use

- Only one product type varies — use Factory Method, it is much less machinery.
- Adding a new *product type* is expensive here: you must touch the factory interface and every
  concrete factory. Abstract Factory makes adding *families* easy and adding *product types* hard.
  That asymmetry is the standard trade-off question.

## Examples here

| Example | Scenario |
| --- | --- |
| `example1` | Cloud kit: AWS vs GCP (storage + queue) |
| `example2` | Persistence kit: Postgres vs Mongo (connection + repository) |
| `example3` | Environment kit: dev vs prod (logger + cache + mailer) |

## Interview questions

- **Abstract Factory vs Factory Method?** One family vs one product; composition/delegation vs
  inheritance/override.
- **What is its main weakness?** Adding a new product type ripples through every factory.
- **How does it relate to dependency injection?** The concrete factory is chosen once at the
  composition root; everything downstream sees only interfaces. It is DI with a guarantee of
  consistency attached.
