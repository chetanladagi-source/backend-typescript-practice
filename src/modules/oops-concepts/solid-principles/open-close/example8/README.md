# Example 8 - Login providers

Scenario: users sign in with a password or Google, and GitHub is added later.

Violation: `LegacyLoginService` switches on the provider name, so every new
identity provider is an edit to the single most security-sensitive method in the
app, and its branches share one blast radius.

Fix: `AuthStrategy` declares `authenticate()`, each provider is isolated in its
own class, and `AuthRegistry` resolves the provider from a map.

Takeaway: `GithubAuthStrategy` is registered from `index.ts` - the login path
itself is never reopened, so existing providers cannot regress.
