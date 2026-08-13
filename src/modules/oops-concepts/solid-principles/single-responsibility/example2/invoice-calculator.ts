// Only performs invoice money math.

import { InvoiceLine } from "./invoice-violation";

export class InvoiceCalculator {
  public constructor(private readonly taxRate: number) {}

  public subtotal(lines: InvoiceLine[]): number {
    return lines.reduce((sum: number, line: InvoiceLine) => sum + line.unitPrice * line.quantity, 0);
  }

  public tax(lines: InvoiceLine[]): number {
    return this.subtotal(lines) * this.taxRate;
  }

  public grandTotal(lines: InvoiceLine[]): number {
    return this.subtotal(lines) + this.tax(lines);
  }
}
