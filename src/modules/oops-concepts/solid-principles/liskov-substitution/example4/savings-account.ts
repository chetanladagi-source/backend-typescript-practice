// Account that honours the full withdrawal contract.

import { WithdrawableAccount } from "./withdrawable-account";

export class SavingsAccount implements WithdrawableAccount {
  private balance: number;

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
