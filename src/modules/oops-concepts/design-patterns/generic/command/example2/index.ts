// Command (generic) — Example 2: parking lot actions with undo
// (attendant typed the wrong plate).

class Lot {
  private readonly parked: Set<string> = new Set<string>();

  public park(plate: string): void {
    this.parked.add(plate);
  }
  public leave(plate: string): void {
    this.parked.delete(plate);
  }
  public has(plate: string): boolean {
    return this.parked.has(plate);
  }
  public list(): string {
    return [...this.parked].join(", ") || "(empty)";
  }
}

export interface LotCommand {
  readonly label: string;
  execute(): void;
  undo(): void;
}

class ParkCommand implements LotCommand {
  public readonly label: string;
  constructor(private readonly lot: Lot, private readonly plate: string) {
    this.label = `park ${plate}`;
  }
  public execute(): void {
    this.lot.park(this.plate);
  }
  public undo(): void {
    this.lot.leave(this.plate);
  }
}

class LeaveCommand implements LotCommand {
  public readonly label: string;
  constructor(private readonly lot: Lot, private readonly plate: string) {
    this.label = `leave ${plate}`;
  }
  public execute(): void {
    this.lot.leave(this.plate);
  }
  public undo(): void {
    this.lot.park(this.plate);
  }
}

class Desk {
  private readonly history: LotCommand[] = [];
  constructor(private readonly lot: Lot) {}

  public run(command: LotCommand): void {
    command.execute();
    this.history.push(command);
    console.log(`  did   ${command.label.padEnd(16)} | ${this.lot.list()}`);
  }

  public undo(): void {
    const command: LotCommand | undefined = this.history.pop();
    if (command === undefined) {
      console.log("  nothing to undo");
      return;
    }
    command.undo();
    console.log(`  undo  ${command.label.padEnd(16)} | ${this.lot.list()}`);
  }
}

// ---- Demo ----

const lot: Lot = new Lot();
const desk: Desk = new Desk(lot);

desk.run(new ParkCommand(lot, "KA-01-1111"));
desk.run(new ParkCommand(lot, "KA-01-9999")); // typo
desk.run(new ParkCommand(lot, "KA-01-2222"));

console.log("\nattendant: 'undo the last two — that 9999 was a typo'");
desk.undo();
desk.undo();
desk.run(new ParkCommand(lot, "KA-01-2222"));
desk.run(new LeaveCommand(lot, "KA-01-1111"));
