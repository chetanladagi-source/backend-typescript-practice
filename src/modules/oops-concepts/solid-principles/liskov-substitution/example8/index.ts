// Runnable entry point: violating design first, then the LSP-compliant design.

import { Employee as BadEmployee, Intern as BadIntern, printPayslip as badPrintPayslip } from "./employee-violation";
import { Developer } from "./developer";
import { Intern } from "./intern";
import { printPayslip } from "./payroll-service";

export function run(): void {
  console.log("=== Violation ===");
  badPrintPayslip(new BadEmployee("Asha", 80000));
  try {
    badPrintPayslip(new BadIntern("Ravi", 20000));
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  printPayslip(new Developer("Asha", 80000));
  const intern: Intern = new Intern("Ravi", 20000, 6);
  printPayslip(intern);
  console.log(intern.certificateTitle());
}

run();
