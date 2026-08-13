// Blue Dart rate card.

import { CarrierRate, Shipment } from "./carrier-rate";

export class BlueDartRate implements CarrierRate {
  public readonly carrier: string = "bluedart";

  public quote(shipment: Shipment): number {
    return 40 + shipment.weightKg * 12 + shipment.distanceKm * 0.8;
  }
}
