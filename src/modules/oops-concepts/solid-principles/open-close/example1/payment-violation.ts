// Violating design: a single processor that branches on a payment method string.

export class LegacyPaymentProcessor {
  // OCP violation: every new payment method forces an edit to this switch.
  public process(method: string, amount: number): void {
    switch (method) {
      case "credit-card":
        console.log(`Charged ${amount} to the credit card`);
        break;
      case "upi":
        console.log(`Collected ${amount} through UPI`);
        break;
      default:
        console.log(`Unsupported payment method: ${method}`);
        break;
    }
  }
}
