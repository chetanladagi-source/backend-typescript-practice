# Example 10 — Notification channels

**Scenario:** A single `NotificationService` interface declares `sendEmail`, `sendSms`, `sendPush`
and `sendSlack`, so an integration with only SMTP credentials must implement all four.

**Dead weight:** `sendSms` and `sendSlack` throw on `EmailOnlyServiceViolation`, and `sendPush`
swallows the message silently — an alert that looks delivered but never was.

**Fix:** Define one narrow `NotificationChannel` contract and let each sender own its channel, so
adding a channel means adding a class instead of widening an interface everyone implements.

**Takeaway:** Callers dispatch over `NotificationChannel[]` and stay unaware of transport details,
while every implementer honours every method it declares.
