// Device that genuinely supports every capability, so it opts into all three contracts.

import { FaxMachine } from "./fax-machine";
import { Printer } from "./printer";
import { Scanner } from "./scanner";

export class AllInOnePrinter implements Printer, Scanner, FaxMachine {
  public print(document: string): void {
    console.log("[all-in-one] printing:", document);
  }

  public scan(document: string): string {
    const scanned: string = `scan-of(${document})`;
    console.log("[all-in-one] scanned to:", scanned);
    return scanned;
  }

  public fax(document: string, number: string): void {
    console.log("[all-in-one] faxing", document, "to", number);
  }
}
