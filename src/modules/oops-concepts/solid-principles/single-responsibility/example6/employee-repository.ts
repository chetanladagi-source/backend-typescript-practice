// Only stores and reads employee rows.

import { Employee } from "./employee";
import { EmployeeData } from "./employee-violation";

export class EmployeeRepository {
  private readonly rows: EmployeeData[] = [];

  public save(employee: Employee): void {
    this.rows.push(employee.snapshot());
    console.log("[repository] saved employee", employee.id(), "rows:", this.rows.length);
  }

  public count(): number {
    return this.rows.length;
  }
}
