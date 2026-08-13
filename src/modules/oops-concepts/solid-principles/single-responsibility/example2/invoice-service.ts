// Only orchestrates calculating, rendering, storing and sending an invoice.

import { InvoiceCalculator } from "./invoice-calculator";
import { InvoiceFormatter } from "./invoice-formatter";
import { InvoiceLine } from "./invoice-violation";
import { InvoiceMailer } from "./invoice-mailer";
import { InvoiceRepository } from "./invoice-repository";

export class InvoiceService {
  public constructor(
    private readonly calculator: InvoiceCalculator,
    private readonly formatter: InvoiceFormatter,
    private readonly repository: InvoiceRepository,
    private readonly mailer: InvoiceMailer
  ) {}

  public issue(customerEmail: string, lines: InvoiceLine[]): string {
    const document: string = this.formatter.format(
      customerEmail,
      lines,
      this.calculator.tax(lines),
      this.calculator.grandTotal(lines)
    );
    this.repository.save(document);
    this.mailer.send(customerEmail, document);
    return document;
  }
}
