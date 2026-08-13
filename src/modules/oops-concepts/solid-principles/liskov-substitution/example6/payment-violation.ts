// LSP violation: CashPayment inherits refund() from OnlinePayment and cannot support it.

export class OnlinePayment {
  protected readonly captured: Map<string, number> = new Map<string, number>();

  public constructor(public readonly gateway: string) {}

  public pay(reference: string, amount: number): void {
    this.captured.set(reference, amount);
    console.log(`${this.gateway} captured ${amount} for ${reference}`);
  }

  public refund(reference: string): number {
    const amount: number | undefined = this.captured.get(reference);
    if (amount === undefined) {
      throw new Error(`Unknown reference ${reference}`);
    }
    this.captured.delete(reference);
    return amount;
  }
}

// Violation: OnlinePayment.refund() promises a refunded amount for any captured reference; cash cannot return one.
export class CashPayment extends OnlinePayment {
  public override refund(_reference: string): number {
    throw new Error("Cash payments cannot be refunded through the gateway");
  }
}

export function reverseOrder(payment: OnlinePayment, reference: string): number {
  console.log(`Reversing ${reference} via ${payment.gateway}`);
  return payment.refund(reference);
}
