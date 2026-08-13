// Consumer that adds a bonus only when the employee is eligible.

import { Employee } from "./employee";
import { BonusEligible, isBonusEligible } from "./bonus-eligible";

export function calculateBonusPayout(employee: BonusEligible): number {
  return employee.calculateBonus();
}

export function printPayslip(employee: Employee): number {
  const bonus: number = isBonusEligible(employee) ? calculateBonusPayout(employee) : 0;
  const total: number = employee.calculateAnnualPay() + bonus;
  console.log(`${employee.name} total compensation: ${total} (bonus ${bonus})`);
  return total;
}
