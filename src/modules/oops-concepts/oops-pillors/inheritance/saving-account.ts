import { BankAccount } from "./bank-account";

export class SavingsAccount extends BankAccount {
  addInterest(): void {
    this.balance += this.balance * 0.05;
  }
}
