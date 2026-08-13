// LSP violation: FixedDepositAccount inherits withdraw() from BankAccount and rejects it.

export class BankAccount {
  protected balance: number;

  public constructor(public readonly id: string, openingBalance: number) {
    this.balance = openingBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public withdraw(amount: number): number {
    if (amount > this.balance) {
      throw new Error(`Insufficient funds in ${this.id}`);
    }
    this.balance -= amount;
    return this.balance;
  }

  public getBalance(): number {
    return this.balance;
  }
}

// Violation: BankAccount.withdraw() promises a debit for any affordable amount; this subtype always refuses.
export class FixedDepositAccount extends BankAccount {
  public override withdraw(_amount: number): number {
    throw new Error(`Fixed deposit ${this.id} is locked until maturity`);
  }
}

export function payUtilityBill(account: BankAccount, amount: number): number {
  console.log(`Debiting ${amount} from ${account.id}`);
  return account.withdraw(amount);
}
