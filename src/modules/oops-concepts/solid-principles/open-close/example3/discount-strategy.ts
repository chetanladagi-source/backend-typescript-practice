// Abstraction that every discount rule implements.

export interface DiscountStrategy {
  readonly customerType: string;
  discountFor(amount: number): number;
}
