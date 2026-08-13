// Bonus eligibility is a capability, not a universal employee trait.

import { Employee } from "./employee";

export interface BonusEligible extends Employee {
  calculateBonus(): number;
}

export function isBonusEligible(employee: Employee): employee is BonusEligible {
  return typeof (employee as BonusEligible).calculateBonus === "function";
}
