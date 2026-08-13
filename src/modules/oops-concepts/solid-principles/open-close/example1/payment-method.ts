// Abstraction that every payment method implements.

export interface PaymentMethod {
  readonly name: string;
  pay(amount: number): void;
}
