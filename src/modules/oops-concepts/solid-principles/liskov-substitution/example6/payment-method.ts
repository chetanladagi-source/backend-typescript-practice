// Base contract every payment method can satisfy.

export interface PaymentMethod {
  readonly gateway: string;
  pay(reference: string, amount: number): void;
}
