# Example 1 — Notification channel

**Problem:** `if (channel === "sms") ... else if (channel === "email") ...` was copy-pasted into
every service that sends a message.

**Pattern:** `NotifierFactory.create()` owns the only `switch`. `notifyUser` depends on the
`Notifier` interface, so adding WhatsApp means one new class and one new `case`.

**Note:** TypeScript checks the `switch` is exhaustive because `Channel` is a union — forget a
case and it fails to compile. That is a nice safety net the plain-JS version does not get.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/factory-method/example1/index.ts`
