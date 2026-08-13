// Runnable entry point: violating design first, then the LSP-compliant design.

import { Eagle as BadEagle, Penguin as BadPenguin, sendOnMigration } from "./bird-violation";
import { Eagle } from "./eagle";
import { Penguin } from "./penguin";
import { scheduleMigration } from "./flight-scheduler";

export function run(): void {
  console.log("=== Violation ===");
  console.log(sendOnMigration(new BadEagle()));
  try {
    console.log(sendOnMigration(new BadPenguin()));
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  scheduleMigration([new Eagle(), new Penguin()]);
}

run();
