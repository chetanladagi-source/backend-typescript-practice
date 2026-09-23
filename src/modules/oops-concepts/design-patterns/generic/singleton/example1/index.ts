// Singleton (generic) — Example 1: a parking lot with one shared instance.

export class ParkingLot {
  private static instance?: ParkingLot;

  public readonly capacity: number;
  private occupied: number = 0;

  // Private constructor: `new ParkingLot()` from outside is a compile error.
  private constructor(capacity: number) {
    this.capacity = capacity;
  }

  public static getInstance(): ParkingLot {
    if (ParkingLot.instance === undefined) {
      // Constructed on first use, so the setup cost is only paid if someone asks.
      ParkingLot.instance = new ParkingLot(100);
      console.log("  [ParkingLot] instance created");
    }
    return ParkingLot.instance;
  }

  public park(plate: string): boolean {
    if (this.occupied >= this.capacity) {
      console.log(`  refused ${plate}: full`);
      return false;
    }
    this.occupied += 1;
    console.log(`  parked ${plate}  (${this.occupied}/${this.capacity})`);
    return true;
  }

  public leave(plate: string): void {
    this.occupied = Math.max(0, this.occupied - 1);
    console.log(`  ${plate} left    (${this.occupied}/${this.capacity})`);
  }

  public free(): number {
    return this.capacity - this.occupied;
  }
}

// ---- Demo ----

// Three different "parts of the app" ask for the parking lot.
const entryGate: ParkingLot = ParkingLot.getInstance();
const exitGate: ParkingLot = ParkingLot.getInstance();
const display: ParkingLot = ParkingLot.getInstance();

console.log("same instance?", entryGate === exitGate && exitGate === display);

// Anything done through one reference is visible through the others.
entryGate.park("KA-01-1234");
entryGate.park("KA-01-5678");
console.log("display sees:", display.free(), "free spots");

exitGate.leave("KA-01-1234");
console.log("display sees:", display.free(), "free spots");
