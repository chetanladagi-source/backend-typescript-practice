// Non-motorized vehicle that never mentions an engine.

import { Vehicle } from "./vehicle";

export class Bicycle implements Vehicle {
  public constructor(public readonly model: string) {}

  public pedal(): void {
    console.log(`${this.model} rider starts pedalling`);
  }

  public drive(): string {
    return `${this.model} is moving`;
  }
}
