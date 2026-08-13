// A bird that really can fly.

import { FlyingBird } from "./flying-bird";

export class Eagle implements FlyingBird {
  public readonly species: string = "Eagle";

  public eat(): void {
    console.log(`${this.species} is eating`);
  }

  public fly(): string {
    return `${this.species} is airborne at 300 metres`;
  }
}
