# Example 2 — Checkout facade (the `useCheckout()` shape)

**Problem:** the checkout page needs the cart store, the pricing service, the address validator, and
the payment SDK. A component wired to all four is untestable, and the totals logic gets duplicated
in the summary sidebar and the sticky mobile footer.

**Pattern:** `CheckoutFacade` exposes `view()` and `submit()`. `view()` returns one derived object
with everything the UI renders — including `canSubmit` and `freeShippingGap`, so the component holds
no business logic at all.

**Why `view()` returns derived values rather than raw stores:** if the facade exposed the cart and
pricing service directly, every consumer would recompute the total, and the sidebar and footer would
eventually disagree. Computing once and handing down plain data is what keeps them in sync.

**The React connection:** this is exactly the shape of a custom hook — `const { total, canSubmit,
submit } = useCheckout()`. Recognising that a custom hook is a facade over several stores is a
strong answer, as is naming the failure mode: when it returns 15 values and runs 400 lines, split
it.

Run: `npx tsx src/modules/oops-concepts/design-patterns/frontend/facade/example2/index.ts`
