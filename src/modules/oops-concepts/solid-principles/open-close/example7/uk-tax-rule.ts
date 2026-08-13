// New country rule added later without touching any existing file.

import { TaxRule } from "./tax-rule";

export class UkTaxRule implements TaxRule {
  public readonly countryCode: string = "UK";

  public taxFor(amount: number): number {
    return amount * 0.2;
  }
}
