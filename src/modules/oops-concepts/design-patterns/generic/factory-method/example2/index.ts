// Factory Method (generic) — Example 2: issue the right parking ticket by stay type.

export interface Ticket {
  readonly plate: string;
  readonly kind: string;
  fee(hours: number): number;
  describe(hours: number): string;
}

class HourlyTicket implements Ticket {
  public readonly kind: string = "hourly";
  constructor(public readonly plate: string) {}
  public fee(hours: number): number {
    return hours * 40;
  }
  public describe(hours: number): string {
    return `${this.kind} ${this.plate}  ${hours}h → Rs.${this.fee(hours)}`;
  }
}

class DailyTicket implements Ticket {
  public readonly kind: string = "daily";
  constructor(public readonly plate: string) {}
  public fee(_hours: number): number {
    return 250; // capped, no matter how long they stay
  }
  public describe(hours: number): string {
    return `${this.kind} ${this.plate}  ${hours}h → Rs.${this.fee(hours)} (flat)`;
  }
}

class ValetTicket implements Ticket {
  public readonly kind: string = "valet";
  constructor(public readonly plate: string) {}
  public fee(hours: number): number {
    return 300 + hours * 20;
  }
  public describe(hours: number): string {
    return `${this.kind} ${this.plate}  ${hours}h → Rs.${this.fee(hours)}`;
  }
}

export type Stay = "hourly" | "daily" | "valet";

export class TicketFactory {
  public static issue(stay: Stay, plate: string): Ticket {
    switch (stay) {
      case "hourly":
        return new HourlyTicket(plate);
      case "daily":
        return new DailyTicket(plate);
      case "valet":
        return new ValetTicket(plate);
      default:
        return assertNever(stay);
    }
  }
}

function assertNever(value: never): never {
  throw new Error(`unknown stay: ${JSON.stringify(value)}`);
}

// ---- Demo ----

const issued: { stay: Stay; plate: string; hours: number }[] = [
  { stay: "hourly", plate: "KA-01-1111", hours: 3 },
  { stay: "daily", plate: "KA-01-2222", hours: 10 },
  { stay: "valet", plate: "KA-01-3333", hours: 2 },
];

issued.forEach((row): void => {
  const ticket: Ticket = TicketFactory.issue(row.stay, row.plate);
  console.log("  " + ticket.describe(row.hours));
});

// The exit booth never says `if (stay === "daily")`. It asks the ticket for its own fee.
