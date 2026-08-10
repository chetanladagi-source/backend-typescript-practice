export class BankAccount {
  protected balance: number;
  static type = "Small Finance";

  constructor(initialBalance: number) {
    this.balance = initialBalance;
  }

  deposit(amount: number): void {
    this.balance += amount;
  }

  getBalance(): number {
    return this.balance;
  }

  getBankType() {
    return BankAccount.type;
  }
}
