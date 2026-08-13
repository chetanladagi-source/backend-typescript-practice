// Abstraction that turns "the current time" into an injectable dependency.

export interface Clock {
  now(): number;
}
