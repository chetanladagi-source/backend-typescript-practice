// Strategy (generic) — Example 1: interchangeable payment methods at checkout.

export interface PaymentStrategy {
  readonly name: string;
  pay(amount: number): void;
}

class CardPayment implements PaymentStrategy {
  public readonly name: string = "Card";
  constructor(private readonly last4: string) {}

  public pay(amount: number): void {
    console.log(`    [Card ****${this.last4}] charging Rs.${amount} + 2% gateway fee`);
    console.log(`    captured Rs.${Math.round(amount * 1.02)}`);
  }
}

class UpiPayment implements PaymentStrategy {
  public readonly name: string = "UPI";
  constructor(private readonly vpa: string) {}

  public pay(amount: number): void {
    console.log(`    [UPI ${this.vpa}] collecting Rs.${amount} (no fee)`);
    console.log("    instant settlement");
  }
}

class WalletPayment implements PaymentStrategy {
  public readonly name: string = "Wallet";
  constructor(private balance: number) {}

  public pay(amount: number): void {
    if (amount > this.balance) {
      console.log(`    [Wallet] declined — balance Rs.${this.balance}`);
      return;
    }
    this.balance -= amount;
    console.log(`    [Wallet] deducted Rs.${amount} (left Rs.${this.balance})`);
  }
}

// CONTEXT. Holds a strategy and can swap it at runtime.
export class Checkout {
  constructor(private strategy: PaymentStrategy) {}

  public setStrategy(next: PaymentStrategy): void {
    console.log(`  switched ${this.strategy.name} -> ${next.name}`);
    this.strategy = next;
  }

  public pay(amount: number): void {
    console.log(`  checkout Rs.${amount} via ${this.strategy.name}`);
    this.strategy.pay(amount);
  }
}

// ---- Demo ----

const checkout: Checkout = new Checkout(new CardPayment("4242"));
checkout.pay(1500);

console.log("\ncustomer picks UPI instead:");
checkout.setStrategy(new UpiPayment("ada@upi"));
checkout.pay(1500);

console.log("\nthen tries the wallet:");
checkout.setStrategy(new WalletPayment(800));
checkout.pay(1500); // declined
checkout.pay(500); // ok

// Adding "BNPL" is one new class. Checkout never changes.
// That is Strategy vs a growing `if (method === ...)` inside pay().
