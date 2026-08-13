// New discount rule added later without touching any existing file.

import { DiscountStrategy } from "./discount-strategy";

export class EmployeeDiscount implements DiscountStrategy {
  public readonly customerType: string = "employee";

  public discountFor(amount: number): number {
    return amount * 0.3;
  }
}
