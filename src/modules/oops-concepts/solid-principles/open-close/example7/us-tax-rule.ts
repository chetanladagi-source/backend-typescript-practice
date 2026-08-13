// US sales tax rule.

import { TaxRule } from "./tax-rule";

export class UsTaxRule implements TaxRule {
  public readonly countryCode: string = "US";

  public taxFor(amount: number): number {
    return amount * 0.07;
  }
}
