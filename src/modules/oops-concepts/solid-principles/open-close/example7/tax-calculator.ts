// Calculator that applies whichever tax rule it is handed.

import { TaxRule } from "./tax-rule";

export class TaxCalculator {
  public invoice(rule: TaxRule, amount: number): number {
    const tax: number = rule.taxFor(amount);
    const total: number = amount + tax;
    console.log(`${rule.countryCode}: base ${amount}, tax ${tax.toFixed(2)}, total ${total.toFixed(2)}`);
    return total;
  }
}
