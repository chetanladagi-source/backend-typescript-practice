// Fat payment contract that assumes every provider does everything.

export interface PaymentGateway {
  charge(amountCents: number, card: string): string;
  refund(chargeId: string, amountCents: number): void;
  subscribe(customerId: string, planId: string): string;
  payout(accountId: string, amountCents: number): void;
}

// ISP violation: a charge-only provider must implement refunds, subscriptions and payouts.
export class SimpleGatewayViolation implements PaymentGateway {
  public charge(amountCents: number, card: string): string {
    const chargeId: string = `ch_${amountCents}`;
    console.log("[violation-gateway] charged", amountCents, "cents to", card, "->", chargeId);
    return chargeId;
  }

  public refund(chargeId: string, amountCents: number): void {
    throw new Error(`Provider cannot refund ${amountCents} cents on ${chargeId}`);
  }

  public subscribe(customerId: string, planId: string): string {
    throw new Error(`Provider has no subscriptions (${customerId} / ${planId})`);
  }

  public payout(accountId: string, amountCents: number): void {
    console.log(
      "[violation-gateway] payout(",
      accountId,
      amountCents,
      ") is a meaningless no-op here"
    );
  }
}
