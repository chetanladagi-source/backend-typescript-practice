// Abstraction the checkout policy depends on.

export interface PaymentResult {
  reference: string;
  approved: boolean;
}

export interface PaymentGateway {
  charge(amountInCents: number, currency: string): PaymentResult;
}
