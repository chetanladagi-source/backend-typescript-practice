# Example 2 — Authentication strategies

**Problem:** the API accepts JWTs from the web app, API keys from partner services, and basic auth
from a legacy cron job. One middleware branching on all three is unreadable and impossible to
reuse per-route.

**Pattern:** each scheme implements `AuthStrategy`. `Authenticator` is configured with a list and
tries them in order.

**Worth knowing:** this is essentially Passport.js. Being able to say "Passport strategies are the
Strategy pattern, and each route picks which list to use" is a strong concrete answer.

**Design note:** strategies return a result object rather than throwing, which is what lets the
context cleanly fall through to the next one. Throwing for control flow would make the loop much
uglier.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/strategy/example2/index.ts`
