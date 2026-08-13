// Violating design: freight pricing chained behind if-else per carrier.

export class LegacyShippingCalculator {
  // OCP violation: onboarding a carrier means editing this if-else chain.
  public cost(carrier: string, weightKg: number, distanceKm: number): number {
    if (carrier === "bluedart") {
      return 40 + weightKg * 12 + distanceKm * 0.8;
    } else if (carrier === "delhivery") {
      return 30 + weightKg * 15 + distanceKm * 0.6;
    } else {
      console.log(`No rate card for carrier: ${carrier}`);
      return 0;
    }
  }
}
