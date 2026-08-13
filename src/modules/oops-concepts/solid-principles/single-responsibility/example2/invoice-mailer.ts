// Only delivers an invoice document to a customer.

export class InvoiceMailer {
  public send(customerEmail: string, document: string): void {
    console.log("[mailer] emailed invoice to", customerEmail, "-", document.length, "chars");
  }
}
