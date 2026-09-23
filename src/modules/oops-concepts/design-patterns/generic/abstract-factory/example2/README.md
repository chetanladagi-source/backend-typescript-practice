# Example 2 — Country-specific employee onboarding kits

**Problem:** a hire in India needs Aadhaar, INR payroll with TDS, and ESI/EPF. A hire in the US
needs an SSN/I-9, USD payroll with W-4 withholding, and health + 401(k). Three independent
factories can still produce Aadhaar + W-4 + 401(k) — a combination that type-checks and fails
payroll on day one.

**Pattern:** `CountryKit` is one factory with three product methods. `IndiaKit` and `UsKit` each
return a matched family. `onboard()` talks only to the kit, so it cannot mix countries.

**What this adds over example 1:** the family has three products, not two, and the "family" is a
real compliance boundary — identity, tax and benefits are legally tied to a country. That is a
stronger interview answer than "the cup should match the drink", because you can name the
production bug the pattern prevents.

**The demo cannot produce a mismatch.** `onboard(new IndiaKit(), ...)` will never call
`UsdPayroll`. Those classes are not imported at the call site. The only way to get a mixed kit
would be to write a third factory that mixes them on purpose — which is a review finding, not an
accident.

**Cost, same as example 1:** adding a fourth product (`createTaxForm()`) means editing every kit.
Fine here, because a country's onboarding family changes slowly. If you needed a fifth country
every quarter, you would start generating kits from config rather than adding classes.

Run: `npx tsx src/modules/oops-concepts/design-patterns/generic/abstract-factory/example2/index.ts`
