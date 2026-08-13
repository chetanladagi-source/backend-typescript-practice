// Duck that genuinely moves in all three ways.

import { Flyer } from "./flyer";
import { Runner } from "./runner";
import { Swimmer } from "./swimmer";

export class Duck implements Runner, Swimmer, Flyer {
  public run(meters: number): void {
    console.log("[duck] waddling", meters, "m");
  }

  public swim(meters: number): void {
    console.log("[duck] swimming", meters, "m");
  }

  public fly(meters: number): void {
    console.log("[duck] flying", meters, "m");
  }
}
