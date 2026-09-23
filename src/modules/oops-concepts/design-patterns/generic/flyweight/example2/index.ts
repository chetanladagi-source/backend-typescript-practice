// Flyweight (generic) — Example 2: thousands of cups share a few BeanBlend objects.

export class BeanBlend {
  constructor(
    public readonly name: string,
    public readonly origin: string,
    public readonly roast: string,
  ) {}
}

export class BlendRegistry {
  private static readonly cache: Map<string, BeanBlend> = new Map<string, BeanBlend>();

  public static get(name: "house" | "single-origin" | "decaf"): BeanBlend {
    let blend: BeanBlend | undefined = BlendRegistry.cache.get(name);
    if (blend === undefined) {
      blend = Object.freeze(BlendRegistry.build(name));
      BlendRegistry.cache.set(name, blend);
    }
    return blend;
  }

  private static build(name: "house" | "single-origin" | "decaf"): BeanBlend {
    switch (name) {
      case "house":
        return new BeanBlend("house", "blend", "medium");
      case "single-origin":
        return new BeanBlend("single-origin", "Ethiopia", "light");
      case "decaf":
        return new BeanBlend("decaf", "Colombia", "medium");
    }
  }

  public static count(): number {
    return BlendRegistry.cache.size;
  }
}

interface Cup {
  ticket: number;
  size: string;
  blend: BeanBlend;
}

// ---- Demo ----

const cups: Cup[] = [];
const names: ("house" | "single-origin" | "decaf")[] = ["house", "single-origin", "decaf"];
for (let i = 0; i < 10_000; i++) {
  cups.push({
    ticket: i + 1,
    size: i % 2 === 0 ? "medium" : "large",
    blend: BlendRegistry.get(names[i % names.length] as (typeof names)[number]),
  });
}

console.log("cups sold:     ", cups.length);
console.log("BeanBlend objs:", BlendRegistry.count());
console.log(
  "all house cups share one blend?",
  cups.filter((c: Cup): boolean => c.blend.name === "house").every((c: Cup): boolean => c.blend === BlendRegistry.get("house")),
);
