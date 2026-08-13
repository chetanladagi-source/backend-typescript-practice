# Example 5 — Credential hashing

**Scenario:** `AuthService` registers a user and verifies a later login.

**Before:** the arrow pointed `AuthService -> BcryptLibrary`. The policy picked the algorithm and
its cost factor, so every auth test paid bcrypt's deliberate slowness.

**After:** the service depends on the `PasswordHasher` interface; `BcryptHasher` runs in production
and `FakeHasher` keeps the demo instant.

**Takeaway:** an algorithm with a security lifetime will be replaced. Naming it behind an interface
means the migration touches one file and the login rules stay untouched.
