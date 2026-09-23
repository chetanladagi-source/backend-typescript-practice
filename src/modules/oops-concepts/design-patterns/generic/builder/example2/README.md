# Example 2 — Employee offer-letter builder

**Problem:** an offer has a required name/role/salary/start date and optional bonus, equity, band
and location. A 7-argument constructor is unreadable, and "remote + relocation bonus" is an
invalid combination that a constructor cannot reject until every field is known.

**Pattern:** `OfferBuilder` takes the identity in the constructor and the rest as chainable
setters. Cross-field rules (`Remote` cannot have a joining bonus; salary and start date are
required) live in `build()`.

**Same fluent shape as the coffee builder**, applied to HR. The point to repeat: validation that
depends on two fields belongs in `build()`, not in a setter.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/builder/example2/index.ts`
