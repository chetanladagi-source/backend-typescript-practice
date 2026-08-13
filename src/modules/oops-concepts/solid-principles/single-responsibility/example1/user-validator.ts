// Only decides whether registration input is acceptable.

import { RegistrationInput } from "./user-registration-violation";

export class UserValidator {
  public validate(input: RegistrationInput): string[] {
    const errors: string[] = [];
    if (!input.email.includes("@")) {
      errors.push("email must contain @");
    }
    if (input.password.length < 8) {
      errors.push("password must be at least 8 characters");
    }
    return errors;
  }
}
