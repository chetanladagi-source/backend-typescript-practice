# Example 3 — XML service as a repository

**Problem:** one internal service still returns XML. You do not want XML parsing leaking into
controllers and services all over the codebase.

**Pattern:** `XmlUserRepositoryAdapter` implements the ordinary `UserRepository` interface and does
the parsing inside. XML stops at the adapter boundary.

**Takeaway:** adapters translate *data formats*, not only method signatures. The last line of the
demo is the real win — once both sources implement the same interface, you can merge them into one
list as if they were the same system.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/adapter/example3/index.ts`
