// Base contract: anything that can carry a rider from A to B.

export interface Vehicle {
  readonly model: string;
  drive(): string;
}
