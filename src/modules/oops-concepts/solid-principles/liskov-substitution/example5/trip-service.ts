// Consumer that only asks for an engine when the vehicle has one.

import { Vehicle } from "./vehicle";
import { MotorizedVehicle, isMotorized } from "./motorized-vehicle";

export function startMotorizedTrip(vehicle: MotorizedVehicle): string {
  vehicle.startEngine();
  if (!vehicle.isEngineRunning()) {
    throw new Error(`Broken contract: ${vehicle.model} engine did not start`);
  }
  return vehicle.drive();
}

export function startTrip(vehicle: Vehicle): string {
  if (isMotorized(vehicle)) {
    return startMotorizedTrip(vehicle);
  }
  console.log(`${vehicle.model} needs no ignition`);
  return vehicle.drive();
}
