// Rule: email must look like an address.

import { SignupRequest, Validator } from "./validator";

export class EmailFormatValidator implements Validator {
  public readonly rule: string = "email-format";

  public validate(request: SignupRequest): string | null {
    if (!request.email.includes("@") || !request.email.includes(".")) {
      return `email format is invalid: ${request.email}`;
    }
    return null;
  }
}
