// Only orchestrates hiring paperwork for an employee.

import { Employee } from "./employee";
import { EmployeeRepository } from "./employee-repository";
import { PayslipPrinter } from "./payslip-printer";

export class PayrollService {
  public constructor(
    private readonly repository: EmployeeRepository,
    private readonly printer: PayslipPrinter
  ) {}

  public onboard(employee: Employee): void {
    this.repository.save(employee);
    this.printer.print(employee);
  }
}
