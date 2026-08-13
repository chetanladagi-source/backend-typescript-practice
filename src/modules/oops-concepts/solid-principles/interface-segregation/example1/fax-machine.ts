// Faxing capability only.

export interface FaxMachine {
  fax(document: string, number: string): void;
}
