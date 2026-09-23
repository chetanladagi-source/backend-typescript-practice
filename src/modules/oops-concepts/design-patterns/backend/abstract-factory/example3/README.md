# Example 3 — Environment kit (dev vs prod)

**Problem:** dev should log human-readable text, cache in memory, and never send real email. Prod
should do the opposite. Wiring each piece independently means someone eventually ships a
`SmtpMailer` into the dev container.

**Pattern:** one `EnvironmentFactory` picked at boot decides all three. `runSignupFlow` is written
once.

**Takeaway:** three product types makes the trade-off visible — adding a fourth (say, a metrics
client) means editing the interface *and* both factories. Abstract Factory makes new families
cheap and new product types expensive.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/abstract-factory/example3/index.ts`
