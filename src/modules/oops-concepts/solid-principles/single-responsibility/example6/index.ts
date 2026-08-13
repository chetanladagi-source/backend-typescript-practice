// Runnable entry point contrasting the god class with the SRP version.

import { Employee } from "./employee";
import { EmployeeData, EmployeeGod } from "./employee-violation";
import { EmployeeRepository } from "./employee-repository";
import { PayrollService } from "./payroll-service";
import { PayslipPrinter } from "./payslip-printer";

const data: EmployeeData = { id: "E-1", name: "Linus", monthlySalary: 90000, yearsOfService: 6 };

console.log("=== Violation ===");
const god: EmployeeGod = new EmployeeGod(data);
god.save();
god.printPayslip();

console.log("=== SRP applied ===");
const repository: EmployeeRepository = new EmployeeRepository();
const service: PayrollService = new PayrollService(repository, new PayslipPrinter());
service.onboard(new Employee(data));
console.log("[service] stored employees:", repository.count());
