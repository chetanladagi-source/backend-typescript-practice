// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyBonusCalculator, LegacyEmployee } from "./bonus-violation";
import { Employee } from "./employee";
import { Developer } from "./developer";
import { Manager } from "./manager";
import { Intern } from "./intern";
import { PayrollService } from "./payroll-service";

console.log("=== Violation ===");
const legacy: LegacyBonusCalculator = new LegacyBonusCalculator();
const legacyStaff: LegacyEmployee[] = [
  { name: "Asha", role: "developer", baseSalary: 90000 },
  { name: "Vikram", role: "manager", baseSalary: 120000 },
  { name: "Riya", role: "intern", baseSalary: 20000 },
];
for (const employee of legacyStaff) {
  console.log(`${employee.name} bonus = ${legacy.bonus(employee).toFixed(2)}`);
}

console.log("\n=== OCP applied ===");
const payroll: PayrollService = new PayrollService();
const staff: Employee[] = [new Developer("Asha", 90000), new Manager("Vikram", 120000)];
payroll.run(staff);

console.log("\n=== Extension without modification ===");
payroll.run([...staff, new Intern("Riya", 20000)]);
