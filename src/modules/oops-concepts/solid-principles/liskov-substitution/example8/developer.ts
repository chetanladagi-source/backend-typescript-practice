// Employee on the bonus scheme.

import { BonusEligible } from "./bonus-eligible";

export class Developer implements BonusEligible {
  public constructor(
    public readonly name: string,
    private readonly monthlySalary: number
  ) {}

  public calculateAnnualPay(): number {
    return this.monthlySalary * 12;
  }

  public calculateBonus(): number {
    return Math.round(this.monthlySalary * 0.1);
  }
}
