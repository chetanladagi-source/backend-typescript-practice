// Violating design: one calculator that switches on the country code.

export class LegacyTaxCalculator {
  // OCP violation: launching in a new country means editing this switch.
  public tax(countryCode: string, amount: number): number {
    switch (countryCode) {
      case "IN":
        return amount * 0.18;
      case "US":
        return amount * 0.07;
      default:
        console.log(`No tax rule for country: ${countryCode}`);
        return 0;
    }
  }
}
