# Example 1 — Legacy payment SDK

**Problem:** the vendor SDK wants rupees as a string and an ISO-4217 *numeric* currency code, and
returns `STATUS=OK|TXN=...`. Our codebase works in paise and plain objects.

**Pattern:** `LegacyPaymentAdapter` implements our `PaymentProcessor`, holds the SDK, and
translates in *both* directions — request going in, response coming out. The two-way translation is
the part people forget.

**Takeaway:** `checkout()` is written once and works with the legacy SDK and with Stripe, which
already fits the target interface and therefore needs no adapter at all.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/adapter/example1/index.ts`
