// Capabilities that only living workers have.

export interface Feedable {
  eat(meal: string): void;
}

export interface Restable {
  sleep(hours: number): void;
}
