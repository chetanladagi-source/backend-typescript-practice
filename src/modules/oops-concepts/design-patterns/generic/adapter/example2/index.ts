// Adapter (generic) — Example 2: wrap a vendor parking-barrier SDK
// so the lot talks to a clean Gate interface.

export interface Gate {
  open(plate: string): GateResult;
  close(): void;
}

export interface GateResult {
  opened: boolean;
  reason?: string;
}

// The vendor SDK we cannot change. Degrees instead of open/close, and a numeric status.
class VendorBarrierSdk {
  public setAngle(degrees: number): { code: number; msg: string } {
    if (degrees !== 0 && degrees !== 90) {
      return { code: 400, msg: `illegal angle ${degrees}` };
    }
    return { code: 200, msg: degrees === 90 ? "raised" : "lowered" };
  }
}

export class VendorBarrierAdapter implements Gate {
  constructor(private readonly sdk: VendorBarrierSdk) {}

  public open(plate: string): GateResult {
    const raw = this.sdk.setAngle(90);
    if (raw.code !== 200) {
      return { opened: false, reason: raw.msg };
    }
    console.log(`  [adapter] raised barrier for ${plate}`);
    return { opened: true };
  }

  public close(): void {
    this.sdk.setAngle(0);
    console.log("  [adapter] lowered barrier");
  }
}

class SoftwareGate implements Gate {
  public open(plate: string): GateResult {
    console.log(`  [software] logged entry for ${plate} (no physical arm)`);
    return { opened: true };
  }
  public close(): void {
    console.log("  [software] session closed");
  }
}

// ---- Demo ----

function admit(gate: Gate, plate: string): void {
  const result: GateResult = gate.open(plate);
  console.log(result.opened ? `  admitted ${plate}` : `  refused ${plate}: ${result.reason}`);
  gate.close();
}

console.log("physical barrier (vendor SDK, adapted):");
admit(new VendorBarrierAdapter(new VendorBarrierSdk()), "KA-01-1111");

console.log("\nsoftware-only lane (same Gate interface):");
admit(new SoftwareGate(), "KA-01-2222");
