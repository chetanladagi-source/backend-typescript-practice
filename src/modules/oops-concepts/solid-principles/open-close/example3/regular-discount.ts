// Flat 5% discount for regular customers.

import { DiscountStrategy } from "./discount-strategy";

export class RegularDiscount implements DiscountStrategy {
  public readonly customerType: string = "regular";

  public discountFor(amount: number): number {
    return amount * 0.05;
  }
}
