// Withdrawal is a capability, not something every account has.

import { Account } from "./account";

export interface WithdrawableAccount extends Account {
  withdraw(amount: number): number;
}

export function isWithdrawable(account: Account): account is WithdrawableAccount {
  return typeof (account as WithdrawableAccount).withdraw === "function";
}
