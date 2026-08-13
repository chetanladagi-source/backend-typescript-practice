// Only renders a payslip.

import { Employee } from "./employee";

export class PayslipPrinter {
  public print(employee: Employee): void {
    console.log("[printer] PAYSLIP " + employee.name());
    console.log("[printer]   annual: " + employee.annualSalary().toFixed(2));
    console.log("[printer]   bonus:  " + employee.bonus().toFixed(2));
  }
}
