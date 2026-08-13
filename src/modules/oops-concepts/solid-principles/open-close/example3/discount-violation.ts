// Violating design: pricing rules chained behind if-else on customer type.

export class LegacyDiscountService {
  // OCP violation: a new customer tier means editing this if-else chain.
  public finalPrice(customerType: string, amount: number): number {
    if (customerType === "regular") {
      return amount * 0.95;
    } else if (customerType === "premium") {
      return amount * 0.85;
    } else {
      console.log(`No discount rule for: ${customerType}`);
      return amount;
    }
  }
}
