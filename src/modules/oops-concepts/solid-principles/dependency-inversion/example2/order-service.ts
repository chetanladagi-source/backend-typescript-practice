// High-level policy: order rules stated in terms of `PaymentGateway`.

import { PaymentGateway, PaymentResult } from "./payment-gateway";

export class OrderService {
  private readonly receipts: string[] = [];

  constructor(private readonly gateway: PaymentGateway) {}

  public placeOrder(orderId: string, amountInCents: number): string {
    const result: PaymentResult = this.gateway.charge(amountInCents, "usd");
    const receipt: string = result.approved
      ? `${orderId} paid (${result.reference})`
      : `${orderId} declined (${result.reference})`;
    this.receipts.push(receipt);
    console.log("[orders]", receipt);
    return receipt;
  }

  public receiptCount(): number {
    return this.receipts.length;
  }
}
