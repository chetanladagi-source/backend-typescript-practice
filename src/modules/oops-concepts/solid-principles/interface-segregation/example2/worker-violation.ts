// Fat worker contract that assumes every worker is human.

export interface Worker {
  work(task: string): void;
  eat(meal: string): void;
  sleep(hours: number): void;
}

// ISP violation: a robot is forced to implement biological needs it does not have.
export class RobotWorkerViolation implements Worker {
  public work(task: string): void {
    console.log("[violation-robot] working on:", task);
  }

  public eat(meal: string): void {
    console.log("[violation-robot] eat(", meal, ") is a meaningless no-op for a robot");
  }

  public sleep(hours: number): void {
    throw new Error(`Robot cannot sleep for ${hours} hours`);
  }
}
