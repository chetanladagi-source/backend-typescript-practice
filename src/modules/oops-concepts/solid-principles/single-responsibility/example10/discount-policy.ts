// Only applies coupon rules to an amount.

export class DiscountPolicy {
  public apply(subtotal: number, couponCode: string): number {
    if (couponCode === "SAVE10") {
      return subtotal * 0.9;
    }
    if (couponCode === "FLAT100" && subtotal > 100) {
      return subtotal - 100;
    }
    return subtotal;
  }
}
