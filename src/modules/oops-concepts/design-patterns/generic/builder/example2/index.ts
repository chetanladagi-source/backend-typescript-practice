// Builder (generic) — Example 2: a fluent employee offer-letter builder.

type Band = "L3" | "L4" | "L5";
type Location = "Bengaluru" | "Remote" | "NYC";

export interface Offer {
  readonly name: string;
  readonly role: string;
  readonly band: Band;
  readonly location: Location;
  readonly salary: number;
  readonly joiningBonus: number;
  readonly equity: number;
  readonly startDate: string;
  describe(): string;
}

export class OfferBuilder {
  private band: Band = "L3";
  private location: Location = "Bengaluru";
  private salary?: number;
  private joiningBonus: number = 0;
  private equity: number = 0;
  private startDate?: string;

  constructor(private readonly name: string, private readonly role: string) {}

  public atBand(band: Band): this {
    this.band = band;
    return this;
  }

  public in(location: Location): this {
    this.location = location;
    return this;
  }

  public withSalary(amount: number): this {
    this.salary = amount;
    return this;
  }

  public withJoiningBonus(amount: number): this {
    this.joiningBonus = amount;
    return this;
  }

  public withEquity(units: number): this {
    this.equity = units;
    return this;
  }

  public starting(date: string): this {
    this.startDate = date;
    return this;
  }

  public build(): Offer {
    if (this.salary === undefined) {
      throw new Error("salary is required");
    }
    if (this.startDate === undefined) {
      throw new Error("start date is required");
    }
    if (this.location === "Remote" && this.joiningBonus > 0) {
      throw new Error("remote offers cannot include a relocation joining bonus");
    }
    const salary: number = this.salary;
    const startDate: string = this.startDate;
    return {
      name: this.name,
      role: this.role,
      band: this.band,
      location: this.location,
      salary,
      joiningBonus: this.joiningBonus,
      equity: this.equity,
      startDate,
      describe: (): string =>
        `${this.role} ${this.name} ${this.band} @ ${this.location}  Rs.${salary}` +
        ` + bonus Rs.${this.joiningBonus} + ${this.equity} RSUs  start ${startDate}`,
    };
  }
}

// ---- Demo ----

const ada: Offer = new OfferBuilder("Ada", "Engineer")
  .atBand("L4")
  .in("Bengaluru")
  .withSalary(180000)
  .withJoiningBonus(20000)
  .withEquity(400)
  .starting("2026-10-01")
  .build();
console.log(ada.describe());

try {
  new OfferBuilder("Grace", "Designer").in("Remote").withSalary(140000).withJoiningBonus(15000).starting("2026-11-01").build();
} catch (err) {
  console.log("rejected:", (err as Error).message);
}

try {
  new OfferBuilder("Linus", "Intern").withSalary(20000).build();
} catch (err) {
  console.log("rejected:", (err as Error).message);
}
