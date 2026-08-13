// Only moves money.

export class PaymentProcessor {
  public charge(amount: number): boolean {
    if (amount <= 0) {
      console.log("[payment] nothing to charge");
      return false;
    }
    console.log("[payment] charged card for", amount.toFixed(2));
    return true;
  }
}
