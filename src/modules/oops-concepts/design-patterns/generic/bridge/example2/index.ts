// Bridge (generic) — Example 2: drink kind × brewing method, not a subclass per pair.

export interface Brewer {
  readonly name: string;
  extract(grams: number, seconds: number): void;
}

class EspressoMachine implements Brewer {
  public readonly name: string = "espresso machine";
  public extract(grams: number, seconds: number): void {
    console.log(`    [${this.name}] ${grams}g at 9 bar for ${seconds}s`);
  }
}

class PourOverKettle implements Brewer {
  public readonly name: string = "pour-over";
  public extract(grams: number, seconds: number): void {
    console.log(`    [${this.name}] ${grams}g bloom + pour, ${seconds}s total`);
  }
}

class FrenchPress implements Brewer {
  public readonly name: string = "french press";
  public extract(grams: number, seconds: number): void {
    console.log(`    [${this.name}] steep ${grams}g for ${seconds}s then plunge`);
  }
}

export abstract class Drink {
  constructor(protected readonly brewer: Brewer) {}
  public abstract serve(): void;
}

class StraightEspresso extends Drink {
  public serve(): void {
    console.log(`  espresso on ${this.brewer.name}`);
    this.brewer.extract(18, 28);
  }
}

class FilterCup extends Drink {
  public serve(): void {
    console.log(`  filter cup on ${this.brewer.name}`);
    this.brewer.extract(15, 180);
  }
}

class Batch extends Drink {
  public serve(): void {
    console.log(`  batch (×3) on ${this.brewer.name}`);
    this.brewer.extract(45, 240);
  }
}

// ---- Demo ----

new StraightEspresso(new EspressoMachine()).serve();
new FilterCup(new PourOverKettle()).serve();
new Batch(new FrenchPress()).serve();

// 3 drinks × 3 brewers = 9 combinations, 6 classes.
// A fourth brewer (AeroPress) is one class; drinks stay untouched.
