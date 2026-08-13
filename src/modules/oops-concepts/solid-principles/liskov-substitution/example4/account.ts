// Base contract shared by every account type.

export interface Account {
  readonly id: string;
  deposit(amount: number): void;
  getBalance(): number;
}
