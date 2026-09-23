// State (generic) — Example 2: a coffee machine, one class per state.

export class CoffeeMachine {
  private state: MachineState;

  constructor() {
    this.state = new IdleState(this);
  }

  public setState(next: MachineState): void {
    console.log(`  [${this.state.name} -> ${next.name}]`);
    this.state = next;
  }

  public get stateName(): string {
    return this.state.name;
  }

  public start(): void {
    this.state.start();
  }
  public brew(): void {
    this.state.brew();
  }
  public takeCup(): void {
    this.state.takeCup();
  }
  public descale(): void {
    this.state.descale();
  }
}

export interface MachineState {
  readonly name: string;
  start(): void;
  brew(): void;
  takeCup(): void;
  descale(): void;
}

abstract class BaseState implements MachineState {
  public abstract readonly name: string;
  protected constructor(protected readonly machine: CoffeeMachine) {}
  public start(): void {
    console.log(`  start ignored in "${this.name}"`);
  }
  public brew(): void {
    console.log(`  brew ignored in "${this.name}"`);
  }
  public takeCup(): void {
    console.log(`  takeCup ignored in "${this.name}"`);
  }
  public descale(): void {
    console.log(`  descale ignored in "${this.name}"`);
  }
}

class IdleState extends BaseState {
  public readonly name: string = "idle";
  constructor(machine: CoffeeMachine) {
    super(machine);
  }
  public override start(): void {
    this.machine.setState(new HeatingState(this.machine));
    console.log("    boiler on");
  }
  public override descale(): void {
    this.machine.setState(new DescalingState(this.machine));
    console.log("    descale cycle started");
  }
}

class HeatingState extends BaseState {
  public readonly name: string = "heating";
  constructor(machine: CoffeeMachine) {
    super(machine);
  }
  public override brew(): void {
    this.machine.setState(new ReadyState(this.machine));
    console.log("    shot pulled");
  }
}

class ReadyState extends BaseState {
  public readonly name: string = "ready";
  constructor(machine: CoffeeMachine) {
    super(machine);
  }
  public override takeCup(): void {
    this.machine.setState(new IdleState(this.machine));
    console.log("    cup taken");
  }
}

class DescalingState extends BaseState {
  public readonly name: string = "descaling";
  constructor(machine: CoffeeMachine) {
    super(machine);
  }
  public override start(): void {
    this.machine.setState(new IdleState(this.machine));
    console.log("    descale finished");
  }
}

// ---- Demo ----

const machine: CoffeeMachine = new CoffeeMachine();
machine.brew(); // ignored — still idle
machine.start();
machine.brew();
machine.takeCup();

console.log("\ndescale path:");
machine.descale();
machine.brew(); // ignored
machine.start(); // finishes descale
machine.start();
machine.brew();
