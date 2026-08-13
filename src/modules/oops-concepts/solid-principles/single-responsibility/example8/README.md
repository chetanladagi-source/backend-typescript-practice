# Example 8 — Authentication

**Scenario:** log a user in: verify credentials, issue a token, store the session.

**Violation:** `AuthGod` owns the account table, the token format and the session map. Moving sessions
to Redis, or swapping the opaque token for a JWT, both mean editing the class that also holds the
password comparison — the most security-sensitive code in the file.

**Refactor:** `CredentialVerifier`, `TokenIssuer` and `SessionStore` each own one concern, composed by
`AuthenticationService`.

**Takeaway:** "who are you", "here is your token" and "remember this token" are three
responsibilities. Splitting them keeps each one small enough to review carefully.
