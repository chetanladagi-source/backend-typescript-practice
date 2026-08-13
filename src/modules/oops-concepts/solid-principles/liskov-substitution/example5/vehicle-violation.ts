// LSP violation: Bicycle inherits startEngine() from Vehicle and silently does nothing.

export class Vehicle {
  protected engineRunning: boolean = false;

  public constructor(public readonly model: string) {}

  public startEngine(): void {
    this.engineRunning = true;
    console.log(`${this.model} engine started`);
  }

  public isEngineRunning(): boolean {
    return this.engineRunning;
  }

  public drive(): string {
    return `${this.model} is moving`;
  }
}

// Violation: Vehicle.startEngine() promises isEngineRunning() becomes true; Bicycle leaves it false.
export class Bicycle extends Vehicle {
  public override startEngine(): void {
    console.log(`${this.model} has no engine to start`);
  }
}

export function startTrip(vehicle: Vehicle): string {
  vehicle.startEngine();
  if (!vehicle.isEngineRunning()) {
    throw new Error(`Broken contract: ${vehicle.model} engine did not start`);
  }
  return vehicle.drive();
}
