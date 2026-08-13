// Human worker that legitimately supports every capability.

import { Feedable, Restable } from "./biological-needs";
import { Workable } from "./workable";

export class HumanWorker implements Workable, Feedable, Restable {
  public work(task: string): void {
    console.log("[human] working on:", task);
  }

  public eat(meal: string): void {
    console.log("[human] eating:", meal);
  }

  public sleep(hours: number): void {
    console.log("[human] sleeping for", hours, "hours");
  }
}
