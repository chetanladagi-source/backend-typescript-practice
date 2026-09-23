// Command (generic) — Example 1: a barista command queue with undo.

// RECEIVER: the thing that actually knows how to do the work.
class EspressoMachine {
  private grams: number = 0;
  private mlWater: number = 0;
  private mlMilk: number = 0;

  public grind(grams: number): void {
    this.grams += grams;
    console.log(`    ground ${grams}g (total ${this.grams}g)`);
  }
  public ungrind(grams: number): void {
    this.grams -= grams;
    console.log(`    returned ${grams}g of grounds`);
  }
  public brew(ml: number): void {
    this.mlWater += ml;
    console.log(`    brewed ${ml}ml (total ${this.mlWater}ml)`);
  }
  public unbrew(ml: number): void {
    this.mlWater -= ml;
    console.log(`    poured ${ml}ml back into the machine`);
  }
  public steamMilk(ml: number): void {
    this.mlMilk += ml;
    console.log(`    steamed ${ml}ml milk`);
  }
  public unsteamMilk(ml: number): void {
    this.mlMilk -= ml;
    console.log(`    reclaimed ${ml}ml milk`);
  }
  public describe(): string {
    return `[grounds=${this.grams}g, brewed=${this.mlWater}ml, milk=${this.mlMilk}ml]`;
  }
}

// COMMAND: same shape for everything the barista can do.
export interface Command {
  readonly label: string;
  execute(): void;
  undo(): void;
}

class GrindCommand implements Command {
  public readonly label: string;
  constructor(private readonly machine: EspressoMachine, private readonly grams: number) {
    this.label = `grind ${grams}g`;
  }
  public execute(): void {
    this.machine.grind(this.grams);
  }
  public undo(): void {
    this.machine.ungrind(this.grams);
  }
}

class BrewCommand implements Command {
  public readonly label: string;
  constructor(private readonly machine: EspressoMachine, private readonly ml: number) {
    this.label = `brew ${ml}ml`;
  }
  public execute(): void {
    this.machine.brew(this.ml);
  }
  public undo(): void {
    this.machine.unbrew(this.ml);
  }
}

class SteamMilkCommand implements Command {
  public readonly label: string;
  constructor(private readonly machine: EspressoMachine, private readonly ml: number) {
    this.label = `steam ${ml}ml milk`;
  }
  public execute(): void {
    this.machine.steamMilk(this.ml);
  }
  public undo(): void {
    this.machine.unsteamMilk(this.ml);
  }
}

// INVOKER: the barista. Runs commands, keeps history, supports undo.
class Barista {
  private readonly history: Command[] = [];

  public run(command: Command): void {
    console.log(`  do: ${command.label}`);
    command.execute();
    this.history.push(command);
  }

  public undoLast(): void {
    const command: Command | undefined = this.history.pop();
    if (command === undefined) {
      console.log("  nothing to undo");
      return;
    }
    console.log(`  undo: ${command.label}`);
    command.undo();
  }
}

// ---- Demo ----

const machine: EspressoMachine = new EspressoMachine();
const barista: Barista = new Barista();

// Composing a latte from small reversible steps.
barista.run(new GrindCommand(machine, 18));
barista.run(new BrewCommand(machine, 60));
barista.run(new SteamMilkCommand(machine, 200));
console.log("state:", machine.describe());

// The customer changed their mind — no milk.
console.log("\ncustomer: 'actually make it a straight espresso'");
barista.undoLast();
console.log("state:", machine.describe());

// The point: the barista never says `if (kind === "grind")`. Uniform interface.
// Same shape for keyboard shortcuts, macro recorders, Redux actions, git commits.
