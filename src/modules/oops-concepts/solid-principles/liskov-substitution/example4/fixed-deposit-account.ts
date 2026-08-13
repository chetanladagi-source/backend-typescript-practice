// Locked account that never advertises withdrawal.

import { Account } from "./account";

export class FixedDepositAccount implements Account {
  private balance: number;

  public constructor(
    public readonly id: string,
    openingBalance: number,
    public readonly maturityYear: number
  ) {
    this.balance = openingBalance;
  }

  public deposit(amount: number): void {
    this.balance += amount;
  }

  public getBalance(): number {
    return this.balance;
  }

  public projectedMaturityValue(): number {
    return Math.round(this.balance * 1.07);
  }
}
