# Example 3 — User onboarding

**Problem:** signup touches hashing, the user table, JWT issuing, the audit log, and the welcome
mailer. A controller doing all five is untestable and invites someone to forget the audit entry.

**Pattern:** `OnboardingFacade.signUp(email, password)` returns `{ userId, token }`. The controller
becomes three lines.

**Worth noticing:** this is what most people already write and call `UserService`. Recognising that
your everyday service layer *is* the Facade pattern is usually enough to answer the interview
question convincingly.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/facade/example3/index.ts`
