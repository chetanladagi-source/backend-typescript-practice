# Example 1 — Notification types × channels

**Problem:** three notification types and three channels modelled with inheritance means nine
classes (`UrgentSms`, `ReminderEmail`, ...), and a fourth channel adds three more.

**Pattern:** `Notification` (what to say) holds a `Channel` (how to deliver it). Two hierarchies,
joined by one reference — the "bridge".

**The proof is at the bottom of the demo:** `WebhookChannel` is added as a single class and every
existing notification type can use it immediately, with no edits anywhere else. That is the
concrete payoff to describe in an interview.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/bridge/example1/index.ts`
