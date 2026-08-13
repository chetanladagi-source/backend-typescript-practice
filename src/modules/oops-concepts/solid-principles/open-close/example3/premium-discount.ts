// Flat 15% discount for premium customers.

import { DiscountStrategy } from "./discount-strategy";

export class PremiumDiscount implements DiscountStrategy {
  public readonly customerType: string = "premium";

  public discountFor(amount: number): number {
    return amount * 0.15;
  }
}
