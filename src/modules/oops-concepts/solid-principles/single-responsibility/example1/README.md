# Example 1 — User registration

**Scenario:** register a user: validate the input, hash the password, store the row, send a welcome email.

**Violation:** `UserRegistrationGod` mixes four unrelated reasons to change — validation rules, the
hashing algorithm, the storage layer, and the notification channel. A new password policy and a
switch from email to SMS both force edits to the same class, and none of the steps can be tested
or reused on their own.

**Refactor:** `UserValidator`, `PasswordHasher`, `UserRepository` and `EmailNotifier` each own one
job; `UserRegistrationService` only sequences them.

**Takeaway:** a class should have one reason to change. Orchestration is itself a responsibility,
so keep it separate from the work being orchestrated.
