// Only turns invoice data into printable text.

import { InvoiceLine } from "./invoice-violation";

export class InvoiceFormatter {
  public format(customerEmail: string, lines: InvoiceLine[], tax: number, grandTotal: number): string {
    const rows: string[] = lines.map(
      (line: InvoiceLine) =>
        "  " + line.description + " x" + String(line.quantity) + " = " + (line.unitPrice * line.quantity).toFixed(2)
    );
    return [
      "INVOICE for " + customerEmail,
      ...rows,
      "  tax: " + tax.toFixed(2),
      "  total: " + grandTotal.toFixed(2)
    ].join("\n");
  }
}
