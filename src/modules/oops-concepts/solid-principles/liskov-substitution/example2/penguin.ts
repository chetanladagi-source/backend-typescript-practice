// A bird that never claims to fly.

import { Bird } from "./bird";

export class Penguin implements Bird {
  public readonly species: string = "Penguin";

  public eat(): void {
    console.log(`${this.species} is eating`);
  }

  public swim(): string {
    return `${this.species} is swimming at 8 km/h`;
  }
}
