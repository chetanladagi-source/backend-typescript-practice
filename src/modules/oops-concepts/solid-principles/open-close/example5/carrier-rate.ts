// Abstraction that every carrier rate card implements.

export interface Shipment {
  weightKg: number;
  distanceKm: number;
}

export interface CarrierRate {
  readonly carrier: string;
  quote(shipment: Shipment): number;
}
