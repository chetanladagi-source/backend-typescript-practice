# Example 3 — Shipping notifications

**Scenario:** `NotificationService` tells a customer their order shipped.

**Before:** the arrow pointed `NotificationService -> SmtpClient`. The message wording and the
delivery transport lived in one class, so a new channel forced an edit to the policy.

**After:** the service depends on the `MessageSender` interface. `SmtpEmailSender` and `SmsSender`
implement it and `index.ts` picks the channel per call site.

**Takeaway:** "what to say" and "how to deliver it" change for different reasons. Inverting the
transport turns a new channel into a new file rather than a modified one.
