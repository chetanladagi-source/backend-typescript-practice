// Deterministic implementation of `Clock` that only moves when told to.

import { Clock } from "./clock";

export class FixedClock implements Clock {
  private current: number;

  constructor(startMs: number) {
    this.current = startMs;
  }

  public now(): number {
    return this.current;
  }

  public advanceDays(days: number): void {
    this.current += days * 24 * 60 * 60 * 1_000;
    console.log(`[fixed-clock] advanced ${days} days to ${new Date(this.current).toISOString()}`);
  }
}
