// Robot that only promises to work.

import { Workable } from "./workable";

export class RobotWorker implements Workable {
  public work(task: string): void {
    console.log("[robot] working on:", task);
  }
}
