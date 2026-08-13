// Payment method that fully supports refunds.

import { Refundable } from "./refundable";

export class CardPayment implements Refundable {
  public readonly gateway: string = "CardGateway";
  private readonly captured: Map<string, number> = new Map<string, number>();

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
