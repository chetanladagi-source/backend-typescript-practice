// Only orchestrates totals, discounts and payment.

import { CartTotalsCalculator } from "./cart-totals-calculator";
import { DiscountPolicy } from "./discount-policy";
import { PaymentProcessor } from "./payment-processor";
import { ShoppingCart } from "./shopping-cart";

export class CheckoutService {
  public constructor(
    private readonly calculator: CartTotalsCalculator,
    private readonly discounts: DiscountPolicy,
    private readonly payments: PaymentProcessor
  ) {}

  public checkout(cart: ShoppingCart, couponCode: string): boolean {
    const subtotal: number = this.calculator.subtotal(cart.lines());
    const payable: number = this.discounts.apply(subtotal, couponCode);
    console.log("[checkout] subtotal:", subtotal.toFixed(2), "payable:", payable.toFixed(2));
    return this.payments.charge(payable);
  }
}
