// Runnable entry point contrasting the fat Vehicle contract with travel capabilities.

import { AmphibiousPlane } from "./amphibious-plane";
import { Car } from "./car";
import { CarViolation, Vehicle } from "./vehicle-violation";
import { Drivable } from "./drivable";
import { Flyable } from "./flyable";
import { Sailable } from "./sailable";

console.log("=== Violation ===");
const fatCar: Vehicle = new CarViolation();
fatCar.drive(120);
try {
  fatCar.fly(300);
} catch (error) {
  console.log("[violation] fly failed:", (error as Error).message);
}
try {
  fatCar.sail(40);
} catch (error) {
  console.log("[violation] sail failed:", (error as Error).message);
}

console.log("=== ISP applied ===");
const plane: AmphibiousPlane = new AmphibiousPlane();
const roadFleet: Drivable[] = [new Car(), plane];
for (const vehicle of roadFleet) {
  vehicle.drive(120);
}

const airFleet: Flyable[] = [plane];
for (const vehicle of airFleet) {
  vehicle.fly(300);
}

const waterFleet: Sailable[] = [plane];
for (const vehicle of waterFleet) {
  vehicle.sail(40);
}
