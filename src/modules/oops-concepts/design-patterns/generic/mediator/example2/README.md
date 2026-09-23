# Example 2 — Coffee-shop counter mediator

**Problem:** the cashier should not import the espresso machine, and the machine should not import
the pickup board. Direct arrows become a web the moment you add loyalty stamps or a second bar.

**Pattern:** `ShopMediator` is the only object that knows the cast. Colleagues call the desk;
the desk calls the next colleague.

**Same Mediator as the parking lot**, smaller cast. The rule to repeat: one mediator per feature
(this counter), not one per company.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/mediator/example2/index.ts`
