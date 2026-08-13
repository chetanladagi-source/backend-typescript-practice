// God class for invoicing, kept as the "before" picture.

export interface InvoiceLine {
  description: string;
  unitPrice: number;
  quantity: number;
}

// SRP violation: money math, text layout, storage and delivery share one class.
export class InvoiceGod {
  private readonly saved: string[] = [];

  public constructor(
    private readonly customerEmail: string,
    private readonly lines: InvoiceLine[]
  ) {}

  public process(): void {
    let total: number = 0;
    for (const line of this.lines) {
      total += line.unitPrice * line.quantity;
    }
    const tax: number = total * 0.18;
    const grandTotal: number = total + tax;

    let document: string = "INVOICE for " + this.customerEmail + "\n";
    for (const line of this.lines) {
      document += "  " + line.description + " x" + String(line.quantity) + " = " + (line.unitPrice * line.quantity).toFixed(2) + "\n";
    }
    document += "  tax: " + tax.toFixed(2) + "\n  total: " + grandTotal.toFixed(2);

    this.saved.push(document);
    console.log("[god] persisted invoice, stored count:", this.saved.length);
    console.log("[god] emailed invoice to", this.customerEmail);
    console.log(document);
  }
}
