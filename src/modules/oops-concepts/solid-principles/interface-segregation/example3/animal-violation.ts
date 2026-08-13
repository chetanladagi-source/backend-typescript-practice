// Fat animal contract that assumes every animal moves every way.

export interface Animal {
  run(meters: number): void;
  swim(meters: number): void;
  fly(meters: number): void;
}

// ISP violation: a dog must implement fly, which it can never do.
export class DogViolation implements Animal {
  public run(meters: number): void {
    console.log("[violation-dog] running", meters, "m");
  }

  public swim(meters: number): void {
    console.log("[violation-dog] paddling", meters, "m");
  }

  public fly(meters: number): void {
    throw new Error(`A dog cannot fly ${meters} m`);
  }
}
