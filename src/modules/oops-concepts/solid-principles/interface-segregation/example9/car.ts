// Vehicle that only travels on roads.

import { Drivable } from "./drivable";

export class Car implements Drivable {
  public drive(km: number): void {
    console.log("[car] driving", km, "km");
  }
}
