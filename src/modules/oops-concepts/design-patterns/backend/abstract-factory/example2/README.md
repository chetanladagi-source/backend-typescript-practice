# Example 2 — Persistence kit (Postgres vs Mongo)

**Problem:** the repository writes SQL or Mongo query documents, so it is tightly bound to the
connection type. Pairing them by hand is an obvious footgun.

**Pattern:** `PersistenceFactory` creates both, and `createUserRepository(conn)` takes the
connection it was given, so the pair always matches. `UserService` writes one implementation and
works against either engine.

**Note the variation:** unlike example 1, one product here depends on the other. Passing the
connection into the repository creator is the normal way to express that inside an abstract factory.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/abstract-factory/example2/index.ts`
