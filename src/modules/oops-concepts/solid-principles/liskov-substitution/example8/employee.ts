// Base contract: everyone on payroll has a name and annual pay.

export interface Employee {
  readonly name: string;
  calculateAnnualPay(): number;
}
