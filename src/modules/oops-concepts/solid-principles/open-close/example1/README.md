# Example 1 - Payment processing

Scenario: a checkout flow must support credit card, UPI and later a wallet.

Violation: `LegacyPaymentProcessor` switches on a method string, so supporting
a wallet means reopening and editing a class that already works and is already
tested. Every new method grows the same switch and risks breaking old branches.

Fix: `PaymentMethod` defines `pay()`, each method lives in its own class, and
`PaymentProcessor` depends only on the interface.

Takeaway: `WalletPayment` is added as a brand new file and plugged in from
`index.ts` - no existing file changes. Open for extension, closed for modification.
