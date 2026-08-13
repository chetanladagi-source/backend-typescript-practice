// Runnable entry point contrasting the god class with the SRP version.

import { InvoiceCalculator } from "./invoice-calculator";
import { InvoiceFormatter } from "./invoice-formatter";
import { InvoiceGod, InvoiceLine } from "./invoice-violation";
import { InvoiceMailer } from "./invoice-mailer";
import { InvoiceRepository } from "./invoice-repository";
import { InvoiceService } from "./invoice-service";

const customer: string = "grace@example.com";
const lines: InvoiceLine[] = [
  { description: "Keyboard", unitPrice: 2500, quantity: 2 },
  { description: "Mouse", unitPrice: 900, quantity: 1 }
];

console.log("=== Violation ===");
new InvoiceGod(customer, lines).process();

console.log("=== SRP applied ===");
const service: InvoiceService = new InvoiceService(
  new InvoiceCalculator(0.18),
  new InvoiceFormatter(),
  new InvoiceRepository(),
  new InvoiceMailer()
);
console.log(service.issue(customer, lines));
