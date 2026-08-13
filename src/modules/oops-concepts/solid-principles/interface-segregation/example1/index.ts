// Runnable entry point contrasting the fat Machine contract with segregated ones.

import { AllInOnePrinter } from "./all-in-one-printer";
import { FaxMachine } from "./fax-machine";
import { Machine, SimplePrinterViolation } from "./machine-violation";
import { Printer } from "./printer";
import { Scanner } from "./scanner";
import { SimplePrinter } from "./simple-printer";

console.log("=== Violation ===");
const fatPrinter: Machine = new SimplePrinterViolation();
fatPrinter.print("quarterly-report.pdf");
try {
  fatPrinter.scan("contract.pdf");
} catch (error) {
  console.log("[violation] scan failed:", (error as Error).message);
}
try {
  fatPrinter.fax("contract.pdf", "+1-555-0100");
} catch (error) {
  console.log("[violation] fax failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const printer: Printer = new SimplePrinter();
printer.print("quarterly-report.pdf");

const allInOne: AllInOnePrinter = new AllInOnePrinter();
const scanner: Scanner = allInOne;
const fax: FaxMachine = allInOne;
scanner.scan("contract.pdf");
fax.fax("contract.pdf", "+1-555-0100");
