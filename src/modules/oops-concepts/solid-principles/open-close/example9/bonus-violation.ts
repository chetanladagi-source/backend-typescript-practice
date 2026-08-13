// Violating design: payroll branching on an employee role string.

export interface LegacyEmployee {
  name: string;
  role: string;
  baseSalary: number;
}

export class LegacyBonusCalculator {
  // OCP violation: a new role means editing this if-else chain.
  public bonus(employee: LegacyEmployee): number {
    if (employee.role === "developer") {
      return employee.baseSalary * 0.1;
    } else if (employee.role === "manager") {
      return employee.baseSalary * 0.2;
    } else {
      console.log(`No bonus policy for role: ${employee.role}`);
      return 0;
    }
  }
}
