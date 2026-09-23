// Flyweight (generic) — Example 1: many parked cars share a few VehicleType objects.

// INTRINSIC state: shared, immutable, does not vary between instances.
export class VehicleType {
  // `Object.freeze` in the factory below makes accidental mutation a hard error.
  constructor(
    public readonly kind: string,
    public readonly lengthMetres: number,
    public readonly needsCharger: boolean,
  ) {}
}

// The FLYWEIGHT FACTORY: hands out shared instances, creating each kind at most once.
export class VehicleTypeRegistry {
  private static readonly cache: Map<string, VehicleType> = new Map<string, VehicleType>();

  public static get(kind: "sedan" | "suv" | "motorcycle" | "ev"): VehicleType {
    let type: VehicleType | undefined = VehicleTypeRegistry.cache.get(kind);
    if (type === undefined) {
      type = Object.freeze(VehicleTypeRegistry.build(kind));
      VehicleTypeRegistry.cache.set(kind, type);
    }
    return type;
  }

  private static build(kind: "sedan" | "suv" | "motorcycle" | "ev"): VehicleType {
    switch (kind) {
      case "sedan":
        return new VehicleType("sedan", 4.5, false);
      case "suv":
        return new VehicleType("suv", 5.0, false);
      case "motorcycle":
        return new VehicleType("motorcycle", 2.2, false);
      case "ev":
        return new VehicleType("ev", 4.6, true);
    }
  }

  public static count(): number {
    return VehicleTypeRegistry.cache.size;
  }
}

// EXTRINSIC state: everything that varies per car. This is the object we make thousands of.
interface ParkedCar {
  plate: string;
  spot: number;
  type: VehicleType; // a reference, not a copy
}

// ---- Demo ----

const cars: ParkedCar[] = [];
const kinds: ("sedan" | "suv" | "motorcycle" | "ev")[] = ["sedan", "suv", "motorcycle", "ev"];

for (let i = 0; i < 50_000; i++) {
  cars.push({
    plate: `KA-${String(i).padStart(5, "0")}`,
    spot: i,
    type: VehicleTypeRegistry.get(kinds[i % kinds.length] as (typeof kinds)[number]),
  });
}

console.log("parked cars:            ", cars.length);
console.log("VehicleType objects:    ", VehicleTypeRegistry.count());
console.log(
  "all SUVs share one type?",
  cars.filter((c: ParkedCar): boolean => c.type.kind === "suv").every((c: ParkedCar): boolean =>
    c.type === VehicleTypeRegistry.get("suv"),
  ),
);

// The point: 50,000 cars, 4 VehicleType objects.
// Without Flyweight it would be 50,000 shallow copies of the same {kind, length, needsCharger}.

// Object.freeze proves intrinsic state stays intrinsic:
try {
  (VehicleTypeRegistry.get("sedan") as { lengthMetres: number }).lengthMetres = 999;
  console.log("mutation succeeded (BAD):", VehicleTypeRegistry.get("sedan").lengthMetres);
} catch (err) {
  console.log("attempted mutation rejected:", (err as Error).message);
}
