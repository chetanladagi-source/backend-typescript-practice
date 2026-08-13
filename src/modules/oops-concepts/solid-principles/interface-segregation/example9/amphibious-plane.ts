// Vehicle that genuinely travels on road, air and water.

import { Drivable } from "./drivable";
import { Flyable } from "./flyable";
import { Sailable } from "./sailable";

export class AmphibiousPlane implements Drivable, Flyable, Sailable {
  public drive(km: number): void {
    console.log("[amphibious-plane] taxiing", km, "km");
  }

  public fly(km: number): void {
    console.log("[amphibious-plane] flying", km, "km");
  }

  public sail(km: number): void {
    console.log("[amphibious-plane] sailing", km, "km");
  }
}
