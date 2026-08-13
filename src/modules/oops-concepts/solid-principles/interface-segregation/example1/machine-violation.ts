// Fat office-machine contract kept as the "before" picture.

export interface Machine {
  print(document: string): void;
  scan(document: string): string;
  fax(document: string, number: string): void;
}

// ISP violation: a print-only device is forced to implement scan and fax.
export class SimplePrinterViolation implements Machine {
  public print(document: string): void {
    console.log("[violation-printer] printing:", document);
  }

  public scan(document: string): string {
    throw new Error(`SimplePrinter cannot scan "${document}"`);
  }

  public fax(document: string, number: string): void {
    throw new Error(`SimplePrinter cannot fax "${document}" to ${number}`);
  }
}
