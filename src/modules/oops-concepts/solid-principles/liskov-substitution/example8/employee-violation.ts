// LSP violation: Intern inherits calculateBonus() from Employee and throws.

export class Employee {
  public constructor(
    public readonly name: string,
    protected readonly monthlySalary: number
  ) {}

  public calculateAnnualPay(): number {
    return this.monthlySalary * 12;
  }

  public calculateBonus(): number {
    return Math.round(this.monthlySalary * 0.1);
  }
}

// Violation: Employee.calculateBonus() promises a number for every employee; Intern refuses to return one.
export class Intern extends Employee {
  public override calculateBonus(): number {
    throw new Error(`${this.name} is an intern and has no bonus scheme`);
  }
}

export function printPayslip(employee: Employee): number {
  const total: number = employee.calculateAnnualPay() + employee.calculateBonus();
  console.log(`${employee.name} total compensation: ${total}`);
  return total;
}
