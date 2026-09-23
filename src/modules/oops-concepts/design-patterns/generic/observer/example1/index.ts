// Observer (generic) — Example 1: parking lot notifies its subscribers on occupancy change.

interface OccupancyEvent {
  free: number;
  total: number;
  changedBy: "arrived" | "left";
}

// The OBSERVER interface. Every listener implements this.
export interface OccupancyObserver {
  readonly name: string;
  onOccupancyChange(event: OccupancyEvent): void;
}

// The SUBJECT. Keeps a set of observers; adds and removes them; notifies on change.
export class ParkingLot {
  private readonly observers: Set<OccupancyObserver> = new Set<OccupancyObserver>();
  private free: number;

  constructor(private readonly total: number) {
    this.free = total;
  }

  // subscribe returns an unsubscribe function — the idiomatic shape in JS,
  // so callers do not have to hold on to the observer reference to remove it.
  public subscribe(observer: OccupancyObserver): () => void {
    this.observers.add(observer);
    console.log(`  [ParkingLot] ${observer.name} subscribed (total: ${this.observers.size})`);
    return (): void => {
      this.observers.delete(observer);
      console.log(`  [ParkingLot] ${observer.name} unsubscribed (total: ${this.observers.size})`);
    };
  }

  public park(): void {
    if (this.free === 0) {
      return;
    }
    this.free -= 1;
    this.notify({ free: this.free, total: this.total, changedBy: "arrived" });
  }

  public leave(): void {
    if (this.free === this.total) {
      return;
    }
    this.free += 1;
    this.notify({ free: this.free, total: this.total, changedBy: "left" });
  }

  private notify(event: OccupancyEvent): void {
    // Copy the set before iterating — a listener could unsubscribe during its own callback.
    // Wrap each call: one broken observer MUST NOT stop the others.
    [...this.observers].forEach((observer: OccupancyObserver): void => {
      try {
        observer.onOccupancyChange(event);
      } catch (err) {
        console.log(`  [ParkingLot] ${observer.name} threw: ${(err as Error).message}`);
      }
    });
  }
}

// Concrete observers.
class DisplayBoard implements OccupancyObserver {
  public readonly name: string = "DisplayBoard";
  public onOccupancyChange(event: OccupancyEvent): void {
    console.log(`    <Display> ${event.free}/${event.total} free`);
  }
}

class MobileApp implements OccupancyObserver {
  public readonly name: string = "MobileApp";
  public onOccupancyChange(event: OccupancyEvent): void {
    if (event.free === 0) {
      console.log("    <Mobile> pushing notification: lot is now FULL");
    } else if (event.changedBy === "left" && event.free === 1) {
      console.log("    <Mobile> pushing notification: one spot just opened");
    }
  }
}

// Deliberately broken to demonstrate error isolation.
class BrokenAnalytics implements OccupancyObserver {
  public readonly name: string = "BrokenAnalytics";
  public onOccupancyChange(): void {
    throw new Error("analytics endpoint down");
  }
}

// ---- Demo ----

const lot: ParkingLot = new ParkingLot(2);

const stopDisplay: () => void = lot.subscribe(new DisplayBoard());
lot.subscribe(new MobileApp());
lot.subscribe(new BrokenAnalytics());

console.log("\ncar arrives:");
lot.park();
console.log("\nsecond car arrives (lot becomes full):");
lot.park();
console.log("\none car leaves:");
lot.leave();

console.log("\ndisplay board unsubscribes:");
stopDisplay();
console.log("\nanother car arrives (display should not react):");
lot.park();
