// Indian GST rule.

import { TaxRule } from "./tax-rule";

export class IndiaTaxRule implements TaxRule {
  public readonly countryCode: string = "IN";

  public taxFor(amount: number): number {
    return amount * 0.18;
  }
}
