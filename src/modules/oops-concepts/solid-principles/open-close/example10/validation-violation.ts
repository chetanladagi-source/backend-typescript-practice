// Violating design: a fixed sequence of if-checks inside one method.

export interface LegacySignupInput {
  name: string;
  email: string;
  age: number;
}

export class LegacySignupValidator {
  // OCP violation: every new rule means editing this method's if-chain.
  public validate(input: LegacySignupInput): string[] {
    const errors: string[] = [];
    if (input.name.trim() === "") {
      errors.push("name is required");
    }
    if (input.email.trim() === "") {
      errors.push("email is required");
    }
    if (!input.email.includes("@")) {
      errors.push("email format is invalid");
    }
    return errors;
  }
}
