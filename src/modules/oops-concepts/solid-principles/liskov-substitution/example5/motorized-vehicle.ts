// Engine handling only exists for motorized vehicles.

import { Vehicle } from "./vehicle";

export interface MotorizedVehicle extends Vehicle {
  startEngine(): void;
  isEngineRunning(): boolean;
}

export function isMotorized(vehicle: Vehicle): vehicle is MotorizedVehicle {
  return typeof (vehicle as MotorizedVehicle).startEngine === "function";
}
