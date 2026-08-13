// New carrier added later without touching any existing file.

import { CarrierRate, Shipment } from "./carrier-rate";

export class IndiaPostRate implements CarrierRate {
  public readonly carrier: string = "indiapost";

  public quote(shipment: Shipment): number {
    return 20 + shipment.weightKg * 9 + shipment.distanceKm * 0.4;
  }
}
