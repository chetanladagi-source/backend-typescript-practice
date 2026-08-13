// Checkout that applies whichever discount strategy it is handed.

import { DiscountStrategy } from "./discount-strategy";

export class CheckoutService {
  public checkout(strategy: DiscountStrategy, amount: number): number {
    const discount: number = strategy.discountFor(amount);
    const payable: number = amount - discount;
    console.log(
      `${strategy.customerType}: cart ${amount}, discount ${discount.toFixed(2)}, pays ${payable.toFixed(2)}`
    );
    return payable;
  }
}
