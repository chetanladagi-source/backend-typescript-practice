// New rule added later without touching any existing file.

import { SignupRequest, Validator } from "./validator";

export class AgeRangeValidator implements Validator {
  public constructor(
    private readonly min: number,
    private readonly max: number
  ) {}

  public readonly rule: string = "age-range";

  public validate(request: SignupRequest): string | null {
    if (request.age < this.min || request.age > this.max) {
      return `age must be between ${this.min} and ${this.max}, got ${request.age}`;
    }
    return null;
  }
}
