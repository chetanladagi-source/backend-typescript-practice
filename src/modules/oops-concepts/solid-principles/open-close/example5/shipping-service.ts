// Service that compares quotes from any set of carriers.

import { CarrierRate, Shipment } from "./carrier-rate";

export class ShippingService {
  public cheapest(rates: CarrierRate[], shipment: Shipment): CarrierRate | undefined {
    let best: CarrierRate | undefined = undefined;
    let bestPrice: number = Number.POSITIVE_INFINITY;
    for (const rate of rates) {
      const price: number = rate.quote(shipment);
      console.log(`${rate.carrier} quotes ${price.toFixed(2)}`);
      if (price < bestPrice) {
        bestPrice = price;
        best = rate;
      }
    }
    console.log(`cheapest = ${best?.carrier ?? "none"}`);
    return best;
  }
}
