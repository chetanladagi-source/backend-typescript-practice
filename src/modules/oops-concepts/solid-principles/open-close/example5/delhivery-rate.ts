// Delhivery rate card.

import { CarrierRate, Shipment } from "./carrier-rate";

export class DelhiveryRate implements CarrierRate {
  public readonly carrier: string = "delhivery";

  public quote(shipment: Shipment): number {
    return 30 + shipment.weightKg * 15 + shipment.distanceKm * 0.6;
  }
}
