// Dog that only claims the movements it has.

import { Runner } from "./runner";
import { Swimmer } from "./swimmer";

export class Dog implements Runner, Swimmer {
  public run(meters: number): void {
    console.log("[dog] running", meters, "m");
  }

  public swim(meters: number): void {
    console.log("[dog] paddling", meters, "m");
  }
}
