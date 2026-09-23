// Strategy (generic) — Example 2: interchangeable parking-fee algorithms.

export interface FeeStrategy {
  readonly name: string;
  calculate(hours: number): number;
}

class HourlyRate implements FeeStrategy {
  public readonly name: string = "hourly";
  constructor(private readonly perHour: number) {}
  public calculate(hours: number): number {
    return hours * this.perHour;
  }
}

class DailyCap implements FeeStrategy {
  public readonly name: string = "daily-cap";
  constructor(private readonly perHour: number, private readonly cap: number) {}
  public calculate(hours: number): number {
    return Math.min(hours * this.perHour, this.cap);
  }
}

class EarlyBird implements FeeStrategy {
  public readonly name: string = "early-bird";
  constructor(private readonly flat: number, private readonly arrivedBefore: number) {}
  public calculate(hours: number): number {
    // arrivedBefore is the clock hour they entered; a real system would pass a Date.
    return this.arrivedBefore < 9 ? this.flat : hours * 50;
  }
}

// CONTEXT. Holds the strategy; can swap it when the lot changes pricing.
export class ParkingSession {
  constructor(private readonly plate: string, private strategy: FeeStrategy) {}

  public setStrategy(next: FeeStrategy): void {
    console.log(`  ${this.plate}: ${this.strategy.name} -> ${next.name}`);
    this.strategy = next;
  }

  public checkout(hours: number): void {
    const fee: number = this.strategy.calculate(hours);
    console.log(`  ${this.plate}  ${hours}h via ${this.strategy.name}  Rs.${fee}`);
  }
}

// ---- Demo ----

const session: ParkingSession = new ParkingSession("KA-01-1111", new HourlyRate(40));
session.checkout(8);

console.log("\nlot switches to a daily cap for the weekend:");
session.setStrategy(new DailyCap(40, 200));
session.checkout(8); // would have been 320, now capped at 200

console.log("\nearly-bird (arrived 7am):");
new ParkingSession("KA-01-2222", new EarlyBird(80, 7)).checkout(10);

console.log("early-bird (arrived 11am — misses the window):");
new ParkingSession("KA-01-3333", new EarlyBird(80, 11)).checkout(10);
