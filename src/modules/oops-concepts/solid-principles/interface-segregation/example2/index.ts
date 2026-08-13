// Runnable entry point contrasting the fat Worker contract with segregated ones.

import { Feedable, Restable } from "./biological-needs";
import { HumanWorker } from "./human-worker";
import { RobotWorker } from "./robot-worker";
import { RobotWorkerViolation, Worker } from "./worker-violation";
import { Workable } from "./workable";

console.log("=== Violation ===");
const fatRobot: Worker = new RobotWorkerViolation();
fatRobot.work("weld chassis");
fatRobot.eat("pasta");
try {
  fatRobot.sleep(8);
} catch (error) {
  console.log("[violation] sleep failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const shift: Workable[] = [new RobotWorker(), new HumanWorker()];
for (const member of shift) {
  member.work("weld chassis");
}

const human: HumanWorker = new HumanWorker();
const eater: Feedable = human;
const sleeper: Restable = human;
eater.eat("pasta");
sleeper.sleep(8);
