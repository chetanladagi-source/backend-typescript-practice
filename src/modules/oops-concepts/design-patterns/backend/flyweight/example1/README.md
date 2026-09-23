# Example 1 — Shared role objects

**Problem:** 50,000 loaded users, each carrying its own copy of a permission array — but there are
only three distinct permission lists in the entire system.

**Pattern:** `RoleFactory.get(name)` returns the *same* `Role` instance for the same name. The
count printed at the end is 3 objects for 50,000 users.

**Mapping the vocabulary:** the permission list is **intrinsic** (shared, immutable, identical
across users), while id and email are **extrinsic** and stay on `User`. If you can say which is
which in your own example, you have answered the usual Flyweight question.

**Why `readonly` matters:** the role is shared, so a single mutation would grant or revoke
permissions for every user holding it.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/flyweight/example1/index.ts`
