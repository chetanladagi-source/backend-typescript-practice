# Example 10 - Repository that narrows findById

**Scenario:** A lookup service falls back to a guest label whenever `findById` reports that a user is missing.

**Broken contract:** `UserRepository.findById` promises `User | null`, so "not found" is a normal, expected result. `StrictUserRepository` keeps the same signature but throws for a missing id, strengthening the precondition to "the id must exist". The null branch in `describeUser` becomes dead code and the caller crashes.

**Fix:** State the contract once in a `UserRepository` interface returning `User | null`, and have every implementation honour it, including the `CachingUserRepository` decorator which caches the null result too.

**Takeaway:** Return-type compatibility is not contract compatibility. A subtype may not turn an expected value into an exception, and decorators must forward the base semantics unchanged.
