# Example 2 — Cart items: tax, invoice, shipping

**Problem:** physical goods, digital downloads, and services are taxed differently, render
differently on an invoice, and contribute differently to shipping weight. Three concerns × three
types on the item classes is nine methods in the wrong place.

**Pattern:** three visitors. Tax rules live entirely in `TaxVisitor`, which means the tax logic can
be reviewed, tested, and changed by itself when the rates change.

**Notice `ShippingWeightVisitor`:** two of its three methods just return 0. That is normal and it is
the point — the visitor states explicitly that digital items and services do not ship, rather than
that fact being implied by a missing method somewhere.

**Also notice `sum()`:** because every visitor returns a number, aggregation is one generic helper
rather than a loop per concern.

Run: `npx tsx src/modules/oops-concepts/design-patterns/backend/visitor/example2/index.ts`
