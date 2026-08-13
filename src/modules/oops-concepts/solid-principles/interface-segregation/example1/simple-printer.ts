// Device that only promises what it can do.

import { Printer } from "./printer";

export class SimplePrinter implements Printer {
  public print(document: string): void {
    console.log("[simple-printer] printing:", document);
  }
}
