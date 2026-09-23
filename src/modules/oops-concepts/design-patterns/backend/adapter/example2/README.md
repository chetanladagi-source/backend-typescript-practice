# Example 2 — Multiple SMS vendors

**Problem:** Twilio wants `messagesCreate({to, from, body})`, MSG91 wants
`sendSms(numbers, message)` and returns the string `"success"`, SNS wants
`publish({PhoneNumber, Message})`. Business code should not know any of that.

**Pattern:** one thin adapter per vendor, all implementing `SmsSender`.

**The payoff:** `sendWithFailover` is only possible *because* everything looks alike. Once your
integrations share an interface, cross-cutting behaviour like failover, retries, or round-robin
becomes a five-line function instead of per-vendor branching.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/adapter/example2/index.ts`
