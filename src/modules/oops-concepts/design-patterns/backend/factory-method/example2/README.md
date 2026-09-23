# Example 2 — Payment gateway (true Factory Method)

**Problem:** the checkout flow is identical everywhere, but which gateway to use depends on the
region.

**Pattern:** this is the GoF form, not the "static method with a switch" form. `CheckoutService`
owns the workflow and declares `protected abstract createGateway()`. Each subclass answers only
that one question.

**Interview angle:** if asked to distinguish Factory Method from Simple Factory, this is the
example to draw — the variation point is a *subclass override*, so the creator itself never needs
editing when a region is added.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/factory-method/example2/index.ts`
