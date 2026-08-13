// New payment method added later without touching any existing file.

import { PaymentMethod } from "./payment-method";

export class WalletPayment implements PaymentMethod {
  public readonly name: string = "wallet";

  public constructor(private readonly walletId: string) {}

  public pay(amount: number): void {
    console.log(`Debited ${amount} from wallet ${this.walletId}`);
  }
}
