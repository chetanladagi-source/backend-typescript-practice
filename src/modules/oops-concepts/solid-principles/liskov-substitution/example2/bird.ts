// Base abstraction holding only behaviour every bird supports.

export interface Bird {
  readonly species: string;
  eat(): void;
}
