// Motorized vehicle that truly starts an engine.

import { MotorizedVehicle } from "./motorized-vehicle";

export class Car implements MotorizedVehicle {
  private engineRunning: boolean = false;

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
