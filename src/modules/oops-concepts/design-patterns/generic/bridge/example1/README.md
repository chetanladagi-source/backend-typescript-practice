# Example 1 — Payment kinds × gateways without exponential subclasses

**Problem:** there are three payment *kinds* (one-off, subscription, refund) and three *gateways*
(Stripe, Razorpay, PayPal). The naive design is `OneOffStripe`, `SubscriptionStripe`,
`RefundStripe`, `OneOffRazorpay`, ... — nine classes. Adding a fourth gateway means three more; a
fourth kind adds four. That is the M×N growth curve Bridge exists to fix.

**Pattern:** split the two axes.

- **Abstraction:** `Payment` (with `OneOff`, `Subscription`, `Refund` subclasses) — the *what*.
- **Implementation:** `PaymentGateway` (with `Stripe`, `Razorpay`, `PayPal`) — the *how*.

`Payment` holds a `PaymentGateway` by reference. Composing an instance picks one from each axis at
runtime.

**Count the classes.** Six classes cover nine behaviours. Adding a fourth gateway is *one* new
class and *zero* edits to the kinds. Adding a fourth kind is *one* class and *zero* edits to the
gateways. That is the M+N vs M×N argument in numbers.

**Bridge vs Adapter — the follow-up question:** an Adapter fits an *existing* object to an
interface it did not originally satisfy — the compatibility layer is written after the fact. A
Bridge is designed *up front* to keep two axes independent. Same mechanism (composition over
inheritance), different intent.

**When it does NOT pay off:** if one axis has only one implementation, the abstraction/implementor
split is overhead for nothing. Add the Bridge on the day the second implementation lands, not on
speculation.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/bridge/example1/index.ts`
