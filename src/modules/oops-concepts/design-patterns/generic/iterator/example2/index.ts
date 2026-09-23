// Iterator (generic) — Example 2: walk parking spots without exposing the grid.

interface Spot {
  id: number;
  occupied: boolean;
  ev: boolean;
}

export class Garage implements Iterable<Spot> {
  constructor(private readonly spots: Spot[]) {}

  public [Symbol.iterator](): Iterator<Spot> {
    let index: number = 0;
    const spots: Spot[] = this.spots;
    return {
      next: (): IteratorResult<Spot> =>
        index < spots.length
          ? { done: false, value: spots[index++] as Spot }
          : { done: true, value: undefined },
    };
  }

  public *free(): Generator<Spot> {
    for (const spot of this) {
      if (!spot.occupied) {
        yield spot;
      }
    }
  }

  public *evOnly(): Generator<Spot> {
    for (const spot of this.free()) {
      if (spot.ev) {
        yield spot;
      }
    }
  }
}

// ---- Demo ----

const garage: Garage = new Garage([
  { id: 1, occupied: true, ev: false },
  { id: 2, occupied: false, ev: true },
  { id: 3, occupied: false, ev: false },
  { id: 4, occupied: true, ev: true },
  { id: 5, occupied: false, ev: true },
]);

console.log("all spots:");
for (const s of garage) {
  console.log(`  #${s.id} ${s.occupied ? "taken" : "free"}${s.ev ? " EV" : ""}`);
}

console.log("\nfree spots:", [...garage.free()].map((s: Spot): number => s.id).join(", "));
console.log("free EV:   ", [...garage.evOnly()].map((s: Spot): number => s.id).join(", "));

let firstEv: Spot | undefined;
for (const s of garage.evOnly()) {
  firstEv = s;
  break;
}
console.log("first free EV (early exit):", firstEv?.id);
