// Runnable entry point: violating design first, then the LSP-compliant design.

import { Vehicle as BadVehicle, Bicycle as BadBicycle, startTrip as badStartTrip } from "./vehicle-violation";
import { Car } from "./car";
import { Bicycle } from "./bicycle";
import { startTrip } from "./trip-service";

export function run(): void {
  console.log("=== Violation ===");
  console.log(badStartTrip(new BadVehicle("Sedan")));
  try {
    console.log(badStartTrip(new BadBicycle("Roadster")));
  } catch (error: unknown) {
    console.log(`Substitution failed: ${(error as Error).message}`);
  }

  console.log("=== LSP applied ===");
  console.log(startTrip(new Car("Sedan")));
  console.log(startTrip(new Bicycle("Roadster")));
}

run();
