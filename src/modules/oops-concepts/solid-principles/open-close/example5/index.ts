// Entry point: runs the violating design first, then the OCP-compliant one.

import { LegacyShippingCalculator } from "./shipping-violation";
import { CarrierRate, Shipment } from "./carrier-rate";
import { BlueDartRate } from "./blue-dart-rate";
import { DelhiveryRate } from "./delhivery-rate";
import { IndiaPostRate } from "./india-post-rate";
import { ShippingService } from "./shipping-service";

const shipment: Shipment = { weightKg: 2.5, distanceKm: 320 };

console.log("=== Violation ===");
const legacy: LegacyShippingCalculator = new LegacyShippingCalculator();
for (const carrier of ["bluedart", "delhivery", "indiapost"]) {
  const price: number = legacy.cost(carrier, shipment.weightKg, shipment.distanceKm);
  console.log(`${carrier} quotes ${price.toFixed(2)}`);
}

console.log("\n=== OCP applied ===");
const service: ShippingService = new ShippingService();
const rates: CarrierRate[] = [new BlueDartRate(), new DelhiveryRate()];
service.cheapest(rates, shipment);

console.log("\n=== Extension without modification ===");
service.cheapest([...rates, new IndiaPostRate()], shipment);
