// Consumer that only accepts accounts able to be debited.

import { Account } from "./account";
import { WithdrawableAccount, isWithdrawable } from "./withdrawable-account";

export function payUtilityBill(account: WithdrawableAccount, amount: number): number {
  console.log(`Debiting ${amount} from ${account.id}`);
  return account.withdraw(amount);
}

export function tryPayFromAny(account: Account, amount: number): void {
  if (isWithdrawable(account)) {
    console.log(`Remaining balance: ${payUtilityBill(account, amount)}`);
  } else {
    console.log(`${account.id} cannot fund bills; balance stays at ${account.getBalance()}`);
  }
}
