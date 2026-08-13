// LSP violation: Penguin inherits fly() from Bird and throws instead of flying.

export abstract class Bird {
  public constructor(public readonly species: string) {}

  public eat(): void {
    console.log(`${this.species} is eating`);
  }

  public fly(): string {
    return `${this.species} is airborne at 300 metres`;
  }
}

export class Eagle extends Bird {
  public constructor() {
    super("Eagle");
  }
}

// Violation: Bird promises fly() always returns a flight status; Penguin cannot deliver it.
export class Penguin extends Bird {
  public constructor() {
    super("Penguin");
  }

  public override fly(): string {
    throw new Error("Penguin cannot fly");
  }
}

export function sendOnMigration(bird: Bird): string {
  bird.eat();
  return bird.fly();
}
