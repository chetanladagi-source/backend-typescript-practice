// Mediator (generic) — Example 1: gates, spots and display coordinated via one mediator.

// COLLEAGUES: none of them know about each other. They only know the mediator.
class EntryGate {
  constructor(private readonly mediator: ParkingLotMediator, public readonly id: string) {}
  public arrive(plate: string): void {
    console.log(`\n[Entry ${this.id}] ${plate} arrived`);
    this.mediator.requestEntry(this.id, plate);
  }
  public open(plate: string, spot: number): void {
    console.log(`[Entry ${this.id}] gate opens, ${plate} -> spot ${spot}`);
  }
  public deny(plate: string, reason: string): void {
    console.log(`[Entry ${this.id}] gate stays closed for ${plate}: ${reason}`);
  }
}

class ExitGate {
  constructor(private readonly mediator: ParkingLotMediator, public readonly id: string) {}
  public leave(plate: string, spot: number): void {
    console.log(`\n[Exit ${this.id}] ${plate} leaving from spot ${spot}`);
    this.mediator.requestExit(this.id, plate, spot);
  }
}

class SpotManager {
  private readonly total: number;
  private readonly free: Set<number>;
  private readonly occupancy: Map<string, number> = new Map<string, number>();

  constructor(total: number) {
    this.total = total;
    this.free = new Set<number>(Array.from({ length: total }, (_: unknown, i: number): number => i + 1));
  }

  public claimSpot(plate: string): number | undefined {
    const [next] = this.free;
    if (next === undefined) {
      return undefined;
    }
    this.free.delete(next);
    this.occupancy.set(plate, next);
    return next;
  }

  public releaseSpot(plate: string, spot: number): void {
    this.free.add(spot);
    this.occupancy.delete(plate);
  }

  public freeCount(): number {
    return this.free.size;
  }

  public totalCount(): number {
    return this.total;
  }
}

class DisplayBoard {
  public update(free: number, total: number): void {
    console.log(`[Display] ${free}/${total} spots free`);
  }
}

// THE MEDIATOR. The ONLY object that knows the whole cast.
export class ParkingLotMediator {
  constructor(
    private readonly spots: SpotManager,
    private readonly display: DisplayBoard,
    private readonly entries: Map<string, EntryGate> = new Map<string, EntryGate>(),
    private readonly exits: Map<string, ExitGate> = new Map<string, ExitGate>(),
  ) {}

  public registerEntry(gate: EntryGate): void {
    this.entries.set(gate.id, gate);
  }

  public registerExit(gate: ExitGate): void {
    this.exits.set(gate.id, gate);
  }

  public requestEntry(gateId: string, plate: string): void {
    const gate: EntryGate | undefined = this.entries.get(gateId);
    if (gate === undefined) {
      return;
    }
    const spot: number | undefined = this.spots.claimSpot(plate);
    if (spot === undefined) {
      gate.deny(plate, "lot is full");
      return;
    }
    gate.open(plate, spot);
    this.display.update(this.spots.freeCount(), this.spots.totalCount());
  }

  public requestExit(gateId: string, plate: string, spot: number): void {
    this.spots.releaseSpot(plate, spot);
    this.display.update(this.spots.freeCount(), this.spots.totalCount());
  }
}

// ---- Demo ----

const mediator: ParkingLotMediator = new ParkingLotMediator(new SpotManager(3), new DisplayBoard());
const entryNorth: EntryGate = new EntryGate(mediator, "N");
const entrySouth: EntryGate = new EntryGate(mediator, "S");
const exitMain: ExitGate = new ExitGate(mediator, "M");
mediator.registerEntry(entryNorth);
mediator.registerEntry(entrySouth);
mediator.registerExit(exitMain);

entryNorth.arrive("KA-01-1111");
entrySouth.arrive("KA-01-2222");
entryNorth.arrive("KA-01-3333");
entrySouth.arrive("KA-01-4444"); // lot full — the mediator says so, the gate merely obeys

exitMain.leave("KA-01-2222", 2);
entrySouth.arrive("KA-01-5555");
