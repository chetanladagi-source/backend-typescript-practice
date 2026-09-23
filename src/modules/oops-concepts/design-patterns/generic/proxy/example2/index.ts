// Proxy (generic) — Example 2: a virtual proxy in front of an expensive ANPR camera.

export interface PlateReader {
  read(spot: number): string;
}

// THE REAL SUBJECT. "Starting" it is expensive, so we must not construct it until first use.
class AnprCamera implements PlateReader {
  constructor() {
    console.log("    [ANPR] camera booting, calibrating lens... (expensive)");
  }

  public read(spot: number): string {
    return `KA-01-${String(1000 + spot)}`;
  }
}

// VIRTUAL PROXY. Same interface; constructs the camera on the first read, then reuses it.
export class LazyPlateReader implements PlateReader {
  private real?: AnprCamera;
  private boots: number = 0;

  public read(spot: number): string {
    if (this.real === undefined) {
      this.real = new AnprCamera();
      this.boots += 1;
    }
    const plate: string = this.real.read(spot);
    console.log(`  spot ${spot} → ${plate}`);
    return plate;
  }

  public bootCount(): number {
    return this.boots;
  }
}

// ---- Demo ----

const reader: LazyPlateReader = new LazyPlateReader();
console.log("lot opens — camera has not booted yet. boots:", reader.bootCount());

console.log("\nfirst car:");
reader.read(3);
console.log("boots:", reader.bootCount());

console.log("\nsecond and third car — camera already warm:");
reader.read(7);
reader.read(12);
console.log("boots still:", reader.bootCount());
