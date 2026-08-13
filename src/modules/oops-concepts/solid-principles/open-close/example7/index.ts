// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyTaxCalculator } from "./tax-violation";
import { TaxRule } from "./tax-rule";
import { IndiaTaxRule } from "./india-tax-rule";
import { UsTaxRule } from "./us-tax-rule";
import { UkTaxRule } from "./uk-tax-rule";
import { TaxCalculator } from "./tax-calculator";

const amount: number = 1000;

console.log("=== Violation ===");
const legacy: LegacyTaxCalculator = new LegacyTaxCalculator();
for (const country of ["IN", "US", "UK"]) {
  console.log(`${country} tax = ${legacy.tax(country, amount).toFixed(2)}`);
}

console.log("\n=== OCP applied ===");
const calculator: TaxCalculator = new TaxCalculator();
const rules: TaxRule[] = [new IndiaTaxRule(), new UsTaxRule()];
for (const rule of rules) {
  calculator.invoice(rule, amount);
}

console.log("\n=== Extension without modification ===");
calculator.invoice(new UkTaxRule(), amount);
