// Abstraction that every country tax rule implements.

export interface TaxRule {
  readonly countryCode: string;
  taxFor(amount: number): number;
}
