# Example 1 — Wrapping a legacy payment gateway

**Problem:** the app is written against a clean `PaymentProcessor.charge(amount, currency,
description)` interface. A newly integrated third-party gateway exposes
`doPayment({ paise, curr, memo })` and returns `{ status, ref, reason }`. You can either sprinkle
"if legacy, do it differently" branches across every caller, or write one adapter.

**Pattern:** `LegacyGatewayAdapter implements PaymentProcessor`, holds the legacy object as a
private field, and translates the calls in both directions. The rest of the app never mentions
`LegacyGateway`.

**Two responsibilities the adapter owns, both worth naming:**

- **Shape translation.** Different method name, different field names, different result shape.
  This is the obvious half of the pattern.
- **Unit conversion.** The modern side takes rupees, the legacy side takes paise. That
  `* 100` sitting inside the adapter is the reason `runInvoice()` can be written without any
  awareness of gateway-specific quirks. Every unit mismatch that leaks past this line becomes a
  bug somewhere else — the adapter is the *one place* it can be caught.

**Adapter vs Facade — the classic exam question:** an Adapter makes an existing object satisfy a
*specific interface* it did not originally satisfy. A Facade offers a *simpler* interface over a
complicated subsystem. Adapter is about compatibility; Facade is about convenience.

**Frontend note:** the same pattern in a React codebase is often called an *anti-corruption layer*
— a hand-written mapping from a messy backend DTO into a clean view model, so the ugliness of the
API never reaches the components.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/adapter/example1/index.ts`
