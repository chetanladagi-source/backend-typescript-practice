// Only the employee business rules.

import { EmployeeData } from "./employee-violation";

export class Employee {
  public constructor(private readonly data: EmployeeData) {}

  public id(): string {
    return this.data.id;
  }

  public name(): string {
    return this.data.name;
  }

  public snapshot(): EmployeeData {
    return { ...this.data };
  }

  public annualSalary(): number {
    return this.data.monthlySalary * 12;
  }

  public bonus(): number {
    return this.data.yearsOfService >= 5 ? this.annualSalary() * 0.1 : 0;
  }
}
